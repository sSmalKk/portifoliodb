/**
 * entitybodyController.js
 * @description : exports action methods for entitybody.
 */

const Entitybody = require('../../model/entitybody');
const entitybodySchemaKey = require('../../utils/validation/entitybodyValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Entitybody in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Entitybody. {status, message, data}
 */ 
const addEntitybody = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      entitybodySchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Entitybody(dataToCreate);
    let createdEntitybody = await dbService.create(Entitybody,dataToCreate);
    return res.success({ data : createdEntitybody });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Entitybody in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Entitybodys. {status, message, data}
 */
const bulkInsertEntitybody = async (req,res)=>{
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
    let createdEntitybodys = await dbService.create(Entitybody,dataToCreate);
    createdEntitybodys = { count: createdEntitybodys ? createdEntitybodys.length : 0 };
    return res.success({ data:{ count:createdEntitybodys.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Entitybody from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Entitybody(s). {status, message, data}
 */
const findAllEntitybody = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      entitybodySchemaKey.findFilterKeys,
      Entitybody.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Entitybody, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundEntitybodys = await dbService.paginate( Entitybody,query,options);
    if (!foundEntitybodys || !foundEntitybodys.data || !foundEntitybodys.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundEntitybodys });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Entitybody from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Entitybody. {status, message, data}
 */
const getEntitybody = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundEntitybody = await dbService.findOne(Entitybody,query, options);
    if (!foundEntitybody){
      return res.recordNotFound();
    }
    return res.success({ data :foundEntitybody });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Entitybody.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getEntitybodyCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      entitybodySchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedEntitybody = await dbService.count(Entitybody,where);
    return res.success({ data : { count: countedEntitybody } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Entitybody with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Entitybody.
 * @return {Object} : updated Entitybody. {status, message, data}
 */
const updateEntitybody = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      entitybodySchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedEntitybody = await dbService.updateOne(Entitybody,query,dataToUpdate);
    if (!updatedEntitybody){
      return res.recordNotFound();
    }
    return res.success({ data :updatedEntitybody });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Entitybody with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Entitybodys.
 * @return {Object} : updated Entitybodys. {status, message, data}
 */
const bulkUpdateEntitybody = async (req,res)=>{
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
    let updatedEntitybody = await dbService.updateMany(Entitybody,filter,dataToUpdate);
    if (!updatedEntitybody){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedEntitybody } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Entitybody with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Entitybody.
 * @return {obj} : updated Entitybody. {status, message, data}
 */
const partialUpdateEntitybody = async (req,res) => {
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
      entitybodySchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedEntitybody = await dbService.updateOne(Entitybody, query, dataToUpdate);
    if (!updatedEntitybody) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedEntitybody });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Entitybody from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Entitybody.
 * @return {Object} : deactivated Entitybody. {status, message, data}
 */
const softDeleteEntitybody = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedEntitybody = await dbService.updateOne(Entitybody, query, updateBody);
    if (!updatedEntitybody){
      return res.recordNotFound();
    }
    return res.success({ data:updatedEntitybody });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Entitybody from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Entitybody. {status, message, data}
 */
const deleteEntitybody = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedEntitybody = await dbService.deleteOne(Entitybody, query);
    if (!deletedEntitybody){
      return res.recordNotFound();
    }
    return res.success({ data :deletedEntitybody });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Entitybody in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyEntitybody = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedEntitybody = await dbService.deleteMany(Entitybody,query);
    if (!deletedEntitybody){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedEntitybody } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Entitybody from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Entitybody.
 * @return {Object} : number of deactivated documents of Entitybody. {status, message, data}
 */
const softDeleteManyEntitybody = async (req,res) => {
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
    let updatedEntitybody = await dbService.updateMany(Entitybody,query, updateBody);
    if (!updatedEntitybody) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedEntitybody } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addEntitybody,
  bulkInsertEntitybody,
  findAllEntitybody,
  getEntitybody,
  getEntitybodyCount,
  updateEntitybody,
  bulkUpdateEntitybody,
  partialUpdateEntitybody,
  softDeleteEntitybody,
  deleteEntitybody,
  deleteManyEntitybody,
  softDeleteManyEntitybody    
};