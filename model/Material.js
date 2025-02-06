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

const schema = new Schema({
  name: { type: String },
  image: { type: String },
  description: { type: String },
  pack: { ref: 'Pack', type: Schema.Types.ObjectId },
  symbol: { type: String },
  elementId: { type: String },
  type: { type: String },
  baseColors: [{ type: String }], // 🔹 Alterado para um array de strings
  density: { type: String },
  meltingPoint: { type: String },
  boilingPoint: { type: String },
  standardState: { type: String },
  maxTemperature: { type: String },
  minTemperature: { type: String },
  spectrum: { type: String },
  condition: { type: String },
  parameters: { type: String },
  verified: { type: String },
  isDeleted: { type: Boolean },
  isActive: { type: Boolean },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  addedBy: { type: Schema.Types.ObjectId, ref: 'user' },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'user' }

},
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
);

// Middleware para definir valores padrão antes de salvar
schema.pre('save', async function (next) {
  this.isDeleted = false;
  this.isActive = true;
  next();
});

// Middleware para definir valores padrão antes de inserir múltiplos registros
schema.pre('insertMany', async function (next, docs) {
  if (docs && docs.length) {
    docs.forEach((doc) => {
      doc.isDeleted = false;
      doc.isActive = true;
    });
  }
  next();
});

// Remove campos _id e __v na saída JSON
schema.method('toJSON', function () {
  const { _id, __v, ...object } = this.toObject({ virtuals: true });
  object.id = _id;
  return object;
});

schema.plugin(mongoosePaginate);
schema.plugin(idValidator);

// ⚠️ Evita a redefinição do modelo já existente
module.exports = mongoose.models.Material || mongoose.model("Material", schema);
