/**
 * substanceRoutes.js
 * @description :: CRUD API routes for substance
 */

const express = require('express');
const router = express.Router();
const substanceController = require('../../../controller/client/v1/substanceController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/substance/list').post(auth(PLATFORM.CLIENT),checkRolePermission,substanceController.findAllSubstance);
router.route('/client/api/v1/substance/count').post(auth(PLATFORM.CLIENT),checkRolePermission,substanceController.getSubstanceCount);
router.route('/client/api/v1/substance/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,substanceController.getSubstance);

module.exports = router;
