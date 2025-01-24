/**
 * SizeRoutes.js
 * @description :: CRUD API routes for Size
 */

const express = require('express');
const router = express.Router();
const SizeController = require('../../../controller/client/v1/SizeController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/size/create').post(auth(PLATFORM.CLIENT),checkRolePermission,SizeController.addSize);
router.route('/client/api/v1/size/list').post(auth(PLATFORM.CLIENT),checkRolePermission,SizeController.findAllSize);
router.route('/client/api/v1/size/count').post(auth(PLATFORM.CLIENT),checkRolePermission,SizeController.getSizeCount);
router.route('/client/api/v1/size/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,SizeController.getSize);
router.route('/client/api/v1/size/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,SizeController.updateSize);    
router.route('/client/api/v1/size/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,SizeController.partialUpdateSize);
router.route('/client/api/v1/size/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,SizeController.softDeleteSize);
router.route('/client/api/v1/size/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,SizeController.softDeleteManySize);
router.route('/client/api/v1/size/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,SizeController.bulkInsertSize);
router.route('/client/api/v1/size/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,SizeController.bulkUpdateSize);
router.route('/client/api/v1/size/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,SizeController.deleteSize);
router.route('/client/api/v1/size/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,SizeController.deleteManySize);

module.exports = router;
