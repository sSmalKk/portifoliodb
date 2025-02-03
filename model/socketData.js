const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const socketDataSchema = new Schema(
  {
    tick: { type: Number, required: true }, // Tick atual dentro do ciclo do dia
    inGameDate: { type: Date, required: true }, // Data do jogo
    serverId: { type: Schema.Types.ObjectId, ref: "Server", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: false }, // Agora opcional
    eventType: { type: String, required: true }, // Tipo do evento
    eventData: { type: Object, default: {} }, // Dados do evento
    timestamp: { type: Date, default: Date.now }, // Data real da atualização
  },
  { timestamps: true }
);

module.exports = mongoose.models.SocketData || mongoose.model("SocketData", socketDataSchema);
