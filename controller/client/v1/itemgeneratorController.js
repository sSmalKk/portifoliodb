/**
 * itemgeneratorController.js
 * @description : exports action methods for itemgenerator.
 */

const Itemgenerator = require('../../../model/itemgenerator');
const itemgeneratorSchemaKey = require('../../../utils/validation/itemgeneratorValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');
    
/**
 * @description : find all documents of Itemgenerator from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Itemgenerator(s). {status, message, data}
 */
const findAllItemgenerator = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      itemgeneratorSchemaKey.findFilterKeys,
      Itemgenerator.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Itemgenerator, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundItemgenerators = await dbService.paginate( Itemgenerator,query,options);
    if (!foundItemgenerators || !foundItemgenerators.data || !foundItemgenerators.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundItemgenerators });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Itemgenerator from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Itemgenerator. {status, message, data}
 */
const getItemgenerator = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundItemgenerator = await dbService.findOne(Itemgenerator,query, options);
    if (!foundItemgenerator){
      return res.recordNotFound();
    }
    return res.success({ data :foundItemgenerator });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Itemgenerator.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getItemgeneratorCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      itemgeneratorSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedItemgenerator = await dbService.count(Itemgenerator,where);
    return res.success({ data : { count: countedItemgenerator } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

module.exports = {
  findAllItemgenerator,
  getItemgenerator,
  getItemgeneratorCount    
};