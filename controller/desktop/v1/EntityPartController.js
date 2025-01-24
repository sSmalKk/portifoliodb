/**
 * EntityPartController.js
 * @description : exports action methods for EntityPart.
 */

const EntityPart = require('../../../model/EntityPart');
const EntityPartSchemaKey = require('../../../utils/validation/EntityPartValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
/**
 * @description : create document of EntityPart in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created EntityPart. {status, message, data}
 */ 
const addEntityPart = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      EntityPartSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new EntityPart(dataToCreate);
    let createdEntityPart = await dbService.create(EntityPart,dataToCreate);
    return res.success({ data : createdEntityPart });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of EntityPart in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created EntityParts. {status, message, data}
 */
const bulkInsertEntityPart = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    let createdEntityParts = await dbService.create(EntityPart,dataToCreate);
    createdEntityParts = { count: createdEntityParts ? createdEntityParts.length : 0 };
    return res.success({ data:{ count:createdEntityParts.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of EntityPart from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found EntityPart(s). {status, message, data}
 */
const findAllEntityPart = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      EntityPartSchemaKey.findFilterKeys,
      EntityPart.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(EntityPart, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundEntityParts = await dbService.paginate( EntityPart,query,options);
    if (!foundEntityParts || !foundEntityParts.data || !foundEntityParts.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundEntityParts });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of EntityPart from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found EntityPart. {status, message, data}
 */
const getEntityPart = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundEntityPart = await dbService.findOne(EntityPart,query, options);
    if (!foundEntityPart){
      return res.recordNotFound();
    }
    return res.success({ data :foundEntityPart });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of EntityPart.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getEntityPartCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      EntityPartSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedEntityPart = await dbService.count(EntityPart,where);
    return res.success({ data : { count: countedEntityPart } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of EntityPart with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated EntityPart.
 * @return {Object} : updated EntityPart. {status, message, data}
 */
const updateEntityPart = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      EntityPartSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedEntityPart = await dbService.updateOne(EntityPart,query,dataToUpdate);
    if (!updatedEntityPart){
      return res.recordNotFound();
    }
    return res.success({ data :updatedEntityPart });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of EntityPart with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated EntityParts.
 * @return {Object} : updated EntityParts. {status, message, data}
 */
const bulkUpdateEntityPart = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }
    let updatedEntityPart = await dbService.updateMany(EntityPart,filter,dataToUpdate);
    if (!updatedEntityPart){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedEntityPart } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of EntityPart with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated EntityPart.
 * @return {obj} : updated EntityPart. {status, message, data}
 */
const partialUpdateEntityPart = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      EntityPartSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedEntityPart = await dbService.updateOne(EntityPart, query, dataToUpdate);
    if (!updatedEntityPart) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedEntityPart });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of EntityPart from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of EntityPart.
 * @return {Object} : deactivated EntityPart. {status, message, data}
 */
const softDeleteEntityPart = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedEntityPart = await dbService.updateOne(EntityPart, query, updateBody);
    if (!updatedEntityPart){
      return res.recordNotFound();
    }
    return res.success({ data:updatedEntityPart });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of EntityPart from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted EntityPart. {status, message, data}
 */
const deleteEntityPart = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedEntityPart = await dbService.deleteOne(EntityPart, query);
    if (!deletedEntityPart){
      return res.recordNotFound();
    }
    return res.success({ data :deletedEntityPart });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of EntityPart in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyEntityPart = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedEntityPart = await dbService.deleteMany(EntityPart,query);
    if (!deletedEntityPart){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedEntityPart } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of EntityPart from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of EntityPart.
 * @return {Object} : number of deactivated documents of EntityPart. {status, message, data}
 */
const softDeleteManyEntityPart = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let updatedEntityPart = await dbService.updateMany(EntityPart,query, updateBody);
    if (!updatedEntityPart) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedEntityPart } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addEntityPart,
  bulkInsertEntityPart,
  findAllEntityPart,
  getEntityPart,
  getEntityPartCount,
  updateEntityPart,
  bulkUpdateEntityPart,
  partialUpdateEntityPart,
  softDeleteEntityPart,
  deleteEntityPart,
  deleteManyEntityPart,
  softDeleteManyEntityPart    
};