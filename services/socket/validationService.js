const dbService = require('../../utils/dbService');
const User = require('../../model/User');

/**
 * Valida a posição de um jogador com base em velocidade, tempo e posição anterior.
 * @param {Object} player Dados do jogador no banco de dados.
 * @param {Array} currentPosition Posição atual do jogador [x, y, z].
 * @param {Number} deltaTime Tempo desde a última atualização.
 * @returns {Boolean} Retorna true se a posição for válida.
 */
const validatePosition = (player, currentPosition, deltaTime) => {
  const maxSpeed = 10; // Velocidade máxima permitida (configurável)

  // Calcula a distância percorrida
  const distance = Math.sqrt(
    Math.pow(currentPosition[0] - player.x, 2) +
    Math.pow(currentPosition[1] - player.y, 2) +
    Math.pow(currentPosition[2] - player.z, 2)
  );

  // Calcula a velocidade real
  const speed = distance / deltaTime;

  return speed <= maxSpeed; // Verifica se a velocidade está dentro do limite
};

/**
 * Teleporta um jogador para uma posição específica e atualiza o banco de dados.
 * @param {String} userId ID do jogador.
 * @param {Array} position Nova posição [x, y, z].
 * @param {Object} socket Socket do jogador para notificar a mudança.
 */
const teleportPlayer = async (userId, position, socket) => {
  try {
    await dbService.updateOne(
      User,
      { _id: userId },
      { $set: { x: position[0], y: position[1], z: position[2] } }
    );

    socket.emit('teleport', { position });
    console.log(`Player ${userId} teleportado para ${position}`);
  } catch (error) {
    console.error(`Erro ao teleportar jogador ${userId}:`, error);
  }
};

module.exports = { validatePosition, teleportPlayer };
