class PlayerClock {
    constructor(serverTick, ticksPerSecond = 3) {
      this.serverTick = serverTick; // Sincroniza com o tick global ao conectar
      this.localTick = 0; // Tick local do jogador
      this.ticksPerSecond = ticksPerSecond;
      this.isActive = false; // Define se o relógio está contando
    }
  
    // Inicia o relógio do jogador
    start() {
      if (!this.isActive) {
        this.isActive = true;
        this.interval = setInterval(() => {
          this.localTick++;
        }, 1000 / this.ticksPerSecond);
      }
    }
  
    // Para o relógio do jogador
    stop() {
      if (this.isActive) {
        clearInterval(this.interval);
        this.isActive = false;
      }
    }
  
    // Obtém o tick total sincronizado (global + local)
    getTotalTick() {
      return this.serverTick + this.localTick;
    }
  }
  
  module.exports = PlayerClock;
  