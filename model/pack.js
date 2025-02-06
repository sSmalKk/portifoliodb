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
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    addedBy: { type: Schema.Types.ObjectId, ref: 'user' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'user' },
    name: { type: String, required: true },
    image: { type: String },
    description: { type: String },

    requiredPacks: [{ type: Schema.Types.ObjectId, ref: 'pack' }],
    packsIncompatible: [{ type: Schema.Types.ObjectId, ref: 'pack' }],
    backupIndex: [
      {
        backupId: { type: String },
        date: { type: Date, default: Date.now },
        filePath: { type: String }, // Caminho do arquivo .rar salvo
      },
    ],
  },
  {
    timestamps: true,
  }
);

schema.pre('save', function (next) {
  this.isDeleted = false;
  this.isActive = true;
  next();
});

schema.plugin(mongoosePaginate);
schema.plugin(idValidator);

module.exports = mongoose.models.Pack || mongoose.model("Pack", schema);
