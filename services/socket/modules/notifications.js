module.exports = (io, socket) => {
  console.log('Notifications module inicializado para:', socket.id);

  // Evento para enviar uma notificação
  socket.on('sendNotification', (data) => {
    const { recipientId, message } = data;

    // Enviar notificação diretamente para o socket do destinatário
    io.to(recipientId).emit('receiveNotification', { message });
  });
};
