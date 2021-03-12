# Dependencies used
1. ws
2. Express
3. Nodemon
4. Path

# Installation
Download the repository and run the command 'npm i' on console

# How to run
To run the application we need to run 'npm start' command on console.
Then, we open our navigator and in the URL tab we insert: 'localhost:8080'.
Once we accesed, we can see a small GUI in which says the state of the socket, with 2 sections below it:

1. To add a pair Key, Value:
  We insert a key on the first input field, and a value on the second input field, and we press 'Add', a message will be received if operation was successfull.

2. To get a value by a key:
  We insert a key on the input field, and we press "Get value", a message will be received if operation was successfull.
  
We can disconnect the socket by using:
localhost:8080/disconnect
But reconnection is not working properly.

We can use the api to get values by kies, for example:
localhost:8080/api?key=X
where X is the key added previously.
Take into consideration that we can still ask for keys even if the web socket is disconnected.

# Additions 
Several additions things that could have been done:
Move the app routing to the client so if the server disconnects the client keeps running.
Add a file reading/writing to read/write pairs in case the server shuts down.
Fix the reconnection problem with the socket.
Add to the GUI the possibility to make GET requests to the API
