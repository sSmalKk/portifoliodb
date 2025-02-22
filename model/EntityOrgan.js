/**
 * EntityOrgan.js
 * @description :: Modelo da coleção de órgãos no banco de dados
 */

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
let idValidator = require('mongoose-id-validator');

const Schema = mongoose.Schema;
const schema = new Schema(
  {
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },

    name: { type: String, required: true }, // Nome do órgão
    image: { type: String }, // Ícone do órgão (se necessário)
    description: { type: String },

    texture: { type: String }, // 🔹 Textura específica do órgão

    position: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
      z: { type: Number, required: true }
    },

    body: {
      type: Schema.Types.ObjectId,
      ref: 'EntityBody',
      required: true
    },

    idPart: { type: String, required: true }, // 🔹 Identificador da parte do corpo (ex: "eye", "ribcage", "skull")
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate);
schema.plugin(idValidator);
const EntityOrgan = mongoose.model('EntityOrgan', schema);
module.exports = EntityOrgan;
