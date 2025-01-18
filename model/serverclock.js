const moment = require('moment');

class ServerClock {
  constructor(startDate, ticksPerSecond = 3, ticksPerMinute = 3) {
    this.startTime = Date.now(); // Timestamp do início do servidor
    this.startDate = moment(startDate); // Data inicial do mundo
    this.ticksPerSecond = ticksPerSecond;
    this.ticksPerMinute = ticksPerMinute;
  }

  // Retorna o tick global atual com base no tempo
  getCurrentTick() {
    const elapsedSeconds = Math.floor((Date.now() - this.startTime) / 1000);
    return elapsedSeconds * this.ticksPerSecond;
  }

  // Calcula a data do mundo com base no tick global
  getWorldDate() {
    const currentTick = this.getCurrentTick();
    const minutesPassed = Math.floor(currentTick / this.ticksPerMinute);
    return this.startDate.clone().add(minutesPassed, 'minutes');
  }
}

module.exports = ServerClock;
