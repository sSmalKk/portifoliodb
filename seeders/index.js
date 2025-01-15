/**
 * seeder.js
 * @description :: functions that seeds mock data to run the application
 */

const bcrypt = require('bcrypt');
const User = require('../model/User');
const authConstant = require('../constants/authConstant');
const Role = require('../model/role');
const ProjectRoute = require('../model/projectRoute');
const RouteRole = require('../model/routeRole');
const UserRole = require('../model/userRole');
const { replaceAll } = require('../utils/common');
const dbService = require('../utils/dbService');
const syncSizes = require('./seedSizes');
const seedElements = require('./elementsSeed');
const seedMaterials = require('./seedMaterials');
const seedChats = require('./seedChats');
/* seeds default users */
async function seedUser() {
  try {
    let userToBeInserted = {};
    userToBeInserted = {
      'password': 'QpPCXqEiR8eGjOj',
      'isDeleted': false,
      'username': 'Caleb.Erdman69',
      'email': 'Euna_Yundt@gmail.com',
      'isActive': true,
      'userType': authConstant.USER_TYPES.User
    };
    userToBeInserted.password = await bcrypt.hash(userToBeInserted.password, 8);
    let user = await dbService.updateOne(User, { 'username': 'Caleb.Erdman69' }, userToBeInserted, { upsert: true });
    userToBeInserted = {
      'password': 'H97DmukSybXgJTz',
      'isDeleted': false,
      'username': 'Virgil.Jacobi19',
      'email': 'Desiree_Strosin@yahoo.com',
      'isActive': true,
      'userType': authConstant.USER_TYPES.Admin
    };
    userToBeInserted.password = await bcrypt.hash(userToBeInserted.password, 8);
    let admin = await dbService.updateOne(User, { 'username': 'Virgil.Jacobi19' }, userToBeInserted, { upsert: true });
    console.info('Users seeded 🍺');
  } catch (error) {
    console.log('User seeder failed due to ', error.message);
  }
}
/* seeds roles */
async function seedRole() {
  try {
    const roles = ['Client', 'User', 'Admin', 'System_User'];
    const insertedRoles = await dbService.findMany(Role, { code: { '$in': roles.map(role => role.toUpperCase()) } });
    const rolesToInsert = [];
    roles.forEach(role => {
      if (!insertedRoles.find(insertedRole => insertedRole.code === role.toUpperCase())) {
        rolesToInsert.push({
          name: role,
          code: role.toUpperCase(),
          weight: 1
        });
      }
    });
    if (rolesToInsert.length) {
      const result = await dbService.create(Role, rolesToInsert);
      if (result) console.log('Role seeded 🍺');
      else console.log('Role seeder failed!');
    } else {
      console.log('Role is upto date 🍺');
    }
  } catch (error) {
    console.log('Role seeder failed due to ', error.message);
  }
}

