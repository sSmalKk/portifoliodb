const ChatGroup = require("../../model/chat_Group");

class ChatManager {
  constructor() {
    this.instances = {}; // Gerencia diferentes instâncias do chat
  }

  async initializeInstance(instanceId) {
    if (!this.instances[instanceId]) {
      this.instances[instanceId] = { users: new Set(), chatId: null };
      console.log(`🔹 Criando nova instância de chat: ${instanceId}`);

      // Se for a instância `0000000`, cria o chat principal
      if (instanceId === "0000000") {
        let chat = await ChatGroup.findOne({ code: "0000000" });
        if (!chat) {
          chat = await ChatGroup.create({
            type: "global",
            name: "Chat Global",
            code: "0000000",
            memberIds: [],
          });
          console.log(`✅ Chat 0000000 criado.`);
        }
        this.instances[instanceId].chatId = chat._id;
      }
    }
  }

  async joinChat(userId, instanceId) {
    await this.initializeInstance(instanceId);
    this.instances[instanceId].users.add(userId);
    console.log(`👤 ${userId} entrou no chat ${instanceId}`);
  }

  async leaveChat(userId, instanceId) {
    if (this.instances[instanceId]) {
      this.instances[instanceId].users.delete(userId);
      console.log(`👤 ${userId} saiu do chat ${instanceId}`);
    }
  }

  getInstance(instanceId) {
    return this.instances[instanceId] || null;
  }
}

module.exports = new ChatManager();
