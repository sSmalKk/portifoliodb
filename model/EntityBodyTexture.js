/**
 * EntityBodyTexture.js
 * @description :: Modelo para representar um corpo composto por várias partes
 */

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
let idValidator = require('mongoose-id-validator');

const Schema = mongoose.Schema;
const schema = new Schema(
  {
    isDeleted: { type: Boolean },

    isActive: { type: Boolean },

    createdAt: { type: Date },

    updatedAt: { type: Date },

    addedBy: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },

    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    name: { type: String, required: true },

    image: { type: String },
    model3D: { type: String }, // Caminho para o modelo 3D
    structure: { type: [Schema.Types.Mixed], default: [] }, // Permite objetos na estrutura
    texture: { type: String },
    description: { type: String },
    pack: { type: Schema.Types.ObjectId, ref: 'Pack' },

  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate);
schema.plugin(idValidator);
const EntityBodyTexture = mongoose.model('EntityBodyTexture', schema);
module.exports = EntityBodyTexture;
