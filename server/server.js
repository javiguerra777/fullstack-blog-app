require('dotenv').config();
const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const port = 5500 || process.env.SOCKET_PORT;
// connection with mongoDB cloud
mongoose.connect(process.env.MONGOKEY, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  console.log(
    'Connected to database successfully on Web Sockets port',
  );
});
// creating new Socket.io server
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

// initializing Socket,io server for connections
io.on('connection', (socket) => {
  console.log(`User connected, ${socket.id}`);
  socket.on('send_comment', (data) => {
    console.log(data);
    io.sockets.emit('receive comment', data);
  });
});

server.listen(port, () => {
  console.log(`Socket Server is running on http://localhost:${port}`);
});
