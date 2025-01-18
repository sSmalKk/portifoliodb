const ServerClock = require('../../model/ServerClock');
const PlayerClock = require('../../model/PlayerClock');
const socketData = require('../../model/socketData');
const dbService = require('../../utils/dbService');

// Inicialização do relógio global
const serverClock = new ServerClock('2025-01-18T00:00:00Z');

// Gerenciamento de conexões de jogadores
const players = {};

module.exports = function (httpServer) {
  const io = require('socket.io')(httpServer, { cors: { origin: '*' } });

  io.on('connection', (socket) => {
    // Envia o tick global atual ao conectar
    const currentTick = serverClock.getCurrentTick();
    const playerClock = new PlayerClock(currentTick);

    players[socket.id] = playerClock;

    socket.emit('sync', {
      serverTick: currentTick,
      worldDate: serverClock.getWorldDate().format(),
    });

    // Inicia o relógio do jogador
    playerClock.start();

    // Evento personalizado: Recebe dados e atualiza o banco
    socket.on('event', async (data) => {
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
      } else {
        const input = new socketData({ socketId: socket.id });
        await dbService.create(socketData, input);
      }
    });

    // Desconexão do jogador
    socket.on('disconnect', () => {
      playerClock.stop();
      delete players[socket.id];
    });
  });
};
