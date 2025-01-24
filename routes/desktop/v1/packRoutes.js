/**
 * packRoutes.js
 * @description :: CRUD API routes for pack
 */

const express = require('express');
const router = express.Router();
const packController = require('../../../controller/desktop/v1/packController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/desktop/api/v1/pack/create').post(packController.addPack);
router.route('/desktop/api/v1/pack/list').post(packController.findAllPack);
router.route('/desktop/api/v1/pack/count').post(packController.getPackCount);
router.route('/desktop/api/v1/pack/:id').get(packController.getPack);
router.route('/desktop/api/v1/pack/update/:id').put(packController.updatePack);    
router.route('/desktop/api/v1/pack/partial-update/:id').put(packController.partialUpdatePack);
router.route('/desktop/api/v1/pack/softDelete/:id').put(packController.softDeletePack);
router.route('/desktop/api/v1/pack/softDeleteMany').put(packController.softDeleteManyPack);
router.route('/desktop/api/v1/pack/addBulk').post(packController.bulkInsertPack);
router.route('/desktop/api/v1/pack/updateBulk').put(packController.bulkUpdatePack);
router.route('/desktop/api/v1/pack/delete/:id').delete(packController.deletePack);
router.route('/desktop/api/v1/pack/deleteMany').post(packController.deleteManyPack);

module.exports = router;
