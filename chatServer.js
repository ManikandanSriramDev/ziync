const socketIo = require('socket.io');

function setupChatServer(server) {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });

    socket.on('send_message', (message) => {
      if (message.isPrivate) {
        socket.to(message.receiverId).emit('receive_message', message);
      } else {
        io.emit('receive_message', message);
      }
      console.log(`Message sent: ${message.content}`);
    });

    socket.on('join_room', (room) => {
      socket.join(room);
      console.log(`A user joined room: ${room}`);
    });

    socket.on('leave_room', (room) => {
      socket.leave(room);
      console.log(`A user left room: ${room}`);
    });
  });

  io.on('error', (error) => {
    console.error(`Chat server error: ${error.message}`);
    console.error(error.stack);
  });
}

module.exports = setupChatServer;