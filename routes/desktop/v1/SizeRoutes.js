/**
 * SizeRoutes.js
 * @description :: CRUD API routes for Size
 */

const express = require('express');
const router = express.Router();
const SizeController = require('../../../controller/desktop/v1/SizeController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/desktop/api/v1/size/create').post(SizeController.addSize);
router.route('/desktop/api/v1/size/list').post(SizeController.findAllSize);
router.route('/desktop/api/v1/size/count').post(SizeController.getSizeCount);
router.route('/desktop/api/v1/size/:id').get(SizeController.getSize);
router.route('/desktop/api/v1/size/update/:id').put(SizeController.updateSize);    
router.route('/desktop/api/v1/size/partial-update/:id').put(SizeController.partialUpdateSize);
router.route('/desktop/api/v1/size/softDelete/:id').put(SizeController.softDeleteSize);
router.route('/desktop/api/v1/size/softDeleteMany').put(SizeController.softDeleteManySize);
router.route('/desktop/api/v1/size/addBulk').post(SizeController.bulkInsertSize);
router.route('/desktop/api/v1/size/updateBulk').put(SizeController.bulkUpdateSize);
router.route('/desktop/api/v1/size/delete/:id').delete(SizeController.deleteSize);
router.route('/desktop/api/v1/size/deleteMany').post(SizeController.deleteManySize);

module.exports = router;
