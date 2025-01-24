/**
 * EntityBodyController.js
 * @description : exports action methods for EntityBody.
 */

const EntityBody = require('../../../model/EntityBody');
const EntityBodySchemaKey = require('../../../utils/validation/EntityBodyValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
/**
 * @description : create document of EntityBody in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created EntityBody. {status, message, data}
 */ 
const addEntityBody = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      EntityBodySchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new EntityBody(dataToCreate);
    let createdEntityBody = await dbService.create(EntityBody,dataToCreate);
    return res.success({ data : createdEntityBody });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of EntityBody in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created EntityBodys. {status, message, data}
 */
const bulkInsertEntityBody = async (req,res)=>{
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
    let createdEntityBodys = await dbService.create(EntityBody,dataToCreate);
    createdEntityBodys = { count: createdEntityBodys ? createdEntityBodys.length : 0 };
    return res.success({ data:{ count:createdEntityBodys.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of EntityBody from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found EntityBody(s). {status, message, data}
 */
const findAllEntityBody = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      EntityBodySchemaKey.findFilterKeys,
      EntityBody.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(EntityBody, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundEntityBodys = await dbService.paginate( EntityBody,query,options);
    if (!foundEntityBodys || !foundEntityBodys.data || !foundEntityBodys.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundEntityBodys });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of EntityBody from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found EntityBody. {status, message, data}
 */
const getEntityBody = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundEntityBody = await dbService.findOne(EntityBody,query, options);
    if (!foundEntityBody){
      return res.recordNotFound();
    }
    return res.success({ data :foundEntityBody });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of EntityBody.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getEntityBodyCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      EntityBodySchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedEntityBody = await dbService.count(EntityBody,where);
    return res.success({ data : { count: countedEntityBody } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of EntityBody with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated EntityBody.
 * @return {Object} : updated EntityBody. {status, message, data}
 */
const updateEntityBody = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      EntityBodySchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedEntityBody = await dbService.updateOne(EntityBody,query,dataToUpdate);
    if (!updatedEntityBody){
      return res.recordNotFound();
    }
    return res.success({ data :updatedEntityBody });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of EntityBody with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated EntityBodys.
 * @return {Object} : updated EntityBodys. {status, message, data}
 */
const bulkUpdateEntityBody = async (req,res)=>{
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
    let updatedEntityBody = await dbService.updateMany(EntityBody,filter,dataToUpdate);
    if (!updatedEntityBody){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedEntityBody } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of EntityBody with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated EntityBody.
 * @return {obj} : updated EntityBody. {status, message, data}
 */
const partialUpdateEntityBody = async (req,res) => {
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
      EntityBodySchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedEntityBody = await dbService.updateOne(EntityBody, query, dataToUpdate);
    if (!updatedEntityBody) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedEntityBody });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of EntityBody from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of EntityBody.
 * @return {Object} : deactivated EntityBody. {status, message, data}
 */
const softDeleteEntityBody = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedEntityBody = await dbService.updateOne(EntityBody, query, updateBody);
    if (!updatedEntityBody){
      return res.recordNotFound();
    }
    return res.success({ data:updatedEntityBody });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of EntityBody from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted EntityBody. {status, message, data}
 */
const deleteEntityBody = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedEntityBody = await dbService.deleteOne(EntityBody, query);
    if (!deletedEntityBody){
      return res.recordNotFound();
    }
    return res.success({ data :deletedEntityBody });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of EntityBody in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyEntityBody = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedEntityBody = await dbService.deleteMany(EntityBody,query);
    if (!deletedEntityBody){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedEntityBody } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of EntityBody from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of EntityBody.
 * @return {Object} : number of deactivated documents of EntityBody. {status, message, data}
 */
const softDeleteManyEntityBody = async (req,res) => {
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
    let updatedEntityBody = await dbService.updateMany(EntityBody,query, updateBody);
    if (!updatedEntityBody) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedEntityBody } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addEntityBody,
  bulkInsertEntityBody,
  findAllEntityBody,
  getEntityBody,
  getEntityBodyCount,
  updateEntityBody,
  bulkUpdateEntityBody,
  partialUpdateEntityBody,
  softDeleteEntityBody,
  deleteEntityBody,
  deleteManyEntityBody,
  softDeleteManyEntityBody    
};