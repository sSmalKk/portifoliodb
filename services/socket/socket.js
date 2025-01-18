const socketData = require('../../model/socketData');
const dbService = require('../../utils/dbService');
const chatHandler = require('./handlers/chatHandler'); // Handler específico para o chat

module.exports = function (httpServer) {
  const io = require('socket.io')(httpServer, { cors: { origin: '*' } });

  io.on('connection', (socket) => {
    console.log(`Novo cliente conectado: ${socket.id}`);

    // Conecta o handler do chat
    chatHandler(io, socket);

    socket.on('disconnect', () => {
      console.log(`Cliente desconectado: ${socket.id}`);
    });
  });
};
