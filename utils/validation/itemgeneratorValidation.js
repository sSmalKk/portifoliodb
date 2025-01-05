/**
 * itemgeneratorValidation.js
 * @description :: validate each post and put request as per itemgenerator model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of itemgenerator */
exports.schemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  Size: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  name: joi.string().allow(null).allow(''),
  description: joi.string().allow(null).allow(''),
  data: joi.string().allow(null).allow(''),
  proprieties: joi.object(),
  textures: joi.array().items(),
  model: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow('')
}).unknown(true);

/** validation keys and properties of itemgenerator for updation */
exports.updateSchemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  Size: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  name: joi.string().allow(null).allow(''),
  description: joi.string().allow(null).allow(''),
  data: joi.string().allow(null).allow(''),
  proprieties: joi.object(),
  textures: joi.array().items(),
  model: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of itemgenerator for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      Size: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      description: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      data: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      proprieties: joi.alternatives().try(joi.array().items(),joi.object(),joi.object()),
      textures: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      model: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
