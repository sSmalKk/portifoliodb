/**
 * Server.js
 * @description :: model of a database collection Server
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
    name: { type: String },
    image: { type: String },
    description: { type: String },
    packs: [{ ref: 'Pack', type: Schema.Types.ObjectId }],
    isDeleted: { type: Boolean },
    isActive: { type: Boolean },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    addedBy: { type: Schema.Types.ObjectId, ref: 'user' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'user' },

    // **Configuração do Tick**
    tickEnabled: { type: Boolean, default: true }, // Permite congelar os ticks
    tickRate: { type: Number, default: 20 }, // Valor padrão de ticks por segundo
    lastTickTimestamp: { type: Number, default: Date.now }, // Marca o último tick
    globalTick: { type: Number, default: 0 }, // Tick global baseado no tempo real
    gameStartDate: { type: Date, default: Date.now }, // Data de início do jogo

    // **Parâmetros do servidor**
    parametros: [{
      nome: { type: String, required: true },
      valor: { type: mongoose.Schema.Types.Mixed, required: true }
    }],

    // **Usuários conectados**
    conectedUsers: [{
      userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
      nickname: { type: String, required: true }
    }],

    // **Usuários banidos**
    bannedUsers: [{
      userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
      nickname: { type: String, required: true },
      banReason: { type: String, default: "Violação das regras" },
      bannedAt: { type: Date, default: Date.now }
    }],

    // **Whitelist**
    whitelistEnabled: { type: Boolean, default: false }, // Modo whitelist ativado/desativado
    whitelist: [{
      userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
      nickname: { type: String, required: true }
    }],

    // **Operadores do servidor**
    operators: [{
      userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
      nickname: { type: String, required: true }
    }],

    // **Comandos do servidor**
    serverCommands: [{
      command: { type: String, required: true }, // Comando específico
      description: { type: String }, // Descrição do comando
      allowedOperatorsOnly: { type: Boolean, default: true } // Apenas operadores podem usar
    }]
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
);

// **Garante que servidores novos não estejam deletados ou desativados**
schema.pre('save', async function (next) {
  this.isDeleted = false;
  this.isActive = true;
  next();
});

schema.pre('insertMany', async function (next, docs) {
  if (docs && docs.length) {
    for (let index = 0; index < docs.length; index++) {
      docs[index].isDeleted = false;
      docs[index].isActive = true;
    }
  }
  next();
});

// **Transformação de JSON para remover `_id` e `__v`**
schema.method('toJSON', function () {
  const { _id, __v, ...object } = this.toObject({ virtuals: true });
  object.id = _id;
  return object;
});

schema.plugin(mongoosePaginate);
schema.plugin(idValidator);

const Server = mongoose.model('Server', schema);
module.exports = Server;
