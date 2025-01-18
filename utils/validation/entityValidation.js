/**
 * entityValidation.js
 * @description :: validate each post and put request as per entity model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of entity */
exports.schemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  x: joi.number().integer().allow(0),
  y: joi.number().integer().allow(0),
  z: joi.number().integer().allow(0),
  xr: joi.number().integer().allow(0),
  yr: joi.number().integer().allow(0),
  zr: joi.number().integer().allow(0)
}).unknown(true);

/** validation keys and properties of entity for updation */
exports.updateSchemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  x: joi.number().integer().allow(0),
  y: joi.number().integer().allow(0),
  z: joi.number().integer().allow(0),
  xr: joi.number().integer().allow(0),
  yr: joi.number().integer().allow(0),
  zr: joi.number().integer().allow(0),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of entity for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      x: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      y: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      z: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      xr: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      yr: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      zr: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
