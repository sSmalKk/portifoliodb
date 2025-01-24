/**
 * assetsController.js
 * @description : exports action methods for assets.
 */

const Assets = require('../../../model/assets');
const assetsSchemaKey = require('../../../utils/validation/assetsValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');
    
/**
 * @description : find all documents of Assets from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Assets(s). {status, message, data}
 */
const findAllAssets = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      assetsSchemaKey.findFilterKeys,
      Assets.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Assets, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundAssetss = await dbService.paginate( Assets,query,options);
    if (!foundAssetss || !foundAssetss.data || !foundAssetss.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundAssetss });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Assets from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Assets. {status, message, data}
 */
const getAssets = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundAssets = await dbService.findOne(Assets,query, options);
    if (!foundAssets){
      return res.recordNotFound();
    }
    return res.success({ data :foundAssets });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Assets.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getAssetsCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      assetsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedAssets = await dbService.count(Assets,where);
    return res.success({ data : { count: countedAssets } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

module.exports = {
  findAllAssets,
  getAssets,
  getAssetsCount    
};