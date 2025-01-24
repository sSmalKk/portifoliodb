const fs = require('fs');
const mongoose = require('mongoose');
const dbService = require('../utils/dbService');
const MaterialModel = require('../model/material');
const ChemistryElementModel = require('../model/elements');

// Função para converter IDs numéricos ou strings para ObjectId
const convertToObjectId = (id) => new mongoose.Types.ObjectId(id.toString().padStart(24, '0'));

// Função para carregar MaterialRules.json
const loadMaterialRules = (filePath) => {
  try {
    const rulesData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(rulesData);
  } catch (error) {
    console.error(`❌ Erro ao carregar MaterialRules.json: ${error.message}`);
    return {};
  }
};

// Função para aplicar as regras de um material
const applyRulesToMaterial = (material, rules) => {
  const materialRules = rules[material.symbol];
  if (!materialRules) return material;

  material.rules = materialRules.map((rule) => ({
    condition: rule.condition,
    parameters: rule.parameters,
    color: rule.color,
  }));

  return material;
};

// Função para gerar espectro de corpo negro (Gradiente Placeholder)
const generateBlackBodySpectrum = (baseColor, minTemp, maxTemp) => {
  const spectrum = [baseColor, "#FF4500", "#FFFFFF"]; // Gradiente simplificado
  return spectrum;
};

const seedMaterials = async () => {
  try {
    console.log("🔄 Iniciando sincronização dos materiais...");

    // Apagar materiais não verificados
    await MaterialModel.deleteMany({ verified: false });

    // Buscar todos os elementos disponíveis
    const elements = await dbService.findMany(ChemistryElementModel, {});

    if (!elements.length) {
      console.error("❌ Nenhum elemento encontrado.");
      return;
    }

    console.log(`🔍 ${elements.length} elementos encontrados.`);

    // Carregar regras opcionais do arquivo MaterialRules.json
    const materialRulesPath = './MaterialRules.json';
    const materialRules = fs.existsSync(materialRulesPath)
      ? loadMaterialRules(materialRulesPath)
      : {};

    for (const element of elements) {
      const minTemperature = element.meltingPoint || 300; // Temperatura inicial
      const maxTemperature = element.boilingPoint
        ? element.boilingPoint + 2000 // Estimativa de plasma
        : 10000;

      const materialData = {
        _id: convertToObjectId(element.atomicNumber),
        name: element.name,
        symbol: element.symbol,
        elementId: convertToObjectId(element._id),
        type: "element",
        baseColors: [element.cpkHexColor || "#FFFFFF"],
        properties: {
          density: element.density || null,
          meltingPoint: element.meltingPoint || null,
          boilingPoint: element.boilingPoint || null,
          standardState: element.standardState || "solid",
        },
        blackBodyConfig: {
          minTemperature,
          maxTemperature,
          spectrum: generateBlackBodySpectrum(
            element.cpkHexColor || "#FFFFFF",
            minTemperature,
            maxTemperature
          ),
        },
        rules: [
          {
            condition: "temperatureChange",
            parameters: {
              minTemperature,
              maxTemperature,
            },
            description: "Reage a alterações de temperatura.",
          },
        ],
        verified: true,
        updatedAt: new Date(),
      };

      // Aplicar regras personalizadas se existirem
      const materialWithRules = applyRulesToMaterial(materialData, materialRules);

      // Inserir ou atualizar material no banco
      await MaterialModel.updateOne(
        { symbol: materialWithRules.symbol },
        materialWithRules,
        { upsert: true }
      );

      console.log(`✅ Material "${materialWithRules.name}" sincronizado.`);
    }

    console.log("✅ Sincronização concluída.");
  } catch (error) {
    console.error(`❌ Erro durante o seed: ${error.message}`);
  }
};

module.exports = seedMaterials;
