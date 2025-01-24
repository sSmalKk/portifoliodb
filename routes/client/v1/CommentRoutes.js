/**
 * CommentRoutes.js
 * @description :: CRUD API routes for Comment
 */

const express = require('express');
const router = express.Router();
const CommentController = require('../../../controller/client/v1/CommentController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/comment/create').post(auth(PLATFORM.CLIENT),checkRolePermission,CommentController.addComment);
router.route('/client/api/v1/comment/list').post(auth(PLATFORM.CLIENT),checkRolePermission,CommentController.findAllComment);
router.route('/client/api/v1/comment/count').post(auth(PLATFORM.CLIENT),checkRolePermission,CommentController.getCommentCount);
router.route('/client/api/v1/comment/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,CommentController.getComment);
router.route('/client/api/v1/comment/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,CommentController.updateComment);    
router.route('/client/api/v1/comment/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,CommentController.partialUpdateComment);
router.route('/client/api/v1/comment/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,CommentController.softDeleteComment);
router.route('/client/api/v1/comment/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,CommentController.softDeleteManyComment);
router.route('/client/api/v1/comment/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,CommentController.bulkInsertComment);
router.route('/client/api/v1/comment/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,CommentController.bulkUpdateComment);
router.route('/client/api/v1/comment/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,CommentController.deleteComment);
router.route('/client/api/v1/comment/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,CommentController.deleteManyComment);

module.exports = router;
