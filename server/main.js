/*
* Const Variables
*/
const express = require('express');
const app = express();
const WebSocket = require('ws');
const server = require('http').createServer(app);

/*
* Dictionary variable that will hold keys/values
*/
var dictionary = {};

/*
* Function that starts the websocket and add it's listeners
*/
function startWebSocket(){

  var WebSocketServer = new WebSocket.Server({ server:server });

  WebSocketServer.on('connection', function connection(websocket) {
  
    console.log("A new client has connected!"); 
    websocket.send(JSON.stringify('Welcome to Mighty Hive test')); 
  
    
    /*
    * Websocket function to receive messages
    */
    websocket.on('message', function incoming(message) {
        var pair = JSON.parse(message);
        
        if(pair.value) { // distinguish between two types of messages here
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
    
    /*
    * Websocket function when open new socket
    */
    websocket.on('open',function(){
      console.log('Socket opened');
      websocket.send('open');
    });
  
    /*
    * Websocket function when close socket
    */
    websocket.on('close', function() {
      console.log('Socket disconnected');
      websocket.send('close');
      websocket = null;
    });
    
  });

  /*
  * APP route to disconnect websocket
  */
  app.get('/disconnect', function(req,res) {
    WebSocketServer.close();
    res.send('Websocket disconnected');
  });
  
  /*
  * APP route to connect websocket
  */
  app.get('/connect', function(req,res) {
    startWebSocket();
    console.log('Socket connected');
    res.send('Socket connected');
  });

}



/*
* APP api get route
*/
app.get('/api', function(req,res){
  var key = req.query.key;
  var value = dictionary[key];
  if(value){
    res.send('Value is: '+value);
  }else{
    res.send('ERROR: key does not exist');
  }

});


app.use(express.static('public')); //part to make visible

startWebSocket();

server.listen(8080, () => console.log('Listenning on port: 8080'));