/**
 * BlogRoutes.js
 * @description :: CRUD API routes for Blog
 */

const express = require('express');
const router = express.Router();
const BlogController = require('../../../controller/desktop/v1/BlogController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/desktop/api/v1/blog/create').post(BlogController.addBlog);
router.route('/desktop/api/v1/blog/list').post(BlogController.findAllBlog);
router.route('/desktop/api/v1/blog/count').post(BlogController.getBlogCount);
router.route('/desktop/api/v1/blog/:id').get(BlogController.getBlog);
router.route('/desktop/api/v1/blog/update/:id').put(BlogController.updateBlog);    
router.route('/desktop/api/v1/blog/partial-update/:id').put(BlogController.partialUpdateBlog);
router.route('/desktop/api/v1/blog/softDelete/:id').put(BlogController.softDeleteBlog);
router.route('/desktop/api/v1/blog/softDeleteMany').put(BlogController.softDeleteManyBlog);
router.route('/desktop/api/v1/blog/addBulk').post(BlogController.bulkInsertBlog);
router.route('/desktop/api/v1/blog/updateBulk').put(BlogController.bulkUpdateBlog);
router.route('/desktop/api/v1/blog/delete/:id').delete(BlogController.deleteBlog);
router.route('/desktop/api/v1/blog/deleteMany').post(BlogController.deleteManyBlog);

module.exports = router;
