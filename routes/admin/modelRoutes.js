/**
 * modelRoutes.js
 * @description :: CRUD API routes for model
 */

const express = require('express');
const router = express.Router();
const modelController = require('../../controller/admin/modelController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/model/create').post(auth(PLATFORM.ADMIN),checkRolePermission,modelController.addModel);
router.route('/admin/model/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,modelController.bulkInsertModel);
router.route('/admin/model/list').post(auth(PLATFORM.ADMIN),checkRolePermission,modelController.findAllModel);
router.route('/admin/model/count').post(auth(PLATFORM.ADMIN),checkRolePermission,modelController.getModelCount);
router.route('/admin/model/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,modelController.getModel);
router.route('/admin/model/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,modelController.updateModel);    
router.route('/admin/model/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,modelController.partialUpdateModel);
router.route('/admin/model/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,modelController.bulkUpdateModel);
router.route('/admin/model/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,modelController.softDeleteModel);
router.route('/admin/model/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,modelController.softDeleteManyModel);
router.route('/admin/model/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,modelController.deleteModel);
router.route('/admin/model/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,modelController.deleteManyModel);

module.exports = router;
