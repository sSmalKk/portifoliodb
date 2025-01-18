module.exports = (io, socket) => {
  console.log('Chat module inicializado para:', socket.id);

  // Evento de receber mensagem de chat
  socket.on('chatMessage', (data) => {
    console.log(`Mensagem recebida do chat ${data.chatId}: ${data.message}`);

    // Reenviar a mensagem para os clientes conectados no mesmo chat
    io.emit('chatMessage', {
      chatId: data.chatId,
      sender: socket.id,
      message: data.message,
      timestamp: new Date(),
    });
  });
};
