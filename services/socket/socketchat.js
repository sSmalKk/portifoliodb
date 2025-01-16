/**
 * socket.js
 * @description :: socket connection with server
 */

const socketData = require('../../model/socketData');
const dbService = require('../../utils/dbService');
module.exports = function (httpServer) {
  const io = require("socket.io")(httpServer, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log(`Novo cliente conectado: ${socket.id}`);

    // Evento associado ao socket conectado
    socket.on("event", async (data) => {
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

    socket.on("disconnect", () => {
      console.log(`Cliente desconectado: ${socket.id}`);
    });
  });
};
