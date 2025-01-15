const mongoose = require('mongoose');
const ChatModel = require('../model/chat');

// Função para converter IDs numéricos ou strings para ObjectId
const convertToObjectId = (id) => new mongoose.Types.ObjectId(id.toString().padStart(24, '0'));

const seedChats = async () => {
  try {
    console.log("🔄 Iniciando seed dos chats...");

    // Definir os dados para os chats iniciais
    const chats = [
      {
        _id: convertToObjectId(0), // ID do Chat Global
        name: "Chat Global",
        code: "global",
        admin: "system",
        customer: [], // Nenhum cliente associado
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    for (const chat of chats) {
      // Inserir ou atualizar o chat no banco
      await ChatModel.updateOne(
        { _id: chat._id },
        chat,
        { upsert: true }
      );
      console.log(`✅ Chat "${chat.name}" sincronizado com sucesso.`);
    }

    console.log("✅ Seed dos chats concluído.");
  } catch (error) {
    console.error(`❌ Erro durante o seed dos chats: ${error.message}`);
  }
};

module.exports = seedChats;
