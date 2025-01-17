/**
 * size.js
 * @description :: model of a database collection size
 */

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
let idValidator = require('mongoose-id-validator');

// Configurando labels customizados para paginação
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
    name: { type: String, required: true }, // Nome do tamanho
    largerID: { type: Schema.Types.ObjectId, ref: 'size', default: null }, // Referência ao tamanho maior
    smallerID: { type: Schema.Types.ObjectId, ref: 'size', default: null }, // Referência ao tamanho menor
    linkedSizes: [{ type: Schema.Types.ObjectId, ref: 'size', default: [] }], // Lista de tamanhos relacionados

    // Variáveis relacionadas ao sistema de ticks
    tickrate: { type: Number, default: 1 }, // Quantos ticks contam por segundo
    tickciclerate: { type: Number, default: 60 }, // Quantos ticks para completar um ciclo
    tickminimum: { type: String, default: 'seconds' }, // Valor mínimo do sistema
    tickcicle: { type: Date, default: new Date() }, // Data do ciclo inicial
    
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },

    createdAt: { type: Date },
    updatedAt: { type: Date },

    addedBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);



// Middleware para setar valores padrão antes de salvar
schema.pre('save', async function (next) {
  if (this.isNew) {
    this.isDeleted = false;
    this.isActive = true;
  }
  next();
});

// Middleware para setar valores padrão em operações de insertMany
schema.pre('insertMany', async function (next, docs) {
  if (docs && docs.length) {
    docs.forEach((doc) => {
      doc.isDeleted = false;
      doc.isActive = true;
    });
  }
  next();
});

// Transformação JSON para ocultar campos indesejados
schema.method('toJSON', function () {
  const { _id, __v, ...object } = this.toObject({ virtuals: true });
  object.id = _id;
  return object;
});

// Adicionando plugins de paginação e validação de referência
schema.plugin(mongoosePaginate);
schema.plugin(idValidator);

// Criando e exportando o modelo
const size = mongoose.model('size', schema);
module.exports = size;
