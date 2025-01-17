// createChatsForSizes.js
const mongoose = require('mongoose');
const Chat = require('./model/Chat'); // Caminho para o modelo Chat
const Size = require('./model/Size'); // Caminho para o modelo Size
const seedAdmin = require('./seedAdmin');

const createChatsForSizes = async () => {
  try {
    console.log('Iniciando criação de chats para os tamanhos...');

    // Garante que o administrador existe e obtém seu ID
    const admin = await seedAdmin();
    const adminId = admin._id;

    // Obtém todos os tamanhos
    const sizes = await Size.find();
    if (!sizes.length) {
      console.log('Nenhum tamanho encontrado no banco.');
      return;
    }

    for (const size of sizes) {
      const chatId = new mongoose.Types.ObjectId(size._id); // Usando o ID do tamanho como ID do chat

      const chatData = {
        _id: chatId,
        name: `Chat for Size ${size.name}`,
        code: `CHAT_${size._id}`,
        admin: adminId,
        customer: [], // Pode ser preenchido posteriormente
        isActive: true,
        isDeleted: false,
        addedBy: adminId,
        updatedBy: adminId,
      };

      const existingChat = await Chat.findOne({ _id: chatId });
      if (!existingChat) {
        await Chat.create(chatData);
        console.log(`Chat criado para o tamanho: ${size.name}`);
      } else {
        console.log(`Chat já existe para o tamanho: ${size.name}`);
      }
    }

    console.log('Criação de chats concluída.');
  } catch (error) {
    console.error('Erro ao criar chats:', error.message);
  }
};

module.exports = createChatsForSizes;
