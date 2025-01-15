/**
 * ChatRoutes.js
 * @description :: CRUD API routes for Chat
 */

const express = require('express');
const router = express.Router();
const ChatController = require('../../../controller/client/v1/ChatController');
const { PLATFORM } = require('../../../constants/authConstant');
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

const PROTECTED_CHATS = ['000000000000000000000001']; // ObjectId do console (001)

// Middleware para bloquear chats protegidos
const blockProtectedChats = (req, res, next) => {
  const { id } = req.params;
  if (id && PROTECTED_CHATS.includes(id.toString().padStart(24, '0'))) {
    return res.status(403).json({ message: 'Operação não permitida no chat protegido.' });
  }
  next();
};

// Rotas
router.route('/client/api/v1/chat/create').post(auth(PLATFORM.CLIENT), checkRolePermission, ChatController.addChat);
router.route('/client/api/v1/chat/addBulk').post(auth(PLATFORM.CLIENT), checkRolePermission, ChatController.bulkInsertChat);
router.route('/client/api/v1/chat/list').post(auth(PLATFORM.CLIENT), checkRolePermission, ChatController.findAllChat);
router.route('/client/api/v1/chat/count').post(auth(PLATFORM.CLIENT), checkRolePermission, ChatController.getChatCount);
router.route('/client/api/v1/chat/:id')
  .get(auth(PLATFORM.CLIENT), checkRolePermission, blockProtectedChats, ChatController.getChat)
  .put(auth(PLATFORM.CLIENT), checkRolePermission, blockProtectedChats, ChatController.updateChat);

router.route('/client/api/v1/chat/partial-update/:id').put(auth(PLATFORM.CLIENT), checkRolePermission, blockProtectedChats, ChatController.partialUpdateChat);
router.route('/client/api/v1/chat/updateBulk').put(auth(PLATFORM.CLIENT), checkRolePermission, ChatController.bulkUpdateChat);

module.exports = router;
