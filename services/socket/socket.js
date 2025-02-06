const Entity = require("../../model/entity");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

module.exports = function (httpServer) {
  const io = require("socket.io")(httpServer, { cors: { origin: "*" } });

  const players = {}; // Armazena a posição dos jogadores em tempo real

  io.on("connection", (socket) => {
    console.log("Player connected:", socket.id);

    socket.on("updatePosition", async ({ userId, position, rotation }) => {
      if (!userId || !ObjectId.isValid(userId)) {
        console.error("ID de usuário inválido:", userId);
        return;
      }

      players[userId] = { socketId: socket.id, position, rotation };

      // Atualiza o banco de dados com a nova posição e rotação
      await Entity.findOneAndUpdate(
        { userId: new ObjectId(userId) },
        { position, rotation },
        { upsert: true }
      );

      const visiblePlayers = [];
      for (const [otherUserId, otherPlayer] of Object.entries(players)) {
        if (otherUserId === userId) continue;

        const distance = Math.sqrt(
          Math.pow(otherPlayer.position[0] - position[0], 2) +
            Math.pow(otherPlayer.position[1] - position[1], 2) +
            Math.pow(otherPlayer.position[2] - position[2], 2)
        );

        if (distance <= 100) {
          visiblePlayers.push({
            id: otherUserId,
            position: otherPlayer.position,
            rotation: otherPlayer.rotation,
          });

          const otherSocketId = otherPlayer.socketId;
          if (otherSocketId) {
            io.to(otherSocketId).emit("updateVisiblePlayers", [
              ...(players[userId]
                ? [{ id: userId, position, rotation }]
                : []),
            ]);
          }
        }
      }

      io.to(socket.id).emit("updateVisiblePlayers", visiblePlayers);
    });

    socket.on("disconnect", () => {
      console.log("Player disconnected:", socket.id);
      for (const userId in players) {
        if (players[userId].socketId === socket.id) {
          delete players[userId];
          break;
        }
      }
    });
  });
};
