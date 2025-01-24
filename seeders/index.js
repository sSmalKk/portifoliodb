/**
 * seeder.js
 * @description :: functions that seeds mock data to run the application
 */

const bcrypt = require('bcrypt');
const User = require('../model/user');
const authConstant = require('../constants/authConstant');
const Role = require('../model/role');
const ProjectRoute = require('../model/projectRoute');
const RouteRole = require('../model/routeRole');
const UserRole = require('../model/userRole');
const { replaceAll } = require('../utils/common');
const dbService = require('../utils/dbService');

/* seeds default users */
/* seeds default users */
async function seedUser() {
  try {
    const users = [
      {
        'password': 'J8QnRQgyb2Cre2a',
        'isDeleted': false,
        'username': 'Humberto_Conn47',
        'email': 'Dallas96@yahoo.com',
        'isActive': true,
        'userType': authConstant.USER_TYPES.User
      },
      {
        'password': 'AdminPass123',
        'isDeleted': false,
        'username': 'Admin_User',
        'email': 'admin@example.com',
        'isActive': true,
        'userType': authConstant.USER_TYPES.Admin
      },
      {
        'password': 'Translator123',
        'isDeleted': false,
        'username': 'Translator_User',
        'email': 'translator@example.com',
        'isActive': true,
        'userType': authConstant.USER_TYPES.Tradutor
      },
      {
        'password': 'SystemPass123',
        'isDeleted': false,
        'username': 'System_User',
        'email': 'system@example.com',
        'isActive': true,
        'userType': authConstant.USER_TYPES.System_User
      }
    ];

    for (const user of users) {
      user.password = await bcrypt.hash(user.password, 8);
      await dbService.updateOne(User, { 'username': user.username }, user, { upsert: true });
    }

    console.info('Users seeded 🍺');
  } catch (error) {
    console.log('User seeder failed due to ', error.message);
  }
}

