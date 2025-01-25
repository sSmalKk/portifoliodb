/**
 * consoleController.js
 * @description : exports action methods for console.
 */

const Console = require('../../model/console');
const consoleSchemaKey = require('../../utils/validation/consoleValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Console in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Console. {status, message, data}
 */ 
const addConsole = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      consoleSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Console(dataToCreate);
    let createdConsole = await dbService.create(Console,dataToCreate);
    return res.success({ data : createdConsole });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Console in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Consoles. {status, message, data}
 */
const bulkInsertConsole = async (req,res)=>{
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
    let createdConsoles = await dbService.create(Console,dataToCreate);
    createdConsoles = { count: createdConsoles ? createdConsoles.length : 0 };
    return res.success({ data:{ count:createdConsoles.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Console from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Console(s). {status, message, data}
 */
const findAllConsole = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      consoleSchemaKey.findFilterKeys,
      Console.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Console, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundConsoles = await dbService.paginate( Console,query,options);
    if (!foundConsoles || !foundConsoles.data || !foundConsoles.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundConsoles });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Console from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Console. {status, message, data}
 */
const getConsole = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundConsole = await dbService.findOne(Console,query, options);
    if (!foundConsole){
      return res.recordNotFound();
    }
    return res.success({ data :foundConsole });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Console.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getConsoleCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      consoleSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedConsole = await dbService.count(Console,where);
    return res.success({ data : { count: countedConsole } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Console with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Console.
 * @return {Object} : updated Console. {status, message, data}
 */
const updateConsole = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      consoleSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedConsole = await dbService.updateOne(Console,query,dataToUpdate);
    if (!updatedConsole){
      return res.recordNotFound();
    }
    return res.success({ data :updatedConsole });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Console with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Consoles.
 * @return {Object} : updated Consoles. {status, message, data}
 */
const bulkUpdateConsole = async (req,res)=>{
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
    let updatedConsole = await dbService.updateMany(Console,filter,dataToUpdate);
    if (!updatedConsole){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedConsole } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Console with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Console.
 * @return {obj} : updated Console. {status, message, data}
 */
const partialUpdateConsole = async (req,res) => {
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
      consoleSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedConsole = await dbService.updateOne(Console, query, dataToUpdate);
    if (!updatedConsole) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedConsole });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Console from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Console.
 * @return {Object} : deactivated Console. {status, message, data}
 */
const softDeleteConsole = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedConsole = await dbService.updateOne(Console, query, updateBody);
    if (!updatedConsole){
      return res.recordNotFound();
    }
    return res.success({ data:updatedConsole });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Console from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Console. {status, message, data}
 */
const deleteConsole = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedConsole = await dbService.deleteOne(Console, query);
    if (!deletedConsole){
      return res.recordNotFound();
    }
    return res.success({ data :deletedConsole });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Console in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyConsole = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedConsole = await dbService.deleteMany(Console,query);
    if (!deletedConsole){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedConsole } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Console from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Console.
 * @return {Object} : number of deactivated documents of Console. {status, message, data}
 */
const softDeleteManyConsole = async (req,res) => {
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
    let updatedConsole = await dbService.updateMany(Console,query, updateBody);
    if (!updatedConsole) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedConsole } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addConsole,
  bulkInsertConsole,
  findAllConsole,
  getConsole,
  getConsoleCount,
  updateConsole,
  bulkUpdateConsole,
  partialUpdateConsole,
  softDeleteConsole,
  deleteConsole,
  deleteManyConsole,
  softDeleteManyConsole    
};