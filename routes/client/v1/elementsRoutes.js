/**
 * elementsRoutes.js
 * @description :: CRUD API routes for elements
 */

const express = require('express');
const router = express.Router();
const elementsController = require('../../../controller/client/v1/elementsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/elements/list').post(auth(PLATFORM.CLIENT),checkRolePermission,elementsController.findAllElements);
router.route('/client/api/v1/elements/count').post(auth(PLATFORM.CLIENT),checkRolePermission,elementsController.getElementsCount);
router.route('/client/api/v1/elements/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,elementsController.getElements);

module.exports = router;
