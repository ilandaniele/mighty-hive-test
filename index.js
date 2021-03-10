const express = require('express');
const app = express();
const path = require('path');

var connectedUsers = [];

const server = require('http').createServer(app);
const WebSocket = require('ws');
const WebSocketServer = new WebSocket.Server({ server:server });

var dictionary = {};
// //init Express Router
// var router = express.Router();
// var port = process.env.PORT || 80;

// //REST route for GET /status
// router.get('/status', function(req, res) {
//     res.json({ status: 'App is running!' });
// });

// //connect path to router
// app.use("/", router);

// //add middleware for static content
// app.use(express.static('static'))
// var server = app.listen(port, function () {
//     console.log('node.js static, REST server and websockets listening on port: ' + port)
// })



//Initialize web socket server
WebSocketServer.on('connection', function connection(ws) {
    console.log("A new Client connected!"); // connected from the terminal (chrome or whatever)
    ws.send('Welcome to Mighty Hive test'); // sends a message to the connected client

    // If the client sends a message (asks for a key)
    ws.on('message', function incoming(message) {
        var pair = JSON.parse(message);
        // distinguish between two types of messages here
        if(pair.value !== ''){
          console.log('received key: %s',pair.key,'and received value:',pair.value);
          dictionary[pair.key] = pair.value;

          console.log(dictionary);
          //connectedUsers.push(pair); //send the message to others
        } //else {
          // get from BD the
        // }
        
    });

});

// app.get('/',(req,res) => res.send('Hello world!'));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});
server.listen(8080, () => console.log('Listenning on port: 8080'));