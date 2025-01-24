/**
 * langRoutes.js
 * @description :: CRUD API routes for lang
 */

const express = require('express');
const router = express.Router();
const langController = require('../../../controller/desktop/v1/langController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/desktop/api/v1/lang/create').post(langController.addLang);
router.route('/desktop/api/v1/lang/list').post(langController.findAllLang);
router.route('/desktop/api/v1/lang/count').post(langController.getLangCount);
router.route('/desktop/api/v1/lang/:id').get(langController.getLang);
router.route('/desktop/api/v1/lang/update/:id').put(langController.updateLang);    
router.route('/desktop/api/v1/lang/partial-update/:id').put(langController.partialUpdateLang);
router.route('/desktop/api/v1/lang/softDelete/:id').put(langController.softDeleteLang);
router.route('/desktop/api/v1/lang/softDeleteMany').put(langController.softDeleteManyLang);
router.route('/desktop/api/v1/lang/addBulk').post(langController.bulkInsertLang);
router.route('/desktop/api/v1/lang/updateBulk').put(langController.bulkUpdateLang);
router.route('/desktop/api/v1/lang/delete/:id').delete(langController.deleteLang);
router.route('/desktop/api/v1/lang/deleteMany').post(langController.deleteManyLang);

module.exports = router;
