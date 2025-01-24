/**
 * langRoutes.js
 * @description :: CRUD API routes for lang
 */

const express = require('express');
const router = express.Router();
const langController = require('../../../controller/client/v1/langController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/lang/create').post(auth(PLATFORM.CLIENT),checkRolePermission,langController.addLang);
router.route('/client/api/v1/lang/list').post(auth(PLATFORM.CLIENT),checkRolePermission,langController.findAllLang);
router.route('/client/api/v1/lang/count').post(auth(PLATFORM.CLIENT),checkRolePermission,langController.getLangCount);
router.route('/client/api/v1/lang/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,langController.getLang);
router.route('/client/api/v1/lang/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,langController.updateLang);    
router.route('/client/api/v1/lang/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,langController.partialUpdateLang);
router.route('/client/api/v1/lang/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,langController.softDeleteLang);
router.route('/client/api/v1/lang/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,langController.softDeleteManyLang);
router.route('/client/api/v1/lang/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,langController.bulkInsertLang);
router.route('/client/api/v1/lang/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,langController.bulkUpdateLang);
router.route('/client/api/v1/lang/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,langController.deleteLang);
router.route('/client/api/v1/lang/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,langController.deleteManyLang);

module.exports = router;
