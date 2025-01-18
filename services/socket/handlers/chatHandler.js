const dbService = require('../../utils/dbService');
const socketData = require('../../model/socketData');

module.exports = (io, socket) => {
  // Evento para mensagens de chat
  socket.on('chatMessage', async (data) => {
    try {
      if (data.message) {
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

        // Emite a mensagem para todos os clientes conectados
        io.emit('newMessage', data);
      } else {
        console.error('Mensagem inválida recebida:', data);
      }
    } catch (error) {
      console.error('Erro ao processar mensagem de chat:', error);
    }
  });
};
