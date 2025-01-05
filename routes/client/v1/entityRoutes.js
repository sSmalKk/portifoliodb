/**
 * entityRoutes.js
 * @description :: CRUD API routes for entity
 */

const express = require('express');
const router = express.Router();
const entityController = require('../../../controller/client/v1/entityController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/entity/list').post(auth(PLATFORM.CLIENT),checkRolePermission,entityController.findAllEntity);
router.route('/client/api/v1/entity/count').post(auth(PLATFORM.CLIENT),checkRolePermission,entityController.getEntityCount);
router.route('/client/api/v1/entity/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,entityController.getEntity);

module.exports = router;
