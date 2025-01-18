const Entity = require('../../model/entity'); // Modelo de entidade

module.exports = (io, socket, tickCount) => {
  const players = {}; // Dados de jogadores conectados

  socket.on('updatePosition', async ({ userId, position, rotation }) => {
    try {
      if (!userId || !Array.isArray(position) || position.length !== 3) {
        throw new Error('Dados de posição inválidos.');
      }

      // Atualiza posição no servidor e registra o tick
      players[userId] = { socketId: socket.id, position, rotation };

      // Atualiza entidade do jogador
      await Entity.findOneAndUpdate(
        { userId },
        { position, rotation },
        { upsert: true }
      );

      // Emite atualização para jogadores próximos
      const visiblePlayers = Object.entries(players)
        .filter(([id]) => id !== userId)
        .map(([id, player]) => ({
          id,
          position: player.position,
          rotation: player.rotation,
        }));

      io.to(socket.id).emit('updateVisiblePlayers', visiblePlayers);
    } catch (error) {
      console.error('Erro ao atualizar posição:', error.message);
      socket.emit('error', { message: error.message });
    }
  });

  socket.on('disconnect', () => {
    console.log('Player desconectado:', socket.id);
    for (const userId in players) {
      if (players[userId].socketId === socket.id) {
        delete players[userId];
        break;
      }
    }
  });
};
