/**
 * MaterialController.js
 * @description : exports action methods for Material.
 */

const Material = require('../../../model/Material');
const MaterialSchemaKey = require('../../../utils/validation/MaterialValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Material in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Material. {status, message, data}
 */ 
const addMaterial = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      MaterialSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Material(dataToCreate);
    let createdMaterial = await dbService.create(Material,dataToCreate);
    return res.success({ data : createdMaterial });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Material in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Materials. {status, message, data}
 */
const bulkInsertMaterial = async (req,res)=>{
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
    let createdMaterials = await dbService.create(Material,dataToCreate);
    createdMaterials = { count: createdMaterials ? createdMaterials.length : 0 };
    return res.success({ data:{ count:createdMaterials.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Material from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Material(s). {status, message, data}
 */
const findAllMaterial = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      MaterialSchemaKey.findFilterKeys,
      Material.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Material, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundMaterials = await dbService.paginate( Material,query,options);
    if (!foundMaterials || !foundMaterials.data || !foundMaterials.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundMaterials });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Material from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Material. {status, message, data}
 */
const getMaterial = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundMaterial = await dbService.findOne(Material,query, options);
    if (!foundMaterial){
      return res.recordNotFound();
    }
    return res.success({ data :foundMaterial });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Material.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getMaterialCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      MaterialSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedMaterial = await dbService.count(Material,where);
    return res.success({ data : { count: countedMaterial } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Material with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Material.
 * @return {Object} : updated Material. {status, message, data}
 */
const updateMaterial = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      MaterialSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedMaterial = await dbService.updateOne(Material,query,dataToUpdate);
    if (!updatedMaterial){
      return res.recordNotFound();
    }
    return res.success({ data :updatedMaterial });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Material with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Materials.
 * @return {Object} : updated Materials. {status, message, data}
 */
const bulkUpdateMaterial = async (req,res)=>{
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
    let updatedMaterial = await dbService.updateMany(Material,filter,dataToUpdate);
    if (!updatedMaterial){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedMaterial } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Material with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Material.
 * @return {obj} : updated Material. {status, message, data}
 */
const partialUpdateMaterial = async (req,res) => {
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
      MaterialSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedMaterial = await dbService.updateOne(Material, query, dataToUpdate);
    if (!updatedMaterial) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedMaterial });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Material from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Material.
 * @return {Object} : deactivated Material. {status, message, data}
 */
const softDeleteMaterial = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedMaterial = await dbService.updateOne(Material, query, updateBody);
    if (!updatedMaterial){
      return res.recordNotFound();
    }
    return res.success({ data:updatedMaterial });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Material from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Material. {status, message, data}
 */
const deleteMaterial = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedMaterial = await dbService.deleteOne(Material, query);
    if (!deletedMaterial){
      return res.recordNotFound();
    }
    return res.success({ data :deletedMaterial });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Material in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyMaterial = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedMaterial = await dbService.deleteMany(Material,query);
    if (!deletedMaterial){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedMaterial } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Material from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Material.
 * @return {Object} : number of deactivated documents of Material. {status, message, data}
 */
const softDeleteManyMaterial = async (req,res) => {
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
    let updatedMaterial = await dbService.updateMany(Material,query, updateBody);
    if (!updatedMaterial) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedMaterial } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addMaterial,
  bulkInsertMaterial,
  findAllMaterial,
  getMaterial,
  getMaterialCount,
  updateMaterial,
  bulkUpdateMaterial,
  partialUpdateMaterial,
  softDeleteMaterial,
  deleteMaterial,
  deleteManyMaterial,
  softDeleteManyMaterial    
};