const WebSocket = require('ws');
const server = require('http').createServer(app);

var dictionary = {};

//Initialize web socket server
var WebSocketServer = new WebSocket.Server({ server:server });


WebSocketServer.on('connection', function connection(ws) {
  
  console.log("A new client has connected!"); // connected from the terminal (chrome or whatever)
  ws.send(JSON.stringify('Welcome to Mighty Hive test')); // sends a message to the connected client

  // If the client sends a message (asks for a key)
  ws.on('message', function incoming(message) {
      var pair = JSON.parse(message);
      // distinguish between two types of messages here
      if(pair.value) {
        dictionary[pair.key] = pair.value;
      } else {
        var value = dictionary[pair.key];
        if(value){
          ws.send(JSON.stringify({value:value}));
        }else{
          ws.send(JSON.stringify({value:'ERROR: Key not found'}));
        }
      }
  });

  ws.on('close', function(reasonCode, description) {
    console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
  });
  
});

server.listen(8080, () => console.log('Listenning on port: 8080'));