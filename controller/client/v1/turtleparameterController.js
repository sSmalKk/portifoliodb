/**
 * turtleparameterController.js
 * @description : exports action methods for turtleparameter.
 */

const Turtleparameter = require('../../../model/turtleparameter');
const turtleparameterSchemaKey = require('../../../utils/validation/turtleparameterValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
    
/**
 * @description : find all documents of Turtleparameter from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Turtleparameter(s). {status, message, data}
 */
const findAllTurtleparameter = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      turtleparameterSchemaKey.findFilterKeys,
      Turtleparameter.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Turtleparameter, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundTurtleparameters = await dbService.paginate( Turtleparameter,query,options);
    if (!foundTurtleparameters || !foundTurtleparameters.data || !foundTurtleparameters.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundTurtleparameters });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Turtleparameter from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Turtleparameter. {status, message, data}
 */
const getTurtleparameter = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundTurtleparameter = await dbService.findOne(Turtleparameter,query, options);
    if (!foundTurtleparameter){
      return res.recordNotFound();
    }
    return res.success({ data :foundTurtleparameter });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Turtleparameter.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getTurtleparameterCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      turtleparameterSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedTurtleparameter = await dbService.count(Turtleparameter,where);
    return res.success({ data : { count: countedTurtleparameter } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

module.exports = {
  findAllTurtleparameter,
  getTurtleparameter,
  getTurtleparameterCount    
};