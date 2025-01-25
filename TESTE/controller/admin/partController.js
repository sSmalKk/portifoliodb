/**
 * partController.js
 * @description : exports action methods for part.
 */

const Part = require('../../model/part');
const partSchemaKey = require('../../utils/validation/partValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Part in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Part. {status, message, data}
 */ 
const addPart = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      partSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Part(dataToCreate);
    let createdPart = await dbService.create(Part,dataToCreate);
    return res.success({ data : createdPart });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Part in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Parts. {status, message, data}
 */
const bulkInsertPart = async (req,res)=>{
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
    let createdParts = await dbService.create(Part,dataToCreate);
    createdParts = { count: createdParts ? createdParts.length : 0 };
    return res.success({ data:{ count:createdParts.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Part from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Part(s). {status, message, data}
 */
const findAllPart = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      partSchemaKey.findFilterKeys,
      Part.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Part, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundParts = await dbService.paginate( Part,query,options);
    if (!foundParts || !foundParts.data || !foundParts.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundParts });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Part from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Part. {status, message, data}
 */
const getPart = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundPart = await dbService.findOne(Part,query, options);
    if (!foundPart){
      return res.recordNotFound();
    }
    return res.success({ data :foundPart });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Part.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getPartCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      partSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedPart = await dbService.count(Part,where);
    return res.success({ data : { count: countedPart } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Part with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Part.
 * @return {Object} : updated Part. {status, message, data}
 */
const updatePart = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      partSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedPart = await dbService.updateOne(Part,query,dataToUpdate);
    if (!updatedPart){
      return res.recordNotFound();
    }
    return res.success({ data :updatedPart });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Part with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Parts.
 * @return {Object} : updated Parts. {status, message, data}
 */
const bulkUpdatePart = async (req,res)=>{
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
    let updatedPart = await dbService.updateMany(Part,filter,dataToUpdate);
    if (!updatedPart){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedPart } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Part with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Part.
 * @return {obj} : updated Part. {status, message, data}
 */
const partialUpdatePart = async (req,res) => {
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
      partSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedPart = await dbService.updateOne(Part, query, dataToUpdate);
    if (!updatedPart) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedPart });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Part from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Part.
 * @return {Object} : deactivated Part. {status, message, data}
 */
const softDeletePart = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedPart = await dbService.updateOne(Part, query, updateBody);
    if (!updatedPart){
      return res.recordNotFound();
    }
    return res.success({ data:updatedPart });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Part from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Part. {status, message, data}
 */
const deletePart = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedPart = await dbService.deleteOne(Part, query);
    if (!deletedPart){
      return res.recordNotFound();
    }
    return res.success({ data :deletedPart });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Part in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyPart = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedPart = await dbService.deleteMany(Part,query);
    if (!deletedPart){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedPart } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Part from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Part.
 * @return {Object} : number of deactivated documents of Part. {status, message, data}
 */
const softDeleteManyPart = async (req,res) => {
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
    let updatedPart = await dbService.updateMany(Part,query, updateBody);
    if (!updatedPart) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedPart } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addPart,
  bulkInsertPart,
  findAllPart,
  getPart,
  getPartCount,
  updatePart,
  bulkUpdatePart,
  partialUpdatePart,
  softDeletePart,
  deletePart,
  deleteManyPart,
  softDeleteManyPart    
};