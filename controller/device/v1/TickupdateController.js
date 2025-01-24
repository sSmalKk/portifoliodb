/**
 * TickupdateController.js
 * @description : exports action methods for Tickupdate.
 */

const Tickupdate = require('../../../model/Tickupdate');
const TickupdateSchemaKey = require('../../../utils/validation/TickupdateValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Tickupdate in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Tickupdate. {status, message, data}
 */ 
const addTickupdate = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      TickupdateSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Tickupdate(dataToCreate);
    let createdTickupdate = await dbService.create(Tickupdate,dataToCreate);
    return res.success({ data : createdTickupdate });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Tickupdate in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Tickupdates. {status, message, data}
 */
const bulkInsertTickupdate = async (req,res)=>{
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
    let createdTickupdates = await dbService.create(Tickupdate,dataToCreate);
    createdTickupdates = { count: createdTickupdates ? createdTickupdates.length : 0 };
    return res.success({ data:{ count:createdTickupdates.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Tickupdate from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Tickupdate(s). {status, message, data}
 */
const findAllTickupdate = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      TickupdateSchemaKey.findFilterKeys,
      Tickupdate.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Tickupdate, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundTickupdates = await dbService.paginate( Tickupdate,query,options);
    if (!foundTickupdates || !foundTickupdates.data || !foundTickupdates.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundTickupdates });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Tickupdate from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Tickupdate. {status, message, data}
 */
const getTickupdate = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundTickupdate = await dbService.findOne(Tickupdate,query, options);
    if (!foundTickupdate){
      return res.recordNotFound();
    }
    return res.success({ data :foundTickupdate });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Tickupdate.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getTickupdateCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      TickupdateSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedTickupdate = await dbService.count(Tickupdate,where);
    return res.success({ data : { count: countedTickupdate } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Tickupdate with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Tickupdate.
 * @return {Object} : updated Tickupdate. {status, message, data}
 */
const updateTickupdate = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      TickupdateSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedTickupdate = await dbService.updateOne(Tickupdate,query,dataToUpdate);
    if (!updatedTickupdate){
      return res.recordNotFound();
    }
    return res.success({ data :updatedTickupdate });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Tickupdate with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Tickupdates.
 * @return {Object} : updated Tickupdates. {status, message, data}
 */
const bulkUpdateTickupdate = async (req,res)=>{
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
    let updatedTickupdate = await dbService.updateMany(Tickupdate,filter,dataToUpdate);
    if (!updatedTickupdate){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedTickupdate } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Tickupdate with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Tickupdate.
 * @return {obj} : updated Tickupdate. {status, message, data}
 */
const partialUpdateTickupdate = async (req,res) => {
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
      TickupdateSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedTickupdate = await dbService.updateOne(Tickupdate, query, dataToUpdate);
    if (!updatedTickupdate) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedTickupdate });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Tickupdate from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Tickupdate.
 * @return {Object} : deactivated Tickupdate. {status, message, data}
 */
const softDeleteTickupdate = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedTickupdate = await dbService.updateOne(Tickupdate, query, updateBody);
    if (!updatedTickupdate){
      return res.recordNotFound();
    }
    return res.success({ data:updatedTickupdate });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Tickupdate from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Tickupdate. {status, message, data}
 */
const deleteTickupdate = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedTickupdate = await dbService.deleteOne(Tickupdate, query);
    if (!deletedTickupdate){
      return res.recordNotFound();
    }
    return res.success({ data :deletedTickupdate });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Tickupdate in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyTickupdate = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedTickupdate = await dbService.deleteMany(Tickupdate,query);
    if (!deletedTickupdate){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedTickupdate } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Tickupdate from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Tickupdate.
 * @return {Object} : number of deactivated documents of Tickupdate. {status, message, data}
 */
const softDeleteManyTickupdate = async (req,res) => {
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
    let updatedTickupdate = await dbService.updateMany(Tickupdate,query, updateBody);
    if (!updatedTickupdate) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedTickupdate } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addTickupdate,
  bulkInsertTickupdate,
  findAllTickupdate,
  getTickupdate,
  getTickupdateCount,
  updateTickupdate,
  bulkUpdateTickupdate,
  partialUpdateTickupdate,
  softDeleteTickupdate,
  deleteTickupdate,
  deleteManyTickupdate,
  softDeleteManyTickupdate    
};