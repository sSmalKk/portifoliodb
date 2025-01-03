const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true }, // Nome do jogador
    position: {
      type: [Number], // [x, y, z]
      default: [0, 0, 0],
    },
    rotation: {
      type: [Number], // [rx, ry, rz]
      default: [0, 0, 0],
    },
    isActive: { type: Boolean, default: true }, // Status do jogador
    lastConnected: { type: Date, default: Date.now }, // Última conexão
  },
  {
    timestamps: true, // createdAt e updatedAt automáticos
  }
);

module.exports = mongoose.model("User", userSchema);
