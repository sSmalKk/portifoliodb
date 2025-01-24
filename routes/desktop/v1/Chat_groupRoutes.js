/**
 * Chat_groupRoutes.js
 * @description :: CRUD API routes for Chat_group
 */

const express = require('express');
const router = express.Router();
const Chat_groupController = require('../../../controller/desktop/v1/Chat_groupController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/desktop/api/v1/chat_group/create').post(Chat_groupController.addChat_group);
router.route('/desktop/api/v1/chat_group/list').post(Chat_groupController.findAllChat_group);
router.route('/desktop/api/v1/chat_group/count').post(Chat_groupController.getChat_groupCount);
router.route('/desktop/api/v1/chat_group/:id').get(Chat_groupController.getChat_group);
router.route('/desktop/api/v1/chat_group/update/:id').put(Chat_groupController.updateChat_group);    
router.route('/desktop/api/v1/chat_group/partial-update/:id').put(Chat_groupController.partialUpdateChat_group);
router.route('/desktop/api/v1/chat_group/softDelete/:id').put(Chat_groupController.softDeleteChat_group);
router.route('/desktop/api/v1/chat_group/softDeleteMany').put(Chat_groupController.softDeleteManyChat_group);
router.route('/desktop/api/v1/chat_group/addBulk').post(Chat_groupController.bulkInsertChat_group);
router.route('/desktop/api/v1/chat_group/updateBulk').put(Chat_groupController.bulkUpdateChat_group);
router.route('/desktop/api/v1/chat_group/delete/:id').delete(Chat_groupController.deleteChat_group);
router.route('/desktop/api/v1/chat_group/deleteMany').post(Chat_groupController.deleteManyChat_group);

module.exports = router;
