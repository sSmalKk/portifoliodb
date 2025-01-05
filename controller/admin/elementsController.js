/**
 * elementsController.js
 * @description : exports action methods for elements.
 */

const Elements = require('../../model/elements');
const elementsSchemaKey = require('../../utils/validation/elementsValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Elements in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Elements. {status, message, data}
 */ 
const addElements = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      elementsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new Elements(dataToCreate);

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Elements,[ 'atomicNumber' ],dataToCreate,'INSERT');
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let createdElements = await dbService.create(Elements,dataToCreate);
    return res.success({ data : createdElements });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Elements in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Elementss. {status, message, data}
 */
const bulkInsertElements = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Elements,[ 'atomicNumber' ],dataToCreate,'BULK_INSERT');
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let createdElementss = await dbService.create(Elements,dataToCreate);
    createdElementss = { count: createdElementss ? createdElementss.length : 0 };
    return res.success({ data:{ count:createdElementss.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Elements from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Elements(s). {status, message, data}
 */
const findAllElements = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      elementsSchemaKey.findFilterKeys,
      Elements.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Elements, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundElementss = await dbService.paginate( Elements,query,options);
    if (!foundElementss || !foundElementss.data || !foundElementss.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundElementss });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Elements from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Elements. {status, message, data}
 */
const getElements = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundElements = await dbService.findOne(Elements,query, options);
    if (!foundElements){
      return res.recordNotFound();
    }
    return res.success({ data :foundElements });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Elements.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getElementsCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      elementsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedElements = await dbService.count(Elements,where);
    return res.success({ data : { count: countedElements } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Elements with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Elements.
 * @return {Object} : updated Elements. {status, message, data}
 */
const updateElements = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      elementsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Elements,[ 'atomicNumber' ],dataToUpdate,'UPDATE', query);
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let updatedElements = await dbService.updateOne(Elements,query,dataToUpdate);
    if (!updatedElements){
      return res.recordNotFound();
    }
    return res.success({ data :updatedElements });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Elements with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Elementss.
 * @return {Object} : updated Elementss. {status, message, data}
 */
const bulkUpdateElements = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Elements,[ 'atomicNumber' ],dataToUpdate,'BULK_UPDATE', filter);
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let updatedElements = await dbService.updateMany(Elements,filter,dataToUpdate);
    if (!updatedElements){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedElements } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Elements with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Elements.
 * @return {obj} : updated Elements. {status, message, data}
 */
const partialUpdateElements = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      elementsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Elements,[ 'atomicNumber' ],dataToUpdate,'UPDATE', query);
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let updatedElements = await dbService.updateOne(Elements, query, dataToUpdate);
    if (!updatedElements) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedElements });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Elements from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Elements.
 * @return {Object} : deactivated Elements. {status, message, data}
 */
const softDeleteElements = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedElements = await dbService.updateOne(Elements, query, updateBody);
    if (!updatedElements){
      return res.recordNotFound();
    }
    return res.success({ data:updatedElements });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Elements from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Elements. {status, message, data}
 */
const deleteElements = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedElements = await dbService.deleteOne(Elements, query);
    if (!deletedElements){
      return res.recordNotFound();
    }
    return res.success({ data :deletedElements });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Elements in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyElements = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedElements = await dbService.deleteMany(Elements,query);
    if (!deletedElements){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedElements } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Elements from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Elements.
 * @return {Object} : number of deactivated documents of Elements. {status, message, data}
 */
const softDeleteManyElements = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let updatedElements = await dbService.updateMany(Elements,query, updateBody);
    if (!updatedElements) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedElements } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addElements,
  bulkInsertElements,
  findAllElements,
  getElements,
  getElementsCount,
  updateElements,
  bulkUpdateElements,
  partialUpdateElements,
  softDeleteElements,
  deleteElements,
  deleteManyElements,
  softDeleteManyElements    
};