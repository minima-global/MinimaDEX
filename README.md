# MinimaDEX
A MiniMask enabled Minima DEX

This is truly decentralised application that allows Users to trade Minima tokens.

You must have the <b>MiniMask</b> Chrome extension installed. All Minima functionality is provided by this. 
You do not need to have any funds in the MiniMask wallet - the DEX has its own wallet built in that you will be sending funds to and from. 

You can of course send funds to and from your MiniMask / Web wallet.

Make sure you have a backup of the Seed Phrase and key uses! You can always log in again at a later date with the same details. All available on the Wallet page.

The system works by allowing users to communicate with each other P2P (Peer-to-Peer). The server is just a chat relay. It is not involved in the trades at all. All the Minima transactions are created and signed on the client. 

The system is <b>non-custodial</b> as Users keep their private keys and sign transactions themselves.

The orderbook is made up from all orders from all Users connected at that time. If you disconnect from the server your orders are removed.

So - you <b>MUST</b> be connected to the DEX for your orderbook orders to be available. You must be connected because for a trade to proceed you must be availbale to sign the transaction.

Each trade is a single transaction. All the tokens are added as inputs and outputs and posted if you both agree that this is a correct and valid trade.

There is no scenario where one User gets their coins without the other User also getting their coins!

The trade is atomic.

Ergo - You must keep the browser window open if you have orders in the Order Book (Makers). For Users who just with to do a quick trade (Takers), you can of course shut the window down after the trade is complete.

You can set the Chrome Settings for "Always keep these sites active" in 'Performance' to the DEX address. This way it will keep running when you are using other applications and this page is just in the background.

You can add this DEX to your Website and specify which tokens you want it to support!

All the <b>Settings</b> you can specify are in <b>dexconfig.js</b> in the main <b>public</b> folder. They are pretty self-explanatory.

The default dex server is running on ws://localhost:8081.. so you will need to change that!

You should specify your OWN Dex server - that way your dex will run much smoother and quicker than if it was linked to a congested DEX server with many other tokens.

To run the dex server yourself ( it's basically a chat server - no private keys or anything ) you need <b>node</b> installed.. 

Then - create a folder and copy server.js into it..

Then initialise a nodejs app  

```
npm init
```

Then you need to install the websocket package 

```
npm install ws
```

And then you can run the server

```
node server.js -help
```

You can set the port, trades file etc..

## Tests

Run the Node.js regression tests with:

```bash
npm test
```

ENJOY!
