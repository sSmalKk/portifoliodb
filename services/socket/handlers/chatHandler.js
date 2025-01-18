const Chat_group = require('../../../model/Chat_group');
const Chat_message = require('../../../model/Chat_message');

module.exports = (io, socket) => {
  socket.on('sendMessage', async (data) => {
    try {
      const { message, sender, groupId } = data;

      // Valida o grupo global
      const group = await Chat_group.findOne({ _id: '000000000000000000', code: '0-0-0', name: 'Global Chat' });
      if (!group) {
        console.error('Grupo Global Chat não encontrado!');
        return;
      }

      // Cria a mensagem e emite para o grupo
      const newMessage = new Chat_message({
        message,
        sender,
        groupId: group._id,
        isActive: true,
      });

      const savedMessage = await newMessage.save();
      io.to(group.code).emit('newMessage', savedMessage); // Envia a mensagem para os clientes conectados
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error.message);
    }
  });

  socket.on('joinGlobalChat', () => {
    socket.join('0-0-0');
    console.log(`Cliente ${socket.id} entrou no Global Chat`);
  });
};
