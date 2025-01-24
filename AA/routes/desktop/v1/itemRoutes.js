/**
 * itemRoutes.js
 * @description :: CRUD API routes for item
 */

const express = require('express');
const router = express.Router();
const itemController = require('../../../controller/desktop/v1/itemController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/desktop/api/v1/item/create').post(itemController.addItem);
router.route('/desktop/api/v1/item/list').post(itemController.findAllItem);
router.route('/desktop/api/v1/item/count').post(itemController.getItemCount);
router.route('/desktop/api/v1/item/:id').get(itemController.getItem);
router.route('/desktop/api/v1/item/update/:id').put(itemController.updateItem);    
router.route('/desktop/api/v1/item/partial-update/:id').put(itemController.partialUpdateItem);
router.route('/desktop/api/v1/item/softDelete/:id').put(itemController.softDeleteItem);
router.route('/desktop/api/v1/item/softDeleteMany').put(itemController.softDeleteManyItem);
router.route('/desktop/api/v1/item/addBulk').post(itemController.bulkInsertItem);
router.route('/desktop/api/v1/item/updateBulk').put(itemController.bulkUpdateItem);
router.route('/desktop/api/v1/item/delete/:id').delete(itemController.deleteItem);
router.route('/desktop/api/v1/item/deleteMany').post(itemController.deleteManyItem);

module.exports = router;
