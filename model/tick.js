/**
 * Tick.js
 * @description :: model of a database collection Tick
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tickSchema = new Schema({
  tickCount: { type: Number, default: 0 }, // Contador global de ticks
  events: [
    {
      tick: { type: Number }, // Tick no qual o evento ocorreu
      type: { type: String }, // Tipo do evento (e.g., "move", "chat", "interact")
      entityId: { type: Schema.Types.ObjectId, ref: 'Entity' }, // Entidade associada
      data: { type: Object }, // Dados adicionais do evento
    },
  ],
  compacted: { type: Boolean, default: false }, // Indica se os eventos antigos foram compactados
}, {
  timestamps: true,
});

tickSchema.methods.addEvent = function (event) {
  this.events.push(event);
  return this.save();
};

tickSchema.methods.compactEvents = async function () {
  // Lógica para compactar os eventos mais antigos e liberar espaço
  if (this.events.length > 1000) { // Exemplo: compactar quando passar de 1000 eventos
    this.events = this.events.slice(-500); // Mantém apenas os 500 eventos mais recentes
    this.compacted = true;
    await this.save();
  }
};

const Tick = mongoose.model('Tick', tickSchema);
module.exports = Tick;
