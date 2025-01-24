/**
 * categoryRoutes.js
 * @description :: CRUD API routes for category
 */

const express = require('express');
const router = express.Router();
const categoryController = require('../../../controller/desktop/v1/categoryController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/desktop/api/v1/category/create').post(categoryController.addCategory);
router.route('/desktop/api/v1/category/list').post(categoryController.findAllCategory);
router.route('/desktop/api/v1/category/count').post(categoryController.getCategoryCount);
router.route('/desktop/api/v1/category/:id').get(categoryController.getCategory);
router.route('/desktop/api/v1/category/update/:id').put(categoryController.updateCategory);    
router.route('/desktop/api/v1/category/partial-update/:id').put(categoryController.partialUpdateCategory);
router.route('/desktop/api/v1/category/softDelete/:id').put(categoryController.softDeleteCategory);
router.route('/desktop/api/v1/category/softDeleteMany').put(categoryController.softDeleteManyCategory);
router.route('/desktop/api/v1/category/addBulk').post(categoryController.bulkInsertCategory);
router.route('/desktop/api/v1/category/updateBulk').put(categoryController.bulkUpdateCategory);
router.route('/desktop/api/v1/category/delete/:id').delete(categoryController.deleteCategory);
router.route('/desktop/api/v1/category/deleteMany').post(categoryController.deleteManyCategory);

module.exports = router;
