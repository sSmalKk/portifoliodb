/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Tickupdate = require('../model/Tickupdate');
let Size = require('../model/Size');
let Server = require('../model/Server');
let Pack = require('../model/pack');
let Material = require('../model/Material');
let ChemistryElement = require('../model/ChemistryElement');
let Entity = require('../model/entity');
let EntityPart = require('../model/EntityPart');
let EntityOrgan = require('../model/EntityOrgan');
let EntityBody = require('../model/EntityBody');
let Lang = require('../model/lang');
let Comment = require('../model/Comment');
let Chat_group = require('../model/Chat_group');
let Chat_message = require('../model/Chat_message');
let Blog = require('../model/Blog');
let Blockstate = require('../model/blockstate');
let Item = require('../model/item');
let User = require('../model/user');
let Category = require('../model/category');
let UserTokens = require('../model/userTokens');
let ActivityLog = require('../model/activityLog');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteTickupdate = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Tickupdate,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteSize = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Size,filter);
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

const deletePack = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Pack,filter);
    return response;
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

const deleteChemistryElement = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(ChemistryElement,filter);
    return response;
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

const deleteEntityPart = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(EntityPart,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteEntityBody = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(EntityBody,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};
const deleteEntityOrgan = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(EntityOrgan,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteLang = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Lang,filter);
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

const deleteChat_group = async (filter) =>{
  try {
    let chat_group = await dbService.findMany(Chat_group,filter);
    if (chat_group && chat_group.length){
      chat_group = chat_group.map((obj) => obj.id);

      const Chat_messageFilter = { $or: [{ groupId : { $in : chat_group } }] };
      const Chat_messageCnt = await dbService.deleteMany(Chat_message,Chat_messageFilter);

      let deleted  = await dbService.deleteMany(Chat_group,filter);
      let response = { Chat_message :Chat_messageCnt, };
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

const deleteBlog = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Blog,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteBlockstate = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Blockstate,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteItem = async (filter) =>{
  try {
    let item = await dbService.findMany(Item,filter);
    if (item && item.length){
      item = item.map((obj) => obj.id);

      const itemFilter = { $or: [{ parentId : { $in : item } }] };
      const itemCnt = await dbService.deleteMany(Item,itemFilter);

      let deleted  = await dbService.deleteMany(Item,filter);
      let response = { item :itemCnt + deleted, };
      return response; 
    } else {
      return {  item : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser = async (filter) =>{
  try {
    let user = await dbService.findMany(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const TickupdateFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const TickupdateCnt = await dbService.deleteMany(Tickupdate,TickupdateFilter);

      const SizeFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const SizeCnt = await dbService.deleteMany(Size,SizeFilter);
      const ServerFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const ServerCnt = await dbService.deleteMany(Server,ServerFilter);

      const packFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const packCnt = await dbService.deleteMany(Pack,packFilter);

      const MaterialFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const MaterialCnt = await dbService.deleteMany(Material,MaterialFilter);

      const ChemistryElementFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const ChemistryElementCnt = await dbService.deleteMany(ChemistryElement,ChemistryElementFilter);

      const entityFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const entityCnt = await dbService.deleteMany(Entity,entityFilter);

      const EntityPartFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const EntityPartCnt = await dbService.deleteMany(EntityPart,EntityPartFilter);

      const EntityBodyFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const EntityBodyCnt = await dbService.deleteMany(EntityBody,EntityBodyFilter);
      const EntityOrganFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const EntityOrganCnt = await dbService.deleteMany(EntityOrgan,EntityOrganFilter);
      
      const langFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const langCnt = await dbService.deleteMany(Lang,langFilter);

      const CommentFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const CommentCnt = await dbService.deleteMany(Comment,CommentFilter);

      const Chat_groupFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const Chat_groupCnt = await dbService.deleteMany(Chat_group,Chat_groupFilter);

      const Chat_messageFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const Chat_messageCnt = await dbService.deleteMany(Chat_message,Chat_messageFilter);

      const BlogFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const BlogCnt = await dbService.deleteMany(Blog,BlogFilter);

      const blockstateFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const blockstateCnt = await dbService.deleteMany(Blockstate,blockstateFilter);

      const userFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
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
        Tickupdate :TickupdateCnt,
        Size :SizeCnt,
        Server :ServerCnt,
        pack :packCnt,
        Material :MaterialCnt,
        ChemistryElement :ChemistryElementCnt,
        entity :entityCnt,
        EntityPart :EntityPartCnt,
        EntityBody :EntityBodyCnt,
        EntityOrgan :EntityOrganCnt,
        lang :langCnt,
        Comment :CommentCnt,
        Chat_group :Chat_groupCnt,
        Chat_message :Chat_messageCnt,
        Blog :BlogCnt,
        blockstate :blockstateCnt,
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

const deleteCategory = async (filter) =>{
  try {
    let category = await dbService.findMany(Category,filter);
    if (category && category.length){
      category = category.map((obj) => obj.id);

      const itemFilter = { $or: [{ categoryId : { $in : category } }] };
      const itemCnt = await dbService.deleteMany(Item,itemFilter);

      const categoryFilter = { $or: [{ parentId : { $in : category } }] };
      const categoryCnt = await dbService.deleteMany(Category,categoryFilter);

      let deleted  = await dbService.deleteMany(Category,filter);
      let response = {
        item :itemCnt,
        category :categoryCnt + deleted,
      };
      return response; 
    } else {
      return {  category : 0 };
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

const deleteActivityLog = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(ActivityLog,filter);
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

const countTickupdate = async (filter) =>{
  try {
    const TickupdateCnt =  await dbService.count(Tickupdate,filter);
    return { Tickupdate : TickupdateCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countSize = async (filter) =>{
  try {
    const SizeCnt =  await dbService.count(Size,filter);
    return { Size : SizeCnt };
  } catch (error){
    throw new Error(error.message);
  }
};
const countServer = async (filter) =>{
  try {
    const ServerCnt =  await dbService.count(Server,filter);
    return { Server : ServerCnt };
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

const countMaterial = async (filter) =>{
  try {
    const MaterialCnt =  await dbService.count(Material,filter);
    return { Material : MaterialCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countChemistryElement = async (filter) =>{
  try {
    const ChemistryElementCnt =  await dbService.count(ChemistryElement,filter);
    return { ChemistryElement : ChemistryElementCnt };
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

const countEntityPart = async (filter) =>{
  try {
    const EntityPartCnt =  await dbService.count(EntityPart,filter);
    return { EntityPart : EntityPartCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countEntityBody = async (filter) =>{
  try {
    const EntityBodyCnt =  await dbService.count(EntityBody,filter);
    return { EntityBody : EntityBodyCnt };
  } catch (error){
    throw new Error(error.message);
  }
};
const countEntityOrgan = async (filter) =>{
  try {
    const EntityOrgan =  await dbService.count(EntityOrgan,filter);
    return { EntityOrgan : EntityOrganCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countLang = async (filter) =>{
  try {
    const langCnt =  await dbService.count(Lang,filter);
    return { lang : langCnt };
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

const countChat_group = async (filter) =>{
  try {
    let chat_group = await dbService.findMany(Chat_group,filter);
    if (chat_group && chat_group.length){
      chat_group = chat_group.map((obj) => obj.id);

      const Chat_messageFilter = { $or: [{ groupId : { $in : chat_group } }] };
      const Chat_messageCnt =  await dbService.count(Chat_message,Chat_messageFilter);

      let response = { Chat_message : Chat_messageCnt, };
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

const countBlog = async (filter) =>{
  try {
    const BlogCnt =  await dbService.count(Blog,filter);
    return { Blog : BlogCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countBlockstate = async (filter) =>{
  try {
    const blockstateCnt =  await dbService.count(Blockstate,filter);
    return { blockstate : blockstateCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countItem = async (filter) =>{
  try {
    let item = await dbService.findMany(Item,filter);
    if (item && item.length){
      item = item.map((obj) => obj.id);

      const itemFilter = { $or: [{ parentId : { $in : item } }] };
      const itemCnt =  await dbService.count(Item,itemFilter);

      let response = { item : itemCnt, };
      return response; 
    } else {
      return {  item : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
    let user = await dbService.findMany(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const TickupdateFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const TickupdateCnt =  await dbService.count(Tickupdate,TickupdateFilter);

      const SizeFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const SizeCnt =  await dbService.count(Size,SizeFilter);

      const ServerFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const ServerCnt =  await dbService.count(Server,ServerFilter);

      const packFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const packCnt =  await dbService.count(Pack,packFilter);

      const MaterialFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const MaterialCnt =  await dbService.count(Material,MaterialFilter);

      const ChemistryElementFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const ChemistryElementCnt =  await dbService.count(ChemistryElement,ChemistryElementFilter);

      const entityFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const entityCnt =  await dbService.count(Entity,entityFilter);

      const EntityPartFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const EntityPartCnt =  await dbService.count(EntityPart,EntityPartFilter);

      const EntityBodyFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const EntityBodyCnt =  await dbService.count(EntityBody,EntityBodyFilter);
      const EntityOrganFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const EntityOrganCnt =  await dbService.count(EntityOrgan,EntityOrganFilter);
      
      const langFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const langCnt =  await dbService.count(Lang,langFilter);

      const CommentFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const CommentCnt =  await dbService.count(Comment,CommentFilter);

      const Chat_groupFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const Chat_groupCnt =  await dbService.count(Chat_group,Chat_groupFilter);

      const Chat_messageFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const Chat_messageCnt =  await dbService.count(Chat_message,Chat_messageFilter);

      const BlogFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const BlogCnt =  await dbService.count(Blog,BlogFilter);

      const blockstateFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const blockstateCnt =  await dbService.count(Blockstate,blockstateFilter);

      const userFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
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
        Tickupdate : TickupdateCnt,
        Size : SizeCnt,
        Server : ServerCnt,
        pack : packCnt,
        Material : MaterialCnt,
        ChemistryElement : ChemistryElementCnt,
        entity : entityCnt,
        EntityPart : EntityPartCnt,
        EntityOrgan : EntityOrganCnt,
        EntityBody : EntityBodyCnt,
        lang : langCnt,
        Comment : CommentCnt,
        Chat_group : Chat_groupCnt,
        Chat_message : Chat_messageCnt,
        Blog : BlogCnt,
        blockstate : blockstateCnt,
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

const countCategory = async (filter) =>{
  try {
    let category = await dbService.findMany(Category,filter);
    if (category && category.length){
      category = category.map((obj) => obj.id);

      const itemFilter = { $or: [{ categoryId : { $in : category } }] };
      const itemCnt =  await dbService.count(Item,itemFilter);

      const categoryFilter = { $or: [{ parentId : { $in : category } }] };
      const categoryCnt =  await dbService.count(Category,categoryFilter);

      let response = {
        item : itemCnt,
        category : categoryCnt,
      };
      return response; 
    } else {
      return {  category : 0 };
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

const countActivityLog = async (filter) =>{
  try {
    const activityLogCnt =  await dbService.count(ActivityLog,filter);
    return { activityLog : activityLogCnt };
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

const softDeleteTickupdate = async (filter,updateBody) =>{  
  try {
    const TickupdateCnt =  await dbService.updateMany(Tickupdate,filter);
    return { Tickupdate : TickupdateCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteSize = async (filter,updateBody) =>{  
  try {
    const SizeCnt =  await dbService.updateMany(Size,filter);
    return { Size : SizeCnt };
  } catch (error){
    throw new Error(error.message);
  }
};
const softDeleteServer = async (filter,updateBody) =>{  
  try {
    const ServerCnt =  await dbService.updateMany(Server,filter);
    return { Server : ServerCnt };
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

const softDeleteMaterial = async (filter,updateBody) =>{  
  try {
    const MaterialCnt =  await dbService.updateMany(Material,filter);
    return { Material : MaterialCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteChemistryElement = async (filter,updateBody) =>{  
  try {
    const ChemistryElementCnt =  await dbService.updateMany(ChemistryElement,filter);
    return { ChemistryElement : ChemistryElementCnt };
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

const softDeleteEntityPart = async (filter,updateBody) =>{  
  try {
    const EntityPartCnt =  await dbService.updateMany(EntityPart,filter);
    return { EntityPart : EntityPartCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteEntityBody = async (filter,updateBody) =>{  
  try {
    const EntityBodyCnt =  await dbService.updateMany(EntityBody,filter);
    return { EntityBody : EntityBodyCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteEntityOrgan = async (filter,updateBody) =>{  
  try {
    const EntityOrganCnt =  await dbService.updateMany(EntityOrgan,filter);
    return { EntityOrgan : EntityOrganCnt };
  } catch (error){
    throw new Error(error.message);
  }
};
const softDeleteLang = async (filter,updateBody) =>{  
  try {
    const langCnt =  await dbService.updateMany(Lang,filter);
    return { lang : langCnt };
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

const softDeleteChat_group = async (filter,updateBody) =>{  
  try {
    let chat_group = await dbService.findMany(Chat_group,filter, { id:1 });
    if (chat_group.length){
      chat_group = chat_group.map((obj) => obj.id);

      const Chat_messageFilter = { '$or': [{ groupId : { '$in' : chat_group } }] };
      const Chat_messageCnt = await dbService.updateMany(Chat_message,Chat_messageFilter,updateBody);
      let updated = await dbService.updateMany(Chat_group,filter,updateBody);

      let response = { Chat_message :Chat_messageCnt, };
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

const softDeleteBlog = async (filter,updateBody) =>{  
  try {
    const BlogCnt =  await dbService.updateMany(Blog,filter);
    return { Blog : BlogCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteBlockstate = async (filter,updateBody) =>{  
  try {
    const blockstateCnt =  await dbService.updateMany(Blockstate,filter);
    return { blockstate : blockstateCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteItem = async (filter,updateBody) =>{  
  try {
    let item = await dbService.findMany(Item,filter, { id:1 });
    if (item.length){
      item = item.map((obj) => obj.id);

      const itemFilter = { '$or': [{ parentId : { '$in' : item } }] };
      const itemCnt = await dbService.updateMany(Item,itemFilter,updateBody);
      let updated = await dbService.updateMany(Item,filter,updateBody);

      let response = { item :itemCnt + updated, };
      return response;
    } else {
      return {  item : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody) =>{  
  try {
    let user = await dbService.findMany(User,filter, { id:1 });
    if (user.length){
      user = user.map((obj) => obj.id);

      const TickupdateFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const TickupdateCnt = await dbService.updateMany(Tickupdate,TickupdateFilter,updateBody);

      const SizeFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const SizeCnt = await dbService.updateMany(Size,SizeFilter,updateBody);
      const ServerFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const ServerCnt = await dbService.updateMany(Server,ServerFilter,updateBody);

      const packFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const packCnt = await dbService.updateMany(Pack,packFilter,updateBody);

      const MaterialFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const MaterialCnt = await dbService.updateMany(Material,MaterialFilter,updateBody);

      const ChemistryElementFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const ChemistryElementCnt = await dbService.updateMany(ChemistryElement,ChemistryElementFilter,updateBody);

      const entityFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const entityCnt = await dbService.updateMany(Entity,entityFilter,updateBody);

      const EntityPartFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const EntityPartCnt = await dbService.updateMany(EntityPart,EntityPartFilter,updateBody);

      const EntityBodyFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const EntityBodyCnt = await dbService.updateMany(EntityBody,EntityBodyFilter,updateBody);
      const EntityOrganFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const EntityOrganCnt = await dbService.updateMany(EntityOrgan,EntityOrganFilter,updateBody);
      
      const langFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const langCnt = await dbService.updateMany(Lang,langFilter,updateBody);

      const CommentFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const CommentCnt = await dbService.updateMany(Comment,CommentFilter,updateBody);

      const Chat_groupFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const Chat_groupCnt = await dbService.updateMany(Chat_group,Chat_groupFilter,updateBody);

      const Chat_messageFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const Chat_messageCnt = await dbService.updateMany(Chat_message,Chat_messageFilter,updateBody);

      const BlogFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const BlogCnt = await dbService.updateMany(Blog,BlogFilter,updateBody);

      const blockstateFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const blockstateCnt = await dbService.updateMany(Blockstate,blockstateFilter,updateBody);

      const userFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
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
        Tickupdate :TickupdateCnt,
        Size :SizeCnt,
        Server :ServerCnt,
        pack :packCnt,
        Material :MaterialCnt,
        ChemistryElement :ChemistryElementCnt,
        entity :entityCnt,
        EntityPart :EntityPartCnt,
        EntityOrgan :EntityOrganCnt,
        EntityBody :EntityBodyCnt,
        lang :langCnt,
        Comment :CommentCnt,
        Chat_group :Chat_groupCnt,
        Chat_message :Chat_messageCnt,
        Blog :BlogCnt,
        blockstate :blockstateCnt,
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

const softDeleteCategory = async (filter,updateBody) =>{  
  try {
    let category = await dbService.findMany(Category,filter, { id:1 });
    if (category.length){
      category = category.map((obj) => obj.id);

      const itemFilter = { '$or': [{ categoryId : { '$in' : category } }] };
      const itemCnt = await dbService.updateMany(Item,itemFilter,updateBody);

      const categoryFilter = { '$or': [{ parentId : { '$in' : category } }] };
      const categoryCnt = await dbService.updateMany(Category,categoryFilter,updateBody);
      let updated = await dbService.updateMany(Category,filter,updateBody);

      let response = {
        item :itemCnt,
        category :categoryCnt + updated,
      };
      return response;
    } else {
      return {  category : 0 };
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

const softDeleteActivityLog = async (filter,updateBody) =>{  
  try {
    const activityLogCnt =  await dbService.updateMany(ActivityLog,filter);
    return { activityLog : activityLogCnt };
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
  deleteTickupdate,
  deleteSize,
  deleteServer,
  deletePack,
  deleteMaterial,
  deleteChemistryElement,
  deleteEntity,
  deleteEntityPart,
  deleteEntityOrgan,
  deleteEntityBody,
  deleteLang,
  deleteComment,
  deleteChat_group,
  deleteChat_message,
  deleteBlog,
  deleteBlockstate,
  deleteItem,
  deleteUser,
  deleteCategory,
  deleteUserTokens,
  deleteActivityLog,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countTickupdate,
  countSize,
  countServer,
  countPack,
  countMaterial,
  countChemistryElement,
  countEntity,
  countEntityPart,
  countEntityBody,
  countEntityOrgan,
  countLang,
  countComment,
  countChat_group,
  countChat_message,
  countBlog,
  countBlockstate,
  countItem,
  countUser,
  countCategory,
  countUserTokens,
  countActivityLog,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteTickupdate,
  softDeleteSize,
  softDeleteServer,
  softDeletePack,
  softDeleteMaterial,
  softDeleteChemistryElement,
  softDeleteEntity,
  softDeleteEntityPart,
  softDeleteEntityBody,
  softDeleteEntityOrgan,
  softDeleteLang,
  softDeleteComment,
  softDeleteChat_group,
  softDeleteChat_message,
  softDeleteBlog,
  softDeleteBlockstate,
  softDeleteItem,
  softDeleteUser,
  softDeleteCategory,
  softDeleteUserTokens,
  softDeleteActivityLog,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
