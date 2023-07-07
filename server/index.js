const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const {Server} = require("socket.io")
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin: "http://localhost:3000",
        method: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID = ${socket.id} joined room: ${data}`)
    })

    socket.on("send_message", (data) => {
        // console.log(data)
        socket.to(data.room).emit("receive_message", data); //.to() is used to emit the message to a specific room. Like all the users connected in a room will receive the message.
    })


    socket.on("disconnect", () =>{
        console.log("User disconnected:", socket.id);
    });
});     
  //connection event is a built-in event in Socket.IO that is triggered when a client establishes a connection with the server. You can listen for this event using io.on('connection', callback). The callback function will be executed whenever a new client connects to the server, and it typically takes a single parameter representing the socket object associated with the client.


server.listen(3001, () => {
    console.log('listening on port 3001');
})