/**
 * custommodelController.js
 * @description : exports action methods for custommodel.
 */

const Custommodel = require('../../model/custommodel');
const custommodelSchemaKey = require('../../utils/validation/custommodelValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Custommodel in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Custommodel. {status, message, data}
 */ 
const addCustommodel = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      custommodelSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Custommodel(dataToCreate);
    let createdCustommodel = await dbService.create(Custommodel,dataToCreate);
    return res.success({ data : createdCustommodel });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Custommodel in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Custommodels. {status, message, data}
 */
const bulkInsertCustommodel = async (req,res)=>{
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
    let createdCustommodels = await dbService.create(Custommodel,dataToCreate);
    createdCustommodels = { count: createdCustommodels ? createdCustommodels.length : 0 };
    return res.success({ data:{ count:createdCustommodels.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Custommodel from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Custommodel(s). {status, message, data}
 */
const findAllCustommodel = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      custommodelSchemaKey.findFilterKeys,
      Custommodel.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Custommodel, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundCustommodels = await dbService.paginate( Custommodel,query,options);
    if (!foundCustommodels || !foundCustommodels.data || !foundCustommodels.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundCustommodels });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Custommodel from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Custommodel. {status, message, data}
 */
const getCustommodel = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundCustommodel = await dbService.findOne(Custommodel,query, options);
    if (!foundCustommodel){
      return res.recordNotFound();
    }
    return res.success({ data :foundCustommodel });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Custommodel.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getCustommodelCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      custommodelSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedCustommodel = await dbService.count(Custommodel,where);
    return res.success({ data : { count: countedCustommodel } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Custommodel with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Custommodel.
 * @return {Object} : updated Custommodel. {status, message, data}
 */
const updateCustommodel = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      custommodelSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedCustommodel = await dbService.updateOne(Custommodel,query,dataToUpdate);
    if (!updatedCustommodel){
      return res.recordNotFound();
    }
    return res.success({ data :updatedCustommodel });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Custommodel with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Custommodels.
 * @return {Object} : updated Custommodels. {status, message, data}
 */
const bulkUpdateCustommodel = async (req,res)=>{
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
    let updatedCustommodel = await dbService.updateMany(Custommodel,filter,dataToUpdate);
    if (!updatedCustommodel){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedCustommodel } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Custommodel with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Custommodel.
 * @return {obj} : updated Custommodel. {status, message, data}
 */
const partialUpdateCustommodel = async (req,res) => {
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
      custommodelSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedCustommodel = await dbService.updateOne(Custommodel, query, dataToUpdate);
    if (!updatedCustommodel) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedCustommodel });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Custommodel from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Custommodel.
 * @return {Object} : deactivated Custommodel. {status, message, data}
 */
const softDeleteCustommodel = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedCustommodel = await dbService.updateOne(Custommodel, query, updateBody);
    if (!updatedCustommodel){
      return res.recordNotFound();
    }
    return res.success({ data:updatedCustommodel });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Custommodel from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Custommodel. {status, message, data}
 */
const deleteCustommodel = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedCustommodel = await dbService.deleteOne(Custommodel, query);
    if (!deletedCustommodel){
      return res.recordNotFound();
    }
    return res.success({ data :deletedCustommodel });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Custommodel in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyCustommodel = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedCustommodel = await dbService.deleteMany(Custommodel,query);
    if (!deletedCustommodel){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedCustommodel } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Custommodel from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Custommodel.
 * @return {Object} : number of deactivated documents of Custommodel. {status, message, data}
 */
const softDeleteManyCustommodel = async (req,res) => {
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
    let updatedCustommodel = await dbService.updateMany(Custommodel,query, updateBody);
    if (!updatedCustommodel) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedCustommodel } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addCustommodel,
  bulkInsertCustommodel,
  findAllCustommodel,
  getCustommodel,
  getCustommodelCount,
  updateCustommodel,
  bulkUpdateCustommodel,
  partialUpdateCustommodel,
  softDeleteCustommodel,
  deleteCustommodel,
  deleteManyCustommodel,
  softDeleteManyCustommodel    
};