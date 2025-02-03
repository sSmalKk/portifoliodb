const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const entitySchema = new Schema(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Dono da entidade
    name: { type: String, required: true }, // Nome da entidade
    description: { type: String, default: "" }, // Descrição
    position: { 
      x: { type: Number, required: true, default: 0 },
      y: { type: Number, required: true, default: 0 },
      z: { type: Number, required: true, default: 0 }
    }, // Posição da entidade no mundo
    rotation: { 
      x: { type: Number, required: true, default: 0 },
      y: { type: Number, required: true, default: 0 },
      z: { type: Number, required: true, default: 0 },
      w: { type: Number, required: true, default: 1 }
    }, // Rotação da entidade
    slots: { type: Number, required: true, default: 5 }, // Número máximo de entidades que um player pode ter
    tickLastUpdate: { type: Number, required: true }, // Último tick em que foi atualizada
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Entity", entitySchema);
