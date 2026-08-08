import * as http from 'http';

//Get a random string
const HEXVALS = '0123456789ABCDEF';
function getRandomHexString() {
    let output = '';
    for (let i = 0; i < 30; ++i) {
        output += HEXVALS.charAt(Math.floor(Math.random() * HEXVALS.length));
    }
    return "0x"+output;
}

//Make a POST request
function postURL(server, port, basicauth, url, postData, callback){
	
	//Create the AUTH header
	var header =  { 
	    'Authorization': basicauth,
		'Content-Type': 'application/x-www-form-urlencoded'
	}
	
	var options = {
	  hostname:	server,
	  port:port,
	  path:url,
	  method: 'POST',
	  headers: header
	};
	
	const req = http.request(options, (res) => {
	  //console.log(`STATUS: ${res.statusCode}`);
	  //console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
	  res.setEncoding('utf8');
	  const chunks = [];
	  res.on('data', (chunk) => {
		chunks.push(chunk);
	  });
	  res.on('end', () => {
	    try{
			callback(JSON.parse(chunks.join('')));
		}catch(err){
			console.log('Error HTTP : '+err+"  @ "+url+" "+postData);
		}
	  });
	});

	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});

	// Write data to request body
	req.write(postData);
	req.end();
}

//Export the Functions
export { 	
	getRandomHexString,
	postURL
}
