/**
 *coordenate.js
 */

const mongoose = require('mongoose');
const WorldData = require('./models/worlddata');

module.exports = async (req, res, next) => {
  const coordenadaMiddleware = async (req, res, next) => {
    const {
      x, y, z, worlddata, blockstate 
    } = req.body;

    // Verificar se blockstate é um número
    if (typeof blockstate !== 'number') {
      return res.status(400).json({ error: 'Erro: blockstate deve ser um número.' });
    }

    // Buscar o size da coleção worlddata
    try {
      const worldDataRecord = await WorldData.findById(worlddata);
      if (!worldDataRecord) {
        return res.status(404).json({ error: 'worlddata não encontrado.' });
      }

      const size = worldDataRecord.size;

      // Verificar se x, y e z estão entre >= 0 e < 10^size
      const maxCoord = Math.pow(10, size) - 1;
      if (x < 0 || x > maxCoord || y < 0 || y > maxCoord || z < 0 || z > maxCoord) {
        return res.status(400).json({ error: `Erro de coordenada: x, y e z devem estar entre 0 e ${maxCoord}.` });
      }

      // Adicionar 1 às variáveis x, y e z
      const newX = x + 1;
      const newY = y + 1;
      const newZ = z + 1;

      // Escrever os valores de x, y e z um na frente do outro, formatados com zeros à esquerda
      const formattedX = newX.toString().padStart(size, '0');
      const formattedY = newY.toString().padStart(size, '0');
      const formattedZ = newZ.toString().padStart(size, '0');

      // Concatenar e converter para número inteiro
      const l = parseInt(`${formattedX}${formattedY}${formattedZ}`);

      // Salvar o número em l
      req.body.l = l;

      // Construir o array blockdata
      const blockdata = [x, y, z, blockstate];

      // Salvar blockdata em req.body
      req.body.blockdata = blockdata;

      next();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar worlddata.' });
    }
  };

  return coordenadaMiddleware(req, res, next);
};
