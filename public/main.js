
var socket = new WebSocket('ws://localhost:8080');

/*
 * Socket messages listener
 */ 
const socketMessageListener = (event) => {
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
}

/*
 * Socket connection opened listener
 */
const socketOpenListener = (event) =>{
  if(!socket){
    socket = new WebSocket('ws://localhost:8080');
  }
  console.log('Connected to WebSocket Server');

  var html = `<div style="color: green">${'SOCKET CONNECTED'}</div>`;
  document.getElementById('socket-state').innerHTML = html;
};

/*
 * Socket connection closed listener
 */
const socketCloseListener = (event) => {
  console.log('The connection has been closed.');

  var html = `<div style="color: red">${'SOCKET DISCONNECTED'}</div>`;
  document.getElementById('socket-state').innerHTML = html;
  socket.close();

  socket = new WebSocket('ws://localhost:8080');
  socket.addEventListener('open', socketOpenListener);
  socket.addEventListener('message', socketMessageListener);
  socket.addEventListener('close', socketCloseListener);
}

/*
 * Socket error listener
 */
const socketErrorListener = (event) => {
  console.log('Socket not opened');
  if (event.target.readyState === 3) {
    console.log('Socket not opened');
  }
}

socket.addEventListener('open', socketOpenListener);
socket.addEventListener('message', socketMessageListener);
socket.addEventListener('error', socketErrorListener);
socket.addEventListener('close', socketCloseListener);

/*
 * Ask websocket for a value
 */
function askValue(e){

  var payload = {
    key: document.getElementById('key_to_obtain').value
  }
  socket.send(JSON.stringify(payload));
 
  return false;
}

/*
 * Add a pair and pass it to the websocket
 */
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







