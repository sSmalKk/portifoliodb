/**
 * MaterialRoutes.js
 * @description :: CRUD API routes for Material
 */

const express = require('express');
const router = express.Router();
const MaterialController = require('../../../controller/desktop/v1/MaterialController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/desktop/api/v1/material/create').post(MaterialController.addMaterial);
router.route('/desktop/api/v1/material/list').post(MaterialController.findAllMaterial);
router.route('/desktop/api/v1/material/count').post(MaterialController.getMaterialCount);
router.route('/desktop/api/v1/material/:id').get(MaterialController.getMaterial);
router.route('/desktop/api/v1/material/update/:id').put(MaterialController.updateMaterial);    
router.route('/desktop/api/v1/material/partial-update/:id').put(MaterialController.partialUpdateMaterial);
router.route('/desktop/api/v1/material/softDelete/:id').put(MaterialController.softDeleteMaterial);
router.route('/desktop/api/v1/material/softDeleteMany').put(MaterialController.softDeleteManyMaterial);
router.route('/desktop/api/v1/material/addBulk').post(MaterialController.bulkInsertMaterial);
router.route('/desktop/api/v1/material/updateBulk').put(MaterialController.bulkUpdateMaterial);
router.route('/desktop/api/v1/material/delete/:id').delete(MaterialController.deleteMaterial);
router.route('/desktop/api/v1/material/deleteMany').post(MaterialController.deleteManyMaterial);

module.exports = router;
