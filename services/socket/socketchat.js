/**
 * socket.js
 * @description :: socket connection with server
 */

const socketData = require('../../model/socketData');
const dbService = require('../../utils/dbService');
module.exports = (io, socket) => {
  console.log("SocketChat inicializado para:", socket.id);

  socket.on("joinChat", (chatId) => {
    socket.join(chatId);
    console.log(`Cliente ${socket.id} entrou no chat: ${chatId}`);
  });

  socket.on("sendMessage", ({ chatId, message }) => {
    if (!chatId || !message) return;
    const newMessage = {
      sender: socket.id,
      message,
      createdAt: new Date(),
    };

    io.to(chatId).emit("receiveMessage", newMessage);
    console.log(`Mensagem enviada no chat ${chatId}:`, newMessage);
  });

  socket.on("leaveChat", (chatId) => {
    socket.leave(chatId);
    console.log(`Cliente ${socket.id} saiu do chat: ${chatId}`);
  });
};
