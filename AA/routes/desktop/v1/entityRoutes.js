/**
 * entityRoutes.js
 * @description :: CRUD API routes for entity
 */

const express = require('express');
const router = express.Router();
const entityController = require('../../../controller/desktop/v1/entityController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/desktop/api/v1/entity/create').post(entityController.addEntity);
router.route('/desktop/api/v1/entity/list').post(entityController.findAllEntity);
router.route('/desktop/api/v1/entity/count').post(entityController.getEntityCount);
router.route('/desktop/api/v1/entity/:id').get(entityController.getEntity);
router.route('/desktop/api/v1/entity/update/:id').put(entityController.updateEntity);    
router.route('/desktop/api/v1/entity/partial-update/:id').put(entityController.partialUpdateEntity);
router.route('/desktop/api/v1/entity/softDelete/:id').put(entityController.softDeleteEntity);
router.route('/desktop/api/v1/entity/softDeleteMany').put(entityController.softDeleteManyEntity);
router.route('/desktop/api/v1/entity/addBulk').post(entityController.bulkInsertEntity);
router.route('/desktop/api/v1/entity/updateBulk').put(entityController.bulkUpdateEntity);
router.route('/desktop/api/v1/entity/delete/:id').delete(entityController.deleteEntity);
router.route('/desktop/api/v1/entity/deleteMany').post(entityController.deleteManyEntity);

module.exports = router;
