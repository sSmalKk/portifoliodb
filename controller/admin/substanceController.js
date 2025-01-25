/**
 * substanceController.js
 * @description : exports action methods for substance.
 */

const Substance = require('../../model/substance');
const substanceSchemaKey = require('../../utils/validation/substanceValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Substance in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Substance. {status, message, data}
 */ 
const addSubstance = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      substanceSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new Substance(dataToCreate);
    let createdSubstance = await dbService.create(Substance,dataToCreate);
    return res.success({ data : createdSubstance });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Substance in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Substances. {status, message, data}
 */
const bulkInsertSubstance = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    let createdSubstances = await dbService.create(Substance,dataToCreate);
    createdSubstances = { count: createdSubstances ? createdSubstances.length : 0 };
    return res.success({ data:{ count:createdSubstances.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Substance from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Substance(s). {status, message, data}
 */
const findAllSubstance = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      substanceSchemaKey.findFilterKeys,
      Substance.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Substance, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundSubstances = await dbService.paginate( Substance,query,options);
    if (!foundSubstances || !foundSubstances.data || !foundSubstances.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundSubstances });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Substance from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Substance. {status, message, data}
 */
const getSubstance = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundSubstance = await dbService.findOne(Substance,query, options);
    if (!foundSubstance){
      return res.recordNotFound();
    }
    return res.success({ data :foundSubstance });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Substance.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getSubstanceCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      substanceSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedSubstance = await dbService.count(Substance,where);
    return res.success({ data : { count: countedSubstance } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Substance with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Substance.
 * @return {Object} : updated Substance. {status, message, data}
 */
const updateSubstance = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      substanceSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedSubstance = await dbService.updateOne(Substance,query,dataToUpdate);
    if (!updatedSubstance){
      return res.recordNotFound();
    }
    return res.success({ data :updatedSubstance });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Substance with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Substances.
 * @return {Object} : updated Substances. {status, message, data}
 */
const bulkUpdateSubstance = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }
    let updatedSubstance = await dbService.updateMany(Substance,filter,dataToUpdate);
    if (!updatedSubstance){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedSubstance } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Substance with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Substance.
 * @return {obj} : updated Substance. {status, message, data}
 */
const partialUpdateSubstance = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      substanceSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedSubstance = await dbService.updateOne(Substance, query, dataToUpdate);
    if (!updatedSubstance) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedSubstance });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Substance from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Substance.
 * @return {Object} : deactivated Substance. {status, message, data}
 */
const softDeleteSubstance = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedSubstance = await dbService.updateOne(Substance, query, updateBody);
    if (!updatedSubstance){
      return res.recordNotFound();
    }
    return res.success({ data:updatedSubstance });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Substance from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Substance. {status, message, data}
 */
const deleteSubstance = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedSubstance = await dbService.deleteOne(Substance, query);
    if (!deletedSubstance){
      return res.recordNotFound();
    }
    return res.success({ data :deletedSubstance });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Substance in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManySubstance = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedSubstance = await dbService.deleteMany(Substance,query);
    if (!deletedSubstance){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedSubstance } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Substance from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Substance.
 * @return {Object} : number of deactivated documents of Substance. {status, message, data}
 */
const softDeleteManySubstance = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let updatedSubstance = await dbService.updateMany(Substance,query, updateBody);
    if (!updatedSubstance) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedSubstance } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addSubstance,
  bulkInsertSubstance,
  findAllSubstance,
  getSubstance,
  getSubstanceCount,
  updateSubstance,
  bulkUpdateSubstance,
  partialUpdateSubstance,
  softDeleteSubstance,
  deleteSubstance,
  deleteManySubstance,
  softDeleteManySubstance    
};