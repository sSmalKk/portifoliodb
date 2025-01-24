/**
 * entityController.js
 * @description : exports action methods for entity.
 */

const Entity = require('../../../model/entity');
const entitySchemaKey = require('../../../utils/validation/entityValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Entity in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Entity. {status, message, data}
 */ 
const addEntity = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      entitySchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new Entity(dataToCreate);
    let createdEntity = await dbService.create(Entity,dataToCreate);
    return res.success({ data : createdEntity });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Entity in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Entitys. {status, message, data}
 */
const bulkInsertEntity = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    let createdEntitys = await dbService.create(Entity,dataToCreate);
    createdEntitys = { count: createdEntitys ? createdEntitys.length : 0 };
    return res.success({ data:{ count:createdEntitys.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Entity from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Entity(s). {status, message, data}
 */
const findAllEntity = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      entitySchemaKey.findFilterKeys,
      Entity.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Entity, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundEntitys = await dbService.paginate( Entity,query,options);
    if (!foundEntitys || !foundEntitys.data || !foundEntitys.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundEntitys });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Entity from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Entity. {status, message, data}
 */
const getEntity = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundEntity = await dbService.findOne(Entity,query, options);
    if (!foundEntity){
      return res.recordNotFound();
    }
    return res.success({ data :foundEntity });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Entity.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getEntityCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      entitySchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedEntity = await dbService.count(Entity,where);
    return res.success({ data : { count: countedEntity } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Entity with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Entity.
 * @return {Object} : updated Entity. {status, message, data}
 */
const updateEntity = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      entitySchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedEntity = await dbService.updateOne(Entity,query,dataToUpdate);
    if (!updatedEntity){
      return res.recordNotFound();
    }
    return res.success({ data :updatedEntity });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Entity with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Entitys.
 * @return {Object} : updated Entitys. {status, message, data}
 */
const bulkUpdateEntity = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }
    let updatedEntity = await dbService.updateMany(Entity,filter,dataToUpdate);
    if (!updatedEntity){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedEntity } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Entity with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Entity.
 * @return {obj} : updated Entity. {status, message, data}
 */
const partialUpdateEntity = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      entitySchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedEntity = await dbService.updateOne(Entity, query, dataToUpdate);
    if (!updatedEntity) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedEntity });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Entity from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Entity.
 * @return {Object} : deactivated Entity. {status, message, data}
 */
const softDeleteEntity = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedEntity = await dbService.updateOne(Entity, query, updateBody);
    if (!updatedEntity){
      return res.recordNotFound();
    }
    return res.success({ data:updatedEntity });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Entity from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Entity. {status, message, data}
 */
const deleteEntity = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedEntity = await dbService.deleteOne(Entity, query);
    if (!deletedEntity){
      return res.recordNotFound();
    }
    return res.success({ data :deletedEntity });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Entity in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyEntity = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedEntity = await dbService.deleteMany(Entity,query);
    if (!deletedEntity){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedEntity } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Entity from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Entity.
 * @return {Object} : number of deactivated documents of Entity. {status, message, data}
 */
const softDeleteManyEntity = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let updatedEntity = await dbService.updateMany(Entity,query, updateBody);
    if (!updatedEntity) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedEntity } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addEntity,
  bulkInsertEntity,
  findAllEntity,
  getEntity,
  getEntityCount,
  updateEntity,
  bulkUpdateEntity,
  partialUpdateEntity,
  softDeleteEntity,
  deleteEntity,
  deleteManyEntity,
  softDeleteManyEntity    
};