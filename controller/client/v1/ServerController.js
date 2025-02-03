/**
 * ServerController.js
 * @description : exports action methods for Server.
 */

const Server = require('../../../model/Server');
const ServerSchemaKey = require('../../../utils/validation/ServerValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
const pack = require('../../../model/pack');
const processPacks = async (packs) => {
  let validPacks = new Set(packs);
  let checkedPacks = new Set();
  let incompatiblePacks = new Set();

  const processPack = async (packId) => {
    if (checkedPacks.has(packId)) return;
    const packData = await dbService.findOne(pack, { _id: packId });
    if (!packData) return;

    checkedPacks.add(packId);

    for (let reqPack of packData.requiredPacks || []) {
      if (!validPacks.has(reqPack)) {
        validPacks.add(reqPack);
        await processPack(reqPack);
      }
    }

    for (let incPack of packData.packsIncompatible || []) {
      if (validPacks.has(incPack)) {
        incompatiblePacks.add(incPack);
        incompatiblePacks.add(packId);
      }
    }
  };

  for (let packId of packs) {
    await processPack(packId);
  }

  return { validPacks: [...validPacks], incompatiblePacks: [...incompatiblePacks] };
};

/**
 * Cria um novo servidor após validar packs.
 */
const addServer = async (req, res) => {
  try {
    let { name, description, image, packs } = req.body;
    if (!Array.isArray(packs)) {
      return res.validationError({ message: "O campo 'packs' deve ser um array." });
    }

    const { validPacks, incompatiblePacks } = await processPacks(packs);

    if (incompatiblePacks.length > 0) {
      return res.validationError({
        message: "Os seguintes pacotes são incompatíveis: " + incompatiblePacks.join(', ')
      });
    }

    const newServer = new Server({
      name,
      description,
      image,
      packs: validPacks,
      addedBy: req.user.id,
    });

    const createdServer = await dbService.create(Server, newServer);
    return res.success({ data: createdServer });

  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * Atualiza um servidor e valida packs antes da atualização.
 */
const updateServer = async (req, res) => {
  try {
    let { packs } = req.body;
    let serverId = req.params.id;

    const server = await dbService.findOne(Server, { _id: serverId });
    if (!server) {
      return res.recordNotFound();
    }

    if (packs) {
      if (!Array.isArray(packs)) {
        return res.validationError({ message: "O campo 'packs' deve ser um array." });
      }

      const { validPacks, incompatiblePacks } = await processPacks(packs);
      if (incompatiblePacks.length > 0) {
        return res.validationError({
          message: "Os seguintes pacotes são incompatíveis: " + incompatiblePacks.join(', ')
        });
      }

      req.body.packs = validPacks;
    }

    let updatedServer = await dbService.updateOne(Server, { _id: serverId }, req.body);
    return res.success({ data: updatedServer });

  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * Atualiza múltiplos servidores garantindo a validação dos packs.
 */
const bulkUpdateServer = async (req, res) => {
  try {
    let { filter, data } = req.body;
    if (!filter || !data) return res.badRequest();

    if (data.packs) {
      if (!Array.isArray(data.packs)) {
        return res.validationError({ message: "O campo 'packs' deve ser um array." });
      }

      const { validPacks, incompatiblePacks } = await processPacks(data.packs);
      if (incompatiblePacks.length > 0) {
        return res.validationError({
          message: "Os seguintes pacotes são incompatíveis: " + incompatiblePacks.join(', ')
        });
      }

      data.packs = validPacks;
    }

    let updatedServer = await dbService.updateMany(Server, filter, data);
    return res.success({ data: { count: updatedServer } });

  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * Atualiza parcialmente um servidor garantindo validação dos packs.
 */
const partialUpdateServer = async (req, res) => {
  try {
    let { packs } = req.body;
    let serverId = req.params.id;

    if (!serverId) return res.badRequest({ message: 'ID é obrigatório.' });

    const server = await dbService.findOne(Server, { _id: serverId });
    if (!server) {
      return res.recordNotFound();
    }

    if (packs) {
      if (!Array.isArray(packs)) {
        return res.validationError({ message: "O campo 'packs' deve ser um array." });
      }

      const { validPacks, incompatiblePacks } = await processPacks(packs);
      if (incompatiblePacks.length > 0) {
        return res.validationError({
          message: "Os seguintes pacotes são incompatíveis: " + incompatiblePacks.join(', ')
        });
      }

      req.body.packs = validPacks;
    }

    let updatedServer = await dbService.updateOne(Server, { _id: serverId }, req.body);
    return res.success({ data: updatedServer });

  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};
/**
 * @description : create multiple documents of Server in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Servers. {status, message, data}
 */
const bulkInsertServer = async (req, res) => {
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [...req.body.data];
    for (let i = 0; i < dataToCreate.length; i++) {
      dataToCreate[i] = {
        ...dataToCreate[i],
        addedBy: req.user.id
      };
    }
    let createdServers = await dbService.create(Server, dataToCreate);
    createdServers = { count: createdServers ? createdServers.length : 0 };
    return res.success({ data: { count: createdServers.count || 0 } });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : find all documents of Server from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Server(s). {status, message, data}
 */
const findAllServer = async (req, res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      ServerSchemaKey.findFilterKeys,
      Server.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly) {
      let totalRecords = await dbService.count(Server, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundServers = await dbService.paginate(Server, query, options);
    if (!foundServers || !foundServers.data || !foundServers.data.length) {
      return res.recordNotFound();
    }
    return res.success({ data: foundServers });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : find document of Server from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Server. {status, message, data}
 */
const getServer = async (req, res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message: 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundServer = await dbService.findOne(Server, query, options);
    if (!foundServer) {
      return res.recordNotFound();
    }
    return res.success({ data: foundServer });
  }
  catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : returns total number of documents of Server.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getServerCount = async (req, res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      ServerSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedServer = await dbService.count(Server, where);
    return res.success({ data: { count: countedServer } });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

const softDeleteServer = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.badRequest({ message: 'Insufficient request parameters! id is required.' });
    }
    let query = { _id: req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedServer = await dbService.updateOne(Server, query, updateBody);
    if (!updatedServer) {
      return res.recordNotFound();
    }
    return res.success({ data: updatedServer });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : delete document of Server from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Server. {status, message, data}
 */
const deleteServer = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.badRequest({ message: 'Insufficient request parameters! id is required.' });
    }
    const query = { _id: req.params.id };
    const deletedServer = await dbService.deleteOne(Server, query);
    if (!deletedServer) {
      return res.recordNotFound();
    }
    return res.success({ data: deletedServer });

  }
  catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : delete documents of Server in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyServer = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id: { $in: ids } };
    const deletedServer = await dbService.deleteMany(Server, query);
    if (!deletedServer) {
      return res.recordNotFound();
    }
    return res.success({ data: { count: deletedServer } });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};
/**
 * @description : deactivate multiple documents of Server from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Server.
 * @return {Object} : number of deactivated documents of Server. {status, message, data}
 */
const softDeleteManyServer = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id: { $in: ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedServer = await dbService.updateMany(Server, query, updateBody);
    if (!updatedServer) {
      return res.recordNotFound();
    }
    return res.success({ data: { count: updatedServer } });

  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

module.exports = {
  addServer,
  bulkInsertServer,
  findAllServer,
  getServer,
  getServerCount,
  updateServer,
  bulkUpdateServer,
  partialUpdateServer,
  softDeleteServer,
  deleteServer,
  deleteManyServer,
  softDeleteManyServer
};