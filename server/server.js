require('dotenv').config();
const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const Comment = require('./schema/comment');
const Post = require('./schema/post');
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
  socket.on('join_post', async ({ username, postId }) => {
    // create user
    const pUser = await joinUser(socket.id, username, postId);
    console.log('user joined post', postId);
    console.log(socket.id, '=id');
    socket.join(pUser.room);
  });

  // comment function for live comments
  socket.on('send_comment', async (data) => {
    try {
      // gets the post user and the comment sent
      const pUser = await getCurrentUser(socket.id);
      const activePost = await Post.findById(pUser.room);
      console.log('post: ', activePost);
      // eslint-disable-next-line valid-typeof
      if (activePost === null) {
        const errorData = {
          error: '404 not found',
          message: 'post has been deleted, comment will not be sent',
        };
        console.log('Post has been deleted');
        socket.emit('not_found', errorData);
      } else {
        console.log('pUser:', pUser);
        // console.log('The data object:', data);
        const commentData = new Comment({
          username: data.username,
          comment: data.comment,
          date: data.date,
          postId: data.postId,
          profilepicture: data.profilepicture,
        });

        // saves comment to the database
        await commentData.save();
        // updates and pushes comment to comments array in post table
        await Post.findByIdAndUpdate(pUser.room, {
          $push: { comments: data.comment },
        });

        const comments = await Comment.find({
          postId: data.postId,
        });
        // console.log('Comments:', comments);

        io.to(pUser.room).emit('receive_comment', comments);
      }
    } catch (err) {
      console.log(err.message);
    }
  });

  // when the user exits the post
  socket.on('unsubscribe', async (room) => {
    // the user is deleted from the array of users
    socket.leave(room);
    const pUser = await userDisconnect(socket.id);
    console.log('user', pUser, `disconnected from room ${room}`);
  });
  // when the user disconnects from the server
  socket.on('disconnect', async (room) => {
    // the user is deleted from the array of users
    socket.leave(room);
    const pUser = await userDisconnect(socket.id);
    console.log('user', pUser, `disconnected from the server`);
  });
});

server.listen(port, () => {
  console.log(`Socket Server is running on http://localhost:${port}`);
});
