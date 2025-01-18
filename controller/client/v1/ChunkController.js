/**
 * ChunkController.js
 * @description : exports action methods for Chunk.
 */

const Chunk = require('../../../model/Chunk');
const ChunkSchemaKey = require('../../../utils/validation/ChunkValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
    
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
 * @description : wordInteraction 
 * @param {Object} req : request
 * @param {Object} res : response 
 * @return {Object} : response of wordInteraction {status, message, data}
 */
const wordInteraction = async (req,res)=>{
  try {
    // add your code here
    let result = true;
    if (result){
      return res.ok({ data:result });
    }
  } catch (error) {
    if (error.name && error.name == 'validationError') {
      return res.validationError({ message: error.message });
    } else {
      return res.internalServerError({ message:error.message });
    }
  }
};    
/**
 * @description : getchunks 
 * @param {Object} req : request
 * @param {Object} res : response 
 * @return {Object} : response of getchunks {status, message, data}
 */
const getchunks = async (req,res)=>{
  try {
    // add your code here
    let result = true;
    if (result){
      return res.ok({ data:result });
    }
  } catch (error) {
    if (error.name && error.name == 'validationError') {
      return res.validationError({ message: error.message });
    } else {
      return res.internalServerError({ message:error.message });
    }
  }
};    

module.exports = {
  findAllChunk,
  getChunk,
  getChunkCount,
  wordInteraction,
  getchunks    
};