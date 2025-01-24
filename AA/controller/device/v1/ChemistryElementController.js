/**
 * ChemistryElementController.js
 * @description : exports action methods for ChemistryElement.
 */

const ChemistryElement = require('../../../model/ChemistryElement');
const ChemistryElementSchemaKey = require('../../../utils/validation/ChemistryElementValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
/**
 * @description : create document of ChemistryElement in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created ChemistryElement. {status, message, data}
 */ 
const addChemistryElement = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      ChemistryElementSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new ChemistryElement(dataToCreate);

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(ChemistryElement,[ 'atomicNumber', 'atomicMass' ],dataToCreate,'INSERT');
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let createdChemistryElement = await dbService.create(ChemistryElement,dataToCreate);
    return res.success({ data : createdChemistryElement });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of ChemistryElement in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created ChemistryElements. {status, message, data}
 */
const bulkInsertChemistryElement = async (req,res)=>{
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

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(ChemistryElement,[ 'atomicNumber', 'atomicMass' ],dataToCreate,'BULK_INSERT');
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let createdChemistryElements = await dbService.create(ChemistryElement,dataToCreate);
    createdChemistryElements = { count: createdChemistryElements ? createdChemistryElements.length : 0 };
    return res.success({ data:{ count:createdChemistryElements.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of ChemistryElement from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found ChemistryElement(s). {status, message, data}
 */
const findAllChemistryElement = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      ChemistryElementSchemaKey.findFilterKeys,
      ChemistryElement.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(ChemistryElement, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundChemistryElements = await dbService.paginate( ChemistryElement,query,options);
    if (!foundChemistryElements || !foundChemistryElements.data || !foundChemistryElements.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundChemistryElements });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of ChemistryElement from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found ChemistryElement. {status, message, data}
 */
const getChemistryElement = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundChemistryElement = await dbService.findOne(ChemistryElement,query, options);
    if (!foundChemistryElement){
      return res.recordNotFound();
    }
    return res.success({ data :foundChemistryElement });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of ChemistryElement.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getChemistryElementCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      ChemistryElementSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedChemistryElement = await dbService.count(ChemistryElement,where);
    return res.success({ data : { count: countedChemistryElement } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of ChemistryElement with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated ChemistryElement.
 * @return {Object} : updated ChemistryElement. {status, message, data}
 */
const updateChemistryElement = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      ChemistryElementSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(ChemistryElement,[ 'atomicNumber', 'atomicMass' ],dataToUpdate,'UPDATE', query);
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let updatedChemistryElement = await dbService.updateOne(ChemistryElement,query,dataToUpdate);
    if (!updatedChemistryElement){
      return res.recordNotFound();
    }
    return res.success({ data :updatedChemistryElement });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of ChemistryElement with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated ChemistryElements.
 * @return {Object} : updated ChemistryElements. {status, message, data}
 */
const bulkUpdateChemistryElement = async (req,res)=>{
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

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(ChemistryElement,[ 'atomicNumber', 'atomicMass' ],dataToUpdate,'BULK_UPDATE', filter);
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let updatedChemistryElement = await dbService.updateMany(ChemistryElement,filter,dataToUpdate);
    if (!updatedChemistryElement){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedChemistryElement } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of ChemistryElement with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated ChemistryElement.
 * @return {obj} : updated ChemistryElement. {status, message, data}
 */
const partialUpdateChemistryElement = async (req,res) => {
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
      ChemistryElementSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(ChemistryElement,[ 'atomicNumber', 'atomicMass' ],dataToUpdate,'UPDATE', query);
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let updatedChemistryElement = await dbService.updateOne(ChemistryElement, query, dataToUpdate);
    if (!updatedChemistryElement) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedChemistryElement });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of ChemistryElement from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of ChemistryElement.
 * @return {Object} : deactivated ChemistryElement. {status, message, data}
 */
const softDeleteChemistryElement = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedChemistryElement = await dbService.updateOne(ChemistryElement, query, updateBody);
    if (!updatedChemistryElement){
      return res.recordNotFound();
    }
    return res.success({ data:updatedChemistryElement });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of ChemistryElement from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted ChemistryElement. {status, message, data}
 */
const deleteChemistryElement = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedChemistryElement = await dbService.deleteOne(ChemistryElement, query);
    if (!deletedChemistryElement){
      return res.recordNotFound();
    }
    return res.success({ data :deletedChemistryElement });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of ChemistryElement in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyChemistryElement = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedChemistryElement = await dbService.deleteMany(ChemistryElement,query);
    if (!deletedChemistryElement){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedChemistryElement } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of ChemistryElement from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of ChemistryElement.
 * @return {Object} : number of deactivated documents of ChemistryElement. {status, message, data}
 */
const softDeleteManyChemistryElement = async (req,res) => {
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
    let updatedChemistryElement = await dbService.updateMany(ChemistryElement,query, updateBody);
    if (!updatedChemistryElement) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedChemistryElement } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addChemistryElement,
  bulkInsertChemistryElement,
  findAllChemistryElement,
  getChemistryElement,
  getChemistryElementCount,
  updateChemistryElement,
  bulkUpdateChemistryElement,
  partialUpdateChemistryElement,
  softDeleteChemistryElement,
  deleteChemistryElement,
  deleteManyChemistryElement,
  softDeleteManyChemistryElement    
};