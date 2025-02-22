/**
 * fileUploadController.js
 * @description :: exports all methods related to file upload
 */

const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

let defaultDirectory = 'public/assets';
let allowedFileTypes = [
  'png', 'jpeg', 'jpg', 'gif', 'pdf', 'doc', 'docx', 'xls', 'xlsx',
  'msword', 'vnd.openxmlformats-officedocument.wordprocessingml.document',
  'vnd.ms-excel', 'json', 'x-msdos-program', 'x-msdownload', 'exe',
  'x-ms-dos-executable', 'glb', 'gltf', 'obj' // Suporte para modelos 3D
];
let maxFileSize = 5; // Em Megabytes (MB)

/**
 * @description : Upload de arquivos usando `formidable`.
 * @param {Object} req : Requisição da API.
 * @param {Object} res : Resposta da API.
 */
const upload = async (req, res) => {
  try {
    const form = new formidable.IncomingForm({
      multiples: true,
      maxFileSize: maxFileSize * 1024 * 1024, // Converte MB para bytes
    });

    form.parse(req, async (error, fields, files) => {
      if (error) {
        console.error("Erro ao processar o formulário:", error);
        return res.status(422).json({ error: "Erro ao processar o upload." });
      }

      if (!files.files) {
        return res.status(400).json({ error: "Nenhum arquivo enviado." });
      }

      const fileArray = Array.isArray(files.files) ? files.files : [files.files];
      const uploadResults = await Promise.all(fileArray.map((file) => uploadFiles(file, fields)));

      return res.status(200).json({
        message: "Upload concluído com sucesso.",
        data: uploadResults,
      });
    });
  } catch (error) {
    console.error("Erro ao realizar upload:", error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
};

/**
 * @description : Cria diretório se não existir.
 * @param {string} directoryPath : Caminho do diretório.
 * @return {Promise<boolean>} : Retorna true se criado com sucesso.
 */
const makeDirectory = async (directoryPath) => {
  try {
    await fs.promises.mkdir(directoryPath, { recursive: true });
    return true;
  } catch (error) {
    console.error("Erro ao criar diretório:", error);
    return false;
  }
};

/**
 * @description : Upload de arquivos.
 * @param {Object} file : Arquivo enviado.
 * @param {Object} fields : Campos do formulário.
 * @return {Promise<Object>} : Resposta do upload.
 */
const uploadFiles = async (file, fields) => {
  const tempPath = file.filepath;
  const fileName = file.originalFilename;
  let extension = path.extname(fileName).slice(1).toLowerCase(); // Remove o ponto e converte para minúsculas
  const fileType = file.mimetype;

  if (!allowedFileTypes.includes(extension)) {
    return { status: false, message: "Tipo de arquivo não permitido." };
  }

  const fileSizeMB = file.size / (1024 * 1024);
  if (fileSizeMB > maxFileSize) {
    return { status: false, message: `Tamanho máximo permitido é ${maxFileSize} MB.` };
  }

  let newPath = path.join(defaultDirectory, `${Date.now()}${path.extname(fileName)}`);

  if (fields.folderName) {
    let newDir = path.join(defaultDirectory, fields.folderName);
    if (await makeDirectory(newDir)) {
      newPath = path.join(newDir, `${fields.fileName || Date.now()}${path.extname(fileName)}`);
    }
  }

  try {
    await fs.promises.copyFile(tempPath, newPath);
    await unlinkFile(tempPath); // Remove arquivo temporário

    return { status: true, message: "Upload realizado com sucesso.", data: "/" + newPath.replace(/\\/g, "/") };
  } catch (error) {
    console.error("Erro ao salvar arquivo:", error);
    return { status: false, message: "Erro ao salvar o arquivo." };
  }
};

/**
 * @description : Remove arquivo temporário.
 * @param {string} filePath : Caminho do arquivo.
 */
const unlinkFile = async (filePath) => {
  try {
    await fs.promises.unlink(filePath);
    return { status: true };
  } catch (error) {
    console.error("Erro ao excluir arquivo:", error);
    return { status: false, message: error.message };
  }
};

module.exports = { upload };
