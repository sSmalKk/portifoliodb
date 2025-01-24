/**
 * ChemistryElementValidation.js
 * @description :: validate each post and put request as per ChemistryElement model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of ChemistryElement */
exports.schemaKeys = joi.object({
  atomicNumber: joi.number().integer().required(),
  symbol: joi.string().required(),
  name: joi.string().allow(null).allow(''),
  atomicMass: joi.string().required(),
  cpkHexColor: joi.string().allow(null).allow(''),
  electronConfiguration: joi.string().allow(null).allow(''),
  electronegativity: joi.string().allow(null).allow(''),
  atomicRadius: joi.string().allow(null).allow(''),
  ionizationEnergy: joi.string().allow(null).allow(''),
  electronAffinity: joi.string().allow(null).allow(''),
  oxidationStates: joi.string().allow(null).allow(''),
  standardState: joi.string().allow(null).allow(''),
  meltingPoint: joi.string().allow(null).allow(''),
  boilingPoint: joi.string().allow(null).allow(''),
  density: joi.string().allow(null).allow(''),
  groupBlock: joi.string().allow(null).allow(''),
  yearDiscovered: joi.string().allow(null).allow(''),
  updatedAt: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  image: joi.string().allow(null).allow('')
}).unknown(true);

/** validation keys and properties of ChemistryElement for updation */
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
  name: joi.string().allow(null).allow(''),
  atomicMass: joi.string().when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }),
  cpkHexColor: joi.string().allow(null).allow(''),
  electronConfiguration: joi.string().allow(null).allow(''),
  electronegativity: joi.string().allow(null).allow(''),
  atomicRadius: joi.string().allow(null).allow(''),
  ionizationEnergy: joi.string().allow(null).allow(''),
  electronAffinity: joi.string().allow(null).allow(''),
  oxidationStates: joi.string().allow(null).allow(''),
  standardState: joi.string().allow(null).allow(''),
  meltingPoint: joi.string().allow(null).allow(''),
  boilingPoint: joi.string().allow(null).allow(''),
  density: joi.string().allow(null).allow(''),
  groupBlock: joi.string().allow(null).allow(''),
  yearDiscovered: joi.string().allow(null).allow(''),
  updatedAt: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  image: joi.string().allow(null).allow(''),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of ChemistryElement for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      atomicNumber: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      symbol: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      atomicMass: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      cpkHexColor: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      electronConfiguration: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      electronegativity: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      atomicRadius: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      ionizationEnergy: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      electronAffinity: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      oxidationStates: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      standardState: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      meltingPoint: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      boilingPoint: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      density: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      groupBlock: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      yearDiscovered: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      updatedAt: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      image: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
