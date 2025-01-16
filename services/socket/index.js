const socketIo = require('socket.io');
const chatModule = require('./modules/chat');
const movementModule = require('./modules/movement');
const notificationsModule = require('./modules/notifications');

module.exports = function (httpServer) {
  const io = socketIo(httpServer, { cors: { origin: '*' } });

  io.on('connection', (socket) => {
    console.log('Novo cliente conectado:', socket.id);

    // Registrar módulos
    chatModule(io, socket);
    movementModule(io, socket);
    notificationsModule(io, socket);

    socket.on('disconnect', () => {
      console.log('Cliente desconectado:', socket.id);
    });
  });
};
