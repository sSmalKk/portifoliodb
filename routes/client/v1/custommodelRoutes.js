/**
 * custommodelRoutes.js
 * @description :: CRUD API routes for custommodel
 */

const express = require('express');
const router = express.Router();
const custommodelController = require('../../../controller/client/v1/custommodelController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/custommodel/list').post(auth(PLATFORM.CLIENT),checkRolePermission,custommodelController.findAllCustommodel);
router.route('/client/api/v1/custommodel/count').post(auth(PLATFORM.CLIENT),checkRolePermission,custommodelController.getCustommodelCount);
router.route('/client/api/v1/custommodel/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,custommodelController.getCustommodel);

module.exports = router;
