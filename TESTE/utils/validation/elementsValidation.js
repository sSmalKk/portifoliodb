/**
 * elementsValidation.js
 * @description :: validate each post and put request as per elements model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of elements */
exports.schemaKeys = joi.object({
  atomicNumber: joi.number().integer().required(),
  symbol: joi.string().required(),
  name: joi.string().required(),
  atomicMass: joi.number().integer().allow(0),
  cpkHexColor: joi.string().allow(null).allow(''),
  electronConfiguration: joi.string().allow(null).allow(''),
  electronegativity: joi.number().integer().allow(0),
  atomicRadius: joi.number().integer().allow(0),
  ionizationEnergy: joi.number().integer().allow(0),
  electronAffinity: joi.number().integer().allow(0),
  oxidationStates: joi.string().allow(null).allow(''),
  standardState: joi.string().allow(null).allow(''),
  meltingPoint: joi.number().integer().allow(0),
  boilingPoint: joi.number().integer().allow(0),
  density: joi.number().integer().allow(0),
  groupBlock: joi.string().allow(null).allow(''),
  yearDiscovered: joi.number().integer().allow(0),
  isDeleted: joi.boolean()
}).unknown(true);

/** validation keys and properties of elements for updation */
exports.updateSchemaKeys = joi.object({
  atomicNumber: joi.number().integer().when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }),
  symbol: joi.string().when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }),
  name: joi.string().when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }),
  atomicMass: joi.number().integer().allow(0),
  cpkHexColor: joi.string().allow(null).allow(''),
  electronConfiguration: joi.string().allow(null).allow(''),
  electronegativity: joi.number().integer().allow(0),
  atomicRadius: joi.number().integer().allow(0),
  ionizationEnergy: joi.number().integer().allow(0),
  electronAffinity: joi.number().integer().allow(0),
  oxidationStates: joi.string().allow(null).allow(''),
  standardState: joi.string().allow(null).allow(''),
  meltingPoint: joi.number().integer().allow(0),
  boilingPoint: joi.number().integer().allow(0),
  density: joi.number().integer().allow(0),
  groupBlock: joi.string().allow(null).allow(''),
  yearDiscovered: joi.number().integer().allow(0),
  isDeleted: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of elements for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      atomicNumber: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      symbol: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      atomicMass: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      cpkHexColor: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      electronConfiguration: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      electronegativity: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      atomicRadius: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      ionizationEnergy: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      electronAffinity: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      oxidationStates: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      standardState: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      meltingPoint: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      boilingPoint: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      density: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      groupBlock: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      yearDiscovered: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
