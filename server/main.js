var express = require('express');
var app = express();
const WebSocket = require('ws');
var server = require('http').createServer(app);
var WebSocketServer = new WebSocket.Server({ server:server });

var dictionary = {};

app.use(express.static('public')); //part to make visible

app.get('/api', function(req,res){
  var key = req.query.key;
  var value = dictionary[key];
  if(value){
    res.send('Value is: '+value);
  }else{
    res.send('ERROR: key does not exist');
  }

});

app.get('/disconnect', function(req,res) {
  WebSocketServer.close();
  res.send('Websocket disconnected');
});

app.get('/connect', function(req,res) {
  WebSocketServer = new WebSocket.Server({ server:server });
  
  console.log('Socket connected');
  res.send('Socket connected');
});

WebSocketServer.on('open',function(){
  console.log('Socket opened');
});

WebSocketServer.on('connection', function connection(websocket) {
  
  console.log("A new client has connected!"); // connected from the terminal (chrome or whatever)
  websocket.send(JSON.stringify('Welcome to Mighty Hive test')); // sends a message to the connected client

  // If the client sends a message (asks for a key)
  websocket.on('message', function incoming(message) {
      var pair = JSON.parse(message);
      // distinguish between two types of messages here
      if(pair.value) {
        dictionary[pair.key] = pair.value;
        payload = {
          key: pair.key,
          value: pair.value
        }
        websocket.send(JSON.stringify(payload));
      } else {
        var value = dictionary[pair.key];
        if(value){
          websocket.send(JSON.stringify({value:value}));
        }else{
          websocket.send(JSON.stringify({value:'ERROR: Key not found'}));
        }
      }
  });

  websocket.on('open',function(){
    console.log('Socket opened');
    websocket.send('open');
  });

  websocket.on('close', function() {
    console.log('Socket disconnected');
    websocket.send('close');
  });
  
});

server.listen(8080, () => console.log('Listenning on port: 8080'));