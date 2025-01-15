const { validatePosition, teleportPlayer } = require("./validationService");
const settings = require("../../config/settings");
const User = require("../../model/User");
const dbService = require("../../utils/dbService");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;


module.exports = (io, socket) => {
  const players = {}; // Armazena dados dos jogadores conectados

  console.log("SocketGame inicializado para:", socket);

  socket.on("updatePosition", ({ userId, position, rotation }) => {
    if (!userId || !ObjectId.isValid(userId)) {
      console.error("ID de usuário inválido:", userId);
      return;
    }

    // Atualiza a posição do jogador no servidor
    players[userId] = { socketId: socket.id, position, rotation };

    const visiblePlayers = [];
    for (const [otherUserId, otherPlayer] of Object.entries(players)) {
      if (otherUserId === userId) continue;

      const distance = Math.sqrt(
        Math.pow(otherPlayer.position[0] - position[0], 2) +
        Math.pow(otherPlayer.position[1] - position[1], 2) +
        Math.pow(otherPlayer.position[2] - position[2], 2)
      );

      if (distance <= 100) { // Distância de renderização
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
};
