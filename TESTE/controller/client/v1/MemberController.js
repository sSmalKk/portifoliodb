/**
 * MemberController.js
 * @description : exports action methods for Member.
 */

const Member = require('../../../model/Member');
const MemberSchemaKey = require('../../../utils/validation/MemberValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Member in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Member. {status, message, data}
 */ 
const addMember = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      MemberSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Member(dataToCreate);
    let createdMember = await dbService.create(Member,dataToCreate);
    return res.success({ data : createdMember });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Member in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Members. {status, message, data}
 */
const bulkInsertMember = async (req,res)=>{
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
    let createdMembers = await dbService.create(Member,dataToCreate);
    createdMembers = { count: createdMembers ? createdMembers.length : 0 };
    return res.success({ data:{ count:createdMembers.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Member from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Member(s). {status, message, data}
 */
const findAllMember = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      MemberSchemaKey.findFilterKeys,
      Member.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Member, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundMembers = await dbService.paginate( Member,query,options);
    if (!foundMembers || !foundMembers.data || !foundMembers.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundMembers });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Member from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Member. {status, message, data}
 */
const getMember = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundMember = await dbService.findOne(Member,query, options);
    if (!foundMember){
      return res.recordNotFound();
    }
    return res.success({ data :foundMember });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Member.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getMemberCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      MemberSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedMember = await dbService.count(Member,where);
    return res.success({ data : { count: countedMember } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Member with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Member.
 * @return {Object} : updated Member. {status, message, data}
 */
const updateMember = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      MemberSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedMember = await dbService.updateOne(Member,query,dataToUpdate);
    if (!updatedMember){
      return res.recordNotFound();
    }
    return res.success({ data :updatedMember });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Member with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Members.
 * @return {Object} : updated Members. {status, message, data}
 */
const bulkUpdateMember = async (req,res)=>{
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
    let updatedMember = await dbService.updateMany(Member,filter,dataToUpdate);
    if (!updatedMember){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedMember } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Member with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Member.
 * @return {obj} : updated Member. {status, message, data}
 */
const partialUpdateMember = async (req,res) => {
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
      MemberSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedMember = await dbService.updateOne(Member, query, dataToUpdate);
    if (!updatedMember) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedMember });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Member from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Member.
 * @return {Object} : deactivated Member. {status, message, data}
 */
const softDeleteMember = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedMember = await dbService.updateOne(Member, query, updateBody);
    if (!updatedMember){
      return res.recordNotFound();
    }
    return res.success({ data:updatedMember });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Member from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Member. {status, message, data}
 */
const deleteMember = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedMember = await dbService.deleteOne(Member, query);
    if (!deletedMember){
      return res.recordNotFound();
    }
    return res.success({ data :deletedMember });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Member in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyMember = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedMember = await dbService.deleteMany(Member,query);
    if (!deletedMember){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedMember } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Member from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Member.
 * @return {Object} : number of deactivated documents of Member. {status, message, data}
 */
const softDeleteManyMember = async (req,res) => {
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
    let updatedMember = await dbService.updateMany(Member,query, updateBody);
    if (!updatedMember) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedMember } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addMember,
  bulkInsertMember,
  findAllMember,
  getMember,
  getMemberCount,
  updateMember,
  bulkUpdateMember,
  partialUpdateMember,
  softDeleteMember,
  deleteMember,
  deleteManyMember,
  softDeleteManyMember    
};