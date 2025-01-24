/**
 * interfaceController.js
 * @description : exports action methods for interface.
 */

const Interface = require('../../model/interface');
const interfaceSchemaKey = require('../../utils/validation/interfaceValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Interface in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Interface. {status, message, data}
 */ 
const addInterface = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      interfaceSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Interface(dataToCreate);
    let createdInterface = await dbService.create(Interface,dataToCreate);
    return res.success({ data : createdInterface });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Interface in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Interfaces. {status, message, data}
 */
const bulkInsertInterface = async (req,res)=>{
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
    let createdInterfaces = await dbService.create(Interface,dataToCreate);
    createdInterfaces = { count: createdInterfaces ? createdInterfaces.length : 0 };
    return res.success({ data:{ count:createdInterfaces.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Interface from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Interface(s). {status, message, data}
 */
const findAllInterface = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      interfaceSchemaKey.findFilterKeys,
      Interface.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Interface, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundInterfaces = await dbService.paginate( Interface,query,options);
    if (!foundInterfaces || !foundInterfaces.data || !foundInterfaces.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundInterfaces });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Interface from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Interface. {status, message, data}
 */
const getInterface = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundInterface = await dbService.findOne(Interface,query, options);
    if (!foundInterface){
      return res.recordNotFound();
    }
    return res.success({ data :foundInterface });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Interface.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getInterfaceCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      interfaceSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedInterface = await dbService.count(Interface,where);
    return res.success({ data : { count: countedInterface } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Interface with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Interface.
 * @return {Object} : updated Interface. {status, message, data}
 */
const updateInterface = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      interfaceSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedInterface = await dbService.updateOne(Interface,query,dataToUpdate);
    if (!updatedInterface){
      return res.recordNotFound();
    }
    return res.success({ data :updatedInterface });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Interface with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Interfaces.
 * @return {Object} : updated Interfaces. {status, message, data}
 */
const bulkUpdateInterface = async (req,res)=>{
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
    let updatedInterface = await dbService.updateMany(Interface,filter,dataToUpdate);
    if (!updatedInterface){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedInterface } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Interface with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Interface.
 * @return {obj} : updated Interface. {status, message, data}
 */
const partialUpdateInterface = async (req,res) => {
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
      interfaceSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedInterface = await dbService.updateOne(Interface, query, dataToUpdate);
    if (!updatedInterface) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedInterface });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Interface from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Interface.
 * @return {Object} : deactivated Interface. {status, message, data}
 */
const softDeleteInterface = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedInterface = await dbService.updateOne(Interface, query, updateBody);
    if (!updatedInterface){
      return res.recordNotFound();
    }
    return res.success({ data:updatedInterface });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Interface from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Interface. {status, message, data}
 */
const deleteInterface = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedInterface = await dbService.deleteOne(Interface, query);
    if (!deletedInterface){
      return res.recordNotFound();
    }
    return res.success({ data :deletedInterface });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Interface in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyInterface = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedInterface = await dbService.deleteMany(Interface,query);
    if (!deletedInterface){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedInterface } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Interface from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Interface.
 * @return {Object} : number of deactivated documents of Interface. {status, message, data}
 */
const softDeleteManyInterface = async (req,res) => {
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
    let updatedInterface = await dbService.updateMany(Interface,query, updateBody);
    if (!updatedInterface) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedInterface } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addInterface,
  bulkInsertInterface,
  findAllInterface,
  getInterface,
  getInterfaceCount,
  updateInterface,
  bulkUpdateInterface,
  partialUpdateInterface,
  softDeleteInterface,
  deleteInterface,
  deleteManyInterface,
  softDeleteManyInterface    
};