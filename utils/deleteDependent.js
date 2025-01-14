/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Entitybody = require('../model/entitybody');
let Organ = require('../model/Organ');
let Member = require('../model/Member');
let Blog = require('../model/Blog');
let Comment = require('../model/Comment');
let Part = require('../model/part');
let Custommodel = require('../model/custommodel');
let Pack = require('../model/pack');
let Substance = require('../model/substance');
let Turtleparameter = require('../model/turtleparameter');
let Model = require('../model/model');
let Texture = require('../model/texture');
let Itemgenerator = require('../model/itemgenerator');
let Entity = require('../model/entity');
let Size = require('../model/size');
let Interface = require('../model/interface');
let Assets = require('../model/assets');
let Item = require('../model/item');
let Elements = require('../model/elements');
let Parameter = require('../model/parameter');
let Blockstate = require('../model/blockstate');
let Material = require('../model/material');
let Chunk = require('../model/Chunk');
let Chat = require('../model/Chat');
let Chat_message = require('../model/Chat_message');
let User = require('../model/User');
let UserTokens = require('../model/userTokens');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteEntitybody = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Entitybody,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteOrgan = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Organ,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteMember = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Member,filter);
    return response;
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

const deletePart = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Part,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteCustommodel = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Custommodel,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deletePack = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Pack,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteSubstance = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Substance,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteTurtleparameter = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Turtleparameter,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteModel = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Model,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteTexture = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Texture,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteItemgenerator = async (filter) =>{
  try {
    let itemgenerator = await dbService.findMany(Itemgenerator,filter);
    if (itemgenerator && itemgenerator.length){
      itemgenerator = itemgenerator.map((obj) => obj.id);

      const itemFilter = { $or: [{ itemmodel : { $in : itemgenerator } }] };
      const itemCnt = await dbService.deleteMany(Item,itemFilter);

      let deleted  = await dbService.deleteMany(Itemgenerator,filter);
      let response = { item :itemCnt, };
      return response; 
    } else {
      return {  itemgenerator : 0 };
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

const deleteSize = async (filter) =>{
  try {
    let size = await dbService.findMany(Size,filter);
    if (size && size.length){
      size = size.map((obj) => obj.id);

      const itemgeneratorFilter = { $or: [{ Size : { $in : size } }] };
      const itemgeneratorCnt = await dbService.deleteMany(Itemgenerator,itemgeneratorFilter);

      let deleted  = await dbService.deleteMany(Size,filter);
      let response = { itemgenerator :itemgeneratorCnt, };
      return response; 
    } else {
      return {  size : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteInterface = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Interface,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteAssets = async (filter) =>{
  try {
    let assets = await dbService.findMany(Assets,filter);
    if (assets && assets.length){
      assets = assets.map((obj) => obj.id);

      const interfaceFilter = { $or: [{ background : { $in : assets } }] };
      const interfaceCnt = await dbService.deleteMany(Interface,interfaceFilter);

      let deleted  = await dbService.deleteMany(Assets,filter);
      let response = { interface :interfaceCnt, };
      return response; 
    } else {
      return {  assets : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteItem = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Item,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteElements = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Elements,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteParameter = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Parameter,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteBlockstate = async (filter) =>{
  try {
    let blockstate = await dbService.findMany(Blockstate,filter);
    if (blockstate && blockstate.length){
      blockstate = blockstate.map((obj) => obj.id);

      const itemgeneratorFilter = { $or: [{ model : { $in : blockstate } }] };
      const itemgeneratorCnt = await dbService.deleteMany(Itemgenerator,itemgeneratorFilter);

      let deleted  = await dbService.deleteMany(Blockstate,filter);
      let response = { itemgenerator :itemgeneratorCnt, };
      return response; 
    } else {
      return {  blockstate : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteMaterial = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Material,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteChunk = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Chunk,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteChat = async (filter) =>{
  try {
    let chat = await dbService.findMany(Chat,filter);
    if (chat && chat.length){
      chat = chat.map((obj) => obj.id);

      const Chat_messageFilter = { $or: [{ groupId : { $in : chat } }] };
      const Chat_messageCnt = await dbService.deleteMany(Chat_message,Chat_messageFilter);

      let deleted  = await dbService.deleteMany(Chat,filter);
      let response = { Chat_message :Chat_messageCnt, };
      return response; 
    } else {
      return {  chat : 0 };
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

const deleteUser = async (filter) =>{
  try {
    let user = await dbService.findMany(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const entitybodyFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const entitybodyCnt = await dbService.deleteMany(Entitybody,entitybodyFilter);

      const OrganFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const OrganCnt = await dbService.deleteMany(Organ,OrganFilter);

      const MemberFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const MemberCnt = await dbService.deleteMany(Member,MemberFilter);

      const BlogFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const BlogCnt = await dbService.deleteMany(Blog,BlogFilter);

      const CommentFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const CommentCnt = await dbService.deleteMany(Comment,CommentFilter);

      const partFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const partCnt = await dbService.deleteMany(Part,partFilter);

      const custommodelFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const custommodelCnt = await dbService.deleteMany(Custommodel,custommodelFilter);

      const packFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const packCnt = await dbService.deleteMany(Pack,packFilter);

      const turtleparameterFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const turtleparameterCnt = await dbService.deleteMany(Turtleparameter,turtleparameterFilter);

      const modelFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const modelCnt = await dbService.deleteMany(Model,modelFilter);

      const textureFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const textureCnt = await dbService.deleteMany(Texture,textureFilter);

      const itemgeneratorFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const itemgeneratorCnt = await dbService.deleteMany(Itemgenerator,itemgeneratorFilter);

      const entityFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const entityCnt = await dbService.deleteMany(Entity,entityFilter);

      const sizeFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const sizeCnt = await dbService.deleteMany(Size,sizeFilter);

      const interfaceFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const interfaceCnt = await dbService.deleteMany(Interface,interfaceFilter);

      const assetsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const assetsCnt = await dbService.deleteMany(Assets,assetsFilter);

      const itemFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const itemCnt = await dbService.deleteMany(Item,itemFilter);

      const parameterFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const parameterCnt = await dbService.deleteMany(Parameter,parameterFilter);

      const blockstateFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const blockstateCnt = await dbService.deleteMany(Blockstate,blockstateFilter);

      const materialFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const materialCnt = await dbService.deleteMany(Material,materialFilter);

      const ChunkFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const ChunkCnt = await dbService.deleteMany(Chunk,ChunkFilter);

      const ChatFilter = { $or: [{ admin : { $in : user } },{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const ChatCnt = await dbService.deleteMany(Chat,ChatFilter);

      const Chat_messageFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const Chat_messageCnt = await dbService.deleteMany(Chat_message,Chat_messageFilter);

      const UserFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const UserCnt = await dbService.deleteMany(User,UserFilter);

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
        entitybody :entitybodyCnt,
        Organ :OrganCnt,
        Member :MemberCnt,
        Blog :BlogCnt,
        Comment :CommentCnt,
        part :partCnt,
        custommodel :custommodelCnt,
        pack :packCnt,
        turtleparameter :turtleparameterCnt,
        model :modelCnt,
        texture :textureCnt,
        itemgenerator :itemgeneratorCnt,
        entity :entityCnt,
        size :sizeCnt,
        interface :interfaceCnt,
        assets :assetsCnt,
        item :itemCnt,
        parameter :parameterCnt,
        blockstate :blockstateCnt,
        material :materialCnt,
        Chunk :ChunkCnt,
        Chat :ChatCnt,
        Chat_message :Chat_messageCnt,
        User :UserCnt,
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

const countEntitybody = async (filter) =>{
  try {
    const entitybodyCnt =  await dbService.count(Entitybody,filter);
    return { entitybody : entitybodyCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countOrgan = async (filter) =>{
  try {
    const OrganCnt =  await dbService.count(Organ,filter);
    return { Organ : OrganCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countMember = async (filter) =>{
  try {
    const MemberCnt =  await dbService.count(Member,filter);
    return { Member : MemberCnt };
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

const countPart = async (filter) =>{
  try {
    const partCnt =  await dbService.count(Part,filter);
    return { part : partCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countCustommodel = async (filter) =>{
  try {
    const custommodelCnt =  await dbService.count(Custommodel,filter);
    return { custommodel : custommodelCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countPack = async (filter) =>{
  try {
    const packCnt =  await dbService.count(Pack,filter);
    return { pack : packCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countSubstance = async (filter) =>{
  try {
    const substanceCnt =  await dbService.count(Substance,filter);
    return { substance : substanceCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countTurtleparameter = async (filter) =>{
  try {
    const turtleparameterCnt =  await dbService.count(Turtleparameter,filter);
    return { turtleparameter : turtleparameterCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countModel = async (filter) =>{
  try {
    const modelCnt =  await dbService.count(Model,filter);
    return { model : modelCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countTexture = async (filter) =>{
  try {
    const textureCnt =  await dbService.count(Texture,filter);
    return { texture : textureCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countItemgenerator = async (filter) =>{
  try {
    let itemgenerator = await dbService.findMany(Itemgenerator,filter);
    if (itemgenerator && itemgenerator.length){
      itemgenerator = itemgenerator.map((obj) => obj.id);

      const itemFilter = { $or: [{ itemmodel : { $in : itemgenerator } }] };
      const itemCnt =  await dbService.count(Item,itemFilter);

      let response = { item : itemCnt, };
      return response; 
    } else {
      return {  itemgenerator : 0 };
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

const countSize = async (filter) =>{
  try {
    let size = await dbService.findMany(Size,filter);
    if (size && size.length){
      size = size.map((obj) => obj.id);

      const itemgeneratorFilter = { $or: [{ Size : { $in : size } }] };
      const itemgeneratorCnt =  await dbService.count(Itemgenerator,itemgeneratorFilter);

      let response = { itemgenerator : itemgeneratorCnt, };
      return response; 
    } else {
      return {  size : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countInterface = async (filter) =>{
  try {
    const interfaceCnt =  await dbService.count(Interface,filter);
    return { interface : interfaceCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countAssets = async (filter) =>{
  try {
    let assets = await dbService.findMany(Assets,filter);
    if (assets && assets.length){
      assets = assets.map((obj) => obj.id);

      const interfaceFilter = { $or: [{ background : { $in : assets } }] };
      const interfaceCnt =  await dbService.count(Interface,interfaceFilter);

      let response = { interface : interfaceCnt, };
      return response; 
    } else {
      return {  assets : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countItem = async (filter) =>{
  try {
    const itemCnt =  await dbService.count(Item,filter);
    return { item : itemCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countElements = async (filter) =>{
  try {
    const elementsCnt =  await dbService.count(Elements,filter);
    return { elements : elementsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countParameter = async (filter) =>{
  try {
    const parameterCnt =  await dbService.count(Parameter,filter);
    return { parameter : parameterCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countBlockstate = async (filter) =>{
  try {
    let blockstate = await dbService.findMany(Blockstate,filter);
    if (blockstate && blockstate.length){
      blockstate = blockstate.map((obj) => obj.id);

      const itemgeneratorFilter = { $or: [{ model : { $in : blockstate } }] };
      const itemgeneratorCnt =  await dbService.count(Itemgenerator,itemgeneratorFilter);

      let response = { itemgenerator : itemgeneratorCnt, };
      return response; 
    } else {
      return {  blockstate : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countMaterial = async (filter) =>{
  try {
    const materialCnt =  await dbService.count(Material,filter);
    return { material : materialCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countChunk = async (filter) =>{
  try {
    const ChunkCnt =  await dbService.count(Chunk,filter);
    return { Chunk : ChunkCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countChat = async (filter) =>{
  try {
    let chat = await dbService.findMany(Chat,filter);
    if (chat && chat.length){
      chat = chat.map((obj) => obj.id);

      const Chat_messageFilter = { $or: [{ groupId : { $in : chat } }] };
      const Chat_messageCnt =  await dbService.count(Chat_message,Chat_messageFilter);

      let response = { Chat_message : Chat_messageCnt, };
      return response; 
    } else {
      return {  chat : 0 };
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

const countUser = async (filter) =>{
  try {
    let user = await dbService.findMany(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const entitybodyFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const entitybodyCnt =  await dbService.count(Entitybody,entitybodyFilter);

      const OrganFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const OrganCnt =  await dbService.count(Organ,OrganFilter);

      const MemberFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const MemberCnt =  await dbService.count(Member,MemberFilter);

      const BlogFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const BlogCnt =  await dbService.count(Blog,BlogFilter);

      const CommentFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const CommentCnt =  await dbService.count(Comment,CommentFilter);

      const partFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const partCnt =  await dbService.count(Part,partFilter);

      const custommodelFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const custommodelCnt =  await dbService.count(Custommodel,custommodelFilter);

      const packFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const packCnt =  await dbService.count(Pack,packFilter);

      const turtleparameterFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const turtleparameterCnt =  await dbService.count(Turtleparameter,turtleparameterFilter);

      const modelFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const modelCnt =  await dbService.count(Model,modelFilter);

      const textureFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const textureCnt =  await dbService.count(Texture,textureFilter);

      const itemgeneratorFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const itemgeneratorCnt =  await dbService.count(Itemgenerator,itemgeneratorFilter);

      const entityFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const entityCnt =  await dbService.count(Entity,entityFilter);

      const sizeFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const sizeCnt =  await dbService.count(Size,sizeFilter);

      const interfaceFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const interfaceCnt =  await dbService.count(Interface,interfaceFilter);

      const assetsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const assetsCnt =  await dbService.count(Assets,assetsFilter);

      const itemFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const itemCnt =  await dbService.count(Item,itemFilter);

      const parameterFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const parameterCnt =  await dbService.count(Parameter,parameterFilter);

      const blockstateFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const blockstateCnt =  await dbService.count(Blockstate,blockstateFilter);

      const materialFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const materialCnt =  await dbService.count(Material,materialFilter);

      const ChunkFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const ChunkCnt =  await dbService.count(Chunk,ChunkFilter);

      const ChatFilter = { $or: [{ admin : { $in : user } },{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const ChatCnt =  await dbService.count(Chat,ChatFilter);

      const Chat_messageFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const Chat_messageCnt =  await dbService.count(Chat_message,Chat_messageFilter);

      const UserFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const UserCnt =  await dbService.count(User,UserFilter);

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
        entitybody : entitybodyCnt,
        Organ : OrganCnt,
        Member : MemberCnt,
        Blog : BlogCnt,
        Comment : CommentCnt,
        part : partCnt,
        custommodel : custommodelCnt,
        pack : packCnt,
        turtleparameter : turtleparameterCnt,
        model : modelCnt,
        texture : textureCnt,
        itemgenerator : itemgeneratorCnt,
        entity : entityCnt,
        size : sizeCnt,
        interface : interfaceCnt,
        assets : assetsCnt,
        item : itemCnt,
        parameter : parameterCnt,
        blockstate : blockstateCnt,
        material : materialCnt,
        Chunk : ChunkCnt,
        Chat : ChatCnt,
        Chat_message : Chat_messageCnt,
        User : UserCnt,
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

const softDeleteEntitybody = async (filter,updateBody) =>{  
  try {
    const entitybodyCnt =  await dbService.updateMany(Entitybody,filter);
    return { entitybody : entitybodyCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteOrgan = async (filter,updateBody) =>{  
  try {
    const OrganCnt =  await dbService.updateMany(Organ,filter);
    return { Organ : OrganCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteMember = async (filter,updateBody) =>{  
  try {
    const MemberCnt =  await dbService.updateMany(Member,filter);
    return { Member : MemberCnt };
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

const softDeletePart = async (filter,updateBody) =>{  
  try {
    const partCnt =  await dbService.updateMany(Part,filter);
    return { part : partCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteCustommodel = async (filter,updateBody) =>{  
  try {
    const custommodelCnt =  await dbService.updateMany(Custommodel,filter);
    return { custommodel : custommodelCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePack = async (filter,updateBody) =>{  
  try {
    const packCnt =  await dbService.updateMany(Pack,filter);
    return { pack : packCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteSubstance = async (filter,updateBody) =>{  
  try {
    const substanceCnt =  await dbService.updateMany(Substance,filter);
    return { substance : substanceCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteTurtleparameter = async (filter,updateBody) =>{  
  try {
    const turtleparameterCnt =  await dbService.updateMany(Turtleparameter,filter);
    return { turtleparameter : turtleparameterCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteModel = async (filter,updateBody) =>{  
  try {
    const modelCnt =  await dbService.updateMany(Model,filter);
    return { model : modelCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteTexture = async (filter,updateBody) =>{  
  try {
    const textureCnt =  await dbService.updateMany(Texture,filter);
    return { texture : textureCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteItemgenerator = async (filter,updateBody) =>{  
  try {
    let itemgenerator = await dbService.findMany(Itemgenerator,filter, { id:1 });
    if (itemgenerator.length){
      itemgenerator = itemgenerator.map((obj) => obj.id);

      const itemFilter = { '$or': [{ itemmodel : { '$in' : itemgenerator } }] };
      const itemCnt = await dbService.updateMany(Item,itemFilter,updateBody);
      let updated = await dbService.updateMany(Itemgenerator,filter,updateBody);

      let response = { item :itemCnt, };
      return response;
    } else {
      return {  itemgenerator : 0 };
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

const softDeleteSize = async (filter,updateBody) =>{  
  try {
    let size = await dbService.findMany(Size,filter, { id:1 });
    if (size.length){
      size = size.map((obj) => obj.id);

      const itemgeneratorFilter = { '$or': [{ Size : { '$in' : size } }] };
      const itemgeneratorCnt = await dbService.updateMany(Itemgenerator,itemgeneratorFilter,updateBody);
      let updated = await dbService.updateMany(Size,filter,updateBody);

      let response = { itemgenerator :itemgeneratorCnt, };
      return response;
    } else {
      return {  size : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteInterface = async (filter,updateBody) =>{  
  try {
    const interfaceCnt =  await dbService.updateMany(Interface,filter);
    return { interface : interfaceCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteAssets = async (filter,updateBody) =>{  
  try {
    let assets = await dbService.findMany(Assets,filter, { id:1 });
    if (assets.length){
      assets = assets.map((obj) => obj.id);

      const interfaceFilter = { '$or': [{ background : { '$in' : assets } }] };
      const interfaceCnt = await dbService.updateMany(Interface,interfaceFilter,updateBody);
      let updated = await dbService.updateMany(Assets,filter,updateBody);

      let response = { interface :interfaceCnt, };
      return response;
    } else {
      return {  assets : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteItem = async (filter,updateBody) =>{  
  try {
    const itemCnt =  await dbService.updateMany(Item,filter);
    return { item : itemCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteElements = async (filter,updateBody) =>{  
  try {
    const elementsCnt =  await dbService.updateMany(Elements,filter);
    return { elements : elementsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteParameter = async (filter,updateBody) =>{  
  try {
    const parameterCnt =  await dbService.updateMany(Parameter,filter);
    return { parameter : parameterCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteBlockstate = async (filter,updateBody) =>{  
  try {
    let blockstate = await dbService.findMany(Blockstate,filter, { id:1 });
    if (blockstate.length){
      blockstate = blockstate.map((obj) => obj.id);

      const itemgeneratorFilter = { '$or': [{ model : { '$in' : blockstate } }] };
      const itemgeneratorCnt = await dbService.updateMany(Itemgenerator,itemgeneratorFilter,updateBody);
      let updated = await dbService.updateMany(Blockstate,filter,updateBody);

      let response = { itemgenerator :itemgeneratorCnt, };
      return response;
    } else {
      return {  blockstate : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteMaterial = async (filter,updateBody) =>{  
  try {
    const materialCnt =  await dbService.updateMany(Material,filter);
    return { material : materialCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteChunk = async (filter,updateBody) =>{  
  try {
    const ChunkCnt =  await dbService.updateMany(Chunk,filter);
    return { Chunk : ChunkCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteChat = async (filter,updateBody) =>{  
  try {
    let chat = await dbService.findMany(Chat,filter, { id:1 });
    if (chat.length){
      chat = chat.map((obj) => obj.id);

      const Chat_messageFilter = { '$or': [{ groupId : { '$in' : chat } }] };
      const Chat_messageCnt = await dbService.updateMany(Chat_message,Chat_messageFilter,updateBody);
      let updated = await dbService.updateMany(Chat,filter,updateBody);

      let response = { Chat_message :Chat_messageCnt, };
      return response;
    } else {
      return {  chat : 0 };
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

const softDeleteUser = async (filter,updateBody) =>{  
  try {
    let user = await dbService.findMany(User,filter, { id:1 });
    if (user.length){
      user = user.map((obj) => obj.id);

      const entitybodyFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const entitybodyCnt = await dbService.updateMany(Entitybody,entitybodyFilter,updateBody);

      const OrganFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const OrganCnt = await dbService.updateMany(Organ,OrganFilter,updateBody);

      const MemberFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const MemberCnt = await dbService.updateMany(Member,MemberFilter,updateBody);

      const BlogFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const BlogCnt = await dbService.updateMany(Blog,BlogFilter,updateBody);

      const CommentFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const CommentCnt = await dbService.updateMany(Comment,CommentFilter,updateBody);

      const partFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const partCnt = await dbService.updateMany(Part,partFilter,updateBody);

      const custommodelFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const custommodelCnt = await dbService.updateMany(Custommodel,custommodelFilter,updateBody);

      const packFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const packCnt = await dbService.updateMany(Pack,packFilter,updateBody);

      const turtleparameterFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const turtleparameterCnt = await dbService.updateMany(Turtleparameter,turtleparameterFilter,updateBody);

      const modelFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const modelCnt = await dbService.updateMany(Model,modelFilter,updateBody);

      const textureFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const textureCnt = await dbService.updateMany(Texture,textureFilter,updateBody);

      const itemgeneratorFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const itemgeneratorCnt = await dbService.updateMany(Itemgenerator,itemgeneratorFilter,updateBody);

      const entityFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const entityCnt = await dbService.updateMany(Entity,entityFilter,updateBody);

      const sizeFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const sizeCnt = await dbService.updateMany(Size,sizeFilter,updateBody);

      const interfaceFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const interfaceCnt = await dbService.updateMany(Interface,interfaceFilter,updateBody);

      const assetsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const assetsCnt = await dbService.updateMany(Assets,assetsFilter,updateBody);

      const itemFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const itemCnt = await dbService.updateMany(Item,itemFilter,updateBody);

      const parameterFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const parameterCnt = await dbService.updateMany(Parameter,parameterFilter,updateBody);

      const blockstateFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const blockstateCnt = await dbService.updateMany(Blockstate,blockstateFilter,updateBody);

      const materialFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const materialCnt = await dbService.updateMany(Material,materialFilter,updateBody);

      const ChunkFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const ChunkCnt = await dbService.updateMany(Chunk,ChunkFilter,updateBody);

      const ChatFilter = { '$or': [{ admin : { '$in' : user } },{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const ChatCnt = await dbService.updateMany(Chat,ChatFilter,updateBody);

      const Chat_messageFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const Chat_messageCnt = await dbService.updateMany(Chat_message,Chat_messageFilter,updateBody);

      const UserFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const UserCnt = await dbService.updateMany(User,UserFilter,updateBody);

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
        entitybody :entitybodyCnt,
        Organ :OrganCnt,
        Member :MemberCnt,
        Blog :BlogCnt,
        Comment :CommentCnt,
        part :partCnt,
        custommodel :custommodelCnt,
        pack :packCnt,
        turtleparameter :turtleparameterCnt,
        model :modelCnt,
        texture :textureCnt,
        itemgenerator :itemgeneratorCnt,
        entity :entityCnt,
        size :sizeCnt,
        interface :interfaceCnt,
        assets :assetsCnt,
        item :itemCnt,
        parameter :parameterCnt,
        blockstate :blockstateCnt,
        material :materialCnt,
        Chunk :ChunkCnt,
        Chat :ChatCnt,
        Chat_message :Chat_messageCnt,
        User :UserCnt,
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
  deleteEntitybody,
  deleteOrgan,
  deleteMember,
  deleteBlog,
  deleteComment,
  deletePart,
  deleteCustommodel,
  deletePack,
  deleteSubstance,
  deleteTurtleparameter,
  deleteModel,
  deleteTexture,
  deleteItemgenerator,
  deleteEntity,
  deleteSize,
  deleteInterface,
  deleteAssets,
  deleteItem,
  deleteElements,
  deleteParameter,
  deleteBlockstate,
  deleteMaterial,
  deleteChunk,
  deleteChat,
  deleteChat_message,
  deleteUser,
  deleteUserTokens,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countEntitybody,
  countOrgan,
  countMember,
  countBlog,
  countComment,
  countPart,
  countCustommodel,
  countPack,
  countSubstance,
  countTurtleparameter,
  countModel,
  countTexture,
  countItemgenerator,
  countEntity,
  countSize,
  countInterface,
  countAssets,
  countItem,
  countElements,
  countParameter,
  countBlockstate,
  countMaterial,
  countChunk,
  countChat,
  countChat_message,
  countUser,
  countUserTokens,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteEntitybody,
  softDeleteOrgan,
  softDeleteMember,
  softDeleteBlog,
  softDeleteComment,
  softDeletePart,
  softDeleteCustommodel,
  softDeletePack,
  softDeleteSubstance,
  softDeleteTurtleparameter,
  softDeleteModel,
  softDeleteTexture,
  softDeleteItemgenerator,
  softDeleteEntity,
  softDeleteSize,
  softDeleteInterface,
  softDeleteAssets,
  softDeleteItem,
  softDeleteElements,
  softDeleteParameter,
  softDeleteBlockstate,
  softDeleteMaterial,
  softDeleteChunk,
  softDeleteChat,
  softDeleteChat_message,
  softDeleteUser,
  softDeleteUserTokens,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
