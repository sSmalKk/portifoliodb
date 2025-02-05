/**
 * pack.js
 * @description :: model of a database collection pack
 */

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
let idValidator = require('mongoose-id-validator');

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
    isDeleted: { type: Boolean },
    isActive: { type: Boolean },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    addedBy: { type: Schema.Types.ObjectId, ref: 'user' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'user' },
    name: { type: String },
    image: { type: String },
    description: { type: String },

    requiredPacks: [{ type: Schema.Types.ObjectId, ref: 'pack' }],
    packsIncompatible: [{ type: Schema.Types.ObjectId, ref: 'pack' }],
    backupIndex: [
      {
        backupId: { type: String },
        date: { type: Date, default: Date.now },
        filePath: { type: String }, // Caminho do arquivo .rar salvo
      },]
  }, 
{
  timestamps: {
    createdAt: 'createdAt',
      updatedAt: 'updatedAt'
  }
}
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
  const { _id, __v, ...object } = this.toObject({ virtuals: true });
  object.id = _id;
  return object;
});

schema.plugin(mongoosePaginate);
schema.plugin(idValidator);

const pack = mongoose.model('pack', schema);
module.exports = pack;
