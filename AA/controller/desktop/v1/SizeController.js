/**
 * SizeController.js
 * @description : exports action methods for Size.
 */

const Size = require('../../../model/Size');
const SizeSchemaKey = require('../../../utils/validation/SizeValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Size in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Size. {status, message, data}
 */ 
const addSize = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      SizeSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new Size(dataToCreate);
    let createdSize = await dbService.create(Size,dataToCreate);
    return res.success({ data : createdSize });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Size in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Sizes. {status, message, data}
 */
const bulkInsertSize = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    let createdSizes = await dbService.create(Size,dataToCreate);
    createdSizes = { count: createdSizes ? createdSizes.length : 0 };
    return res.success({ data:{ count:createdSizes.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Size from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Size(s). {status, message, data}
 */
const findAllSize = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      SizeSchemaKey.findFilterKeys,
      Size.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Size, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundSizes = await dbService.paginate( Size,query,options);
    if (!foundSizes || !foundSizes.data || !foundSizes.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundSizes });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Size from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Size. {status, message, data}
 */
const getSize = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundSize = await dbService.findOne(Size,query, options);
    if (!foundSize){
      return res.recordNotFound();
    }
    return res.success({ data :foundSize });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Size.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getSizeCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      SizeSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedSize = await dbService.count(Size,where);
    return res.success({ data : { count: countedSize } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Size with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Size.
 * @return {Object} : updated Size. {status, message, data}
 */
const updateSize = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      SizeSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedSize = await dbService.updateOne(Size,query,dataToUpdate);
    if (!updatedSize){
      return res.recordNotFound();
    }
    return res.success({ data :updatedSize });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Size with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Sizes.
 * @return {Object} : updated Sizes. {status, message, data}
 */
const bulkUpdateSize = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }
    let updatedSize = await dbService.updateMany(Size,filter,dataToUpdate);
    if (!updatedSize){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedSize } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Size with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Size.
 * @return {obj} : updated Size. {status, message, data}
 */
const partialUpdateSize = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      SizeSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedSize = await dbService.updateOne(Size, query, dataToUpdate);
    if (!updatedSize) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedSize });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Size from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Size.
 * @return {Object} : deactivated Size. {status, message, data}
 */
const softDeleteSize = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedSize = await dbService.updateOne(Size, query, updateBody);
    if (!updatedSize){
      return res.recordNotFound();
    }
    return res.success({ data:updatedSize });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Size from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Size. {status, message, data}
 */
const deleteSize = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedSize = await dbService.deleteOne(Size, query);
    if (!deletedSize){
      return res.recordNotFound();
    }
    return res.success({ data :deletedSize });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Size in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManySize = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedSize = await dbService.deleteMany(Size,query);
    if (!deletedSize){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedSize } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Size from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Size.
 * @return {Object} : number of deactivated documents of Size. {status, message, data}
 */
const softDeleteManySize = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let updatedSize = await dbService.updateMany(Size,query, updateBody);
    if (!updatedSize) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedSize } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addSize,
  bulkInsertSize,
  findAllSize,
  getSize,
  getSizeCount,
  updateSize,
  bulkUpdateSize,
  partialUpdateSize,
  softDeleteSize,
  deleteSize,
  deleteManySize,
  softDeleteManySize    
};