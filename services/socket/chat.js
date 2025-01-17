const dbService = require('../utils/dbService');
const Chat = require('../../model/Chat'); // Modelo de chat

module.exports = (io, socket, tickCount) => {
  socket.on('sendMessage', async ({ chatId, message, userId }) => {
    try {
      if (!chatId || !message || !userId) {
        throw new Error('Dados inválidos.');
      }

      // Adiciona mensagem ao chat com referência ao tick atual
      const chat = await Chat.findById(chatId);
      if (!chat) throw new Error('Chat não encontrado.');

      chat.messages.push({
        userId,
        message,
        tick: tickCount,
      });
      await chat.save();

      io.to(chatId).emit('newMessage', { userId, message, tick: tickCount });
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error.message);
      socket.emit('error', { message: error.message });
    }
  });
};
