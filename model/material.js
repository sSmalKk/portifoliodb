/**
 * material.js
 * @description :: model of a database collection material
 */

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const idValidator = require('mongoose-id-validator');

// Custom labels for mongoose-paginate
const myCustomLabels = {
  totalDocs: 'itemCount',
  docs: 'data',
  limit: 'perPage',
  page: 'currentPage',
  nextPage: 'next',
  prevPage: 'prev',
  totalPages: 'pageCount',
  pagingCounter: 'slNo',
  meta: 'paginator',
};
mongoosePaginate.paginate.options = { customLabels: myCustomLabels };

// Definindo o esquema de Material
const MaterialSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    symbol: { type: String, required: true },
    elementId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'elements' },
    type: { type: String, default: 'element' }, // Ex.: "element", "compound", "alloy"
    baseColors: { type: [String], default: [] }, // Ex.: ["#FFFFFF"]
    properties: {
      density: { type: Number },
      meltingPoint: { type: Number }, // Em Kelvin
      boilingPoint: { type: Number }, // Em Kelvin
      standardState: { type: String, default: 'solid' }, // Estado padrão
    },
    blackBodyConfig: {
      maxTemperature: { type: Number }, // Temperatura no estado de plasma
      minTemperature: { type: Number }, // Ponto de fusão
      spectrum: { type: [String], default: [] }, // Cores calculadas ao longo do espectro
    },
    rules: [
      {
        condition: { type: String },
        parameters: { type: mongoose.Schema.Types.Mixed },
        description: { type: String },
      },
    ],
    verified: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

// Pre-save hook para configurar campos padrão
MaterialSchema.pre('save', async function (next) {
  this.isDeleted = false;
  this.isActive = true;
  next();
});

// Pre-insertMany hook para configurar campos padrão
MaterialSchema.pre('insertMany', async function (next, docs) {
  if (docs && docs.length) {
    for (let index = 0; index < docs.length; index++) {
      const element = docs[index];
      element.isDeleted = false;
      element.isActive = true;
    }
  }
  next();
});

// Sobrescrevendo o método toJSON para personalizar a saída
MaterialSchema.method('toJSON', function () {
  const { _id, __v, ...object } = this.toObject({ virtuals: true });
  object.id = _id;
  return object;
});

// Plugins
MaterialSchema.plugin(mongoosePaginate);
MaterialSchema.plugin(idValidator);

// Modelo
const Material = mongoose.model('Material', MaterialSchema);

module.exports = Material;
