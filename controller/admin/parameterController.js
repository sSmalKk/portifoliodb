/**
 * parameterController.js
 * @description : exports action methods for parameter.
 */

const Parameter = require('../../model/parameter');
const parameterSchemaKey = require('../../utils/validation/parameterValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Parameter in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Parameter. {status, message, data}
 */ 
const addParameter = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      parameterSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Parameter(dataToCreate);
    let createdParameter = await dbService.create(Parameter,dataToCreate);
    return res.success({ data : createdParameter });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Parameter in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Parameters. {status, message, data}
 */
const bulkInsertParameter = async (req,res)=>{
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
    let createdParameters = await dbService.create(Parameter,dataToCreate);
    createdParameters = { count: createdParameters ? createdParameters.length : 0 };
    return res.success({ data:{ count:createdParameters.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Parameter from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Parameter(s). {status, message, data}
 */
const findAllParameter = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      parameterSchemaKey.findFilterKeys,
      Parameter.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Parameter, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundParameters = await dbService.paginate( Parameter,query,options);
    if (!foundParameters || !foundParameters.data || !foundParameters.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundParameters });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Parameter from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Parameter. {status, message, data}
 */
const getParameter = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundParameter = await dbService.findOne(Parameter,query, options);
    if (!foundParameter){
      return res.recordNotFound();
    }
    return res.success({ data :foundParameter });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Parameter.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getParameterCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      parameterSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedParameter = await dbService.count(Parameter,where);
    return res.success({ data : { count: countedParameter } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Parameter with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Parameter.
 * @return {Object} : updated Parameter. {status, message, data}
 */
const updateParameter = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      parameterSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedParameter = await dbService.updateOne(Parameter,query,dataToUpdate);
    if (!updatedParameter){
      return res.recordNotFound();
    }
    return res.success({ data :updatedParameter });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Parameter with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Parameters.
 * @return {Object} : updated Parameters. {status, message, data}
 */
const bulkUpdateParameter = async (req,res)=>{
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
    let updatedParameter = await dbService.updateMany(Parameter,filter,dataToUpdate);
    if (!updatedParameter){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedParameter } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Parameter with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Parameter.
 * @return {obj} : updated Parameter. {status, message, data}
 */
const partialUpdateParameter = async (req,res) => {
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
      parameterSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedParameter = await dbService.updateOne(Parameter, query, dataToUpdate);
    if (!updatedParameter) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedParameter });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Parameter from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Parameter.
 * @return {Object} : deactivated Parameter. {status, message, data}
 */
const softDeleteParameter = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedParameter = await dbService.updateOne(Parameter, query, updateBody);
    if (!updatedParameter){
      return res.recordNotFound();
    }
    return res.success({ data:updatedParameter });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Parameter from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Parameter. {status, message, data}
 */
const deleteParameter = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedParameter = await dbService.deleteOne(Parameter, query);
    if (!deletedParameter){
      return res.recordNotFound();
    }
    return res.success({ data :deletedParameter });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Parameter in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyParameter = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedParameter = await dbService.deleteMany(Parameter,query);
    if (!deletedParameter){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedParameter } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Parameter from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Parameter.
 * @return {Object} : number of deactivated documents of Parameter. {status, message, data}
 */
const softDeleteManyParameter = async (req,res) => {
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
    let updatedParameter = await dbService.updateMany(Parameter,query, updateBody);
    if (!updatedParameter) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedParameter } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addParameter,
  bulkInsertParameter,
  findAllParameter,
  getParameter,
  getParameterCount,
  updateParameter,
  bulkUpdateParameter,
  partialUpdateParameter,
  softDeleteParameter,
  deleteParameter,
  deleteManyParameter,
  softDeleteManyParameter    
};