/* seeds routes of project */
async function seedProjectRoutes(routes) {
  try {
    if (routes && routes.length) {
      let routeName = '';
      const dbRoutes = await dbService.findMany(ProjectRoute, {});
      let routeArr = [];
      let routeObj = {};
      routes.forEach(route => {
        routeName = `${replaceAll((route.path).toLowerCase(), '/', '_')}`;
        route.methods.forEach(method => {
          routeObj = dbRoutes.find(dbRoute => dbRoute.route_name === routeName && dbRoute.method === method);
          if (!routeObj) {
            routeArr.push({
              'uri': route.path.toLowerCase(),
              'method': method,
              'route_name': routeName,
            });
          }
        });
      });
      if (routeArr.length) {
        const result = await dbService.create(ProjectRoute, routeArr);
        if (result) console.info('ProjectRoute model seeded 🍺');
        else console.info('ProjectRoute seeder failed.');
      } else {
        console.info('ProjectRoute is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('ProjectRoute seeder failed due to ', error.message);
  }
}

/* seeds role for routes */
async function seedRouteRole() {
  try {
    const routeRoles = [
      {
        route: '/admin/chat/create',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/admin/chat/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/admin/chat/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/chat/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat/addbulk',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/admin/chat/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/admin/chat/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/chat/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat/list',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/admin/chat/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/admin/chat/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/chat/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat/:id',
        role: 'Client',
        method: 'GET'
      },
      {
        route: '/admin/chat/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/admin/chat/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/admin/chat/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/chat/count',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/admin/chat/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/admin/chat/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/chat/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat/update/:id',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/admin/chat/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/chat/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat/partial-update/:id',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/admin/chat/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/chat/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat/updatebulk',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/admin/chat/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/chat/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat/softdelete/:id',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/admin/chat/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat/softdeletemany',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/admin/chat/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat/delete/:id',
        role: 'Client',
        method: 'DELETE'
      },
      {
        route: '/admin/chat/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/chat/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/chat/deletemany',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/admin/chat/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/chat/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/create',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/addbulk',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/list',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/:id',
        role: 'Client',
        method: 'GET'
      },
      {
        route: '/admin/chat_message/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/admin/chat_message/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/admin/chat_message/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/chat_message/count',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/update/:id',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/partial-update/:id',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/updatebulk',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/softdelete/:id',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/softdeletemany',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/delete/:id',
        role: 'Client',
        method: 'DELETE'
      },
      {
        route: '/admin/chat_message/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/chat_message/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/chat_message/deletemany',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chunk/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/chunk/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chunk/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/chunk/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chunk/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/chunk/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chunk/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/admin/chunk/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/chunk/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/chunk/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chunk/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chunk/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chunk/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chunk/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chunk/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chunk/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chunk/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chunk/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chunk/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chunk/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chunk/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/chunk/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/chunk/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/chunk/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/user/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/user/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/user/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/admin/user/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/user/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/user/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/user/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/blockstate/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/blockstate/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/blockstate/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/blockstate/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/blockstate/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/blockstate/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/blockstate/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/admin/blockstate/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/blockstate/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/blockstate/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/blockstate/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/blockstate/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/blockstate/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/blockstate/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/blockstate/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/blockstate/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/blockstate/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/blockstate/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/blockstate/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/blockstate/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/blockstate/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/blockstate/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/blockstate/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/blockstate/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/material/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/material/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/material/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/material/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/material/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/material/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/material/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/admin/material/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/material/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/material/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/material/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/material/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/material/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/material/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/material/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/material/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/material/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/material/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/material/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/material/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/material/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/material/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/material/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/material/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/entitybody/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/entitybody/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/entitybody/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/entitybody/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/entitybody/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/entitybody/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/entitybody/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/entitybody/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/entitybody/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/entitybody/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/entitybody/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/entitybody/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/organ/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/organ/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/organ/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/organ/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/organ/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/organ/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/organ/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/organ/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/organ/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/organ/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/organ/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/organ/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/member/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/member/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/member/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/member/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/member/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/member/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/member/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/member/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/member/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/member/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/member/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/member/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/blog/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/blog/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/blog/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/blog/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/blog/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/blog/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/blog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/blog/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/blog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/blog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/blog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/blog/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/comment/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/comment/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/comment/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/comment/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/comment/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/comment/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/comment/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/comment/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/comment/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/comment/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/comment/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/comment/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/part/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/part/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/part/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/part/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/part/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/part/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/part/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/part/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/part/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/part/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/part/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/part/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/custommodel/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/custommodel/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/custommodel/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/custommodel/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/custommodel/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/custommodel/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/custommodel/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/custommodel/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/custommodel/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/custommodel/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/custommodel/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/custommodel/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/pack/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/pack/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/pack/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/pack/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/pack/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/pack/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/pack/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/pack/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/pack/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/pack/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/pack/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/pack/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/substance/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/substance/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/substance/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/substance/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/substance/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/substance/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/substance/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/substance/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/substance/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/substance/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/substance/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/substance/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/turtleparameter/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/turtleparameter/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/turtleparameter/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/turtleparameter/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/turtleparameter/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/turtleparameter/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/turtleparameter/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/turtleparameter/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/turtleparameter/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/turtleparameter/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/turtleparameter/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/turtleparameter/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/model/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/model/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/model/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/model/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/model/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/model/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/model/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/model/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/model/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/model/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/model/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/model/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/texture/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/texture/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/texture/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/texture/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/texture/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/texture/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/texture/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/texture/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/texture/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/texture/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/texture/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/texture/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/itemgenerator/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/itemgenerator/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/itemgenerator/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/itemgenerator/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/itemgenerator/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/itemgenerator/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/itemgenerator/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/itemgenerator/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/itemgenerator/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/itemgenerator/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/itemgenerator/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/itemgenerator/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/entity/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/entity/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/entity/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/entity/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/entity/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/entity/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/entity/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/entity/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/entity/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/entity/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/entity/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/entity/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/size/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/size/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/size/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/size/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/size/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/size/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/size/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/size/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/size/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/size/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/size/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/size/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/interface/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/interface/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/interface/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/interface/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/interface/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/interface/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/interface/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/interface/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/interface/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/interface/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/interface/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/interface/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/assets/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/assets/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/assets/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/assets/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/assets/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/assets/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/assets/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/assets/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/assets/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/assets/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/assets/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/assets/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/item/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/item/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/item/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/item/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/item/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/item/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/item/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/item/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/item/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/item/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/item/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/item/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/elements/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/elements/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/elements/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/elements/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/elements/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/elements/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/elements/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/elements/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/elements/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/elements/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/elements/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/elements/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/parameter/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/parameter/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/parameter/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/parameter/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/parameter/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/parameter/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/parameter/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/parameter/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/parameter/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/parameter/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/parameter/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/parameter/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/role/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/role/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/role/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/role/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/role/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/role/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/userrole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat/create',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat/addbulk',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat/list',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat/:id',
        role: 'Client',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat/count',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat/update/:id',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat/partial-update/:id',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat/updatebulk',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat/softdelete/:id',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat/softdeletemany',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat/delete/:id',
        role: 'Client',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chat/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chat/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chat/deletemany',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/create',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/addbulk',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/list',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/:id',
        role: 'Client',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat_message/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat_message/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat_message/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat_message/count',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/update/:id',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/partial-update/:id',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/updatebulk',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/softdelete/:id',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/softdeletemany',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/delete/:id',
        role: 'Client',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chat_message/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chat_message/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chat_message/deletemany',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chunk/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chunk/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chunk/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chunk/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chunk/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chunk/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chunk/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chunk/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chunk/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chunk/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chunk/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chunk/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chunk/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chunk/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chunk/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chunk/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chunk/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chunk/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chunk/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chunk/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chunk/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chunk/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chunk/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chunk/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/user/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/user/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/user/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blockstate/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blockstate/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blockstate/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blockstate/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blockstate/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blockstate/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blockstate/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/blockstate/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/blockstate/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blockstate/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blockstate/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blockstate/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blockstate/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blockstate/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blockstate/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blockstate/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blockstate/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blockstate/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blockstate/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blockstate/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blockstate/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/blockstate/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/blockstate/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blockstate/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/material/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/material/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/material/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/material/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/material/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/material/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/material/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/material/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/material/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/material/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/material/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/material/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/material/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/material/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entitybody/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entitybody/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entitybody/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entitybody/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/entitybody/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entitybody/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/entitybody/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/entitybody/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/entitybody/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/entitybody/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/entitybody/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/entitybody/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/organ/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/organ/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/organ/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/organ/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/organ/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/organ/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/organ/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/organ/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/organ/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/organ/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/organ/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/organ/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/member/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/member/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/member/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/member/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/member/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/member/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/member/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/member/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/member/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/member/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/member/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/member/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blog/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blog/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blog/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blog/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/blog/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blog/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/blog/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comment/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comment/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comment/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comment/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/comment/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comment/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comment/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comment/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comment/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comment/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comment/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/comment/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/part/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/part/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/part/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/part/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/part/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/part/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/part/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/part/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/part/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/part/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/part/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/part/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/custommodel/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/custommodel/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/custommodel/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/custommodel/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/custommodel/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/custommodel/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/custommodel/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/custommodel/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/custommodel/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/custommodel/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/custommodel/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/custommodel/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pack/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pack/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pack/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pack/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/pack/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pack/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pack/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pack/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pack/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pack/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pack/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/pack/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/substance/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/substance/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/substance/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/substance/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/substance/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/substance/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/substance/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/substance/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/substance/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/substance/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/substance/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/substance/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/turtleparameter/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/turtleparameter/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/turtleparameter/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/turtleparameter/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/turtleparameter/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/turtleparameter/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/turtleparameter/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/turtleparameter/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/turtleparameter/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/turtleparameter/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/turtleparameter/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/turtleparameter/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/model/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/model/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/model/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/model/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/model/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/model/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/model/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/model/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/model/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/model/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/model/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/model/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/texture/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/texture/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/texture/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/texture/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/texture/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/texture/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/texture/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/texture/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/texture/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/texture/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/texture/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/texture/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/itemgenerator/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/itemgenerator/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/itemgenerator/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/itemgenerator/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/itemgenerator/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/itemgenerator/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/itemgenerator/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/itemgenerator/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/itemgenerator/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/itemgenerator/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/itemgenerator/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/itemgenerator/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entity/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entity/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entity/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entity/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/entity/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entity/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/entity/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/entity/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/entity/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/entity/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/entity/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/entity/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/size/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/size/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/size/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/size/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/size/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/size/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/size/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/interface/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/interface/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/interface/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/interface/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/interface/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/interface/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/interface/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/interface/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/interface/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/interface/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/interface/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/interface/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/assets/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/assets/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/assets/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/assets/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/assets/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/assets/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/assets/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/assets/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/assets/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/assets/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/assets/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/assets/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/item/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/item/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/item/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/item/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/item/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/item/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/item/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/item/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/item/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/item/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/item/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/item/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/elements/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/elements/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/elements/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/elements/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/elements/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/elements/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/elements/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/elements/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/elements/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/elements/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/elements/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/elements/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/parameter/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/parameter/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/parameter/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/parameter/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/parameter/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/parameter/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/parameter/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/parameter/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/parameter/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/parameter/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/parameter/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/parameter/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/role/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/userrole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/action',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/getchunks',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/sync',
        role: 'System_User',
        method: 'POST'
      },

    ];
    if (routeRoles && routeRoles.length) {
      const routes = [...new Set(routeRoles.map(routeRole => routeRole.route.toLowerCase()))];
      const routeMethods = [...new Set(routeRoles.map(routeRole => routeRole.method))];
      const roles = ['Client', 'User', 'Admin', 'System_User'];
      const insertedProjectRoute = await dbService.findMany(ProjectRoute, {
        uri: { '$in': routes },
        method: { '$in': routeMethods },
        'isActive': true,
        'isDeleted': false
      });
      const insertedRoles = await dbService.findMany(Role, {
        code: { '$in': roles.map(role => role.toUpperCase()) },
        'isActive': true,
        'isDeleted': false
      });
      let projectRouteId = '';
      let roleId = '';
      let createRouteRoles = routeRoles.map(routeRole => {
        projectRouteId = insertedProjectRoute.find(pr => pr.uri === routeRole.route.toLowerCase() && pr.method === routeRole.method);
        roleId = insertedRoles.find(r => r.code === routeRole.role.toUpperCase());
        if (projectRouteId && roleId) {
          return {
            roleId: roleId.id,
            routeId: projectRouteId.id
          };
        }
      });
      createRouteRoles = createRouteRoles.filter(Boolean);
      const routeRolesToBeInserted = [];
      let routeRoleObj = {};

      await Promise.all(
        createRouteRoles.map(async routeRole => {
          routeRoleObj = await dbService.findOne(RouteRole, {
            routeId: routeRole.routeId,
            roleId: routeRole.roleId,
          });
          if (!routeRoleObj) {
            routeRolesToBeInserted.push({
              routeId: routeRole.routeId,
              roleId: routeRole.roleId,
            });
          }
        })
      );
      if (routeRolesToBeInserted.length) {
        const result = await dbService.create(RouteRole, routeRolesToBeInserted);
        if (result) console.log('RouteRole seeded 🍺');
        else console.log('RouteRole seeder failed!');
      } else {
        console.log('RouteRole is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('RouteRole seeder failed due to ', error.message);
  }
}

/* seeds roles for users */
async function seedUserRole() {
  try {
    const userRoles = [{
      'username': 'Caleb.Erdman69',
      'password': 'QpPCXqEiR8eGjOj'
    }, {
      'username': 'Virgil.Jacobi19',
      'password': 'H97DmukSybXgJTz'
    }];
    const defaultRoles = await dbService.findMany(Role);
    const insertedUsers = await dbService.findMany(User, { username: { '$in': userRoles.map(userRole => userRole.username) } });
    let user = {};
    const userRolesArr = [];
    userRoles.map(userRole => {
      user = insertedUsers.find(user => user.username === userRole.username && user.isPasswordMatch(userRole.password) && user.isActive && !user.isDeleted);
      if (user) {
        if (user.userType === authConstant.USER_TYPES.Admin) {
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d) => d.code === 'ADMIN')._id
          });
        } else if (user.userType === authConstant.USER_TYPES.User) {
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d) => d.code === 'USER')._id
          });
        } else {
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d) => d.code === 'SYSTEM_USER')._id
          });
        }
      }
    });
    let userRoleObj = {};
    const userRolesToBeInserted = [];
    if (userRolesArr.length) {
      await Promise.all(
        userRolesArr.map(async userRole => {
          userRoleObj = await dbService.findOne(UserRole, {
            userId: userRole.userId,
            roleId: userRole.roleId
          });
          if (!userRoleObj) {
            userRolesToBeInserted.push({
              userId: userRole.userId,
              roleId: userRole.roleId
            });
          }
        })
      );
      if (userRolesToBeInserted.length) {
        const result = await dbService.create(UserRole, userRolesToBeInserted);
        if (result) console.log('UserRole seeded 🍺');
        else console.log('UserRole seeder failed');
      } else {
        console.log('UserRole is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('UserRole seeder failed due to ', error.message);
  }
}

async function seedData(allRegisterRoutes) {
  await seedUser();
  await seedRole();
  await seedProjectRoutes(allRegisterRoutes);
  await seedRouteRole();
  await seedUserRole();
  await syncSizes();
  await seedElements();
  await seedMaterials();
  await seedChats();
};
module.exports = seedData;