const socketData = require('../../model/socketData');
const dbService = require('../../utils/dbService');

module.exports = function (httpServer) {
  const io = require('socket.io')(httpServer, { cors: { origin: '*' } });

  io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);

    // Receber evento de mensagem
    socket.on('event', async (data) => {
      try {
        if (data && data.message) {
          const user = await dbService.findOne(socketData, { message: data.message });
          if (user) {
            await dbService.updateOne(socketData, { message: data.message }, { socketId: socket.id });
          } else {
            const input = new socketData({
              message: data.message,
              socketId: socket.id,
            });
            await dbService.create(socketData, input);
          }
          // Enviar mensagem para todos os sockets conectados
          io.emit('message', data);
        } else {
          throw new Error('Dados de mensagem inválidos.');
        }
      } catch (error) {
        console.error('Erro ao processar mensagem:', error);
        socket.emit('error', { message: 'Erro ao processar mensagem no servidor.' });
      }
    });

    socket.on('disconnect', () => {
      console.log('Cliente desconectado:', socket.id);
    });
  });
};
