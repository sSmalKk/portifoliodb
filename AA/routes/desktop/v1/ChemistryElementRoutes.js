/**
 * ChemistryElementRoutes.js
 * @description :: CRUD API routes for ChemistryElement
 */

const express = require('express');
const router = express.Router();
const ChemistryElementController = require('../../../controller/desktop/v1/ChemistryElementController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/desktop/api/v1/chemistryelement/create').post(ChemistryElementController.addChemistryElement);
router.route('/desktop/api/v1/chemistryelement/list').post(ChemistryElementController.findAllChemistryElement);
router.route('/desktop/api/v1/chemistryelement/count').post(ChemistryElementController.getChemistryElementCount);
router.route('/desktop/api/v1/chemistryelement/:id').get(ChemistryElementController.getChemistryElement);
router.route('/desktop/api/v1/chemistryelement/update/:id').put(ChemistryElementController.updateChemistryElement);    
router.route('/desktop/api/v1/chemistryelement/partial-update/:id').put(ChemistryElementController.partialUpdateChemistryElement);
router.route('/desktop/api/v1/chemistryelement/softDelete/:id').put(ChemistryElementController.softDeleteChemistryElement);
router.route('/desktop/api/v1/chemistryelement/softDeleteMany').put(ChemistryElementController.softDeleteManyChemistryElement);
router.route('/desktop/api/v1/chemistryelement/addBulk').post(ChemistryElementController.bulkInsertChemistryElement);
router.route('/desktop/api/v1/chemistryelement/updateBulk').put(ChemistryElementController.bulkUpdateChemistryElement);
router.route('/desktop/api/v1/chemistryelement/delete/:id').delete(ChemistryElementController.deleteChemistryElement);
router.route('/desktop/api/v1/chemistryelement/deleteMany').post(ChemistryElementController.deleteManyChemistryElement);

module.exports = router;
