/**
 * langRoutes.js
 * @description :: CRUD API routes for lang
 */

const express = require('express');
const router = express.Router();
const langController = require('../../../controller/device/v1/langController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/lang/create').post(auth(PLATFORM.DEVICE),checkRolePermission,langController.addLang);
router.route('/device/api/v1/lang/list').post(auth(PLATFORM.DEVICE),checkRolePermission,langController.findAllLang);
router.route('/device/api/v1/lang/count').post(auth(PLATFORM.DEVICE),checkRolePermission,langController.getLangCount);
router.route('/device/api/v1/lang/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,langController.getLang);
router.route('/device/api/v1/lang/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,langController.updateLang);    
router.route('/device/api/v1/lang/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,langController.partialUpdateLang);
router.route('/device/api/v1/lang/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,langController.softDeleteLang);
router.route('/device/api/v1/lang/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,langController.softDeleteManyLang);
router.route('/device/api/v1/lang/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,langController.bulkInsertLang);
router.route('/device/api/v1/lang/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,langController.bulkUpdateLang);
router.route('/device/api/v1/lang/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,langController.deleteLang);
router.route('/device/api/v1/lang/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,langController.deleteManyLang);

module.exports = router;
