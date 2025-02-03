const { parentPort } = require("worker_threads");
const dbService = require("../../utils/dbService");
const ServerModel = require("../../model/Server");
const SocketData = require("../../model/SocketData");

parentPort.on("message", async ({ type, serverId }) => {
  if (type === "startTick") {
    console.log(`▶️ Worker iniciado para o servidor ${serverId}`);

    setInterval(async () => {
      const server = await dbService.findOne(ServerModel, { _id: serverId });
      if (!server || !server.tickEnabled) return;

      const connectedPlayers = await dbService.count(SocketData, { serverId });
      if (connectedPlayers === 0) return;

      const { tickOfDay, currentDay, inGameDate } = await getCurrentTickAndDate(server);

      console.log(`🔄 Tick ${tickOfDay}/5000 - Dia ${currentDay} - ${server.name}`);
      await dbService.updateOne(ServerModel, { _id: serverId }, { globalTick: tickOfDay });

      parentPort.postMessage({
        type: "tickUpdate",
        serverId,
        ticks: tickOfDay,
        day: currentDay,
        inGameDate,
      });
    }, 1000); // Executa a cada 1 segundo
  }
});
