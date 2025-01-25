/**
 * ChatRoutes.js
 * @description :: CRUD API routes for Chat
 */

const express = require('express');
const router = express.Router();
const ChatController = require('../../controller/admin/ChatController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/chat/create').post(auth(PLATFORM.ADMIN),checkRolePermission,ChatController.addChat);
router.route('/admin/chat/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,ChatController.bulkInsertChat);
router.route('/admin/chat/list').post(auth(PLATFORM.ADMIN),checkRolePermission,ChatController.findAllChat);
router.route('/admin/chat/count').post(auth(PLATFORM.ADMIN),checkRolePermission,ChatController.getChatCount);
router.route('/admin/chat/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,ChatController.getChat);
router.route('/admin/chat/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ChatController.updateChat);    
router.route('/admin/chat/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ChatController.partialUpdateChat);
router.route('/admin/chat/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,ChatController.bulkUpdateChat);
router.route('/admin/chat/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ChatController.softDeleteChat);
router.route('/admin/chat/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,ChatController.softDeleteManyChat);
router.route('/admin/chat/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,ChatController.deleteChat);
router.route('/admin/chat/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,ChatController.deleteManyChat);

module.exports = router;
