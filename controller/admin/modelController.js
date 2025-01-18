/**
 * modelController.js
 * @description : exports action methods for model.
 */

const Model = require('../../model/model');
const modelSchemaKey = require('../../utils/validation/modelValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Model in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Model. {status, message, data}
 */ 
const addModel = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      modelSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Model(dataToCreate);
    let createdModel = await dbService.create(Model,dataToCreate);
    return res.success({ data : createdModel });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Model in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Models. {status, message, data}
 */
const bulkInsertModel = async (req,res)=>{
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
    let createdModels = await dbService.create(Model,dataToCreate);
    createdModels = { count: createdModels ? createdModels.length : 0 };
    return res.success({ data:{ count:createdModels.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Model from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Model(s). {status, message, data}
 */
const findAllModel = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      modelSchemaKey.findFilterKeys,
      Model.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Model, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundModels = await dbService.paginate( Model,query,options);
    if (!foundModels || !foundModels.data || !foundModels.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundModels });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Model from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Model. {status, message, data}
 */
const getModel = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundModel = await dbService.findOne(Model,query, options);
    if (!foundModel){
      return res.recordNotFound();
    }
    return res.success({ data :foundModel });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Model.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getModelCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      modelSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedModel = await dbService.count(Model,where);
    return res.success({ data : { count: countedModel } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Model with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Model.
 * @return {Object} : updated Model. {status, message, data}
 */
const updateModel = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      modelSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedModel = await dbService.updateOne(Model,query,dataToUpdate);
    if (!updatedModel){
      return res.recordNotFound();
    }
    return res.success({ data :updatedModel });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Model with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Models.
 * @return {Object} : updated Models. {status, message, data}
 */
const bulkUpdateModel = async (req,res)=>{
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
    let updatedModel = await dbService.updateMany(Model,filter,dataToUpdate);
    if (!updatedModel){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedModel } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Model with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Model.
 * @return {obj} : updated Model. {status, message, data}
 */
const partialUpdateModel = async (req,res) => {
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
      modelSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedModel = await dbService.updateOne(Model, query, dataToUpdate);
    if (!updatedModel) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedModel });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Model from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Model.
 * @return {Object} : deactivated Model. {status, message, data}
 */
const softDeleteModel = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedModel = await dbService.updateOne(Model, query, updateBody);
    if (!updatedModel){
      return res.recordNotFound();
    }
    return res.success({ data:updatedModel });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Model from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Model. {status, message, data}
 */
const deleteModel = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedModel = await dbService.deleteOne(Model, query);
    if (!deletedModel){
      return res.recordNotFound();
    }
    return res.success({ data :deletedModel });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Model in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyModel = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedModel = await dbService.deleteMany(Model,query);
    if (!deletedModel){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedModel } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Model from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Model.
 * @return {Object} : number of deactivated documents of Model. {status, message, data}
 */
const softDeleteManyModel = async (req,res) => {
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
    let updatedModel = await dbService.updateMany(Model,query, updateBody);
    if (!updatedModel) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedModel } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addModel,
  bulkInsertModel,
  findAllModel,
  getModel,
  getModelCount,
  updateModel,
  bulkUpdateModel,
  partialUpdateModel,
  softDeleteModel,
  deleteModel,
  deleteManyModel,
  softDeleteManyModel    
};