/* seeds roles */
async function seedRole () {
  try {
    const roles = [ 'Tradutor', 'Admin', 'User', 'System_User' ];
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
async function seedProjectRoutes (routes) {
  try {
    if (routes  && routes.length) {
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
async function seedRouteRole () {
  try {
    const routeRoles = [ 
      {
        route: '/device/api/v1/blog/list',
        role: 'Tradutor',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/blog/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/blog/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/blog/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blog/:id',
        role: 'Tradutor',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/blog/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/blog/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/blog/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/blog/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blog/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/blog/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/blog/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blog/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/blog/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blog/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/blog/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blog/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/blog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/blog/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blog/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/list',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/:id',
        role: 'Tradutor',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chat_group/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chat_group/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/chat_group/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chat_group/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/chat_group/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/chat_group/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/list',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/:id',
        role: 'Tradutor',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chat_message/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chat_message/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chat_message/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chat_message/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/chat_message/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/chat_message/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistryelement/list',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistryelement/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistryelement/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistryelement/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistryelement/:id',
        role: 'Tradutor',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chemistryelement/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chemistryelement/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chemistryelement/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chemistryelement/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistryelement/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistryelement/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistryelement/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistryelement/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistryelement/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistryelement/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistryelement/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistryelement/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistryelement/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistryelement/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistryelement/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistryelement/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistryelement/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistryelement/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistryelement/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistryelement/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistryelement/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistryelement/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/chemistryelement/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/chemistryelement/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistryelement/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/list',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/comment/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/comment/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/:id',
        role: 'Tradutor',
        method: 'GET'
      },
      {
        route: '/device/api/v1/comment/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/comment/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/comment/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/comment/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/comment/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/comment/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/comment/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/entitybody/list',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/device/api/v1/entitybody/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/entitybody/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/entitybody/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/entitybody/:id',
        role: 'Tradutor',
        method: 'GET'
      },
      {
        route: '/device/api/v1/entitybody/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/entitybody/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/entitybody/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/entitybody/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/device/api/v1/entitybody/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/entitybody/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/entitybody/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/entitybody/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/entitybody/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/entitybody/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/entitybody/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/entitybody/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/entitybody/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/entitybody/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/entitybody/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/entitybody/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/entitybody/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/entitybody/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/entitybody/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/entitybody/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/entitybody/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/entitybody/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/entitybody/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/entitybody/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/entitybody/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/entitypart/list',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/device/api/v1/entitypart/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/entitypart/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/entitypart/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/entitypart/:id',
        role: 'Tradutor',
        method: 'GET'
      },
      {
        route: '/device/api/v1/entitypart/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/entitypart/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/entitypart/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/entitypart/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/device/api/v1/entitypart/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/entitypart/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/entitypart/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/entitypart/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/entitypart/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/entitypart/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/entitypart/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/entitypart/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/entitypart/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/entitypart/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/entitypart/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/entitypart/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/entitypart/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/entitypart/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/entitypart/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/entitypart/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/entitypart/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/entitypart/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/entitypart/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/entitypart/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/entitypart/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/material/list',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/device/api/v1/material/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/material/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/material/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/material/:id',
        role: 'Tradutor',
        method: 'GET'
      },
      {
        route: '/device/api/v1/material/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/material/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/material/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/material/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/device/api/v1/material/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/material/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/material/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/material/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/material/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/material/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/material/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/material/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/material/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/material/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/material/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/material/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/material/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/material/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/material/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/material/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/material/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/material/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/material/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/material/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/material/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/size/list',
        role: 'Tradutor',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/size/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/size/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/size/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/size/:id',
        role: 'Tradutor',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/size/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/size/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/size/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/size/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/device/api/v1/size/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/size/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/size/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/size/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/size/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/size/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/size/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/size/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/size/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/size/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/size/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tickupdate/list',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tickupdate/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tickupdate/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tickupdate/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tickupdate/:id',
        role: 'Tradutor',
        method: 'GET'
      },
      {
        route: '/device/api/v1/tickupdate/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/tickupdate/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/tickupdate/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/tickupdate/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tickupdate/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tickupdate/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tickupdate/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tickupdate/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tickupdate/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tickupdate/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tickupdate/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tickupdate/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tickupdate/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tickupdate/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tickupdate/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tickupdate/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tickupdate/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tickupdate/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tickupdate/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tickupdate/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tickupdate/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/tickupdate/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/tickupdate/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/tickupdate/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/tickupdate/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blockstate/list',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blockstate/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blockstate/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blockstate/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blockstate/:id',
        role: 'Tradutor',
        method: 'GET'
      },
      {
        route: '/device/api/v1/blockstate/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/blockstate/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/blockstate/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/blockstate/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blockstate/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blockstate/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blockstate/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blockstate/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blockstate/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blockstate/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blockstate/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blockstate/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blockstate/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blockstate/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blockstate/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blockstate/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blockstate/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blockstate/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blockstate/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blockstate/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blockstate/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blockstate/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/blockstate/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/blockstate/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blockstate/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/list',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/category/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/:id',
        role: 'Tradutor',
        method: 'GET'
      },
      {
        route: '/device/api/v1/category/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/category/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/category/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/category/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/category/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/category/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/entity/list',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/device/api/v1/entity/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/entity/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/entity/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/entity/:id',
        role: 'Tradutor',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/entity/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/entity/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/entity/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/entity/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/device/api/v1/entity/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/entity/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/entity/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/entity/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/entity/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/entity/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/entity/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/entity/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/entity/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/entity/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/entity/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/entity/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/entity/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/entity/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/entity/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/entity/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/entity/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/entity/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/entity/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/entity/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/entity/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/item/list',
        role: 'Tradutor',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/item/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/item/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/item/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/item/:id',
        role: 'Tradutor',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/item/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/item/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/item/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/item/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/device/api/v1/item/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/item/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/item/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/item/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/item/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/item/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/item/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/item/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/item/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/item/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/item/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/item/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/item/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/item/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/item/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/item/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/item/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/item/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/item/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/item/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/item/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/lang/list',
        role: 'Tradutor',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/lang/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/lang/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/lang/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/lang/:id',
        role: 'Tradutor',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/lang/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/lang/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/lang/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/lang/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/device/api/v1/lang/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/lang/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/lang/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/lang/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/lang/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/lang/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/lang/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/lang/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/lang/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/lang/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/lang/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/lang/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/lang/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/lang/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/lang/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/lang/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/lang/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/lang/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/lang/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/lang/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/lang/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pack/list',
        role: 'Tradutor',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/pack/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/pack/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/pack/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pack/:id',
        role: 'Tradutor',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/pack/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/pack/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/pack/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/pack/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pack/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/pack/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/pack/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pack/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/pack/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pack/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/pack/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pack/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pack/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pack/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pack/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pack/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pack/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pack/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pack/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pack/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pack/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pack/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/pack/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/pack/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pack/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/create',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/list',
        role: 'Tradutor',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'Tradutor',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/user/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'Tradutor',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'Tradutor',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'Tradutor',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'Tradutor',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'Tradutor',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'Tradutor',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activitylog/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activitylog/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activitylog/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activitylog/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/activitylog/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activitylog/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activitylog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activitylog/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activitylog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activitylog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activitylog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/activitylog/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/role/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/userrole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blog/list',
        role: 'Tradutor',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/blog/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/blog/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/blog/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blog/:id',
        role: 'Tradutor',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/blog/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/blog/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/blog/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/blog/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blog/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/blog/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/blog/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blog/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/blog/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blog/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/blog/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blog/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/blog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/blog/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blog/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/list',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/:id',
        role: 'Tradutor',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat_group/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat_group/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/chat_group/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat_group/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chat_group/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chat_group/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/list',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/:id',
        role: 'Tradutor',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat_message/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat_message/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat_message/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat_message/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/count',
        role: 'System_User',
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
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/addbulk',
        role: 'System_User',
        method: 'POST'
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
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistryelement/list',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistryelement/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistryelement/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistryelement/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistryelement/:id',
        role: 'Tradutor',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chemistryelement/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chemistryelement/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chemistryelement/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chemistryelement/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistryelement/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistryelement/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistryelement/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistryelement/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistryelement/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistryelement/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistryelement/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistryelement/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistryelement/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistryelement/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistryelement/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistryelement/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistryelement/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistryelement/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistryelement/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistryelement/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistryelement/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistryelement/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chemistryelement/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chemistryelement/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistryelement/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comment/list',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comment/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/comment/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/comment/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comment/:id',
        role: 'Tradutor',
        method: 'GET'
      },
      {
        route: '/client/api/v1/comment/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/comment/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/comment/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/comment/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comment/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comment/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/comment/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comment/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comment/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comment/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comment/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comment/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comment/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comment/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comment/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comment/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comment/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comment/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comment/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comment/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comment/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comment/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/comment/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/comment/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comment/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entitybody/list',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entitybody/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entitybody/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entitybody/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entitybody/:id',
        role: 'Tradutor',
        method: 'GET'
      },
      {
        route: '/client/api/v1/entitybody/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/entitybody/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/entitybody/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/entitybody/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entitybody/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entitybody/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entitybody/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entitybody/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entitybody/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entitybody/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entitybody/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entitybody/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/entitybody/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/entitybody/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/entitybody/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/entitybody/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/entitybody/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/entitybody/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/entitybody/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/entitybody/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/entitybody/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/entitybody/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/entitybody/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/entitybody/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entitybody/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entitypart/list',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entitypart/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entitypart/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entitypart/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entitypart/:id',
        role: 'Tradutor',
        method: 'GET'
      },
      {
        route: '/client/api/v1/entitypart/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/entitypart/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/entitypart/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/entitypart/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entitypart/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entitypart/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entitypart/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entitypart/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entitypart/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entitypart/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entitypart/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entitypart/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/entitypart/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/entitypart/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/entitypart/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/entitypart/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/entitypart/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/entitypart/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/entitypart/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/entitypart/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/entitypart/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/entitypart/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/entitypart/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/entitypart/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entitypart/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/list',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/material/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/:id',
        role: 'Tradutor',
        method: 'GET'
      },
      {
        route: '/client/api/v1/material/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/material/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/material/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/material/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/count',
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
        route: '/client/api/v1/size/list',
        role: 'Tradutor',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/size/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/size/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/size/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/size/:id',
        role: 'Tradutor',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/size/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/size/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/size/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/size/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/client/api/v1/size/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/size/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/size/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/size/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/size/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/size/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/size/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/size/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/size/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/size/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/size/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tickupdate/list',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tickupdate/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tickupdate/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tickupdate/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tickupdate/:id',
        role: 'Tradutor',
        method: 'GET'
      },
      {
        route: '/client/api/v1/tickupdate/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/tickupdate/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/tickupdate/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/tickupdate/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tickupdate/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tickupdate/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tickupdate/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tickupdate/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tickupdate/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tickupdate/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tickupdate/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tickupdate/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tickupdate/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tickupdate/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tickupdate/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tickupdate/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tickupdate/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tickupdate/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tickupdate/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tickupdate/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tickupdate/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/tickupdate/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/tickupdate/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/tickupdate/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/tickupdate/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blockstate/list',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blockstate/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blockstate/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blockstate/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blockstate/:id',
        role: 'Tradutor',
        method: 'GET'
      },
      {
        route: '/client/api/v1/blockstate/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/blockstate/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/blockstate/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/blockstate/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blockstate/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blockstate/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blockstate/count',
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
        route: '/client/api/v1/category/list',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/category/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/:id',
        role: 'Tradutor',
        method: 'GET'
      },
      {
        route: '/client/api/v1/category/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/category/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/category/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/category/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/category/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/category/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entity/list',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entity/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/entity/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/entity/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entity/:id',
        role: 'Tradutor',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/entity/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/entity/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/entity/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/entity/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entity/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/entity/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/entity/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entity/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entity/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entity/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entity/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entity/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/entity/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/entity/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/entity/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/entity/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/entity/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/entity/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/entity/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/entity/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/entity/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/entity/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/entity/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/entity/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/entity/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/item/list',
        role: 'Tradutor',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/item/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/item/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/item/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/item/:id',
        role: 'Tradutor',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/item/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/item/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/item/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/item/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/client/api/v1/item/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/item/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/item/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/item/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/item/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/item/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/item/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/item/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/item/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/item/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/item/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/item/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/item/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/item/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/item/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/item/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/item/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/item/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/item/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/item/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/item/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/lang/list',
        role: 'Tradutor',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/lang/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/lang/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/lang/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/lang/:id',
        role: 'Tradutor',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/lang/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/lang/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/lang/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/lang/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/client/api/v1/lang/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/lang/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/lang/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/lang/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/lang/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/lang/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/lang/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/lang/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/lang/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/lang/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/lang/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/lang/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/lang/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/lang/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/lang/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/lang/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/lang/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/lang/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/lang/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/lang/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/lang/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pack/list',
        role: 'Tradutor',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/pack/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/pack/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/pack/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pack/:id',
        role: 'Tradutor',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/pack/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/pack/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/pack/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/pack/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pack/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/pack/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/pack/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pack/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/pack/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pack/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/pack/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pack/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pack/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pack/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pack/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pack/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pack/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pack/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pack/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pack/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pack/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pack/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/pack/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/pack/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pack/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/create',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/addbulk',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/list',
        role: 'Tradutor',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/:id',
        role: 'Tradutor',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/user/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/user/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/update/:id',
        role: 'Tradutor',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/partial-update/:id',
        role: 'Tradutor',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/updatebulk',
        role: 'Tradutor',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdelete/:id',
        role: 'Tradutor',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdeletemany',
        role: 'Tradutor',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/delete/:id',
        role: 'Tradutor',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/user/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/user/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/user/deletemany',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/deletemany',
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
        route: '/client/api/v1/activitylog/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/activitylog/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/activitylog/deletemany',
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
        route: '/desktop/api/v1/blog/list',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/blog/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/desktop/api/v1/blog/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/desktop/api/v1/blog/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/blog/:id',
        role: 'Tradutor',
        method: 'GET' 
      },
      {
        route: '/desktop/api/v1/blog/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/desktop/api/v1/blog/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/desktop/api/v1/blog/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/blog/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/blog/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/desktop/api/v1/blog/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/desktop/api/v1/blog/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/blog/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/desktop/api/v1/blog/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/blog/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/blog/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/blog/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/blog/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/blog/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/blog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/blog/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/blog/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/blog/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/blog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/blog/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/blog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/blog/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/blog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/blog/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/blog/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/chat_group/list',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/chat_group/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/chat_group/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/chat_group/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/chat_group/:id',
        role: 'Tradutor',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/chat_group/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/chat_group/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/chat_group/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/chat_group/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/chat_group/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/chat_group/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/chat_group/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/chat_group/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/chat_group/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/chat_group/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/chat_group/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/chat_group/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/chat_group/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/chat_group/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/chat_group/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/chat_group/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/chat_group/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/chat_group/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/chat_group/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/chat_group/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/chat_group/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/chat_group/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/chat_group/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/chat_group/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/chat_group/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/chat_message/list',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/chat_message/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/chat_message/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/chat_message/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/chat_message/:id',
        role: 'Tradutor',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/chat_message/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/chat_message/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/chat_message/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/chat_message/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/chat_message/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/chat_message/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/chat_message/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/chat_message/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/chat_message/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/chat_message/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/chat_message/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/chat_message/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/chat_message/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/chat_message/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/chat_message/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/chat_message/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/chat_message/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/chat_message/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/chat_message/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/chat_message/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/chat_message/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/chat_message/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/chat_message/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/chat_message/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/chat_message/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/chemistryelement/list',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/chemistryelement/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/chemistryelement/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/chemistryelement/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/chemistryelement/:id',
        role: 'Tradutor',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/chemistryelement/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/chemistryelement/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/chemistryelement/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/chemistryelement/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/chemistryelement/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/chemistryelement/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/chemistryelement/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/chemistryelement/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/chemistryelement/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/chemistryelement/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/chemistryelement/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/chemistryelement/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/chemistryelement/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/chemistryelement/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/chemistryelement/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/chemistryelement/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/chemistryelement/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/chemistryelement/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/chemistryelement/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/chemistryelement/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/chemistryelement/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/chemistryelement/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/chemistryelement/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/chemistryelement/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/chemistryelement/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/comment/list',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/comment/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/comment/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/desktop/api/v1/comment/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/comment/:id',
        role: 'Tradutor',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/comment/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/desktop/api/v1/comment/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/desktop/api/v1/comment/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/comment/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/comment/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/comment/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/comment/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/comment/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/comment/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/comment/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/comment/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/comment/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/comment/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/comment/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/comment/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/comment/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/comment/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/comment/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/comment/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/comment/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/comment/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/comment/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/comment/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/comment/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/comment/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/entitybody/list',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/entitybody/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/entitybody/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/entitybody/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/entitybody/:id',
        role: 'Tradutor',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/entitybody/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/entitybody/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/entitybody/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/entitybody/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/entitybody/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/entitybody/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/entitybody/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/entitybody/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/entitybody/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/entitybody/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/entitybody/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/entitybody/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/entitybody/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/entitybody/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/entitybody/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/entitybody/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/entitybody/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/entitybody/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/entitybody/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/entitybody/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/entitybody/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/entitybody/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/entitybody/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/entitybody/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/entitybody/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/entitypart/list',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/entitypart/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/entitypart/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/entitypart/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/entitypart/:id',
        role: 'Tradutor',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/entitypart/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/entitypart/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/entitypart/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/entitypart/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/entitypart/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/entitypart/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/entitypart/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/entitypart/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/entitypart/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/entitypart/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/entitypart/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/entitypart/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/entitypart/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/entitypart/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/entitypart/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/entitypart/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/entitypart/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/entitypart/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/entitypart/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/entitypart/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/entitypart/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/entitypart/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/entitypart/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/entitypart/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/entitypart/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/material/list',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/material/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/material/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/material/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/material/:id',
        role: 'Tradutor',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/material/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/desktop/api/v1/material/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/desktop/api/v1/material/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/material/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/material/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/material/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/material/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/material/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/material/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/material/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/material/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/material/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/material/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/material/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/material/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/material/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/material/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/material/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/material/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/material/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/material/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/material/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/material/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/material/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/material/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/size/list',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/size/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/desktop/api/v1/size/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/desktop/api/v1/size/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/size/:id',
        role: 'Tradutor',
        method: 'GET' 
      },
      {
        route: '/desktop/api/v1/size/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/desktop/api/v1/size/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/desktop/api/v1/size/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/size/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/size/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/desktop/api/v1/size/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/desktop/api/v1/size/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/size/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/desktop/api/v1/size/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/size/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/size/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/size/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/size/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/size/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/size/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/size/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/size/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/size/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/size/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/size/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/size/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/size/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/size/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/size/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/size/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/tickupdate/list',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/tickupdate/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/tickupdate/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/tickupdate/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/tickupdate/:id',
        role: 'Tradutor',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/tickupdate/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/tickupdate/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/tickupdate/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/tickupdate/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/tickupdate/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/tickupdate/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/tickupdate/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/tickupdate/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/tickupdate/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/tickupdate/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/tickupdate/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/tickupdate/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/tickupdate/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/tickupdate/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/tickupdate/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/tickupdate/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/tickupdate/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/tickupdate/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/tickupdate/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/tickupdate/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/tickupdate/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/tickupdate/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/tickupdate/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/tickupdate/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/tickupdate/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/blockstate/list',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/blockstate/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/blockstate/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/blockstate/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/blockstate/:id',
        role: 'Tradutor',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/blockstate/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/blockstate/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/blockstate/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/blockstate/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/blockstate/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/blockstate/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/blockstate/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/blockstate/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/blockstate/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/blockstate/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/blockstate/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/blockstate/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/blockstate/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/blockstate/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/blockstate/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/blockstate/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/blockstate/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/blockstate/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/blockstate/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/blockstate/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/blockstate/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/blockstate/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/blockstate/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/blockstate/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/blockstate/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/category/list',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/category/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/category/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/category/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/category/:id',
        role: 'Tradutor',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/category/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/desktop/api/v1/category/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/desktop/api/v1/category/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/category/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/category/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/category/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/category/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/category/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/category/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/category/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/category/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/category/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/category/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/category/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/category/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/category/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/category/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/category/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/category/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/category/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/category/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/category/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/category/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/category/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/category/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/entity/list',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/entity/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/desktop/api/v1/entity/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/desktop/api/v1/entity/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/entity/:id',
        role: 'Tradutor',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/entity/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/desktop/api/v1/entity/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/desktop/api/v1/entity/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/entity/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/entity/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/entity/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/desktop/api/v1/entity/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/entity/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/entity/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/entity/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/entity/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/entity/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/entity/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/entity/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/entity/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/entity/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/entity/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/entity/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/entity/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/entity/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/entity/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/entity/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/entity/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/entity/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/entity/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/item/list',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/item/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/desktop/api/v1/item/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/desktop/api/v1/item/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/item/:id',
        role: 'Tradutor',
        method: 'GET' 
      },
      {
        route: '/desktop/api/v1/item/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/desktop/api/v1/item/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/desktop/api/v1/item/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/item/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/item/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/desktop/api/v1/item/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/desktop/api/v1/item/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/item/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/desktop/api/v1/item/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/item/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/item/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/item/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/item/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/item/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/item/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/item/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/item/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/item/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/item/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/item/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/item/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/item/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/item/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/item/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/item/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/lang/list',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/lang/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/desktop/api/v1/lang/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/desktop/api/v1/lang/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/lang/:id',
        role: 'Tradutor',
        method: 'GET' 
      },
      {
        route: '/desktop/api/v1/lang/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/desktop/api/v1/lang/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/desktop/api/v1/lang/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/lang/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/lang/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/desktop/api/v1/lang/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/desktop/api/v1/lang/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/lang/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/desktop/api/v1/lang/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/lang/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/lang/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/lang/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/lang/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/lang/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/lang/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/lang/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/lang/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/lang/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/lang/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/lang/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/lang/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/lang/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/lang/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/lang/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/lang/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/pack/list',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/pack/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/desktop/api/v1/pack/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/desktop/api/v1/pack/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/pack/:id',
        role: 'Tradutor',
        method: 'GET' 
      },
      {
        route: '/desktop/api/v1/pack/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/desktop/api/v1/pack/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/desktop/api/v1/pack/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/pack/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/pack/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/desktop/api/v1/pack/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/desktop/api/v1/pack/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/pack/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/desktop/api/v1/pack/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/pack/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/pack/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/pack/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/pack/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/pack/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/pack/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/pack/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/pack/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/pack/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/pack/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/pack/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/pack/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/pack/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/pack/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/pack/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/pack/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/user/create',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/desktop/api/v1/user/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/desktop/api/v1/user/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/user/addbulk',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/user/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/user/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/desktop/api/v1/user/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/user/list',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/desktop/api/v1/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/desktop/api/v1/user/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/user/:id',
        role: 'Tradutor',
        method: 'GET' 
      },
      {
        route: '/desktop/api/v1/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/desktop/api/v1/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/desktop/api/v1/user/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/user/count',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/desktop/api/v1/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/desktop/api/v1/user/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/user/update/:id',
        role: 'Tradutor',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/user/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/user/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/user/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/user/partial-update/:id',
        role: 'Tradutor',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/user/updatebulk',
        role: 'Tradutor',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/user/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/user/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/user/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/user/softdelete/:id',
        role: 'Tradutor',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/user/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/user/softdeletemany',
        role: 'Tradutor',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/user/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/user/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/user/delete/:id',
        role: 'Tradutor',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/user/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/user/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/user/deletemany',
        role: 'Tradutor',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/user/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/user/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/usertokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/activitylog/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/activitylog/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/activitylog/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/activitylog/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/activitylog/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/activitylog/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/activitylog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/activitylog/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/activitylog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/activitylog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/activitylog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/activitylog/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/role/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/role/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/role/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/role/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/role/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/role/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/role/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/routerole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/routerole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/userrole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/userrole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/desktop/api/v1/userrole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },

    ];
    if (routeRoles && routeRoles.length) {
      const routes = [...new Set(routeRoles.map(routeRole => routeRole.route.toLowerCase()))];
      const routeMethods = [...new Set(routeRoles.map(routeRole => routeRole.method))];
      const roles = [ 'Tradutor', 'Admin', 'User', 'System_User' ];
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
  } catch (error){
    console.log('RouteRole seeder failed due to ', error.message);
  }
}

/* seeds roles for users */
async function seedUserRole (){
  try {
    const userRoles = [{
      'username':'Humberto_Conn47',
      'password':'J8QnRQgyb2Cre2a'
    }];
    const defaultRoles = await dbService.findMany(Role);
    const insertedUsers = await dbService.findMany(User, { username: { '$in': userRoles.map(userRole => userRole.username) } });
    let user = {};
    const userRolesArr = [];
    userRoles.map(userRole => {
      user = insertedUsers.find(user => user.username === userRole.username && user.isPasswordMatch(userRole.password) && user.isActive && !user.isDeleted);
      if (user) {
        if (user.userType === authConstant.USER_TYPES.Admin){
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'ADMIN')._id
          });
        } else if (user.userType === authConstant.USER_TYPES.User){
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'USER')._id
          });
        } else {
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'SYSTEM_USER')._id
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

async function seedData (allRegisterRoutes){
  await seedUser();
  await seedRole();
  await seedProjectRoutes(allRegisterRoutes);
  await seedRouteRole();
  await seedUserRole();

};
module.exports = seedData;