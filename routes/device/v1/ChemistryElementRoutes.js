/**
 * ChemistryElementRoutes.js
 * @description :: CRUD API routes for ChemistryElement
 */

const express = require('express');
const router = express.Router();
const ChemistryElementController = require('../../../controller/device/v1/ChemistryElementController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/chemistryelement/create').post(auth(PLATFORM.DEVICE),checkRolePermission,ChemistryElementController.addChemistryElement);
router.route('/device/api/v1/chemistryelement/list').post(auth(PLATFORM.DEVICE),checkRolePermission,ChemistryElementController.findAllChemistryElement);
router.route('/device/api/v1/chemistryelement/count').post(auth(PLATFORM.DEVICE),checkRolePermission,ChemistryElementController.getChemistryElementCount);
router.route('/device/api/v1/chemistryelement/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,ChemistryElementController.getChemistryElement);
router.route('/device/api/v1/chemistryelement/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,ChemistryElementController.updateChemistryElement);    
router.route('/device/api/v1/chemistryelement/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,ChemistryElementController.partialUpdateChemistryElement);
router.route('/device/api/v1/chemistryelement/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,ChemistryElementController.softDeleteChemistryElement);
router.route('/device/api/v1/chemistryelement/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,ChemistryElementController.softDeleteManyChemistryElement);
router.route('/device/api/v1/chemistryelement/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,ChemistryElementController.bulkInsertChemistryElement);
router.route('/device/api/v1/chemistryelement/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,ChemistryElementController.bulkUpdateChemistryElement);
router.route('/device/api/v1/chemistryelement/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,ChemistryElementController.deleteChemistryElement);
router.route('/device/api/v1/chemistryelement/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,ChemistryElementController.deleteManyChemistryElement);

module.exports = router;
