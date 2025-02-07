const Entity = require("../../model/entity");

class PlayerManager {
  constructor() {
    this.instances = {}; // Armazena múltiplas instâncias do jogo
  }

  async initializeInstance(instanceId) {
    if (!this.instances[instanceId]) {
      this.instances[instanceId] = { players: {} };
      console.log(`🔹 Criando instância de jogo: ${instanceId}`);
    }
  }

  async updatePosition(instanceId, { userId, position, rotation, entityId }) {
    await this.initializeInstance(instanceId);

    if (entityId) {
      this.instances[instanceId].players[userId] = { position, rotation };
      await Entity.findOneAndUpdate(
        { userId },
        { position, rotation },
        { upsert: true }
      );
    }

    return this.getVisiblePlayers(instanceId, userId, position);
  }

  getVisiblePlayers(instanceId, userId, position) {
    const players = this.instances[instanceId]?.players || {};
    return Object.entries(players)
      .filter(([otherId, otherPlayer]) => {
        if (otherId === userId) return false;
        const distance = Math.sqrt(
          Math.pow(otherPlayer.position[0] - position[0], 2) +
          Math.pow(otherPlayer.position[1] - position[1], 2) +
          Math.pow(otherPlayer.position[2] - position[2], 2)
        );
        return distance <= 100;
      })
      .map(([id, player]) => ({
        id,
        position: player.position,
        rotation: player.rotation,
      }));
  }
}

module.exports = new PlayerManager();
