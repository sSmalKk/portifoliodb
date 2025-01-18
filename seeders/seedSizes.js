const mongoose = require('mongoose');
const sizes = require('./sizes.json'); // JSON contendo os tamanhos
const dbService = require('../utils/dbService');
const SizeModel = require('../model/size'); // Modelo do banco para sizes

// Função para converter IDs numéricos em ObjectId
const convertToObjectId = (id) => new mongoose.Types.ObjectId(id.toString().padStart(24, '0'));

const syncSizes = async () => {
  try {
    console.log('Iniciando sincronização dos tamanhos...');

    for (const size of sizes) {
      console.log(`Processando tamanho: ${size.name}`);
      try {
        // Convertendo IDs para ObjectId
        const largerID = size.largerID ? convertToObjectId(size.largerID) : null;
        const smallerID = size.smallerID ? convertToObjectId(size.smallerID) : null;
        const _id = convertToObjectId(size.id);

        // Atualizando ou inserindo registros
        await dbService.updateOne(
          SizeModel,
          { _id },
          {
            ...size,
            _id,
            largerID,
            smallerID,
            linkedSizes: [largerID, smallerID].filter(Boolean),
            updatedAt: new Date(),
          },
          { upsert: true }
        );

        console.log(`Tamanho "${size.name}" sincronizado com sucesso.`);
      } catch (error) {
        console.error(`Erro ao processar "${size.name}": ${error.message}`);
      }
    }

    // Remover tamanhos extras do banco
    const idsFromJson = sizes.map((size) => convertToObjectId(size.id));
    await dbService.deleteMany(SizeModel, {
      _id: { $nin: idsFromJson },
    });
    console.log('Tamanhos extras removidos.');

    console.log('Sincronização concluída com sucesso.');
  } catch (error) {
    console.error(`Erro no processo de sincronização: ${error.message}`);
  }
};

module.exports = syncSizes;
