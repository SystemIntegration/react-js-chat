const express = require('express');
const http = require('http');
const Server  = require("socket.io").Server
const app = express()

const server  = http.createServer(app)
const io = new Server(server , {
    cors:{
        origin:"*"
    }
})

io.on("connection" , (socket) => {
   socket.on("chat" , chat => {
      io.emit('chat' , chat)
   } )
})

server.listen(5001 , () => console.log('Listening to port 5001'))