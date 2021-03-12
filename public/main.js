
var socket = new WebSocket('ws://localhost:8080');
var connected = true;

// var reconnectInterval = 60000;

// var connect = function(){
//   socket = new WebSocket('ws://localhost:8080');
//   socket.on('open', function() {
//       console.log('socket open');
//   });
//   socket.on('error', function() {
//       console.log('socket error');
//   });
//   socket.on('close', function() {
//       console.log('socket close');
//       setTimeout(connect, reconnectInterval);
//   });
// };
// connect();

// Listen for messages
socket.addEventListener('message',function incoming(event) {
  var pair = JSON.parse(event.data);
  if(pair.value && pair.key){
    var result = "Key: '"+k+"' and value: '"+v+"' successfully added";
    var html = `<div>${result}</div>`;
    document.getElementById('message-returned').innerHTML = html;
  }else{
    if(pair.value){
      var html = `<div>${'Value: '+pair.value}</div>`;
      document.getElementById('value-obtained').innerHTML = html;
    }else{
      console.log(JSON.parse(event.data));
    }
    
  }
});

// Connection opened
socket.addEventListener('open', function (event) {
  if(!socket){
    socket = new WebSocket('ws://localhost:8080');
  }
  console.log('Connected to WebSocket Server');
  connected = true;
  var html = `<div style="color: green">${'SOCKET CONNECTED'}</div>`;
  document.getElementById('socket-state').innerHTML = html;
});

// Socket connection closed
socket.addEventListener('close', (event) => {
  console.log('The connection has been closed.');
  connected = false;
  var html = `<div style="color: red">${'SOCKET DISCONNECTED'}</div>`;
  document.getElementById('socket-state').innerHTML = html;
  socket.close();

});

// Socket error
socket.addEventListener('error', function (event){
  if (event.target.readyState === 3) {
    connected = false;

  }
});

function askValue(e){

  var payload = {
    key: document.getElementById('key_to_obtain').value
  }
  socket.send(JSON.stringify(payload));
 
  return false;
}

function addPair(e){
  k = document.getElementById('key_to_add').value;
  v = document.getElementById('value_to_add').value;
  var payload = {
    key: k,
    value: v
  }
  socket.send(JSON.stringify(payload));
  return false;
}







