/**
 * fileUploadController.js
 * @description :: exports all method related file upload
 */

const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const validUrl = require('valid-url');


/**
 * @description : lists files with pagination
 * @param {Object} req : request of list files API
 * @param {Object} res : response of list files API.
 * @return {Object} : response of paginated list of files. {status, message, data}
 */

let defaultDirectory = 'public/assets';
let allowedFileTypes = [
  'png',
  'jpeg',
  'jpg',
  'gif',
  'pdf',
  'doc',
  'docx',
  'msword',
  'vnd.openxmlformats-officedocument.wordprocessingml.document',
  'xls',
  'xlsx',
  'vnd.ms-excel',
  'json',
  'x-msdos-program',
  'x-msdownload',
  'exe',
  'x-ms-dos-executable'
];
let maxFileSize = 5; //In Megabyte

/**
 * @description : uploads file using formidable.
 * @param {Object} req : request of file upload API
 * @param {Object} res : response of file upload API.
 * @return {Object} : response of file upload. {status, message, data}
 */
const upload = async (req, res) => {
  try {
    // Configuração do Formidable
    const form = new formidable.IncomingForm({
      multiples: true,
      maxFileSize: 5 * 1024 * 1024, // 5 MB
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
      const uploadResults = [];

      for (const file of fileArray) {
        const uploadResult = await uploadFiles(file, fields);
        uploadResults.push(uploadResult);
      }

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
 * @description : create directory to specified path
 * @param {string} directoryPath : location where directory will be created
 * @return {boolean} : returns true if directory is created or false
 */
const makeDirectory = async (directoryPath) => {

  if (!fs.existsSync(directoryPath)) {
    fs.promises.mkdir(directoryPath, { recursive: true }, (error) => {
      if (error) {
        return false;
      };
      return true;
    });
  }
  return true;
};

/**
 * @description : upload files
 * @param {Object} file : file to upload
 * @param {Object} fields : fields for file
 * @param {number} fileCount : total number of files to upload
 * @return {Object} : response for file upload
 */
const uploadFiles = async  (file, fields, fileCount) => {

  let tempPath = file.filepath;
  let unlink;
  let fileName = file.originalFilename;

  let extension = path.extname(file.originalFilename);
  extension = extension.split('.').pop();

  fileType = file.mimetype;

  if (allowedFileTypes.length == 0 || !allowedFileTypes.includes(extension)) {
    return {
      status: false,
      message: 'Filetype not allowed.'
    };
  }

  // Check File Size
  const fileSize = ((file.size / 1024) / 1024);
  if (maxFileSize < fileSize) {
    return {
      status: false,
      message: `Allow file size upto ${maxFileSize} MB.`
    };
  }

  //Create New path
  let newPath = defaultDirectory + '/' + new Date().getTime() + path.extname(file.originalFilename);

  //Create Requested Directory,if given in request parameter.
  if (fields && fields.folderName) {
    let newDir = defaultDirectory + '/' + fields.folderName;
    const createDir = await makeDirectory(newDir);
    if (createDir) {
      if (fields.fileName) {
        newPath = newDir + '/' + fields.fileName + '-' + fileCount + path.extname(file.originalFilename);
        fileName = fields.fileName;
      }
    }
  }
  else if (fields && fields.fileName) {
    newPath = defaultDirectory + '/' + fields.fileName + '-' + fileCount + path.extname(file.originalFilename);
    fileName = fields.fileName;
  }
  
  const response = await new Promise(async (resolve, reject) => {
    fs.readFile(tempPath, function (error, data) {
      fs.writeFile(newPath, data, async function (error) {
  
        //Remove file from temp
        unlink = await unlinkFile(tempPath);
  
        if (unlink.status == false) {
          reject(unlink);
        } else {
          resolve({
            status: true,
            message: 'File upload successfully.',
            data: '/' + newPath
          });
        }
      });
    });
  });

  return response;
};

/**
 * @description : unlink(delete) file from specified path
 * @param {string} path : location of file 
 * @return {Object} : return unlink file status {status, message}
 */
const unlinkFile = async (path) => {

  fs.unlink(path, function (error) {
    if (error) {
      return {
        status: false,
        message: error.message
      };
    }
  });

  return { status: true };
};
const listFiles = async (req, res) => {
  try {
      const { page = 1, limit = 10 } = req.query; // Parse dos parâmetros
      const offset = (page - 1) * limit;

      if (!fs.existsSync(defaultDirectory)) {
          return res.status(404).json({
              status: false,
              message: 'Directory not found.',
          });
      }

      const files = fs.readdirSync(defaultDirectory); // Lê todos os arquivos
      const totalFiles = files.length;

      // Paginação
      const paginatedFiles = files.slice(offset, offset + parseInt(limit, 10));

      const fileData = paginatedFiles.map((file) => ({
          name: file,
          path: path.join(defaultDirectory, file),
      }));

      return res.status(200).json({
          status: true,
          message: 'Files retrieved successfully.',
          data: {
              files: fileData,
              total: totalFiles,
              page: parseInt(page, 10),
              pages: Math.ceil(totalFiles / limit),
          },
      });
  } catch (error) {
      console.error('Error listing files:', error);
      return res.status(500).json({
          status: false,
          message: `Failed to retrieve files: ${error.message}`,
      });
  }
};
module.exports = { upload, listFiles };
