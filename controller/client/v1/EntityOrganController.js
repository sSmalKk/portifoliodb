/**
 * EntityOrganController.js
 * @description : exports action methods for EntityOrgan.
 */

const EntityOrgan = require('../../../model/EntityOrgan');
const EntityOrganSchemaKey = require('../../../utils/validation/EntityOrganValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
/**
 * @description : create document of EntityOrgan in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created EntityOrgan. {status, message, data}
 */ 
const addEntityOrgan = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      EntityOrganSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new EntityOrgan(dataToCreate);
    let createdEntityOrgan = await dbService.create(EntityOrgan,dataToCreate);
    return res.success({ data : createdEntityOrgan });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of EntityOrgan in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created EntityOrgans. {status, message, data}
 */
const bulkInsertEntityOrgan = async (req,res)=>{
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
    let createdEntityOrgans = await dbService.create(EntityOrgan,dataToCreate);
    createdEntityOrgans = { count: createdEntityOrgans ? createdEntityOrgans.length : 0 };
    return res.success({ data:{ count:createdEntityOrgans.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of EntityOrgan from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found EntityOrgan(s). {status, message, data}
 */
const findAllEntityOrgan = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      EntityOrganSchemaKey.findFilterKeys,
      EntityOrgan.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(EntityOrgan, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundEntityOrgans = await dbService.paginate( EntityOrgan,query,options);
    if (!foundEntityOrgans || !foundEntityOrgans.data || !foundEntityOrgans.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundEntityOrgans });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of EntityOrgan from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found EntityOrgan. {status, message, data}
 */
const getEntityOrgan = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundEntityOrgan = await dbService.findOne(EntityOrgan,query, options);
    if (!foundEntityOrgan){
      return res.recordNotFound();
    }
    return res.success({ data :foundEntityOrgan });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of EntityOrgan.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getEntityOrganCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      EntityOrganSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedEntityOrgan = await dbService.count(EntityOrgan,where);
    return res.success({ data : { count: countedEntityOrgan } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of EntityOrgan with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated EntityOrgan.
 * @return {Object} : updated EntityOrgan. {status, message, data}
 */
const updateEntityOrgan = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      EntityOrganSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedEntityOrgan = await dbService.updateOne(EntityOrgan,query,dataToUpdate);
    if (!updatedEntityOrgan){
      return res.recordNotFound();
    }
    return res.success({ data :updatedEntityOrgan });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of EntityOrgan with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated EntityOrgans.
 * @return {Object} : updated EntityOrgans. {status, message, data}
 */
const bulkUpdateEntityOrgan = async (req,res)=>{
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
    let updatedEntityOrgan = await dbService.updateMany(EntityOrgan,filter,dataToUpdate);
    if (!updatedEntityOrgan){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedEntityOrgan } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of EntityOrgan with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated EntityOrgan.
 * @return {obj} : updated EntityOrgan. {status, message, data}
 */
const partialUpdateEntityOrgan = async (req,res) => {
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
      EntityOrganSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedEntityOrgan = await dbService.updateOne(EntityOrgan, query, dataToUpdate);
    if (!updatedEntityOrgan) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedEntityOrgan });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of EntityOrgan from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of EntityOrgan.
 * @return {Object} : deactivated EntityOrgan. {status, message, data}
 */
const softDeleteEntityOrgan = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedEntityOrgan = await dbService.updateOne(EntityOrgan, query, updateBody);
    if (!updatedEntityOrgan){
      return res.recordNotFound();
    }
    return res.success({ data:updatedEntityOrgan });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of EntityOrgan from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted EntityOrgan. {status, message, data}
 */
const deleteEntityOrgan = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedEntityOrgan = await dbService.deleteOne(EntityOrgan, query);
    if (!deletedEntityOrgan){
      return res.recordNotFound();
    }
    return res.success({ data :deletedEntityOrgan });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of EntityOrgan in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyEntityOrgan = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedEntityOrgan = await dbService.deleteMany(EntityOrgan,query);
    if (!deletedEntityOrgan){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedEntityOrgan } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of EntityOrgan from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of EntityOrgan.
 * @return {Object} : number of deactivated documents of EntityOrgan. {status, message, data}
 */
const softDeleteManyEntityOrgan = async (req,res) => {
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
    let updatedEntityOrgan = await dbService.updateMany(EntityOrgan,query, updateBody);
    if (!updatedEntityOrgan) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedEntityOrgan } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addEntityOrgan,
  bulkInsertEntityOrgan,
  findAllEntityOrgan,
  getEntityOrgan,
  getEntityOrganCount,
  updateEntityOrgan,
  bulkUpdateEntityOrgan,
  partialUpdateEntityOrgan,
  softDeleteEntityOrgan,
  deleteEntityOrgan,
  deleteManyEntityOrgan,
  softDeleteManyEntityOrgan    
};