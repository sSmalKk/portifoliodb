const { validatePosition, teleportPlayer } = require("./validationService");
const settings = require("./config/settings");
const User = require("./model/User");
const dbService = require("./utils/dbService");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

module.exports = function (httpServer) {
  const io = require("socket.io")(httpServer, { cors: { origin: "*" } });

  const players = {}; // Armazena a posição e socketId dos jogadores

  io.on("connection", (socket) => {
    console.log("Player connected:", socket.id);
  
    socket.on("updatePosition", ({ position, rotation }) => {
      if (!position || !rotation) {
        console.error("Position or rotation is invalid");
        return;
      }
  
      // Atualiza a posição do jogador no servidor
      const userId = socket.id; // Use o socket ID como identificador único
      players[userId] = { socketId: socket.id, position, rotation };
  
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
      delete players[socket.id];
    });
  });
  };
