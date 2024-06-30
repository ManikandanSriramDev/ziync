const socket = io();

socket.on('connect', () => {
  console.log('Connected to chat server');
});

socket.on('receive_message', (message) => {
  // Logic to display the message
  console.log('New message:', message);
});

function sendMessage(message) {
  socket.emit('send_message', message);
  console.log(`Sending message: ${message.content}`);
}

function joinRoom(room) {
  socket.emit('join_room', room);
  console.log(`Joining room: ${room}`);
}

function leaveRoom(room) {
  socket.emit('leave_room', room);
  console.log(`Leaving room: ${room}`);
}

socket.on('error', (error) => {
  console.error('Chat client error:', error.message, error.stack);
});