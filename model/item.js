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

const variableSchema = new Schema({
  key: { type: String, required: true }, // Nome da variável
  value: { type: String, required: true }, // Valor da variável
});

const itemSchema = new Schema(
  {
    isDeleted: { type: Boolean },
    isActive: { type: Boolean },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    name: { type: String, required: true }, // Nome do item
    description: { type: String }, // Descrição do item
    variables: [variableSchema], // Lista de variáveis associadas ao item
    itemmodel: {
      ref: 'itemgenerator',
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

itemSchema.pre('save', async function (next) {
  this.isDeleted = false;
  this.isActive = true;
  next();
});

itemSchema.pre('insertMany', async function (next, docs) {
  if (docs && docs.length) {
    for (let index = 0; index < docs.length; index++) {
      const element = docs[index];
      element.isDeleted = false;
      element.isActive = true;
    }
  }
  next();
});

itemSchema.method('toJSON', function () {
  const { _id, __v, ...object } = this.toObject({ virtuals: true });
  object.id = _id;
  return object;
});

itemSchema.plugin(mongoosePaginate);
itemSchema.plugin(idValidator);

const Item = mongoose.model('item', itemSchema);
module.exports = Item;
