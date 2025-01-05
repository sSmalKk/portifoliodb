/**
 * ChatRoutes.js
 * @description :: CRUD API routes for Chat
 */

const express = require('express');
const router = express.Router();
const ChatController = require('../../../controller/client/v1/ChatController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/chat/create').post(auth(PLATFORM.CLIENT),checkRolePermission,ChatController.addChat);
router.route('/client/api/v1/chat/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,ChatController.bulkInsertChat);
router.route('/client/api/v1/chat/list').post(auth(PLATFORM.CLIENT),checkRolePermission,ChatController.findAllChat);
router.route('/client/api/v1/chat/count').post(auth(PLATFORM.CLIENT),checkRolePermission,ChatController.getChatCount);
router.route('/client/api/v1/chat/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,ChatController.getChat);
router.route('/client/api/v1/chat/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,ChatController.updateChat);    
router.route('/client/api/v1/chat/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,ChatController.partialUpdateChat);
router.route('/client/api/v1/chat/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,ChatController.bulkUpdateChat);

module.exports = router;
