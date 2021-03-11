const express = require('express');
const app = express();
const path = require('path');

const server = require('http').createServer(app);
const WebSocket = require('ws');
const WebSocketServer = new WebSocket.Server({ server:server });

var dictionary = {};


//Initialize web socket server
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
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

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
  res.send('Websocket connected');
});

server.listen(8080, () => console.log('Listenning on port: 8080'));