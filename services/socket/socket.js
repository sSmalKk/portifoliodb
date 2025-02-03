const { Server } = require("socket.io");
const dbService = require("../../utils/dbService");
const ServerModel = require("../../model/Server");
const SocketData = require("../../model/SocketData");

let started = false; // 🔹 Variável para controlar se o servidor pode iniciar

async function tickUpdate(io, serverId) {
  if (!started) {
    console.log(`⏸ Tick cancelado: servidor ainda não iniciou.`);
    return;
  }

  const server = await dbService.findOne(ServerModel, { _id: serverId });
  if (!server || !server.tickEnabled) {
    console.log(`⏸ Tick desativado no servidor ${serverId}.`);
    return;
  }

  const connectedPlayers = await dbService.count(SocketData, { serverId });
  if (connectedPlayers === 0) {
    console.log(`⏸ Nenhum jogador online no servidor ${serverId}, tick pausado.`);
    return;
  }

  const { tickOfDay, currentDay, inGameDate } = await getCurrentTickAndDate(server);

  console.log(`🔄 Tick ${tickOfDay}/5000 - Dia ${currentDay} - Data: ${inGameDate.toISOString()} - Servidor: ${server.name}`);

  await dbService.updateOne(ServerModel, { _id: serverId }, { globalTick: tickOfDay });

  io.of("/game").emit("tick:update", { serverId, ticks: tickOfDay, day: currentDay, inGameDate });

  await preUpdate(io, server, tickOfDay, currentDay, inGameDate);
  await postUpdate(io, server, tickOfDay, currentDay, inGameDate);
}

module.exports = function (httpServer) {
  const io = new Server(httpServer, { cors: { origin: "*" } });

  io.on("connection", async (socket) => {
    if (!started) {
      console.log(`⚠️ Conexão recusada: servidor ainda não iniciou.`);
      socket.emit("server:waiting", { message: "Servidor ainda está iniciando." });
      socket.disconnect();
      return;
    }

    console.log(`🎮 Jogador conectado: ${socket.id}`);

    const { serverId } = socket.handshake.query;
    if (!serverId) {
      console.error("⚠️ Erro: Conexão sem serverId.");
      socket.disconnect();
      return;
    }

    await dbService.create(SocketData, { socketId: socket.id, serverId });

    const connectedPlayers = await dbService.count(SocketData, { serverId });
    if (connectedPlayers === 1) {
      console.log(`▶️ Iniciando ticks para o servidor ${serverId}`);
      await tickUpdate(io, serverId);
    }

    socket.on("disconnect", async () => {
      console.log(`❌ Jogador desconectado: ${socket.id}`);
      await dbService.deleteOne(SocketData, { socketId: socket.id });

      const remainingPlayers = await dbService.count(SocketData, { serverId });
      if (remainingPlayers === 0) {
        console.log(`⏸ Nenhum jogador online. Tick pausado no servidor ${serverId}.`);
      }
    });
  });

  startServer(io);
};

async function startServer(io) {
  console.log("🔄 Iniciando servidor...");

  io.emit("server:init", { message: "Inicializando..." });
  await delay(2000);

  io.emit("server:preinit", { message: "Pré-inicialização..." });
  await delay(2000);

  io.emit("server:postinit", { message: "Pós-inicialização..." });
  await delay(2000);

  started = true;
  console.log("✅ Servidor iniciado com sucesso!");

  io.emit("server:ready", { message: "Servidor pronto para conexões!" });
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
