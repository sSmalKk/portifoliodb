const socketChat = (io, socket) => {
  // Evento de entrada em um chat
  socket.on("joinChat", (chatId) => {
    socket.join(chatId);
    console.log(`Cliente ${socket.id} entrou no chat: ${chatId}`);
  });

  // Evento de envio de mensagem
  socket.on("sendMessage", async ({ chatId, message }) => {
    if (!chatId || !message) return;

    const newMessage = {
      sender: socket.id, // Substitua por informações do usuário autenticado
      message,
      createdAt: new Date(),
    };

    // Emite a mensagem para os membros do chat
    io.to(chatId).emit("receiveMessage", newMessage);
    console.log(`Mensagem enviada no chat ${chatId}:`, newMessage);

    // Aqui você pode salvar a mensagem no banco de dados, se necessário
    // await dbService.create(chatModel, { chatId, ...newMessage });
  });

  // Evento de saída de um chat
  socket.on("leaveChat", (chatId) => {
    socket.leave(chatId);
    console.log(`Cliente ${socket.id} saiu do chat: ${chatId}`);
  });

  // Evento de desconexão
  socket.on("disconnect", () => {
    console.log(`Cliente desconectado: ${socket.id}`);
  });
};

module.exports = socketChat;
