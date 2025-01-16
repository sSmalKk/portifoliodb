const players = {}; // Armazena os dados dos jogadores conectados

module.exports = (io, socket) => {
  console.log('Movement module inicializado para:', socket.id);

  // Atualizar a posição do jogador
  socket.on('updatePosition', (data) => {
    const { userId, position, rotation } = data;

    if (!userId || !Array.isArray(position) || position.length !== 3) {
      console.error('Dados inválidos para updatePosition:', data);
      return;
    }

    // Atualizar a posição no cache local
    players[userId] = { position, rotation, socketId: socket.id };

    // Enviar atualizações para outros jogadores visíveis
    io.emit('playerUpdate', { userId, position, rotation });
  });

  socket.on('disconnect', () => {
    console.log('Jogador desconectado:', socket.id);

    // Remover jogador desconectado
    for (const userId in players) {
      if (players[userId].socketId === socket.id) {
        delete players[userId];
        break;
      }
    }
  });
};
