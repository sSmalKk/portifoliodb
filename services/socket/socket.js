const { Server } = require("socket.io");
const ServerSocketController = require("./ServerSocketController");

module.exports = function (httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  new ServerSocketController(io);

  return io;
};
