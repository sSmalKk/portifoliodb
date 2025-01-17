module.exports = (io, socket, getTick) => {
  socket.on('sendMessage', (message) => {
    const tick = getTick();
    io.emit('chatMessage', { message, tick });
    console.log(`Mensagem enviada no tick ${tick}: ${message}`);
  });
};
