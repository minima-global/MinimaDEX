import assert from "node:assert/strict";
import http from "node:http";
import { test } from "node:test";

import { postURL } from "../serverlibs/serverutils.js";

test("postURL buffers a split JSON response before parsing", async (t) => {
  let receivedAuthorization;
  let receivedBody = "";

  const server = http.createServer((request, response) => {
    receivedAuthorization = request.headers.authorization;
    request.setEncoding("utf8");
    request.on("data", (chunk) => {
      receivedBody += chunk;
    });
    request.on("end", () => {
      response.writeHead(200, { "content-type": "application/json" });
      response.write('{"status":true,');
      setTimeout(() => {
        response.end('"response":{"found":true}}');
      }, 25);
    });
  });

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  t.after(() => new Promise((resolve) => server.close(resolve)));

  const address = server.address();
  assert.notEqual(address, null);
  assert.equal(typeof address, "object");

  let callbackCalls = 0;
  const result = await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error("postURL callback was not invoked"));
    }, 1000);

    postURL(
      "127.0.0.1",
      address.port,
      "Basic test-token",
      "/wallet/checktxpow",
      "txpowid=0x1234",
      (response) => {
        clearTimeout(timeout);
        callbackCalls += 1;
        resolve(response);
      },
    );
  });

  await new Promise((resolve) => setImmediate(resolve));

  assert.deepEqual(result, {
    status: true,
    response: { found: true },
  });
  assert.equal(callbackCalls, 1);
  assert.equal(receivedAuthorization, "Basic test-token");
  assert.equal(receivedBody, "txpowid=0x1234");
});
