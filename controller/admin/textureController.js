/**
 * textureController.js
 * @description : exports action methods for texture.
 */

const Texture = require('../../model/texture');
const textureSchemaKey = require('../../utils/validation/textureValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Texture in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Texture. {status, message, data}
 */ 
const addTexture = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      textureSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Texture(dataToCreate);
    let createdTexture = await dbService.create(Texture,dataToCreate);
    return res.success({ data : createdTexture });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Texture in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Textures. {status, message, data}
 */
const bulkInsertTexture = async (req,res)=>{
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
    let createdTextures = await dbService.create(Texture,dataToCreate);
    createdTextures = { count: createdTextures ? createdTextures.length : 0 };
    return res.success({ data:{ count:createdTextures.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Texture from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Texture(s). {status, message, data}
 */
const findAllTexture = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      textureSchemaKey.findFilterKeys,
      Texture.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Texture, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundTextures = await dbService.paginate( Texture,query,options);
    if (!foundTextures || !foundTextures.data || !foundTextures.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundTextures });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Texture from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Texture. {status, message, data}
 */
const getTexture = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundTexture = await dbService.findOne(Texture,query, options);
    if (!foundTexture){
      return res.recordNotFound();
    }
    return res.success({ data :foundTexture });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Texture.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getTextureCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      textureSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedTexture = await dbService.count(Texture,where);
    return res.success({ data : { count: countedTexture } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Texture with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Texture.
 * @return {Object} : updated Texture. {status, message, data}
 */
const updateTexture = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      textureSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedTexture = await dbService.updateOne(Texture,query,dataToUpdate);
    if (!updatedTexture){
      return res.recordNotFound();
    }
    return res.success({ data :updatedTexture });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Texture with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Textures.
 * @return {Object} : updated Textures. {status, message, data}
 */
const bulkUpdateTexture = async (req,res)=>{
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
    let updatedTexture = await dbService.updateMany(Texture,filter,dataToUpdate);
    if (!updatedTexture){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedTexture } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Texture with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Texture.
 * @return {obj} : updated Texture. {status, message, data}
 */
const partialUpdateTexture = async (req,res) => {
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
      textureSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedTexture = await dbService.updateOne(Texture, query, dataToUpdate);
    if (!updatedTexture) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedTexture });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Texture from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Texture.
 * @return {Object} : deactivated Texture. {status, message, data}
 */
const softDeleteTexture = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedTexture = await dbService.updateOne(Texture, query, updateBody);
    if (!updatedTexture){
      return res.recordNotFound();
    }
    return res.success({ data:updatedTexture });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Texture from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Texture. {status, message, data}
 */
const deleteTexture = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedTexture = await dbService.deleteOne(Texture, query);
    if (!deletedTexture){
      return res.recordNotFound();
    }
    return res.success({ data :deletedTexture });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Texture in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyTexture = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedTexture = await dbService.deleteMany(Texture,query);
    if (!deletedTexture){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedTexture } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Texture from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Texture.
 * @return {Object} : number of deactivated documents of Texture. {status, message, data}
 */
const softDeleteManyTexture = async (req,res) => {
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
    let updatedTexture = await dbService.updateMany(Texture,query, updateBody);
    if (!updatedTexture) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedTexture } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addTexture,
  bulkInsertTexture,
  findAllTexture,
  getTexture,
  getTextureCount,
  updateTexture,
  bulkUpdateTexture,
  partialUpdateTexture,
  softDeleteTexture,
  deleteTexture,
  deleteManyTexture,
  softDeleteManyTexture    
};