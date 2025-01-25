/**
 * turtleparameterController.js
 * @description : exports action methods for turtleparameter.
 */

const Turtleparameter = require('../../model/turtleparameter');
const turtleparameterSchemaKey = require('../../utils/validation/turtleparameterValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Turtleparameter in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Turtleparameter. {status, message, data}
 */ 
const addTurtleparameter = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      turtleparameterSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Turtleparameter(dataToCreate);
    let createdTurtleparameter = await dbService.create(Turtleparameter,dataToCreate);
    return res.success({ data : createdTurtleparameter });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Turtleparameter in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Turtleparameters. {status, message, data}
 */
const bulkInsertTurtleparameter = async (req,res)=>{
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
    let createdTurtleparameters = await dbService.create(Turtleparameter,dataToCreate);
    createdTurtleparameters = { count: createdTurtleparameters ? createdTurtleparameters.length : 0 };
    return res.success({ data:{ count:createdTurtleparameters.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Turtleparameter from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Turtleparameter(s). {status, message, data}
 */
const findAllTurtleparameter = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      turtleparameterSchemaKey.findFilterKeys,
      Turtleparameter.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Turtleparameter, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundTurtleparameters = await dbService.paginate( Turtleparameter,query,options);
    if (!foundTurtleparameters || !foundTurtleparameters.data || !foundTurtleparameters.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundTurtleparameters });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Turtleparameter from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Turtleparameter. {status, message, data}
 */
const getTurtleparameter = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundTurtleparameter = await dbService.findOne(Turtleparameter,query, options);
    if (!foundTurtleparameter){
      return res.recordNotFound();
    }
    return res.success({ data :foundTurtleparameter });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Turtleparameter.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getTurtleparameterCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      turtleparameterSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedTurtleparameter = await dbService.count(Turtleparameter,where);
    return res.success({ data : { count: countedTurtleparameter } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Turtleparameter with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Turtleparameter.
 * @return {Object} : updated Turtleparameter. {status, message, data}
 */
const updateTurtleparameter = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      turtleparameterSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedTurtleparameter = await dbService.updateOne(Turtleparameter,query,dataToUpdate);
    if (!updatedTurtleparameter){
      return res.recordNotFound();
    }
    return res.success({ data :updatedTurtleparameter });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Turtleparameter with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Turtleparameters.
 * @return {Object} : updated Turtleparameters. {status, message, data}
 */
const bulkUpdateTurtleparameter = async (req,res)=>{
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
    let updatedTurtleparameter = await dbService.updateMany(Turtleparameter,filter,dataToUpdate);
    if (!updatedTurtleparameter){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedTurtleparameter } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Turtleparameter with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Turtleparameter.
 * @return {obj} : updated Turtleparameter. {status, message, data}
 */
const partialUpdateTurtleparameter = async (req,res) => {
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
      turtleparameterSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedTurtleparameter = await dbService.updateOne(Turtleparameter, query, dataToUpdate);
    if (!updatedTurtleparameter) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedTurtleparameter });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Turtleparameter from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Turtleparameter.
 * @return {Object} : deactivated Turtleparameter. {status, message, data}
 */
const softDeleteTurtleparameter = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedTurtleparameter = await dbService.updateOne(Turtleparameter, query, updateBody);
    if (!updatedTurtleparameter){
      return res.recordNotFound();
    }
    return res.success({ data:updatedTurtleparameter });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Turtleparameter from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Turtleparameter. {status, message, data}
 */
const deleteTurtleparameter = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedTurtleparameter = await dbService.deleteOne(Turtleparameter, query);
    if (!deletedTurtleparameter){
      return res.recordNotFound();
    }
    return res.success({ data :deletedTurtleparameter });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Turtleparameter in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyTurtleparameter = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedTurtleparameter = await dbService.deleteMany(Turtleparameter,query);
    if (!deletedTurtleparameter){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedTurtleparameter } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Turtleparameter from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Turtleparameter.
 * @return {Object} : number of deactivated documents of Turtleparameter. {status, message, data}
 */
const softDeleteManyTurtleparameter = async (req,res) => {
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
    let updatedTurtleparameter = await dbService.updateMany(Turtleparameter,query, updateBody);
    if (!updatedTurtleparameter) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedTurtleparameter } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addTurtleparameter,
  bulkInsertTurtleparameter,
  findAllTurtleparameter,
  getTurtleparameter,
  getTurtleparameterCount,
  updateTurtleparameter,
  bulkUpdateTurtleparameter,
  partialUpdateTurtleparameter,
  softDeleteTurtleparameter,
  deleteTurtleparameter,
  deleteManyTurtleparameter,
  softDeleteManyTurtleparameter    
};