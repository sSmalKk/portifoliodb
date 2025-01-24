/**
 * ChatController.js
 * @description : exports action methods for Chat.
 */

const Chat = require('../../../model/Chat');
const ChatSchemaKey = require('../../../utils/validation/ChatValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Chat in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Chat. {status, message, data}
 */ 
const addChat = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      ChatSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Chat(dataToCreate);
    let createdChat = await dbService.create(Chat,dataToCreate);
    return res.success({ data : createdChat });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Chat in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Chats. {status, message, data}
 */
const bulkInsertChat = async (req,res)=>{
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
    let createdChats = await dbService.create(Chat,dataToCreate);
    createdChats = { count: createdChats ? createdChats.length : 0 };
    return res.success({ data:{ count:createdChats.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Chat from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Chat(s). {status, message, data}
 */
const findAllChat = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      ChatSchemaKey.findFilterKeys,
      Chat.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Chat, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundChats = await dbService.paginate( Chat,query,options);
    if (!foundChats || !foundChats.data || !foundChats.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundChats });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Chat from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Chat. {status, message, data}
 */
const getChat = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundChat = await dbService.findOne(Chat,query, options);
    if (!foundChat){
      return res.recordNotFound();
    }
    return res.success({ data :foundChat });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Chat.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getChatCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      ChatSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedChat = await dbService.count(Chat,where);
    return res.success({ data : { count: countedChat } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Chat with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Chat.
 * @return {Object} : updated Chat. {status, message, data}
 */
const updateChat = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      ChatSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedChat = await dbService.updateOne(Chat,query,dataToUpdate);
    if (!updatedChat){
      return res.recordNotFound();
    }
    return res.success({ data :updatedChat });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Chat with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Chats.
 * @return {Object} : updated Chats. {status, message, data}
 */
const bulkUpdateChat = async (req,res)=>{
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
    let updatedChat = await dbService.updateMany(Chat,filter,dataToUpdate);
    if (!updatedChat){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedChat } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Chat with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Chat.
 * @return {obj} : updated Chat. {status, message, data}
 */
const partialUpdateChat = async (req,res) => {
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
      ChatSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedChat = await dbService.updateOne(Chat, query, dataToUpdate);
    if (!updatedChat) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedChat });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

module.exports = {
  addChat,
  bulkInsertChat,
  findAllChat,
  getChat,
  getChatCount,
  updateChat,
  bulkUpdateChat,
  partialUpdateChat    
};