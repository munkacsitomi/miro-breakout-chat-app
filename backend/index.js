const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const socketConfig = require('./config');
const io = require('socket.io')(http, socketConfig);
const mongoose = require('mongoose');
const port = process.env.PORT || 8081;
const rooms = {};
const roomsCreatedAt = new WeakMap();
const names = new WeakMap();
const mongoUrl = 'mongodb://database:27017/chat-mongo-db';

let roomId;
let name;
let userId;

app.use(cors());

app.get('/rooms/:roomId', (req, res) => {
  const { roomId } = req.params;
  const room = rooms[roomId];

  if (room) {
    res.json({
      createdAt: roomsCreatedAt.get(room),
      users: Object.values(room).map((socket) => names.get(socket)),
    });
  } else {
    res.status(500).end();
  }
});

app.get('/rooms', (req, res) => {
  res.json(Object.keys(rooms));
});

io.on('connection', (socket) => {
  socket.on('join', (_roomId, _name, _id, callback) => {
    if (!_roomId || !_name) {
      if (callback) {
        callback('roomId and name params required');
      }
      console.warn(`${socket.id} attempting to connect without roomId or name`, { roomId, name });
      return;
    }

    roomId = _roomId;
    name = _name;
    userId = _id;

    if (rooms[roomId]) {
      rooms[roomId][socket.id] = socket;
    } else {
      rooms[roomId] = { [socket.id]: socket };
      roomsCreatedAt.set(rooms[roomId], new Date());
    }
    socket.join(roomId);

    names.set(socket, name);

    io.to(roomId).emit('system message', `${name} joined ${roomId}`);

    if (callback) {
      callback(null, { success: true });
    }
  });

  socket.on('chat message', (msg) => {
    io.to(roomId).emit('chat message', msg, name, userId);
  });

  socket.on('disconnect', () => {
    io.to(roomId).emit('system message', `${name} left ${roomId}`);

    delete rooms[roomId][socket.id];

    const room = rooms[roomId];
    if (!Object.keys(room).length) {
      delete rooms[roomId];
    }
  });
});

http.listen(port, '0.0.0.0', () => {
  console.log('listening on *:' + port);
});

mongoose
  .connect(mongoUrl, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log('Successful to connect MongoDB'))
  .catch((err) => console.log('Failed to connect MongoDB', err));
