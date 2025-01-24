/**
 * Chat_messageRoutes.js
 * @description :: CRUD API routes for Chat_message
 */

const express = require('express');
const router = express.Router();
const Chat_messageController = require('../../../controller/desktop/v1/Chat_messageController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/desktop/api/v1/chat_message/create').post(Chat_messageController.addChat_message);
router.route('/desktop/api/v1/chat_message/list').post(Chat_messageController.findAllChat_message);
router.route('/desktop/api/v1/chat_message/count').post(Chat_messageController.getChat_messageCount);
router.route('/desktop/api/v1/chat_message/:id').get(Chat_messageController.getChat_message);
router.route('/desktop/api/v1/chat_message/update/:id').put(Chat_messageController.updateChat_message);    
router.route('/desktop/api/v1/chat_message/partial-update/:id').put(Chat_messageController.partialUpdateChat_message);
router.route('/desktop/api/v1/chat_message/softDelete/:id').put(Chat_messageController.softDeleteChat_message);
router.route('/desktop/api/v1/chat_message/softDeleteMany').put(Chat_messageController.softDeleteManyChat_message);
router.route('/desktop/api/v1/chat_message/addBulk').post(Chat_messageController.bulkInsertChat_message);
router.route('/desktop/api/v1/chat_message/updateBulk').put(Chat_messageController.bulkUpdateChat_message);
router.route('/desktop/api/v1/chat_message/delete/:id').delete(Chat_messageController.deleteChat_message);
router.route('/desktop/api/v1/chat_message/deleteMany').post(Chat_messageController.deleteManyChat_message);

module.exports = router;
