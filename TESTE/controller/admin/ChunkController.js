/**
 * ChunkController.js
 * @description : exports action methods for Chunk.
 */

const Chunk = require('../../model/Chunk');
const ChunkSchemaKey = require('../../utils/validation/ChunkValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Chunk in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Chunk. {status, message, data}
 */ 
const addChunk = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      ChunkSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Chunk(dataToCreate);
    let createdChunk = await dbService.create(Chunk,dataToCreate);
    return res.success({ data : createdChunk });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Chunk in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Chunks. {status, message, data}
 */
const bulkInsertChunk = async (req,res)=>{
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
    let createdChunks = await dbService.create(Chunk,dataToCreate);
    createdChunks = { count: createdChunks ? createdChunks.length : 0 };
    return res.success({ data:{ count:createdChunks.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Chunk from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Chunk(s). {status, message, data}
 */
const findAllChunk = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      ChunkSchemaKey.findFilterKeys,
      Chunk.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Chunk, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundChunks = await dbService.paginate( Chunk,query,options);
    if (!foundChunks || !foundChunks.data || !foundChunks.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundChunks });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Chunk from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Chunk. {status, message, data}
 */
const getChunk = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundChunk = await dbService.findOne(Chunk,query, options);
    if (!foundChunk){
      return res.recordNotFound();
    }
    return res.success({ data :foundChunk });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Chunk.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getChunkCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      ChunkSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedChunk = await dbService.count(Chunk,where);
    return res.success({ data : { count: countedChunk } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Chunk with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Chunk.
 * @return {Object} : updated Chunk. {status, message, data}
 */
const updateChunk = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      ChunkSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedChunk = await dbService.updateOne(Chunk,query,dataToUpdate);
    if (!updatedChunk){
      return res.recordNotFound();
    }
    return res.success({ data :updatedChunk });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Chunk with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Chunks.
 * @return {Object} : updated Chunks. {status, message, data}
 */
const bulkUpdateChunk = async (req,res)=>{
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
    let updatedChunk = await dbService.updateMany(Chunk,filter,dataToUpdate);
    if (!updatedChunk){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedChunk } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Chunk with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Chunk.
 * @return {obj} : updated Chunk. {status, message, data}
 */
const partialUpdateChunk = async (req,res) => {
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
      ChunkSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedChunk = await dbService.updateOne(Chunk, query, dataToUpdate);
    if (!updatedChunk) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedChunk });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Chunk from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Chunk.
 * @return {Object} : deactivated Chunk. {status, message, data}
 */
const softDeleteChunk = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedChunk = await dbService.updateOne(Chunk, query, updateBody);
    if (!updatedChunk){
      return res.recordNotFound();
    }
    return res.success({ data:updatedChunk });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Chunk from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Chunk. {status, message, data}
 */
const deleteChunk = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedChunk = await dbService.deleteOne(Chunk, query);
    if (!deletedChunk){
      return res.recordNotFound();
    }
    return res.success({ data :deletedChunk });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Chunk in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyChunk = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedChunk = await dbService.deleteMany(Chunk,query);
    if (!deletedChunk){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedChunk } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Chunk from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Chunk.
 * @return {Object} : number of deactivated documents of Chunk. {status, message, data}
 */
const softDeleteManyChunk = async (req,res) => {
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
    let updatedChunk = await dbService.updateMany(Chunk,query, updateBody);
    if (!updatedChunk) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedChunk } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addChunk,
  bulkInsertChunk,
  findAllChunk,
  getChunk,
  getChunkCount,
  updateChunk,
  bulkUpdateChunk,
  partialUpdateChunk,
  softDeleteChunk,
  deleteChunk,
  deleteManyChunk,
  softDeleteManyChunk    
};