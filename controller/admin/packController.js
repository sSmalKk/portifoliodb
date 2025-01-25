/**
 * packController.js
 * @description : exports action methods for pack.
 */

const Pack = require('../../model/pack');
const packSchemaKey = require('../../utils/validation/packValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Pack in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Pack. {status, message, data}
 */ 
const addPack = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      packSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Pack(dataToCreate);
    let createdPack = await dbService.create(Pack,dataToCreate);
    return res.success({ data : createdPack });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Pack in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Packs. {status, message, data}
 */
const bulkInsertPack = async (req,res)=>{
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
    let createdPacks = await dbService.create(Pack,dataToCreate);
    createdPacks = { count: createdPacks ? createdPacks.length : 0 };
    return res.success({ data:{ count:createdPacks.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Pack from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Pack(s). {status, message, data}
 */
const findAllPack = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      packSchemaKey.findFilterKeys,
      Pack.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Pack, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundPacks = await dbService.paginate( Pack,query,options);
    if (!foundPacks || !foundPacks.data || !foundPacks.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundPacks });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Pack from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Pack. {status, message, data}
 */
const getPack = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundPack = await dbService.findOne(Pack,query, options);
    if (!foundPack){
      return res.recordNotFound();
    }
    return res.success({ data :foundPack });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Pack.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getPackCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      packSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedPack = await dbService.count(Pack,where);
    return res.success({ data : { count: countedPack } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Pack with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Pack.
 * @return {Object} : updated Pack. {status, message, data}
 */
const updatePack = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      packSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedPack = await dbService.updateOne(Pack,query,dataToUpdate);
    if (!updatedPack){
      return res.recordNotFound();
    }
    return res.success({ data :updatedPack });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Pack with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Packs.
 * @return {Object} : updated Packs. {status, message, data}
 */
const bulkUpdatePack = async (req,res)=>{
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
    let updatedPack = await dbService.updateMany(Pack,filter,dataToUpdate);
    if (!updatedPack){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedPack } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Pack with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Pack.
 * @return {obj} : updated Pack. {status, message, data}
 */
const partialUpdatePack = async (req,res) => {
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
      packSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedPack = await dbService.updateOne(Pack, query, dataToUpdate);
    if (!updatedPack) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedPack });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Pack from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Pack.
 * @return {Object} : deactivated Pack. {status, message, data}
 */
const softDeletePack = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedPack = await dbService.updateOne(Pack, query, updateBody);
    if (!updatedPack){
      return res.recordNotFound();
    }
    return res.success({ data:updatedPack });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Pack from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Pack. {status, message, data}
 */
const deletePack = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedPack = await dbService.deleteOne(Pack, query);
    if (!deletedPack){
      return res.recordNotFound();
    }
    return res.success({ data :deletedPack });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Pack in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyPack = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedPack = await dbService.deleteMany(Pack,query);
    if (!deletedPack){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedPack } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Pack from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Pack.
 * @return {Object} : number of deactivated documents of Pack. {status, message, data}
 */
const softDeleteManyPack = async (req,res) => {
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
    let updatedPack = await dbService.updateMany(Pack,query, updateBody);
    if (!updatedPack) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedPack } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addPack,
  bulkInsertPack,
  findAllPack,
  getPack,
  getPackCount,
  updatePack,
  bulkUpdatePack,
  partialUpdatePack,
  softDeletePack,
  deletePack,
  deleteManyPack,
  softDeleteManyPack    
};