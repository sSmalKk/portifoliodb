const Server = require("../../model/Server");

class ServerSocketController {
  constructor(io) {
    this.io = io;
    this.setupListeners();
  }

  setupListeners() {
    this.io.on("connection", (socket) => {
      console.log(`[SOCKET] Cliente conectado: ${socket.id}`);

      socket.on("identify", async (data) => {
        const { userId, nickname, serverId } = data;
        if (!userId || !serverId) return;

        const server = await Server.findById(serverId);
        if (!server) return;

        // Se whitelist estiver ativada, verifica se o usuário está permitido
        if (server.whitelistEnabled) {
          const isWhitelisted = server.whitelist.some((user) => user.userId.equals(userId));
          if (!isWhitelisted) {
            socket.emit("error", { message: "Acesso negado! Não está na whitelist." });
            return socket.disconnect();
          }
        }

        // Verifica se o usuário está banido
        const isBanned = server.bannedUsers.some((user) => user.userId.equals(userId));
        if (isBanned) {
          socket.emit("error", { message: "Você está banido deste servidor." });
          return socket.disconnect();
        }

        // Adiciona usuário à lista de conectados
        server.conectedUsers.push({ userId, nickname });
        await server.save();

        this.io.emit("updateUsers", server.conectedUsers);
      });

      socket.on("disconnect", async () => {
        const server = await Server.findOne({ "conectedUsers.userId": socket.userId });
        if (server) {
          server.conectedUsers = server.conectedUsers.filter((user) => !user.userId.equals(socket.userId));
          await server.save();
          this.io.emit("updateUsers", server.conectedUsers);
        }
      });

      socket.on("executeCommand", async (data) => {
        const { userId, command, serverId, params } = data;
        if (!userId || !serverId || !command) return;

        const server = await Server.findById(serverId);
        if (!server) return;

        // Verifica se o usuário é operador
        const isOperator = server.operators.some((op) => op.userId.equals(userId));
        if (!isOperator) {
          socket.emit("error", { message: "Você não tem permissão para executar este comando." });
          return;
        }

        switch (command) {
          case "updateTickRate":
            if (params?.tickRate) {
              server.tickRate = params.tickRate;
              await server.save();
              this.io.emit("serverUpdate", { tickRate: server.tickRate });
            }
            break;

          case "banUser":
            if (params?.userId && params?.nickname) {
              server.bannedUsers.push({
                userId: params.userId,
                nickname: params.nickname,
                banReason: params.reason || "Violação das regras",
              });
              server.conectedUsers = server.conectedUsers.filter((user) => !user.userId.equals(params.userId));
              await server.save();
              this.io.emit("updateBannedUsers", server.bannedUsers);
            }
            break;

          case "unbanUser":
            if (params?.userId) {
              server.bannedUsers = server.bannedUsers.filter((user) => !user.userId.equals(params.userId));
              await server.save();
              this.io.emit("updateBannedUsers", server.bannedUsers);
            }
            break;

          case "toggleWhitelist":
            server.whitelistEnabled = !server.whitelistEnabled;
            await server.save();
            this.io.emit("serverUpdate", { whitelistEnabled: server.whitelistEnabled });
            break;

          default:
            socket.emit("error", { message: "Comando inválido." });
        }
      });
    });
  }
}

module.exports = ServerSocketController;
