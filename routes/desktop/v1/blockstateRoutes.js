/**
 * blockstateRoutes.js
 * @description :: CRUD API routes for blockstate
 */

const express = require('express');
const router = express.Router();
const blockstateController = require('../../../controller/desktop/v1/blockstateController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/desktop/api/v1/blockstate/create').post(blockstateController.addBlockstate);
router.route('/desktop/api/v1/blockstate/list').post(blockstateController.findAllBlockstate);
router.route('/desktop/api/v1/blockstate/count').post(blockstateController.getBlockstateCount);
router.route('/desktop/api/v1/blockstate/:id').get(blockstateController.getBlockstate);
router.route('/desktop/api/v1/blockstate/update/:id').put(blockstateController.updateBlockstate);    
router.route('/desktop/api/v1/blockstate/partial-update/:id').put(blockstateController.partialUpdateBlockstate);
router.route('/desktop/api/v1/blockstate/softDelete/:id').put(blockstateController.softDeleteBlockstate);
router.route('/desktop/api/v1/blockstate/softDeleteMany').put(blockstateController.softDeleteManyBlockstate);
router.route('/desktop/api/v1/blockstate/addBulk').post(blockstateController.bulkInsertBlockstate);
router.route('/desktop/api/v1/blockstate/updateBulk').put(blockstateController.bulkUpdateBlockstate);
router.route('/desktop/api/v1/blockstate/delete/:id').delete(blockstateController.deleteBlockstate);
router.route('/desktop/api/v1/blockstate/deleteMany').post(blockstateController.deleteManyBlockstate);

module.exports = router;
