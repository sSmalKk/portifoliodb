/**
 * BlogRoutes.js
 * @description :: CRUD API routes for Blog
 */

const express = require('express');
const router = express.Router();
const BlogController = require('../../../controller/client/v1/BlogController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/blog/create').post(auth(PLATFORM.CLIENT),checkRolePermission,BlogController.addBlog);
router.route('/client/api/v1/blog/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,BlogController.bulkInsertBlog);
router.route('/client/api/v1/blog/list').post(auth(PLATFORM.CLIENT),checkRolePermission,BlogController.findAllBlog);
router.route('/client/api/v1/blog/count').post(auth(PLATFORM.CLIENT),checkRolePermission,BlogController.getBlogCount);
router.route('/client/api/v1/blog/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,BlogController.getBlog);
router.route('/client/api/v1/blog/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,BlogController.updateBlog);    
router.route('/client/api/v1/blog/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,BlogController.partialUpdateBlog);
router.route('/client/api/v1/blog/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,BlogController.bulkUpdateBlog);
router.route('/client/api/v1/blog/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,BlogController.softDeleteBlog);
router.route('/client/api/v1/blog/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,BlogController.softDeleteManyBlog);
router.route('/client/api/v1/blog/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,BlogController.deleteBlog);
router.route('/client/api/v1/blog/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,BlogController.deleteManyBlog);

module.exports = router;
