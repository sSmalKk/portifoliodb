require("dotenv").config(); // Carrega variáveis de ambiente
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const socketHandler = require("./socket.js");
const settings = require("./config/settings");

const app = express();
const server = http.createServer(app);

// Configuração do banco de dados
mongoose
  .connect(settings.dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Banco de dados conectado"))
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err);
    process.exit(1); // Encerra o processo se não conseguir conectar
  });

// Middleware básico (se necessário)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas padrão (se necessário, ex. API de controle ou status)
app.get("/", (req, res) => {
  res.send("Servidor ativo e rodando");
});

// Inicialização do servidor Socket
socketHandler(server);

// Inicialização do servidor HTTP
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
