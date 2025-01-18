/**
 * assetsController.js
 * @description : exports action methods for assets.
 */

const Assets = require('../../model/assets');
const assetsSchemaKey = require('../../utils/validation/assetsValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');
   
/**
 * @description : create document of Assets in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Assets. {status, message, data}
 */ 
const addAssets = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      assetsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Assets(dataToCreate);
    let createdAssets = await dbService.create(Assets,dataToCreate);
    return res.success({ data : createdAssets });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Assets in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Assetss. {status, message, data}
 */
const bulkInsertAssets = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    for (let i = 0;i < dataToCreate.length;i++){
      dataToCreate[i] = {
        ...dataToCreate[i],
        addedBy: req.user.id
      };
    }
    let createdAssetss = await dbService.create(Assets,dataToCreate);
    createdAssetss = { count: createdAssetss ? createdAssetss.length : 0 };
    return res.success({ data:{ count:createdAssetss.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
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
    
/**
 * @description : update document of Assets with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Assets.
 * @return {Object} : updated Assets. {status, message, data}
 */
const updateAssets = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      assetsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedAssets = await dbService.updateOne(Assets,query,dataToUpdate);
    if (!updatedAssets){
      return res.recordNotFound();
    }
    return res.success({ data :updatedAssets });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Assets with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Assetss.
 * @return {Object} : updated Assetss. {status, message, data}
 */
const bulkUpdateAssets = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    delete dataToUpdate['addedBy'];
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { 
        ...req.body.data,
        updatedBy : req.user.id
      };
    }
    let updatedAssets = await dbService.updateMany(Assets,filter,dataToUpdate);
    if (!updatedAssets){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedAssets } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Assets with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Assets.
 * @return {obj} : updated Assets. {status, message, data}
 */
const partialUpdateAssets = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    delete req.body['addedBy'];
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      assetsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedAssets = await dbService.updateOne(Assets, query, dataToUpdate);
    if (!updatedAssets) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedAssets });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Assets from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Assets.
 * @return {Object} : deactivated Assets. {status, message, data}
 */
const softDeleteAssets = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedAssets = await deleteDependentService.softDeleteAssets(query, updateBody);
    if (!updatedAssets){
      return res.recordNotFound();
    }
    return res.success({ data:updatedAssets });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Assets from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Assets. {status, message, data}
 */
const deleteAssets = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedAssets;
    if (req.body.isWarning) { 
      deletedAssets = await deleteDependentService.countAssets(query);
    } else {
      deletedAssets = await deleteDependentService.deleteAssets(query);
    }
    if (!deletedAssets){
      return res.recordNotFound();
    }
    return res.success({ data :deletedAssets });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Assets in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyAssets = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedAssets;
    if (req.body.isWarning) {
      deletedAssets = await deleteDependentService.countAssets(query);
    }
    else {
      deletedAssets = await deleteDependentService.deleteAssets(query);
    }
    if (!deletedAssets){
      return res.recordNotFound();
    }
    return res.success({ data :deletedAssets });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Assets from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Assets.
 * @return {Object} : number of deactivated documents of Assets. {status, message, data}
 */
const softDeleteManyAssets = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedAssets = await deleteDependentService.softDeleteAssets(query, updateBody);
    if (!updatedAssets) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedAssets });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addAssets,
  bulkInsertAssets,
  findAllAssets,
  getAssets,
  getAssetsCount,
  updateAssets,
  bulkUpdateAssets,
  partialUpdateAssets,
  softDeleteAssets,
  deleteAssets,
  deleteManyAssets,
  softDeleteManyAssets    
};