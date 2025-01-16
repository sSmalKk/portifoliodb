const { validatePosition, teleportPlayer } = require("./validationService");
const settings = require("../../config/settings");
const User = require("../../model/User");
const dbService = require("../../utils/dbService");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
module.exports = (io, socket) => {
  if (!socket || !socket.id) {
    console.error('Socket não inicializado corretamente');
    return;
  }

  const players = {}; // Armazena dados dos jogadores conectados
  console.log("SocketGame inicializado para:", socket.id);

  const calculateDistance = (pos1, pos2) => {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) +
      Math.pow(pos1[1] - pos2[1], 2) +
      Math.pow(pos1[2] - pos2[2], 2)
    );
  };

  const updateVisiblePlayers = (userId, position, rotation) => {
    const visiblePlayers = [];
    for (const [otherUserId, otherPlayer] of Object.entries(players)) {
      if (otherUserId === userId) continue;

      const distance = calculateDistance(otherPlayer.position, position);
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
  };

  socket.on("updatePosition", ({ userId, position, rotation }) => {
    if (!userId || !ObjectId.isValid(userId)) {
      console.error("ID de usuário inválido:", userId);
      return;
    }

    if (!Array.isArray(position) || position.length !== 3) {
      console.error("Posição inválida:", position);
      return;
    }

    players[userId] = { socketId: socket.id, position, rotation };
    updateVisiblePlayers(userId, position, rotation);
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
