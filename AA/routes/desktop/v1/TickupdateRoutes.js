/**
 * TickupdateRoutes.js
 * @description :: CRUD API routes for Tickupdate
 */

const express = require('express');
const router = express.Router();
const TickupdateController = require('../../../controller/desktop/v1/TickupdateController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/desktop/api/v1/tickupdate/create').post(TickupdateController.addTickupdate);
router.route('/desktop/api/v1/tickupdate/list').post(TickupdateController.findAllTickupdate);
router.route('/desktop/api/v1/tickupdate/count').post(TickupdateController.getTickupdateCount);
router.route('/desktop/api/v1/tickupdate/:id').get(TickupdateController.getTickupdate);
router.route('/desktop/api/v1/tickupdate/update/:id').put(TickupdateController.updateTickupdate);    
router.route('/desktop/api/v1/tickupdate/partial-update/:id').put(TickupdateController.partialUpdateTickupdate);
router.route('/desktop/api/v1/tickupdate/softDelete/:id').put(TickupdateController.softDeleteTickupdate);
router.route('/desktop/api/v1/tickupdate/softDeleteMany').put(TickupdateController.softDeleteManyTickupdate);
router.route('/desktop/api/v1/tickupdate/addBulk').post(TickupdateController.bulkInsertTickupdate);
router.route('/desktop/api/v1/tickupdate/updateBulk').put(TickupdateController.bulkUpdateTickupdate);
router.route('/desktop/api/v1/tickupdate/delete/:id').delete(TickupdateController.deleteTickupdate);
router.route('/desktop/api/v1/tickupdate/deleteMany').post(TickupdateController.deleteManyTickupdate);

module.exports = router;
