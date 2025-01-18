const socketIo = require('socket.io');
const Tick = require('../../model/Tick'); // Modelo de tick
const chatModule = require('./chat'); // Exemplo de módulo adicional
require('dotenv').config();

const TICK_RATE = parseInt(process.env.TICK_RATE) || 1; // Ticks por segundo
const TICK_COMPACT_RATE = parseInt(process.env.TICK_COMPACT_RATE) || 100; // Ticks para compactar

module.exports = function (httpServer) {
  const io = socketIo(httpServer, { cors: { origin: '*' } });

  let tickInterval;
  let connectedUsers = {}; // Rastreia usuários conectados
  let tickCount = 0;

  io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);
    connectedUsers[socket.id] = socket;

    // Atualiza tick quando um usuário se conecta
    if (!tickInterval) {
      startTickSystem(io);
    }

    socket.on('disconnect', () => {
      console.log('Cliente desconectado:', socket.id);
      delete connectedUsers[socket.id];

      if (Object.keys(connectedUsers).length === 0) {
        stopTickSystem();
      }
    });

    // Inicializa módulos adicionais
    chatModule(io, socket, () => tickCount);
  });

  function startTickSystem(io) {
    console.log('Iniciando sistema de ticks...');
    tickInterval = setInterval(async () => {
      tickCount++;
      const tickLog = await Tick.findOneAndUpdate(
        {},
        { $inc: { tickCount: 1 } },
        { new: true, upsert: true }
      );

      // Compacta ticks após atingir o limite configurado
      if (tickCount % TICK_COMPACT_RATE === 0) {
        const users = Object.keys(connectedUsers);
        tickLog.addActivityLog(tickCount - TICK_COMPACT_RATE + 1, tickCount, users);
        console.log(`Compactação de ticks concluída: ${tickCount}`);
      }

      // Notifica todos os sockets conectados
      io.emit('tickUpdate', tickCount);
    }, 1000 / TICK_RATE);
  }

  function stopTickSystem() {
    console.log('Parando sistema de ticks...');
    clearInterval(tickInterval);
    tickInterval = null;
  }
};
