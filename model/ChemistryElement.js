/**
 * ChemistryElement.js
 * @description :: model of a database collection ChemistryElement
 */

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);
const mongoosePaginate = require('mongoose-paginate-v2');
let idValidator = require('mongoose-id-validator');
const uniqueValidator = require('mongoose-unique-validator');
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
const Schema = mongoose.Schema;
const schema = new Schema(
  {

    atomicNumber: {
      type: Number,
      unique: true,
      required: true
    },

    symbol: {
      type: String,
      required: true,
      unique: false,
      lowercase: false,
      trim: false,
      uniqueCaseInsensitive: true
    },

    name: { type: String },

    image: { type: String },

    description: { type: String },
    pack: {
      ref: 'pack',
      type: Schema.Types.ObjectId
    },
    atomicMass: {
      type: String,
      required: true,
      unique: true,
      lowercase: false,
      trim: false,
      uniqueCaseInsensitive: true
    },

    cpkHexColor: { type: String },

    electronConfiguration: { type: String },

    electronegativity: { type: String },

    atomicRadius: { type: String },

    ionizationEnergy: { type: String },

    electronAffinity: { type: String },

    oxidationStates: { type: String },

    standardState: { type: String },

    meltingPoint: { type: String },

    boilingPoint: { type: String },

    density: { type: String },

    groupBlock: { type: String },

    yearDiscovered: { type: String },

    updatedAt: { type: String },

    isDeleted: { type: Boolean },

    isActive: { type: Boolean },

    createdAt: { type: Date },

    addedBy: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },

    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },

  }
  , { timestamps: { createdAt: 'createdAt', } }
);
schema.pre('save', async function (next) {
  this.isDeleted = false;
  this.isActive = true;
  next();
});

schema.pre('insertMany', async function (next, docs) {
  if (docs && docs.length) {
    for (let index = 0; index < docs.length; index++) {
      const element = docs[index];
      element.isDeleted = false;
      element.isActive = true;
    }
  }
  next();
});

schema.method('toJSON', function () {
  const {
    _id, __v, ...object
  } = this.toObject({ virtuals: true });
  object.id = _id;

  return object;
});
schema.plugin(mongoosePaginate);
schema.plugin(idValidator);
schema.plugin(uniqueValidator, { message: 'Error, expected {VALUE} to be unique.' });
const ChemistryElement = mongoose.model('ChemistryElement', schema);
module.exports = ChemistryElement;