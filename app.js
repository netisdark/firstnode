const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public')); // Serves files from the public/ directory

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', ({ username, message }) => {
    const fullMessage = `${username}: ${message}`;
    io.emit('chat message', fullMessage);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
