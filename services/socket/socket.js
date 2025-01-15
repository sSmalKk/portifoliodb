const socketChat = require("./socketChat");
const socketGame = require("./socketGame");

module.exports = function (httpServer) {
    const io = require("socket.io")(httpServer, { cors: { origin: "*" } });

    io.on("connection", (socket) => {
        console.log("Cliente conectado:", socket.id);

        // Inicializa o módulo de chat
        socketChat(io, socket);

        // Inicializa o módulo de jogo
        socketGame(io, socket);

        socket.on("disconnect", () => {
            console.log("Cliente desconectado:", socket.id);
        });
    });
};
