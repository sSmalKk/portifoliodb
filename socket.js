const User = require("./model/User");

module.exports = function (httpServer) {
  const io = require("socket.io")(httpServer, { cors: { origin: "*" } });

  const players = {}; // Armazena a posição e socketId dos jogadores

  io.on("connection", async (socket) => {
    console.log("Player connected:", socket.id);

    // Cria ou registra o jogador no banco de dados
    const username = `Player_${socket.id.slice(0, 6)}`; // Nome genérico
    let user = await User.findOneAndUpdate(
      { username },
      { lastConnected: Date.now(), isActive: true },
      { upsert: true, new: true }
    );

    players[user._id] = { socketId: socket.id, position: user.position, rotation: user.rotation };

    socket.on("updatePosition", async ({ position, rotation }) => {
      if (!position || !rotation) {
        console.error("Position or rotation is invalid");
        return;
      }

      const userId = socket.id; // Identificador único do socket
      players[userId] = { socketId: socket.id, position, rotation };

      // Atualiza a posição do jogador no banco
      await User.findOneAndUpdate(
        { _id: user._id },
        { position, rotation, lastConnected: Date.now() }
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

    socket.on("disconnect", async () => {
      console.log("Player disconnected:", socket.id);
      await User.findOneAndUpdate(
        { _id: user._id },
        { isActive: false, lastConnected: Date.now() }
      );
      delete players[user._id];
    });
  });
};
