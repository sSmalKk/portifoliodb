/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Cubesarray = require('../model/cubesarray');
let Server = require('../model/server');
let Size = require('../model/size');
let Entity = require('../model/entity');
let Tick = require('../model/tick');
let Chat_group = require('../model/Chat_group');
let Chat_message = require('../model/Chat_message');
let Comment = require('../model/Comment');
let Blog = require('../model/Blog');
let User = require('../model/user');
let UserTokens = require('../model/userTokens');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteCubesarray = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Cubesarray,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteServer = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Server,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteSize = async (filter) =>{
  try {
    let size = await dbService.findMany(Size,filter);
    if (size && size.length){
      size = size.map((obj) => obj.id);

      const sizeFilter = { $or: [{ sizemaior : { $in : size } },{ sizemenor : { $in : size } }] };
      const sizeCnt = await dbService.deleteMany(Size,sizeFilter);

      let deleted  = await dbService.deleteMany(Size,filter);
      let response = { size :sizeCnt + deleted, };
      return response; 
    } else {
      return {  size : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteEntity = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Entity,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteTick = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Tick,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteChat_group = async (filter) =>{
  try {
    let chat_group = await dbService.findMany(Chat_group,filter);
    if (chat_group && chat_group.length){
      chat_group = chat_group.map((obj) => obj.id);

      const sizeFilter = { $or: [{ chat : { $in : chat_group } }] };
      const sizeCnt = await dbService.deleteMany(Size,sizeFilter);

      const Chat_messageFilter = { $or: [{ groupId : { $in : chat_group } }] };
      const Chat_messageCnt = await dbService.deleteMany(Chat_message,Chat_messageFilter);

      let deleted  = await dbService.deleteMany(Chat_group,filter);
      let response = {
        size :sizeCnt,
        Chat_message :Chat_messageCnt,
      };
      return response; 
    } else {
      return {  chat_group : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteChat_message = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Chat_message,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteComment = async (filter) =>{
  try {
    let comment = await dbService.findMany(Comment,filter);
    if (comment && comment.length){
      comment = comment.map((obj) => obj.id);

      const CommentFilter = { $or: [{ parentItem : { $in : comment } }] };
      const CommentCnt = await dbService.deleteMany(Comment,CommentFilter);

      let deleted  = await dbService.deleteMany(Comment,filter);
      let response = { Comment :CommentCnt, };
      return response; 
    } else {
      return {  comment : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteBlog = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Blog,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser = async (filter) =>{
  try {
    let user = await dbService.findMany(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const cubesarrayFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const cubesarrayCnt = await dbService.deleteMany(Cubesarray,cubesarrayFilter);

      const serverFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const serverCnt = await dbService.deleteMany(Server,serverFilter);

      const sizeFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const sizeCnt = await dbService.deleteMany(Size,sizeFilter);

      const entityFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const entityCnt = await dbService.deleteMany(Entity,entityFilter);

      const tickFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const tickCnt = await dbService.deleteMany(Tick,tickFilter);

      const Chat_groupFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const Chat_groupCnt = await dbService.deleteMany(Chat_group,Chat_groupFilter);

      const Chat_messageFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const Chat_messageCnt = await dbService.deleteMany(Chat_message,Chat_messageFilter);

      const CommentFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const CommentCnt = await dbService.deleteMany(Comment,CommentFilter);

      const BlogFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const BlogCnt = await dbService.deleteMany(Blog,BlogFilter);

      const userFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userCnt = await dbService.deleteMany(User,userFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt = await dbService.deleteMany(UserTokens,userTokensFilter);

      const roleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const roleCnt = await dbService.deleteMany(Role,roleFilter);

      const projectRouteFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const projectRouteCnt = await dbService.deleteMany(ProjectRoute,projectRouteFilter);

      const routeRoleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const routeRoleCnt = await dbService.deleteMany(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userRoleCnt = await dbService.deleteMany(UserRole,userRoleFilter);

      let deleted  = await dbService.deleteMany(User,filter);
      let response = {
        cubesarray :cubesarrayCnt,
        server :serverCnt,
        size :sizeCnt,
        entity :entityCnt,
        tick :tickCnt,
        Chat_group :Chat_groupCnt,
        Chat_message :Chat_messageCnt,
        Comment :CommentCnt,
        Blog :BlogCnt,
        user :userCnt + deleted,
        userTokens :userTokensCnt,
        role :roleCnt,
        projectRoute :projectRouteCnt,
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response; 
    } else {
      return {  user : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserTokens = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(UserTokens,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await dbService.findMany(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt = await dbService.deleteMany(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt = await dbService.deleteMany(UserRole,userRoleFilter);

      let deleted  = await dbService.deleteMany(Role,filter);
      let response = {
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response; 
    } else {
      return {  role : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findMany(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt = await dbService.deleteMany(RouteRole,routeRoleFilter);

      let deleted  = await dbService.deleteMany(ProjectRoute,filter);
      let response = { routeRole :routeRoleCnt, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(RouteRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(UserRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const countCubesarray = async (filter) =>{
  try {
    const cubesarrayCnt =  await dbService.count(Cubesarray,filter);
    return { cubesarray : cubesarrayCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countServer = async (filter) =>{
  try {
    const serverCnt =  await dbService.count(Server,filter);
    return { server : serverCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countSize = async (filter) =>{
  try {
    let size = await dbService.findMany(Size,filter);
    if (size && size.length){
      size = size.map((obj) => obj.id);

      const sizeFilter = { $or: [{ sizemaior : { $in : size } },{ sizemenor : { $in : size } }] };
      const sizeCnt =  await dbService.count(Size,sizeFilter);

      let response = { size : sizeCnt, };
      return response; 
    } else {
      return {  size : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countEntity = async (filter) =>{
  try {
    const entityCnt =  await dbService.count(Entity,filter);
    return { entity : entityCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countTick = async (filter) =>{
  try {
    const tickCnt =  await dbService.count(Tick,filter);
    return { tick : tickCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countChat_group = async (filter) =>{
  try {
    let chat_group = await dbService.findMany(Chat_group,filter);
    if (chat_group && chat_group.length){
      chat_group = chat_group.map((obj) => obj.id);

      const sizeFilter = { $or: [{ chat : { $in : chat_group } }] };
      const sizeCnt =  await dbService.count(Size,sizeFilter);

      const Chat_messageFilter = { $or: [{ groupId : { $in : chat_group } }] };
      const Chat_messageCnt =  await dbService.count(Chat_message,Chat_messageFilter);

      let response = {
        size : sizeCnt,
        Chat_message : Chat_messageCnt,
      };
      return response; 
    } else {
      return {  chat_group : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countChat_message = async (filter) =>{
  try {
    const Chat_messageCnt =  await dbService.count(Chat_message,filter);
    return { Chat_message : Chat_messageCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countComment = async (filter) =>{
  try {
    let comment = await dbService.findMany(Comment,filter);
    if (comment && comment.length){
      comment = comment.map((obj) => obj.id);

      const CommentFilter = { $or: [{ parentItem : { $in : comment } }] };
      const CommentCnt =  await dbService.count(Comment,CommentFilter);

      let response = { Comment : CommentCnt, };
      return response; 
    } else {
      return {  comment : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countBlog = async (filter) =>{
  try {
    const BlogCnt =  await dbService.count(Blog,filter);
    return { Blog : BlogCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
    let user = await dbService.findMany(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const cubesarrayFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const cubesarrayCnt =  await dbService.count(Cubesarray,cubesarrayFilter);

      const serverFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const serverCnt =  await dbService.count(Server,serverFilter);

      const sizeFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const sizeCnt =  await dbService.count(Size,sizeFilter);

      const entityFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const entityCnt =  await dbService.count(Entity,entityFilter);

      const tickFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const tickCnt =  await dbService.count(Tick,tickFilter);

      const Chat_groupFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const Chat_groupCnt =  await dbService.count(Chat_group,Chat_groupFilter);

      const Chat_messageFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const Chat_messageCnt =  await dbService.count(Chat_message,Chat_messageFilter);

      const CommentFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const CommentCnt =  await dbService.count(Comment,CommentFilter);

      const BlogFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const BlogCnt =  await dbService.count(Blog,BlogFilter);

      const userFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userCnt =  await dbService.count(User,userFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt =  await dbService.count(UserTokens,userTokensFilter);

      const roleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const roleCnt =  await dbService.count(Role,roleFilter);

      const projectRouteFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const projectRouteCnt =  await dbService.count(ProjectRoute,projectRouteFilter);

      const routeRoleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        cubesarray : cubesarrayCnt,
        server : serverCnt,
        size : sizeCnt,
        entity : entityCnt,
        tick : tickCnt,
        Chat_group : Chat_groupCnt,
        Chat_message : Chat_messageCnt,
        Comment : CommentCnt,
        Blog : BlogCnt,
        user : userCnt,
        userTokens : userTokensCnt,
        role : roleCnt,
        projectRoute : projectRouteCnt,
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserTokens = async (filter) =>{
  try {
    const userTokensCnt =  await dbService.count(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
    let role = await dbService.findMany(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findMany(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      let response = { routeRole : routeRoleCnt, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
    const routeRoleCnt =  await dbService.count(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
    const userRoleCnt =  await dbService.count(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteCubesarray = async (filter,updateBody) =>{  
  try {
    const cubesarrayCnt =  await dbService.updateMany(Cubesarray,filter);
    return { cubesarray : cubesarrayCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteServer = async (filter,updateBody) =>{  
  try {
    const serverCnt =  await dbService.updateMany(Server,filter);
    return { server : serverCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteSize = async (filter,updateBody) =>{  
  try {
    let size = await dbService.findMany(Size,filter, { id:1 });
    if (size.length){
      size = size.map((obj) => obj.id);

      const sizeFilter = { '$or': [{ sizemaior : { '$in' : size } },{ sizemenor : { '$in' : size } }] };
      const sizeCnt = await dbService.updateMany(Size,sizeFilter,updateBody);
      let updated = await dbService.updateMany(Size,filter,updateBody);

      let response = { size :sizeCnt + updated, };
      return response;
    } else {
      return {  size : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteEntity = async (filter,updateBody) =>{  
  try {
    const entityCnt =  await dbService.updateMany(Entity,filter);
    return { entity : entityCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteTick = async (filter,updateBody) =>{  
  try {
    const tickCnt =  await dbService.updateMany(Tick,filter);
    return { tick : tickCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteChat_group = async (filter,updateBody) =>{  
  try {
    let chat_group = await dbService.findMany(Chat_group,filter, { id:1 });
    if (chat_group.length){
      chat_group = chat_group.map((obj) => obj.id);

      const sizeFilter = { '$or': [{ chat : { '$in' : chat_group } }] };
      const sizeCnt = await dbService.updateMany(Size,sizeFilter,updateBody);

      const Chat_messageFilter = { '$or': [{ groupId : { '$in' : chat_group } }] };
      const Chat_messageCnt = await dbService.updateMany(Chat_message,Chat_messageFilter,updateBody);
      let updated = await dbService.updateMany(Chat_group,filter,updateBody);

      let response = {
        size :sizeCnt,
        Chat_message :Chat_messageCnt,
      };
      return response;
    } else {
      return {  chat_group : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteChat_message = async (filter,updateBody) =>{  
  try {
    const Chat_messageCnt =  await dbService.updateMany(Chat_message,filter);
    return { Chat_message : Chat_messageCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteComment = async (filter,updateBody) =>{  
  try {
    let comment = await dbService.findMany(Comment,filter, { id:1 });
    if (comment.length){
      comment = comment.map((obj) => obj.id);

      const CommentFilter = { '$or': [{ parentItem : { '$in' : comment } }] };
      const CommentCnt = await dbService.updateMany(Comment,CommentFilter,updateBody);
      let updated = await dbService.updateMany(Comment,filter,updateBody);

      let response = { Comment :CommentCnt, };
      return response;
    } else {
      return {  comment : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteBlog = async (filter,updateBody) =>{  
  try {
    const BlogCnt =  await dbService.updateMany(Blog,filter);
    return { Blog : BlogCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody) =>{  
  try {
    let user = await dbService.findMany(User,filter, { id:1 });
    if (user.length){
      user = user.map((obj) => obj.id);

      const cubesarrayFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const cubesarrayCnt = await dbService.updateMany(Cubesarray,cubesarrayFilter,updateBody);

      const serverFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const serverCnt = await dbService.updateMany(Server,serverFilter,updateBody);

      const sizeFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const sizeCnt = await dbService.updateMany(Size,sizeFilter,updateBody);

      const entityFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const entityCnt = await dbService.updateMany(Entity,entityFilter,updateBody);

      const tickFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const tickCnt = await dbService.updateMany(Tick,tickFilter,updateBody);

      const Chat_groupFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const Chat_groupCnt = await dbService.updateMany(Chat_group,Chat_groupFilter,updateBody);

      const Chat_messageFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const Chat_messageCnt = await dbService.updateMany(Chat_message,Chat_messageFilter,updateBody);

      const CommentFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const CommentCnt = await dbService.updateMany(Comment,CommentFilter,updateBody);

      const BlogFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const BlogCnt = await dbService.updateMany(Blog,BlogFilter,updateBody);

      const userFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userCnt = await dbService.updateMany(User,userFilter,updateBody);

      const userTokensFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userTokensCnt = await dbService.updateMany(UserTokens,userTokensFilter,updateBody);

      const roleFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const roleCnt = await dbService.updateMany(Role,roleFilter,updateBody);

      const projectRouteFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const projectRouteCnt = await dbService.updateMany(ProjectRoute,projectRouteFilter,updateBody);

      const routeRoleFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const routeRoleCnt = await dbService.updateMany(RouteRole,routeRoleFilter,updateBody);

      const userRoleFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userRoleCnt = await dbService.updateMany(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.updateMany(User,filter,updateBody);

      let response = {
        cubesarray :cubesarrayCnt,
        server :serverCnt,
        size :sizeCnt,
        entity :entityCnt,
        tick :tickCnt,
        Chat_group :Chat_groupCnt,
        Chat_message :Chat_messageCnt,
        Comment :CommentCnt,
        Blog :BlogCnt,
        user :userCnt + updated,
        userTokens :userTokensCnt,
        role :roleCnt,
        projectRoute :projectRouteCnt,
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response;
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserTokens = async (filter,updateBody) =>{  
  try {
    const userTokensCnt =  await dbService.updateMany(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,updateBody) =>{  
  try {
    let role = await dbService.findMany(Role,filter, { id:1 });
    if (role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const routeRoleCnt = await dbService.updateMany(RouteRole,routeRoleFilter,updateBody);

      const userRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const userRoleCnt = await dbService.updateMany(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.updateMany(Role,filter,updateBody);

      let response = {
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response;
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,updateBody) =>{  
  try {
    let projectroute = await dbService.findMany(ProjectRoute,filter, { id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ routeId : { '$in' : projectroute } }] };
      const routeRoleCnt = await dbService.updateMany(RouteRole,routeRoleFilter,updateBody);
      let updated = await dbService.updateMany(ProjectRoute,filter,updateBody);

      let response = { routeRole :routeRoleCnt, };
      return response;
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,updateBody) =>{  
  try {
    const routeRoleCnt =  await dbService.updateMany(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,updateBody) =>{  
  try {
    const userRoleCnt =  await dbService.updateMany(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteCubesarray,
  deleteServer,
  deleteSize,
  deleteEntity,
  deleteTick,
  deleteChat_group,
  deleteChat_message,
  deleteComment,
  deleteBlog,
  deleteUser,
  deleteUserTokens,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countCubesarray,
  countServer,
  countSize,
  countEntity,
  countTick,
  countChat_group,
  countChat_message,
  countComment,
  countBlog,
  countUser,
  countUserTokens,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteCubesarray,
  softDeleteServer,
  softDeleteSize,
  softDeleteEntity,
  softDeleteTick,
  softDeleteChat_group,
  softDeleteChat_message,
  softDeleteComment,
  softDeleteBlog,
  softDeleteUser,
  softDeleteUserTokens,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
