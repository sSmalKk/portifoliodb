const ServerClock = require('../../model/ServerClock');
const PlayerClock = require('../../model/PlayerClock');
const ChatMessage = require('../../model/ChatMessage');
const dbService = require('../../utils/dbService');

// Inicialização do relógio global
const serverClock = new ServerClock('2025-01-18T00:00:00Z');

// Gerenciamento de conexões de jogadores
const players = {};
let debugInterval = null;

module.exports = function (httpServer) {
  const io = require('socket.io')(httpServer, {
    cors: { origin: '*' },
  });

  io.on('connection', async (socket) => {
    console.log('Novo cliente conectado.');

    const currentTick = serverClock.getCurrentTick();
    const playerClock = new PlayerClock(currentTick);

    players[socket.id] = playerClock;

    // Sincroniza o tick e a data do mundo com o cliente
    socket.emit('sync', {
      serverTick: currentTick,
      playerTick: playerClock.getTotalTick(),
      worldDate: serverClock.getWorldDate().format(),
    });

    // Inicia o relógio do jogador
    playerClock.start();

    // Carrega mensagens antigas diretamente do banco ao conectar
    const chatMessages = await dbService.findMany(ChatMessage, {}, {
      sort: { createdAt: 1 }, // Ordena por data de criação (mais antigas primeiro)
      limit: 50,             // Limite de mensagens a retornar
    });

    socket.emit('loadMessages', chatMessages);

    // Recebe mensagem global e envia para todos os clientes
    socket.on('sendGlobalMessage', async ({ message }) => {
      const formattedMessage = {
        sender: 'Usuário',
        text: message,
        createdAt: new Date().toISOString(),
      };

      // Armazena a mensagem diretamente no banco
      await dbService.create(ChatMessage, {
        message: formattedMessage.text,
        sender: formattedMessage.sender,
        recipient: 'Global',
        createdAt: formattedMessage.createdAt,
      });

      io.emit('receiveGlobalMessage', formattedMessage);
      console.log('Mensagem global enviada:', formattedMessage);
    });

    // Desconexão do jogador
    socket.on('disconnect', () => {
      console.log('Cliente desconectado.');
      playerClock.stop();
      delete players[socket.id];

      // Para o debug quando não há mais jogadores conectados
      if (Object.keys(players).length === 0 && debugInterval) {
        clearInterval(debugInterval);
        debugInterval = null;
      }
    });
  });

  // Inicia o debug quando o primeiro jogador conecta
  if (!debugInterval) {
    debugInterval = setInterval(() => {
      const globalTick = serverClock.getCurrentTick();
      const playerData = Object.entries(players).map(([id, player]) => ({
        socketId: id,
        playerTick: player.getTotalTick(),
      }));

      console.log('--- Debug Sync ---');
      console.log(`Global Tick: ${globalTick}`);
      console.log('Player Ticks:', playerData);
      console.log('World Date:', serverClock.getWorldDate().format());
      console.log('------------------');
    }, 1000); // Executa a cada 1 segundo (ajustável)
  }
};
