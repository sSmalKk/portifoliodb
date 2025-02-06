const mongoose = require('mongoose');
const sizes = require('./sizes.json'); // JSON contendo os tamanhos
const dbService = require('../utils/dbService');
const Size = require('../model/size'); // Modelo do banco para sizes
const PackModel = require('../model/pack'); // Modelo corrigido para packs

// **Converter um número para ObjectId**
const convertToObjectId = (id) => new mongoose.Types.ObjectId(id.toString().padStart(24, '0'));

// **Sincronizar os tamanhos no pack global**
const syncSizes = async () => {
  try {
    console.log('🔄 Iniciando sincronização dos tamanhos...');

    // 🔹 Criar ou buscar um único pack global para todos os tamanhos
    let globalPack = await PackModel.findOne({ name: "Pack-Tamanhos" });
    if (!globalPack) {
      globalPack = await PackModel.create({
        name: "Pack-Tamanhos",
        description: "Pacote global contendo todos os tamanhos",
      });
      console.log(`📦 Criado pack global: ${globalPack._id}`);
    }

    for (const size of sizes) {
      console.log(`📏 Processando tamanho: ${size.name}`);

      try {
        const largerID = size.largerID ? convertToObjectId(size.largerID) : null;
        const smallerID = size.smallerID ? convertToObjectId(size.smallerID) : null;
        const _id = convertToObjectId(size.id);

        // **Atualizando ou inserindo registros**
        await dbService.updateOne(
          Size,
          { _id },
          {
            ...size,
            _id,
            largerID,
            smallerID,
            linkedSizes: [largerID, smallerID].filter(Boolean),
            pack: globalPack._id, // 🔹 Associando ao pack global
            updatedAt: new Date(),
          },
          { upsert: true }
        );

        console.log(`✅ Tamanho "${size.name}" sincronizado com sucesso.`);
      } catch (error) {
        console.error(`❌ Erro ao processar "${size.name}": ${error.message}`);
      }
    }

    // **Remover tamanhos extras do banco**
    const idsFromJson = sizes.map((size) => convertToObjectId(size.id));
    await dbService.deleteMany(Size, {
      _id: { $nin: idsFromJson },
    });

    console.log('🗑️ Tamanhos extras removidos.');
    console.log('✅ Sincronização de tamanhos concluída.');
  } catch (error) {
    console.error(`🔥 Erro no processo de sincronização: ${error.message}`);
  }
};

module.exports = syncSizes;
