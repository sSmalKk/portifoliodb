/**
 * langController.js
 * @description : exports action methods for lang.
 */

const Lang = require('../../../model/lang');
const langSchemaKey = require('../../../utils/validation/langValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Lang in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Lang. {status, message, data}
 */ 
const addLang = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      langSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new Lang(dataToCreate);
    let createdLang = await dbService.create(Lang,dataToCreate);
    return res.success({ data : createdLang });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Lang in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Langs. {status, message, data}
 */
const bulkInsertLang = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    let createdLangs = await dbService.create(Lang,dataToCreate);
    createdLangs = { count: createdLangs ? createdLangs.length : 0 };
    return res.success({ data:{ count:createdLangs.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Lang from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Lang(s). {status, message, data}
 */
const findAllLang = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      langSchemaKey.findFilterKeys,
      Lang.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Lang, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundLangs = await dbService.paginate( Lang,query,options);
    if (!foundLangs || !foundLangs.data || !foundLangs.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundLangs });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Lang from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Lang. {status, message, data}
 */
const getLang = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundLang = await dbService.findOne(Lang,query, options);
    if (!foundLang){
      return res.recordNotFound();
    }
    return res.success({ data :foundLang });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Lang.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getLangCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      langSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedLang = await dbService.count(Lang,where);
    return res.success({ data : { count: countedLang } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Lang with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Lang.
 * @return {Object} : updated Lang. {status, message, data}
 */
const updateLang = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      langSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedLang = await dbService.updateOne(Lang,query,dataToUpdate);
    if (!updatedLang){
      return res.recordNotFound();
    }
    return res.success({ data :updatedLang });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Lang with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Langs.
 * @return {Object} : updated Langs. {status, message, data}
 */
const bulkUpdateLang = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }
    let updatedLang = await dbService.updateMany(Lang,filter,dataToUpdate);
    if (!updatedLang){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedLang } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Lang with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Lang.
 * @return {obj} : updated Lang. {status, message, data}
 */
const partialUpdateLang = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      langSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedLang = await dbService.updateOne(Lang, query, dataToUpdate);
    if (!updatedLang) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedLang });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Lang from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Lang.
 * @return {Object} : deactivated Lang. {status, message, data}
 */
const softDeleteLang = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedLang = await dbService.updateOne(Lang, query, updateBody);
    if (!updatedLang){
      return res.recordNotFound();
    }
    return res.success({ data:updatedLang });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Lang from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Lang. {status, message, data}
 */
const deleteLang = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedLang = await dbService.deleteOne(Lang, query);
    if (!deletedLang){
      return res.recordNotFound();
    }
    return res.success({ data :deletedLang });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Lang in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyLang = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedLang = await dbService.deleteMany(Lang,query);
    if (!deletedLang){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedLang } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Lang from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Lang.
 * @return {Object} : number of deactivated documents of Lang. {status, message, data}
 */
const softDeleteManyLang = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let updatedLang = await dbService.updateMany(Lang,query, updateBody);
    if (!updatedLang) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedLang } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addLang,
  bulkInsertLang,
  findAllLang,
  getLang,
  getLangCount,
  updateLang,
  bulkUpdateLang,
  partialUpdateLang,
  softDeleteLang,
  deleteLang,
  deleteManyLang,
  softDeleteManyLang    
};