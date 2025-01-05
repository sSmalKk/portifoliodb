/**
 * blockstateRoutes.js
 * @description :: CRUD API routes for blockstate
 */

const express = require('express');
const router = express.Router();
const blockstateController = require('../../controller/admin/blockstateController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/blockstate/create').post(auth(PLATFORM.ADMIN),checkRolePermission,blockstateController.addBlockstate);
router.route('/admin/blockstate/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,blockstateController.bulkInsertBlockstate);
router.route('/admin/blockstate/list').post(auth(PLATFORM.ADMIN),checkRolePermission,blockstateController.findAllBlockstate);
router.route('/admin/blockstate/count').post(auth(PLATFORM.ADMIN),checkRolePermission,blockstateController.getBlockstateCount);
router.route('/admin/blockstate/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,blockstateController.getBlockstate);
router.route('/admin/blockstate/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,blockstateController.updateBlockstate);    
router.route('/admin/blockstate/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,blockstateController.partialUpdateBlockstate);
router.route('/admin/blockstate/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,blockstateController.bulkUpdateBlockstate);
router.route('/admin/blockstate/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,blockstateController.softDeleteBlockstate);
router.route('/admin/blockstate/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,blockstateController.softDeleteManyBlockstate);
router.route('/admin/blockstate/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,blockstateController.deleteBlockstate);
router.route('/admin/blockstate/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,blockstateController.deleteManyBlockstate);

module.exports = router;
