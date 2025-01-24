/**
 * blockstateRoutes.js
 * @description :: CRUD API routes for blockstate
 */

const express = require('express');
const router = express.Router();
const blockstateController = require('../../../controller/client/v1/blockstateController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/blockstate/create').post(auth(PLATFORM.CLIENT),checkRolePermission,blockstateController.addBlockstate);
router.route('/client/api/v1/blockstate/list').post(auth(PLATFORM.CLIENT),checkRolePermission,blockstateController.findAllBlockstate);
router.route('/client/api/v1/blockstate/count').post(auth(PLATFORM.CLIENT),checkRolePermission,blockstateController.getBlockstateCount);
router.route('/client/api/v1/blockstate/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,blockstateController.getBlockstate);
router.route('/client/api/v1/blockstate/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,blockstateController.updateBlockstate);    
router.route('/client/api/v1/blockstate/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,blockstateController.partialUpdateBlockstate);
router.route('/client/api/v1/blockstate/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,blockstateController.softDeleteBlockstate);
router.route('/client/api/v1/blockstate/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,blockstateController.softDeleteManyBlockstate);
router.route('/client/api/v1/blockstate/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,blockstateController.bulkInsertBlockstate);
router.route('/client/api/v1/blockstate/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,blockstateController.bulkUpdateBlockstate);
router.route('/client/api/v1/blockstate/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,blockstateController.deleteBlockstate);
router.route('/client/api/v1/blockstate/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,blockstateController.deleteManyBlockstate);

module.exports = router;
