const { Server } = require("socket.io");
const ChatManager = require("./chatManager");
const PlayerManager = require("./playerManager");

module.exports = function (httpServer) {
  const io = new Server(httpServer, { cors: { origin: "*" } });

  io.on("connection", async (socket) => {
    console.log("🔗 Novo jogador conectado:", socket.id);

    socket.on("joinInstance", async ({ userId, instanceId }) => {
      if (!userId) {
        console.error("❌ Conexão inválida: userId ausente");
        return;
      }

      console.log(`🔹 ${userId} ingressando na instância ${instanceId}`);
      await ChatManager.joinChat(userId, instanceId);
      await PlayerManager.initializeInstance(instanceId);

      socket.join(instanceId);
      io.to(socket.id).emit("instanceJoined", { instanceId });
    });

    socket.on("updatePosition", async ({ userId, position, rotation, entityId, instanceId }) => {
      if (!userId || !instanceId) return;
      const visiblePlayers = await PlayerManager.updatePosition(instanceId, { userId, position, rotation, entityId });
      io.to(socket.id).emit("updateVisiblePlayers", visiblePlayers);
    });

    socket.on("chatMessage", async ({ userId, instanceId, message }) => {
      if (!userId || !message || !instanceId) return;
      io.to(instanceId).emit("chatMessage", { userId, message });
    });

    socket.on("disconnect", () => {
      console.log("🔌 Jogador desconectado:", socket.id);
    });
  });
};
