const ServerClock = require('../../model/ServerClock');
const PlayerClock = require('../../model/PlayerClock');
const socketData = require('../../model/socketData');
const dbService = require('../../utils/dbService');
const axios = require('axios');

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

    // Carrega mensagens antigas ao conectar
    try {
      const chatMessages = await axios.post(
        'http://localhost:5000/client/api/v1/chat_message/list',
        {
          query: {},
          options: {
            sort: { createdAt: 1 },
            limit: 50,
          },
        },
        {
          headers: {
            Authorization: `Bearer SEU_TOKEN_AQUI`, // Adicione o token se necessário
          },
        }
      );
      socket.emit('loadMessages', chatMessages.data.data);
    } catch (error) {
      console.error('Erro ao carregar mensagens antigas:', error.response?.data || error.message);
      socket.emit('error', { message: 'Falha ao carregar mensagens antigas.' });
    }

    // Recebe mensagem global e envia para todos os clientes
    socket.on('sendGlobalMessage', async ({ message }) => {
      const formattedMessage = {
        sender: 'Usuário',
        text: message,
        createdAt: new Date().toISOString(),
      };

      try {
        // Armazena a mensagem no banco via API
        await axios.post(
          'http://localhost:5000/admin/chat_message/list',
          {
            message,
            sender: 'Usuário',
            recipient: 'Global',
            createdAt: formattedMessage.createdAt,
          },
          {
            headers: {
              Authorization: `Bearer SEU_TOKEN_AQUI`, // Adicione o token se necessário
            },
          }
        );

        io.emit('receiveGlobalMessage', formattedMessage);
        console.log('Mensagem global enviada:', formattedMessage);
      } catch (error) {
        console.error('Erro ao salvar mensagem no banco:', error.response?.data || error.message);
        socket.emit('error', { message: 'Falha ao enviar mensagem global.' });
      }
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
