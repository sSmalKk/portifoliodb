/**
 * UserValidation.js
 * @description :: validate each post and put request as per User model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');
const authConstantDefault = require('../../constants/authConstant');    
const { USER_TYPES } = require('../../constants/authConstant');
const { convertObjectToEnum } = require('../common');   

/** validation keys and properties of User */
exports.schemaKeys = joi.object({
  username: joi.string().allow(null).allow(''),
  password: joi.string().allow(null).allow(''),
  email: joi.string().allow(null).allow(''),
  name: joi.string().allow(null).allow(''),
  isActive: joi.boolean(),
  userType: joi.number().allow(0),
  x: joi.number().integer().allow(0),
  y: joi.number().integer().allow(0),
  z: joi.number().integer().allow(0),
  vx: joi.string().allow(null).allow(''),
  vy: joi.string().allow(null).allow(''),
  vz: joi.string().allow(null).allow(''),
  rx: joi.string().allow(null).allow(''),
  ry: joi.string().allow(null).allow(''),
  rz: joi.string().allow(null).allow(''),
  chat: joi.array().items(),
  mobileNo: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  resetPasswordLink: joi.object({
    code:joi.string(),
    expireTime:joi.date().options({ convert: true })
  })
}).unknown(true);

/** validation keys and properties of User for updation */
exports.updateSchemaKeys = joi.object({
  username: joi.string().allow(null).allow(''),
  password: joi.string().allow(null).allow(''),
  email: joi.string().allow(null).allow(''),
  name: joi.string().allow(null).allow(''),
  isActive: joi.boolean(),
  userType: joi.number().allow(0),
  x: joi.number().integer().allow(0),
  y: joi.number().integer().allow(0),
  z: joi.number().integer().allow(0),
  vx: joi.string().allow(null).allow(''),
  vy: joi.string().allow(null).allow(''),
  vz: joi.string().allow(null).allow(''),
  rx: joi.string().allow(null).allow(''),
  ry: joi.string().allow(null).allow(''),
  rz: joi.string().allow(null).allow(''),
  chat: joi.array().items(),
  mobileNo: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  resetPasswordLink: joi.object({
    code:joi.string(),
    expireTime:joi.date().options({ convert: true })
  }),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of User for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      username: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      password: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      email: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      x: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      y: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      z: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      vx: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      vy: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      vz: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      rx: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      ry: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      rz: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      chat: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      mobileNo: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
