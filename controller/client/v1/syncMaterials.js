const fs = require("fs");
const mongoose = require("mongoose");
const dbService = require("../../../utils/dbService");
const Material = require("../../../model/Material");
const ChemistryElement = require("../../../model/ChemistryElement");
const PackModel = require("../../../model/pack");

// **Converter um número para ObjectId**
const convertToObjectId = (num) => {
  return new mongoose.Types.ObjectId(num.toString().padStart(24, "0"));
};

// **Carregar regras de materiais de um JSON externo**
const loadMaterialRules = (filePath) => {
  try {
    const rulesData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(rulesData);
  } catch (error) {
    console.error(`❌ Erro ao carregar MaterialRules.json: ${error.message}`);
    return {};
  }
};

// **Aplicar regras personalizadas ao material**
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

// **Gerar espectro de corpo negro (Gradiente Placeholder)**
const generateBlackBodySpectrum = (baseColor, minTemp, maxTemp) => {
  return [baseColor, "#FF4500", "#FFFFFF"];
};

// **Sincronizar os materiais no pack global**
const syncMaterials = async () => {
  try {
    console.log("🔄 Iniciando sincronização dos materiais...");

    // 🔹 Criar ou buscar um único pack global para todos os materiais
    let globalPack = await PackModel.findOne({ name: "Pack-Elementos" });
    if (!globalPack) {
      globalPack = await PackModel.create({
        name: "Pack-Elementos",
        description: "Pacote global contendo todos os materiais baseados nos elementos químicos",
      });
      console.log(`📦 Criado Pack Global: ${globalPack._id}`);
    }

    // **Buscar todos os elementos disponíveis**
    const elements = await dbService.findMany(ChemistryElement, {});

    if (!elements.length) {
      console.error("❌ Nenhum elemento encontrado.");
      return;
    }

    console.log(`🔍 ${elements.length} elementos encontrados.`);

    // **Carregar regras opcionais do arquivo MaterialRules.json**
    const materialRulesPath = "./MaterialRules.json";
    const materialRules = fs.existsSync(materialRulesPath)
      ? loadMaterialRules(materialRulesPath)
      : {};

    for (const element of elements) {
      console.log(`🔄 Processando: ${element.name}`);

      try {
        if (!element._id || !element.atomicNumber) {
          console.warn(`⚠️ Elemento inválido ignorado: ${element.name}`);
          continue;
        }

        const minTemperature = element.meltingPoint || 300;
        const maxTemperature = element.boilingPoint ? element.boilingPoint + 2000 : 10000;

        const materialData = {
          _id: convertToObjectId(element.atomicNumber),
          name: element.name,
          symbol: element.symbol,
          elementId: element._id,
          type: "element",
          baseColors: element.cpkHexColor ? [element.cpkHexColor.toString()] : ["#FFFFFF"],
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
          pack: globalPack._id, // ✅ Sempre garantindo que tenha um pack válido
          verified: true,
          updatedAt: new Date(),
        };

        // **Aplicar regras personalizadas do JSON, se existirem**
        const materialWithRules = applyRulesToMaterial(materialData, materialRules);

        // **Inserir ou atualizar material no banco**
        await Material.updateOne(
          { symbol: materialWithRules.symbol, pack: globalPack._id },
          { $set: { ...materialWithRules } },
          { upsert: true }
        );

        console.log(`✅ Material "${materialWithRules.name}" sincronizado com pack: ${globalPack._id}`);
      } catch (error) {
        console.error(`❌ Erro ao processar ${element.name}: ${error.message}`);
      }
    }

    // **Remover materiais que não pertencem mais ao pack**
    const validSymbols = elements.map((el) => el.symbol);
    await dbService.deleteMany(Material, {
      symbol: { $nin: validSymbols },
      pack: globalPack._id, // 🔹 Removendo apenas os do pack correto
    });

    console.log("🗑️ Materiais extras removidos.");
    console.log("✅ Sincronização de materiais concluída.");
  } catch (error) {
    console.error(`❌ Erro durante a sincronização: ${error.message}`);
  }
};

module.exports = syncMaterials;
