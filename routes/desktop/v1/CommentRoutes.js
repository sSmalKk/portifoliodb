/**
 * CommentRoutes.js
 * @description :: CRUD API routes for Comment
 */

const express = require('express');
const router = express.Router();
const CommentController = require('../../../controller/desktop/v1/CommentController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/desktop/api/v1/comment/create').post(CommentController.addComment);
router.route('/desktop/api/v1/comment/list').post(CommentController.findAllComment);
router.route('/desktop/api/v1/comment/count').post(CommentController.getCommentCount);
router.route('/desktop/api/v1/comment/:id').get(CommentController.getComment);
router.route('/desktop/api/v1/comment/update/:id').put(CommentController.updateComment);    
router.route('/desktop/api/v1/comment/partial-update/:id').put(CommentController.partialUpdateComment);
router.route('/desktop/api/v1/comment/softDelete/:id').put(CommentController.softDeleteComment);
router.route('/desktop/api/v1/comment/softDeleteMany').put(CommentController.softDeleteManyComment);
router.route('/desktop/api/v1/comment/addBulk').post(CommentController.bulkInsertComment);
router.route('/desktop/api/v1/comment/updateBulk').put(CommentController.bulkUpdateComment);
router.route('/desktop/api/v1/comment/delete/:id').delete(CommentController.deleteComment);
router.route('/desktop/api/v1/comment/deleteMany').post(CommentController.deleteManyComment);

module.exports = router;
