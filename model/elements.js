const mongoose = require('mongoose');

const ChemistryElementSchema = new mongoose.Schema({
  _id: {
    type: Number, // Usando o número atômico como ID único
    required: true,
  },
  atomicNumber: {
    type: Number,
    required: true,
    unique: true, // Garante que seja único
  },
  symbol: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  atomicMass: {
    type: Number,
    required: false,
  },
  cpkHexColor: {
    type: String,
    required: false,
  },
  electronConfiguration: {
    type: String,
    required: false,
  },
  electronegativity: {
    type: Number,
    required: false,
  },
  atomicRadius: {
    type: Number,
    required: false,
  },
  ionizationEnergy: {
    type: Number,
    required: false,
  },
  electronAffinity: {
    type: Number,
    required: false,
  },
  oxidationStates: {
    type: String, // String porque pode conter múltiplos valores separados por vírgulas
    required: false,
  },
  standardState: {
    type: String,
    required: false,
  },
  meltingPoint: {
    type: Number,
    required: false,
  },
  boilingPoint: {
    type: Number,
    required: false,
  },
  density: {
    type: Number,
    required: false,
  },
  groupBlock: {
    type: String,
    required: false,
  },
  yearDiscovered: { type: String }, // Alterado para String

  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },

});

module.exports = mongoose.model('ChemistryElement', ChemistryElementSchema);