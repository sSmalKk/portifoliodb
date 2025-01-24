/**
 * Chat_messageRoutes.js
 * @description :: CRUD API routes for Chat_message
 */

const express = require('express');
const router = express.Router();
const Chat_messageController = require('../../../controller/client/v1/Chat_messageController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/chat_message/create').post(auth(PLATFORM.CLIENT),checkRolePermission,Chat_messageController.addChat_message);
router.route('/client/api/v1/chat_message/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,Chat_messageController.bulkInsertChat_message);
router.route('/client/api/v1/chat_message/list').post(auth(PLATFORM.CLIENT),checkRolePermission,Chat_messageController.findAllChat_message);
router.route('/client/api/v1/chat_message/count').post(auth(PLATFORM.CLIENT),checkRolePermission,Chat_messageController.getChat_messageCount);
router.route('/client/api/v1/chat_message/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,Chat_messageController.getChat_message);
router.route('/client/api/v1/chat_message/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,Chat_messageController.updateChat_message);    
router.route('/client/api/v1/chat_message/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,Chat_messageController.partialUpdateChat_message);
router.route('/client/api/v1/chat_message/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,Chat_messageController.bulkUpdateChat_message);

module.exports = router;
