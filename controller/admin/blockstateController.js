/**
 * blockstateController.js
 * @description : exports action methods for blockstate.
 */

const Blockstate = require('../../model/blockstate');
const blockstateSchemaKey = require('../../utils/validation/blockstateValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');
   
/**
 * @description : create document of Blockstate in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Blockstate. {status, message, data}
 */ 
const addBlockstate = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      blockstateSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Blockstate(dataToCreate);

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Blockstate,[ 'state' ],dataToCreate,'INSERT');
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let createdBlockstate = await dbService.create(Blockstate,dataToCreate);
    return res.success({ data : createdBlockstate });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Blockstate in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Blockstates. {status, message, data}
 */
const bulkInsertBlockstate = async (req,res)=>{
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

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Blockstate,[ 'state' ],dataToCreate,'BULK_INSERT');
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let createdBlockstates = await dbService.create(Blockstate,dataToCreate);
    createdBlockstates = { count: createdBlockstates ? createdBlockstates.length : 0 };
    return res.success({ data:{ count:createdBlockstates.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Blockstate from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Blockstate(s). {status, message, data}
 */
const findAllBlockstate = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      blockstateSchemaKey.findFilterKeys,
      Blockstate.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Blockstate, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundBlockstates = await dbService.paginate( Blockstate,query,options);
    if (!foundBlockstates || !foundBlockstates.data || !foundBlockstates.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundBlockstates });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Blockstate from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Blockstate. {status, message, data}
 */
const getBlockstate = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundBlockstate = await dbService.findOne(Blockstate,query, options);
    if (!foundBlockstate){
      return res.recordNotFound();
    }
    return res.success({ data :foundBlockstate });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Blockstate.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getBlockstateCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      blockstateSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedBlockstate = await dbService.count(Blockstate,where);
    return res.success({ data : { count: countedBlockstate } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Blockstate with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Blockstate.
 * @return {Object} : updated Blockstate. {status, message, data}
 */
const updateBlockstate = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      blockstateSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Blockstate,[ 'state' ],dataToUpdate,'UPDATE', query);
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let updatedBlockstate = await dbService.updateOne(Blockstate,query,dataToUpdate);
    if (!updatedBlockstate){
      return res.recordNotFound();
    }
    return res.success({ data :updatedBlockstate });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Blockstate with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Blockstates.
 * @return {Object} : updated Blockstates. {status, message, data}
 */
const bulkUpdateBlockstate = async (req,res)=>{
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

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Blockstate,[ 'state' ],dataToUpdate,'BULK_UPDATE', filter);
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let updatedBlockstate = await dbService.updateMany(Blockstate,filter,dataToUpdate);
    if (!updatedBlockstate){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedBlockstate } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Blockstate with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Blockstate.
 * @return {obj} : updated Blockstate. {status, message, data}
 */
const partialUpdateBlockstate = async (req,res) => {
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
      blockstateSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Blockstate,[ 'state' ],dataToUpdate,'UPDATE', query);
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let updatedBlockstate = await dbService.updateOne(Blockstate, query, dataToUpdate);
    if (!updatedBlockstate) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedBlockstate });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Blockstate from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Blockstate.
 * @return {Object} : deactivated Blockstate. {status, message, data}
 */
const softDeleteBlockstate = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedBlockstate = await deleteDependentService.softDeleteBlockstate(query, updateBody);
    if (!updatedBlockstate){
      return res.recordNotFound();
    }
    return res.success({ data:updatedBlockstate });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Blockstate from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Blockstate. {status, message, data}
 */
const deleteBlockstate = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedBlockstate;
    if (req.body.isWarning) { 
      deletedBlockstate = await deleteDependentService.countBlockstate(query);
    } else {
      deletedBlockstate = await deleteDependentService.deleteBlockstate(query);
    }
    if (!deletedBlockstate){
      return res.recordNotFound();
    }
    return res.success({ data :deletedBlockstate });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Blockstate in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyBlockstate = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedBlockstate;
    if (req.body.isWarning) {
      deletedBlockstate = await deleteDependentService.countBlockstate(query);
    }
    else {
      deletedBlockstate = await deleteDependentService.deleteBlockstate(query);
    }
    if (!deletedBlockstate){
      return res.recordNotFound();
    }
    return res.success({ data :deletedBlockstate });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Blockstate from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Blockstate.
 * @return {Object} : number of deactivated documents of Blockstate. {status, message, data}
 */
const softDeleteManyBlockstate = async (req,res) => {
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
    let updatedBlockstate = await deleteDependentService.softDeleteBlockstate(query, updateBody);
    if (!updatedBlockstate) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedBlockstate });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addBlockstate,
  bulkInsertBlockstate,
  findAllBlockstate,
  getBlockstate,
  getBlockstateCount,
  updateBlockstate,
  bulkUpdateBlockstate,
  partialUpdateBlockstate,
  softDeleteBlockstate,
  deleteBlockstate,
  deleteManyBlockstate,
  softDeleteManyBlockstate    
};