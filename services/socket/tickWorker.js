const { parentPort } = require("worker_threads");

let tickCount = 0;

parentPort.on("message", (message) => {
  if (message === "start") {
    setInterval(() => {
      try {
        tickCount++;
        parentPort.postMessage({ tick: tickCount, timestamp: Date.now() });
      } catch (error) {
        console.error("Erro no tick:", error);
      }
    }, 1000);
  }
});
