const express = require('express');
const app = express();
const path = require('path');
const WebSocket = require('ws');
var socket = new WebSocket('ws://localhost:8080');


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

// Listen for messages
socket.addEventListener('message', function (event) {
  var value = JSON.parse(event.data).value;
  if(JSON.parse(event.data).value){
    document.getElementById("result2").innerText = "Value: "+value;
  }else{
    console.log(JSON.parse(event.data));
  }
});

// Connection opened
socket.addEventListener('open', function (event) {
  console.log('Connected to WebSocket Server');
  connected = true;
});

socket.addEventListener('close', (event) => {
  console.log('The connection has been closed.');
  connected = false;
  document.getElementById("websocket-state").innerText = 'Socket has disconnected';
  socket.close();
});

socket.addEventListener('error', function (event){
  if (event.target.readyState === 3) {
    connected = false;
    console.log('fallo');
  }
});