/**
 * sizeRoutes.js
 * @description :: CRUD API routes for size
 */

const express = require('express');
const router = express.Router();
const sizeController = require('../../../controller/client/v1/sizeController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/size/create').post(auth(PLATFORM.CLIENT),checkRolePermission,sizeController.addSize);
router.route('/client/api/v1/size/list').post(auth(PLATFORM.CLIENT),checkRolePermission,sizeController.findAllSize);
router.route('/client/api/v1/size/count').post(auth(PLATFORM.CLIENT),checkRolePermission,sizeController.getSizeCount);
router.route('/client/api/v1/size/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,sizeController.getSize);
router.route('/client/api/v1/size/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,sizeController.updateSize);    
router.route('/client/api/v1/size/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,sizeController.partialUpdateSize);
router.route('/client/api/v1/size/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,sizeController.softDeleteSize);
router.route('/client/api/v1/size/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,sizeController.softDeleteManySize);
router.route('/client/api/v1/size/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,sizeController.bulkInsertSize);
router.route('/client/api/v1/size/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,sizeController.bulkUpdateSize);
router.route('/client/api/v1/size/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,sizeController.deleteSize);
router.route('/client/api/v1/size/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,sizeController.deleteManySize);

module.exports = router;
