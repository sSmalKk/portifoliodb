require('dotenv').config(); // Carrega as variáveis do arquivo .env

const settings = {
  validationInterval: parseInt(process.env.VALIDATION_INTERVAL, 10) || 5000, // Intervalo de validação em milissegundos
  socketPort: parseInt(process.env.SOCKET_PORT, 10) || 3000, // Porta do servidor de socket
  dbUri: process.env.DB_URI || 'mongodb://localhost:27017/mydatabase', // URI do banco de dados
  serverEnvironment: process.env.SERVER_ENV || 'development', // Ambiente do servidor
};

module.exports = settings;
