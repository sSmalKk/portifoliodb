const { Server } = require("socket.io");

module.exports = function (httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  const clients = new Map();
  let tickRate = 0;
  let lastUpdate = Date.now();

  io.on("connection", (socket) => {
    const clientInfo = { id: socket.id, browser: "unknown" };

    socket.on("identify", (data) => {
      clientInfo.browser = data.browser || "unknown";
      clients.set(socket.id, clientInfo);
      console.log(`[CONNECTED] ${socket.id} - ${clientInfo.browser}`);
    });

    socket.on("update", (data) => {
      trackTickRate();
      console.log(`[UPDATE] ${socket.id} - ${JSON.stringify(data)}`);
    });

    socket.on("disconnect", () => {
      clients.delete(socket.id);
      console.log(`[DISCONNECTED] ${socket.id}`);
    });

    socket.emit("requestIdentification");
  });

  function trackTickRate() {
    const now = Date.now();
    if (now - lastUpdate >= 1000) {
      console.log(`[TICKRATE] Updates por segundo: ${tickRate}`);
      tickRate = 0;
      lastUpdate = now;
    }
    tickRate++;
  }

  setInterval(() => {
    console.log(`[TICK MONITOR] Atualizações no último segundo: ${tickRate}`);
  }, 1000);

  return io;
};
