const socketIo = require('socket.io');
const Tick = require('../model/Tick'); // Modelo de tick
const chatModule = require('./chat');
const gameModule = require('./game');

let tickCount = 0;

module.exports = function (httpServer) {
  const io = socketIo(httpServer, { cors: { origin: '*' } });

  io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);

    // Atualiza o tick sempre que um cliente se conecta
    tickCount++;

    // Registra evento no log de ticks
    Tick.findOneAndUpdate(
      {},
      { $inc: { tickCount: 1 } },
      { new: true, upsert: true }
    ).then((tickLog) => {
      tickLog.addEvent({
        tick: tickLog.tickCount,
        type: 'connect',
        data: { socketId: socket.id },
      });
    });

    // Inicializa módulos específicos
    chatModule(io, socket, tickCount);
    gameModule(io, socket, tickCount);

    socket.on('disconnect', () => {
      console.log('Cliente desconectado:', socket.id);

      // Registra evento de desconexão no log de ticks
      Tick.findOneAndUpdate(
        {},
        { $inc: { tickCount: 1 } },
        { new: true, upsert: true }
      ).then((tickLog) => {
        tickLog.addEvent({
          tick: tickLog.tickCount,
          type: 'disconnect',
          data: { socketId: socket.id },
        });
      });
    });
  });
};
