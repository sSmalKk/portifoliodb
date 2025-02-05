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
async function seedUser () {
  try {
    let userToBeInserted = {};
    userToBeInserted = {
      'password':'J8QnRQgyb2Cre2a',
      'isDeleted':false,
      'username':'Humberto_Conn47',
      'email':'Dallas96@yahoo.com',
      'isActive':true,
      'userType':authConstant.USER_TYPES.User
    };
    userToBeInserted.password = await  bcrypt.hash(userToBeInserted.password, 8);
    let user = await dbService.updateOne(User, { 'username':'Humberto_Conn47' }, userToBeInserted,  { upsert: true });
    userToBeInserted = {
      'password':'centro18',
      'isDeleted':false,
      'username':'smalk',
      'email':'Jayson_Zemlak@gmail.com',
      'isActive':true,
      'userType':authConstant.USER_TYPES.Admin
    };
    userToBeInserted.password = await  bcrypt.hash(userToBeInserted.password, 8);
    let admin = await dbService.updateOne(User, { 'username':'smalk' }, userToBeInserted,  { upsert: true });
    console.info('Users seeded 🍺');
  } catch (error){
    console.log('User seeder failed due to ', error.message);
  }
}
/* seeds roles */
async function seedRole() {
  try {
    const roles = ["User", "System_User", "Admin"]; // 🔹 Adicionando "Admin"
    const insertedRoles = await dbService.findMany(Role, {
      code: { "$in": roles.map(role => role.toUpperCase()) }
    });

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
      if (result) console.log("✅ Role seeded!");
      else console.log("⚠️ Role seeder failed!");
    } else {
      console.log("✅ Role is up to date!");
    }
  } catch (error) {
    console.log("❌ Role seeder failed:", error.message);
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
async function seedRouteRole() {
  try {
    const modelPermissions = {
      blog: { User: ['list', 'get', 'count'], Admin: ['list', 'get', 'count', 'create', 'addbulk', 'update', 'partialUpdate', 'updateBulk', 'softDelete', 'softDeleteMany', 'delete', 'deleteMany'] },
      chat_group: { User: ['list', 'get', 'count'], Admin: ['list', 'get', 'count', 'create', 'addbulk', 'update', 'partialUpdate', 'updateBulk', 'softDelete', 'softDeleteMany', 'delete', 'deleteMany'] },
      chat_message: { User: ['list', 'get', 'count'], Admin: ['list', 'get', 'count', 'create', 'addbulk', 'update', 'partialUpdate', 'updateBulk', 'softDelete', 'softDeleteMany', 'delete', 'deleteMany'] },
      chemistryelement: { User: ['list', 'get', 'count'], Admin: ['list', 'get', 'count', 'create', 'addbulk', 'update', 'partialUpdate', 'updateBulk', 'softDelete', 'softDeleteMany', 'delete', 'deleteMany'] },
      comment: { User: ['list', 'get', 'count'], Admin: ['list', 'get', 'count', 'create', 'addbulk', 'update', 'partialUpdate', 'updateBulk', 'softDelete', 'softDeleteMany', 'delete', 'deleteMany'] },
      user: { User: ['list', 'get', 'count', 'create', 'addbulk', 'update', 'partialUpdate', 'updateBulk', 'softDelete', 'softDeleteMany', 'delete', 'deleteMany'], Admin: ['list', 'get', 'count', 'create', 'addbulk', 'update', 'partialUpdate', 'updateBulk', 'softDelete', 'softDeleteMany', 'delete', 'deleteMany'] },
      server: { User: ['list', 'get', 'count', 'create', 'addbulk', 'update', 'partialUpdate', 'updateBulk', 'softDelete', 'softDeleteMany', 'delete', 'deleteMany'], Admin: ['list', 'get', 'count', 'create', 'addbulk', 'update', 'partialUpdate', 'updateBulk', 'softDelete', 'softDeleteMany', 'delete', 'deleteMany'] },
      entitybody: { User: ['list', 'get', 'count'], Admin: ['list', 'get', 'count', 'create', 'addbulk', 'update', 'partialUpdate', 'updateBulk', 'softDelete', 'softDeleteMany', 'delete', 'deleteMany'] },
      entitypart: { User: ['list', 'get', 'count'], Admin: ['list', 'get', 'count', 'create', 'addbulk', 'update', 'partialUpdate', 'updateBulk', 'softDelete', 'softDeleteMany', 'delete', 'deleteMany'] },
      material: { User: ['list', 'get', 'count'], Admin: ['list', 'get', 'count', 'create', 'addbulk', 'update', 'partialUpdate', 'updateBulk', 'softDelete', 'softDeleteMany', 'delete', 'deleteMany'] },
      size: { User: ['list', 'get', 'count'], Admin: ['list', 'get', 'count', 'create', 'addbulk', 'update', 'partialUpdate', 'updateBulk', 'softDelete', 'softDeleteMany', 'delete', 'deleteMany'] },
      tickupdate: { User: ['list', 'get', 'count'], Admin: ['list', 'get', 'count', 'create', 'addbulk', 'update', 'partialUpdate', 'updateBulk', 'softDelete', 'softDeleteMany', 'delete', 'deleteMany'] },
      blockstate: { User: ['list', 'get', 'count'], Admin: ['list', 'get', 'count', 'create', 'addbulk', 'update', 'partialUpdate', 'updateBulk', 'softDelete', 'softDeleteMany', 'delete', 'deleteMany'] },
      category: { User: ['list', 'get', 'count'], Admin: ['list', 'get', 'count', 'create', 'addbulk', 'update', 'partialUpdate', 'updateBulk', 'softDelete', 'softDeleteMany', 'delete', 'deleteMany'] },
      entity: { User: ['list', 'get', 'count'], Admin: ['list', 'get', 'count', 'create', 'addbulk', 'update', 'partialUpdate', 'updateBulk', 'softDelete', 'softDeleteMany', 'delete', 'deleteMany'] },
      item: { User: ['list', 'get', 'count'], Admin: ['list', 'get', 'count', 'create', 'addbulk', 'update', 'partialUpdate', 'updateBulk', 'softDelete', 'softDeleteMany', 'delete', 'deleteMany'] },
      lang: { User: ['list', 'get', 'count'], Admin: ['list', 'get', 'count', 'create', 'addbulk', 'update', 'partialUpdate', 'updateBulk', 'softDelete', 'softDeleteMany', 'delete', 'deleteMany'] },
      pack: { User: ['list', 'get', 'count'], Admin: ['list', 'get', 'count', 'create', 'addbulk', 'update', 'partialUpdate', 'updateBulk', 'softDelete', 'softDeleteMany', 'delete', 'deleteMany'] },
      usertokens: { Admin: ['list', 'get', 'count', 'create', 'addbulk', 'update', 'partialUpdate', 'updateBulk', 'softDelete', 'softDeleteMany', 'delete', 'deleteMany'] },
      activitylog: { Admin: ['list', 'get', 'count', 'create', 'addbulk', 'update', 'partialUpdate', 'updateBulk', 'softDelete', 'softDeleteMany', 'delete', 'deleteMany'] },
      role: { Admin: ['list', 'get', 'count', 'create', 'addbulk', 'update', 'partialUpdate', 'updateBulk', 'softDelete', 'softDeleteMany', 'delete', 'deleteMany'] },
      projectroute: { Admin: ['list', 'get', 'count', 'create', 'addbulk', 'update', 'partialUpdate', 'updateBulk', 'softDelete', 'softDeleteMany', 'delete', 'deleteMany'] },
      routerole: { Admin: ['list', 'get', 'count', 'create', 'addbulk', 'update', 'partialUpdate', 'updateBulk', 'softDelete', 'softDeleteMany', 'delete', 'deleteMany'] },
      userrole: { Admin: ['list', 'get', 'count', 'create', 'addbulk', 'update', 'partialUpdate', 'updateBulk', 'softDelete', 'softDeleteMany', 'delete', 'deleteMany'] }
    };
    const actions = {
      list: { method: 'POST', path: 'list' },
      get: { method: 'GET', path: ':id' },
      count: { method: 'POST', path: 'count' },
      create: { method: 'POST', path: 'create' },
      addbulk: { method: 'POST', path: 'addbulk' },
      update: { method: 'PUT', path: 'update/:id' },
      partialUpdate: { method: 'PUT', path: 'partial-update/:id' },
      updateBulk: { method: 'PUT', path: 'updatebulk' },
      softDelete: { method: 'PUT', path: 'softdelete/:id' },
      softDeleteMany: { method: 'PUT', path: 'softdeletemany' },
      delete: { method: 'DELETE', path: 'delete/:id' },
      deleteMany: { method: 'POST', path: 'deletemany' }
    };

    let routeRoles = [];

    Object.entries(modelPermissions).forEach(([model, roles]) => {
      Object.entries(roles).forEach(([role, permissions]) => {
        permissions.forEach(action => {
          const { method, path } = actions[action];
          const route = `/client/api/v1/${model}/${path}`;
          routeRoles.push({ route, role, method });
        });
      });
    });

    if (routeRoles.length) {
      const routes = [...new Set(routeRoles.map(routeRole => routeRole.route.toLowerCase()))];
      const routeMethods = [...new Set(routeRoles.map(routeRole => routeRole.method))];
      const roles = Object.keys(modelPermissions).flatMap(model => Object.keys(modelPermissions[model]));

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

      let createRouteRoles = routeRoles.map(routeRole => {
        const projectRouteId = insertedProjectRoute.find(pr => pr.uri === routeRole.route.toLowerCase() && pr.method === routeRole.method);
        const roleId = insertedRoles.find(r => r.code === routeRole.role.toUpperCase());

        return projectRouteId && roleId ? { roleId: roleId.id, routeId: projectRouteId.id } : null;
      }).filter(Boolean);

      const routeRolesToBeInserted = [];

      await Promise.all(createRouteRoles.map(async routeRole => {
        const routeRoleObj = await dbService.findOne(RouteRole, {
          routeId: routeRole.routeId,
          roleId: routeRole.roleId
        });

        if (!routeRoleObj) {
          routeRolesToBeInserted.push({ routeId: routeRole.routeId, roleId: routeRole.roleId });
        }
      }));

      if (routeRolesToBeInserted.length) {
        const result = await dbService.create(RouteRole, routeRolesToBeInserted);
        console.log(result ? 'RouteRole seeded 🍺' : 'RouteRole seeder failed!');
      } else {
        console.log('RouteRole is up to date 🍺');
      }
    }
  } catch (error) {
    console.log('RouteRole seeder failed due to', error.message);
  }
}
/* seeds roles for users */
async function seedUserRole() {
  try {
    const userRoles = [
      { username: "Humberto_Conn47", password: "J8QnRQgyb2Cre2a", type: "USER" },
      { username: "smalk", password: "centro18", type: "ADMIN" }
    ];

    const defaultRoles = await dbService.findMany(Role);
    console.log("Roles carregadas:", defaultRoles);

    const insertedUsers = await dbService.findMany(User, {
      username: { "$in": userRoles.map(userRole => userRole.username) }
    });
    console.log("Usuários encontrados:", insertedUsers);

    if (!insertedUsers.length || !defaultRoles.length) {
      console.log("⚠️ Nenhum usuário ou role encontrado.");
      return;
    }

    let userRolesArr = [];
    userRoles.forEach(userRole => {
      let user = insertedUsers.find(u => u.username === userRole.username);
      if (!user) {
        console.log(`⚠️ Usuário não encontrado: ${userRole.username}`);
        return;
      }

      let role = defaultRoles.find(d => d.code === userRole.type.toUpperCase())?._id;
      if (!role) {
        console.log(`⚠️ Role não encontrada para o usuário: ${user.username}`);
        return;
      }

      userRolesArr.push({ userId: user._id, roleId: role });
    });

    if (!userRolesArr.length) {
      console.log("⚠️ Nenhuma relação user-role para inserir.");
      return;
    }

    let userRolesToBeInserted = [];
    await Promise.all(
      userRolesArr.map(async userRole => {
        let userRoleObj = await dbService.findOne(UserRole, {
          userId: userRole.userId,
          roleId: userRole.roleId
        });

        if (!userRoleObj) {
          userRolesToBeInserted.push(userRole);
        }
      })
    );

    if (userRolesToBeInserted.length) {
      await dbService.create(UserRole, userRolesToBeInserted);
      console.log("✅ UserRole seeded com sucesso!");
    } else {
      console.log("✅ UserRole já atualizado.");
    }
  } catch (error) {
    console.log("❌ UserRole seeder falhou:", error.message);
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