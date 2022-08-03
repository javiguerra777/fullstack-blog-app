require('dotenv').config();
const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const Comment = require('./schema/comment');
const {
  joinUser,
  getCurrentUser,
  userDisconnect,
} = require('./socket-utils/users');

const app = express();

app.use(cors());

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

// initializing Socket.io server for connections
io.on('connection', (socket) => {
  console.log(`User connected, ${socket.id}`);

  //  for a new user joining a specific post
  socket.on('join_post', ({ username, postId }) => {
    // create user
    const pUser = joinUser(socket.id, username, postId);
    console.log('user joined post', postId);
    console.log(socket.id, '=id');
    socket.join(pUser.room);
  });

  // comment function for live comments
  socket.on('send_comment', async (data) => {
    // gets the post user and the comment sent
    const pUser = getCurrentUser(socket.id);
    console.log(pUser);
    // console.log('The data object:', data);
    const commentData = new Comment({
      username: data.username,
      comment: data.comment,
      date: data.date,
      postId: data.postId,
    });

    await commentData.save();
    const comments = await Comment.find({
      postId: data.postId,
    });
    // console.log('Comments:', comments);

    io.to(pUser.room).emit('receive_comment', comments);
  });

  // when the user exits the post
  socket.on('disconnect_from_room', () => {
    // the user is deleted from the array of users
    const pUser = userDisconnect(socket.id);
    console.log('user disconnected from room', pUser);
  });
});

server.listen(port, () => {
  console.log(`Socket Server is running on http://localhost:${port}`);
});
