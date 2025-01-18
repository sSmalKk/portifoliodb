/**
 * tickController.js
 * @description : exports action methods for tick.
 */

const Tick = require('../../../model/tick');
const tickSchemaKey = require('../../../utils/validation/tickValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Tick in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Tick. {status, message, data}
 */ 
const addTick = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      tickSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Tick(dataToCreate);
    let createdTick = await dbService.create(Tick,dataToCreate);
    return res.success({ data : createdTick });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Tick in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Ticks. {status, message, data}
 */
const bulkInsertTick = async (req,res)=>{
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
    let createdTicks = await dbService.create(Tick,dataToCreate);
    createdTicks = { count: createdTicks ? createdTicks.length : 0 };
    return res.success({ data:{ count:createdTicks.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Tick from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Tick(s). {status, message, data}
 */
const findAllTick = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      tickSchemaKey.findFilterKeys,
      Tick.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Tick, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundTicks = await dbService.paginate( Tick,query,options);
    if (!foundTicks || !foundTicks.data || !foundTicks.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundTicks });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Tick from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Tick. {status, message, data}
 */
const getTick = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundTick = await dbService.findOne(Tick,query, options);
    if (!foundTick){
      return res.recordNotFound();
    }
    return res.success({ data :foundTick });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Tick.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getTickCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      tickSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedTick = await dbService.count(Tick,where);
    return res.success({ data : { count: countedTick } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Tick with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Tick.
 * @return {Object} : updated Tick. {status, message, data}
 */
const updateTick = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      tickSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedTick = await dbService.updateOne(Tick,query,dataToUpdate);
    if (!updatedTick){
      return res.recordNotFound();
    }
    return res.success({ data :updatedTick });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Tick with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Ticks.
 * @return {Object} : updated Ticks. {status, message, data}
 */
const bulkUpdateTick = async (req,res)=>{
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
    let updatedTick = await dbService.updateMany(Tick,filter,dataToUpdate);
    if (!updatedTick){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedTick } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Tick with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Tick.
 * @return {obj} : updated Tick. {status, message, data}
 */
const partialUpdateTick = async (req,res) => {
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
      tickSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedTick = await dbService.updateOne(Tick, query, dataToUpdate);
    if (!updatedTick) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedTick });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Tick from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Tick.
 * @return {Object} : deactivated Tick. {status, message, data}
 */
const softDeleteTick = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedTick = await dbService.updateOne(Tick, query, updateBody);
    if (!updatedTick){
      return res.recordNotFound();
    }
    return res.success({ data:updatedTick });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Tick from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Tick. {status, message, data}
 */
const deleteTick = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedTick = await dbService.deleteOne(Tick, query);
    if (!deletedTick){
      return res.recordNotFound();
    }
    return res.success({ data :deletedTick });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Tick in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyTick = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedTick = await dbService.deleteMany(Tick,query);
    if (!deletedTick){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedTick } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Tick from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Tick.
 * @return {Object} : number of deactivated documents of Tick. {status, message, data}
 */
const softDeleteManyTick = async (req,res) => {
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
    let updatedTick = await dbService.updateMany(Tick,query, updateBody);
    if (!updatedTick) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedTick } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addTick,
  bulkInsertTick,
  findAllTick,
  getTick,
  getTickCount,
  updateTick,
  bulkUpdateTick,
  partialUpdateTick,
  softDeleteTick,
  deleteTick,
  deleteManyTick,
  softDeleteManyTick    
};