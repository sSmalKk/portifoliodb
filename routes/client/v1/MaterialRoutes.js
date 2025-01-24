/**
 * MaterialRoutes.js
 * @description :: CRUD API routes for Material
 */

const express = require('express');
const router = express.Router();
const MaterialController = require('../../../controller/client/v1/MaterialController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/material/create').post(auth(PLATFORM.CLIENT),checkRolePermission,MaterialController.addMaterial);
router.route('/client/api/v1/material/list').post(auth(PLATFORM.CLIENT),checkRolePermission,MaterialController.findAllMaterial);
router.route('/client/api/v1/material/count').post(auth(PLATFORM.CLIENT),checkRolePermission,MaterialController.getMaterialCount);
router.route('/client/api/v1/material/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,MaterialController.getMaterial);
router.route('/client/api/v1/material/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,MaterialController.updateMaterial);    
router.route('/client/api/v1/material/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,MaterialController.partialUpdateMaterial);
router.route('/client/api/v1/material/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,MaterialController.softDeleteMaterial);
router.route('/client/api/v1/material/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,MaterialController.softDeleteManyMaterial);
router.route('/client/api/v1/material/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,MaterialController.bulkInsertMaterial);
router.route('/client/api/v1/material/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,MaterialController.bulkUpdateMaterial);
router.route('/client/api/v1/material/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,MaterialController.deleteMaterial);
router.route('/client/api/v1/material/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,MaterialController.deleteManyMaterial);

module.exports = router;
