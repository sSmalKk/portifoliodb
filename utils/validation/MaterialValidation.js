/**
 * MaterialValidation.js
 * @description :: validate each post and put request as per Material model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of Material */
exports.schemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  symbol: joi.string().allow(null).allow(''),
  elementId: joi.string().allow(null).allow(''),
  type: joi.string().allow(null).allow(''),
  baseColors: joi.string().allow(null).allow(''),
  density: joi.string().allow(null).allow(''),
  meltingPoint: joi.string().allow(null).allow(''),
  boilingPoint: joi.string().allow(null).allow(''),
  standardState: joi.string().allow(null).allow(''),
  maxTemperature: joi.string().allow(null).allow(''),
  minTemperature: joi.string().allow(null).allow(''),
  spectrum: joi.string().allow(null).allow(''),
  condition: joi.string().allow(null).allow(''),
  parameters: joi.string().allow(null).allow(''),
  description: joi.string().allow(null).allow(''),
  verified: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of Material for updation */
exports.updateSchemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  symbol: joi.string().allow(null).allow(''),
  elementId: joi.string().allow(null).allow(''),
  type: joi.string().allow(null).allow(''),
  baseColors: joi.string().allow(null).allow(''),
  density: joi.string().allow(null).allow(''),
  meltingPoint: joi.string().allow(null).allow(''),
  boilingPoint: joi.string().allow(null).allow(''),
  standardState: joi.string().allow(null).allow(''),
  maxTemperature: joi.string().allow(null).allow(''),
  minTemperature: joi.string().allow(null).allow(''),
  spectrum: joi.string().allow(null).allow(''),
  condition: joi.string().allow(null).allow(''),
  parameters: joi.string().allow(null).allow(''),
  description: joi.string().allow(null).allow(''),
  verified: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Material for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      symbol: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      elementId: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      type: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      baseColors: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      density: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      meltingPoint: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      boilingPoint: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      standardState: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      maxTemperature: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      minTemperature: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      spectrum: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      condition: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      parameters: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      description: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      verified: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
