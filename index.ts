const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});

io.on('connection', (socket) => {
    // Listen for the 'newUser' event and store the username in the socket object
    socket.on('newUser', (username) => {
        socket.username = username;
        console.log(`${username} has joined the chat`);
    });

    // Listen for the 'chatMessage' event and broadcast the message to all the clients
    socket.on('chatMessage', (message) => {
        const username = socket.username;
        console.log(`${username}: ${message}`);
        socket.broadcast.emit('chatMessage', `${username}: ${message}`);
    });
});