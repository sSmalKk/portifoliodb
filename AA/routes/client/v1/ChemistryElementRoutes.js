/**
 * ChemistryElementRoutes.js
 * @description :: CRUD API routes for ChemistryElement
 */

const express = require('express');
const router = express.Router();
const ChemistryElementController = require('../../../controller/client/v1/ChemistryElementController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/chemistryelement/create').post(auth(PLATFORM.CLIENT),checkRolePermission,ChemistryElementController.addChemistryElement);
router.route('/client/api/v1/chemistryelement/list').post(auth(PLATFORM.CLIENT),checkRolePermission,ChemistryElementController.findAllChemistryElement);
router.route('/client/api/v1/chemistryelement/count').post(auth(PLATFORM.CLIENT),checkRolePermission,ChemistryElementController.getChemistryElementCount);
router.route('/client/api/v1/chemistryelement/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,ChemistryElementController.getChemistryElement);
router.route('/client/api/v1/chemistryelement/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,ChemistryElementController.updateChemistryElement);    
router.route('/client/api/v1/chemistryelement/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,ChemistryElementController.partialUpdateChemistryElement);
router.route('/client/api/v1/chemistryelement/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,ChemistryElementController.softDeleteChemistryElement);
router.route('/client/api/v1/chemistryelement/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,ChemistryElementController.softDeleteManyChemistryElement);
router.route('/client/api/v1/chemistryelement/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,ChemistryElementController.bulkInsertChemistryElement);
router.route('/client/api/v1/chemistryelement/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,ChemistryElementController.bulkUpdateChemistryElement);
router.route('/client/api/v1/chemistryelement/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,ChemistryElementController.deleteChemistryElement);
router.route('/client/api/v1/chemistryelement/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,ChemistryElementController.deleteManyChemistryElement);

module.exports = router;
