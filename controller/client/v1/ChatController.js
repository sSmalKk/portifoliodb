
/**
 * Verifica se o chat pertence à lista de IDs restritos.
 * @param {string | ObjectId} id 
 * @return {boolean} 
 */

/**
 * @description : create document of Chat in mongodb collection.
 */
const addChat = async (req, res) => {
  try {
    const dataToCreate = { ...req.body || {} };

    if (isRestrictedChat(dataToCreate._id)) {
      return res.forbidden({ message: 'Operação não permitida neste chat.' });
    }

    const validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      ChatSchemaKey.schemaKeys
    );

    if (!validateRequest.isValid) {
      return res.validationError({ message: `Invalid values in parameters, ${validateRequest.message}` });
    }

    dataToCreate.addedBy = req.user.id;
    const createdChat = await dbService.create(Chat, new Chat(dataToCreate));
    return res.success({ data: createdChat });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : update document of Chat with data by id.
 */
const updateChat = async (req, res) => {
  try {
    if (isRestrictedChat(req.params.id)) {
      return res.forbidden({ message: 'Operação não permitida neste chat.' });
    }

    const dataToUpdate = {
      ...req.body,
      updatedBy: req.user.id,
    };

    const validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      ChatSchemaKey.updateSchemaKeys
    );

    if (!validateRequest.isValid) {
      return res.validationError({ message: `Invalid values in parameters, ${validateRequest.message}` });
    }

    const query = { _id: req.params.id };
    const updatedChat = await dbService.updateOne(Chat, query, dataToUpdate);

    if (!updatedChat) {
      return res.recordNotFound();
    }

    return res.success({ data: updatedChat });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : delete document of Chat by id.
 */
const deleteChat = async (req, res) => {
  try {
    if (isRestrictedChat(req.params.id)) {
      return res.forbidden({ message: 'Operação não permitida neste chat.' });
    }

    const query = { _id: req.params.id };
    const deletedChat = await dbService.deleteOne(Chat, query);

    if (!deletedChat) {
      return res.recordNotFound();
    }

    return res.success({ data: deletedChat });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

// Aplicar a validação a outras funções, como `bulkInsertChat`, `bulkUpdateChat` e `partialUpdateChat`.

module.exports = {
  addChat,
  bulkInsertChat,
  findAllChat,
  getChat,
  getChatCount,
  updateChat,
  bulkUpdateChat,
  partialUpdateChat,
  deleteChat,
};
