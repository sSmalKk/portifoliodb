/**
 * sizeValidation.js
 * @description :: validate each post and put request as per size model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of size */
exports.schemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  nome: joi.string().allow(null).allow(''),
  sizemaior: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  sizemenor: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  chat: joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
}).unknown(true);

/** validation keys and properties of size for updation */
exports.updateSchemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  nome: joi.string().allow(null).allow(''),
  sizemaior: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  sizemenor: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  chat: joi.string().regex(/^[0-9a-fA-F]{24}$/).when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of size for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      nome: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      sizemaior: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      sizemenor: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      chat: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
