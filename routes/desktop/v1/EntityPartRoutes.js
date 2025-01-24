/**
 * EntityPartRoutes.js
 * @description :: CRUD API routes for EntityPart
 */

const express = require('express');
const router = express.Router();
const EntityPartController = require('../../../controller/desktop/v1/EntityPartController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/desktop/api/v1/entitypart/create').post(EntityPartController.addEntityPart);
router.route('/desktop/api/v1/entitypart/list').post(EntityPartController.findAllEntityPart);
router.route('/desktop/api/v1/entitypart/count').post(EntityPartController.getEntityPartCount);
router.route('/desktop/api/v1/entitypart/:id').get(EntityPartController.getEntityPart);
router.route('/desktop/api/v1/entitypart/update/:id').put(EntityPartController.updateEntityPart);    
router.route('/desktop/api/v1/entitypart/partial-update/:id').put(EntityPartController.partialUpdateEntityPart);
router.route('/desktop/api/v1/entitypart/softDelete/:id').put(EntityPartController.softDeleteEntityPart);
router.route('/desktop/api/v1/entitypart/softDeleteMany').put(EntityPartController.softDeleteManyEntityPart);
router.route('/desktop/api/v1/entitypart/addBulk').post(EntityPartController.bulkInsertEntityPart);
router.route('/desktop/api/v1/entitypart/updateBulk').put(EntityPartController.bulkUpdateEntityPart);
router.route('/desktop/api/v1/entitypart/delete/:id').delete(EntityPartController.deleteEntityPart);
router.route('/desktop/api/v1/entitypart/deleteMany').post(EntityPartController.deleteManyEntityPart);

module.exports = router;
