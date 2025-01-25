/**
 * OrganController.js
 * @description : exports action methods for Organ.
 */

const Organ = require('../../../model/Organ');
const OrganSchemaKey = require('../../../utils/validation/OrganValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Organ in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Organ. {status, message, data}
 */ 
const addOrgan = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      OrganSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Organ(dataToCreate);
    let createdOrgan = await dbService.create(Organ,dataToCreate);
    return res.success({ data : createdOrgan });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Organ in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Organs. {status, message, data}
 */
const bulkInsertOrgan = async (req,res)=>{
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
    let createdOrgans = await dbService.create(Organ,dataToCreate);
    createdOrgans = { count: createdOrgans ? createdOrgans.length : 0 };
    return res.success({ data:{ count:createdOrgans.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Organ from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Organ(s). {status, message, data}
 */
const findAllOrgan = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      OrganSchemaKey.findFilterKeys,
      Organ.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Organ, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundOrgans = await dbService.paginate( Organ,query,options);
    if (!foundOrgans || !foundOrgans.data || !foundOrgans.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundOrgans });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Organ from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Organ. {status, message, data}
 */
const getOrgan = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundOrgan = await dbService.findOne(Organ,query, options);
    if (!foundOrgan){
      return res.recordNotFound();
    }
    return res.success({ data :foundOrgan });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Organ.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getOrganCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      OrganSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedOrgan = await dbService.count(Organ,where);
    return res.success({ data : { count: countedOrgan } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Organ with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Organ.
 * @return {Object} : updated Organ. {status, message, data}
 */
const updateOrgan = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      OrganSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedOrgan = await dbService.updateOne(Organ,query,dataToUpdate);
    if (!updatedOrgan){
      return res.recordNotFound();
    }
    return res.success({ data :updatedOrgan });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Organ with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Organs.
 * @return {Object} : updated Organs. {status, message, data}
 */
const bulkUpdateOrgan = async (req,res)=>{
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
    let updatedOrgan = await dbService.updateMany(Organ,filter,dataToUpdate);
    if (!updatedOrgan){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedOrgan } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Organ with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Organ.
 * @return {obj} : updated Organ. {status, message, data}
 */
const partialUpdateOrgan = async (req,res) => {
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
      OrganSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedOrgan = await dbService.updateOne(Organ, query, dataToUpdate);
    if (!updatedOrgan) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedOrgan });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Organ from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Organ.
 * @return {Object} : deactivated Organ. {status, message, data}
 */
const softDeleteOrgan = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedOrgan = await dbService.updateOne(Organ, query, updateBody);
    if (!updatedOrgan){
      return res.recordNotFound();
    }
    return res.success({ data:updatedOrgan });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Organ from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Organ. {status, message, data}
 */
const deleteOrgan = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedOrgan = await dbService.deleteOne(Organ, query);
    if (!deletedOrgan){
      return res.recordNotFound();
    }
    return res.success({ data :deletedOrgan });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Organ in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyOrgan = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedOrgan = await dbService.deleteMany(Organ,query);
    if (!deletedOrgan){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedOrgan } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Organ from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Organ.
 * @return {Object} : number of deactivated documents of Organ. {status, message, data}
 */
const softDeleteManyOrgan = async (req,res) => {
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
    let updatedOrgan = await dbService.updateMany(Organ,query, updateBody);
    if (!updatedOrgan) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedOrgan } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addOrgan,
  bulkInsertOrgan,
  findAllOrgan,
  getOrgan,
  getOrganCount,
  updateOrgan,
  bulkUpdateOrgan,
  partialUpdateOrgan,
  softDeleteOrgan,
  deleteOrgan,
  deleteManyOrgan,
  softDeleteManyOrgan    
};