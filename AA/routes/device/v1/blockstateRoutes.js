/**
 * blockstateRoutes.js
 * @description :: CRUD API routes for blockstate
 */

const express = require('express');
const router = express.Router();
const blockstateController = require('../../../controller/device/v1/blockstateController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/blockstate/create').post(auth(PLATFORM.DEVICE),checkRolePermission,blockstateController.addBlockstate);
router.route('/device/api/v1/blockstate/list').post(auth(PLATFORM.DEVICE),checkRolePermission,blockstateController.findAllBlockstate);
router.route('/device/api/v1/blockstate/count').post(auth(PLATFORM.DEVICE),checkRolePermission,blockstateController.getBlockstateCount);
router.route('/device/api/v1/blockstate/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,blockstateController.getBlockstate);
router.route('/device/api/v1/blockstate/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,blockstateController.updateBlockstate);    
router.route('/device/api/v1/blockstate/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,blockstateController.partialUpdateBlockstate);
router.route('/device/api/v1/blockstate/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,blockstateController.softDeleteBlockstate);
router.route('/device/api/v1/blockstate/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,blockstateController.softDeleteManyBlockstate);
router.route('/device/api/v1/blockstate/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,blockstateController.bulkInsertBlockstate);
router.route('/device/api/v1/blockstate/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,blockstateController.bulkUpdateBlockstate);
router.route('/device/api/v1/blockstate/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,blockstateController.deleteBlockstate);
router.route('/device/api/v1/blockstate/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,blockstateController.deleteManyBlockstate);

module.exports = router;
