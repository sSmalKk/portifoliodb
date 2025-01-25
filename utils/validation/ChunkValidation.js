/**
 * ChunkValidation.js
 * @description :: validate each post and put request as per Chunk model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of Chunk */
exports.schemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  x: joi.number().integer().allow(0),
  y: joi.string().allow(null).allow(''),
  z: joi.string().allow(null).allow(''),
  chunk: joi.array().items(),
  entities: joi.array().items()
}).unknown(true);

/** validation keys and properties of Chunk for updation */
exports.updateSchemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  x: joi.number().integer().allow(0),
  y: joi.string().allow(null).allow(''),
  z: joi.string().allow(null).allow(''),
  chunk: joi.array().items(),
  entities: joi.array().items(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Chunk for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      x: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      y: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      z: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      chunk: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      entities: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
