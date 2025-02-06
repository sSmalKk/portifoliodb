const axios = require("axios");
const dbService = require("../utils/dbService");
const ChemistryElement = require("../model/ChemistryElement");
const PackModel = require("../model/pack");
const mongoose = require("mongoose");

// **Função para buscar a lista de elementos do PubChem**
const fetchElementList = async () => {
  const url = "https://pubchem.ncbi.nlm.nih.gov/rest/pug/periodictable/JSON";
  try {
    console.log(`🔍 Consultando PubChem para lista de elementos...`);
    const response = await axios.get(url);

    const elements = response.data.Table.Row.map((row) => {
      let yearDiscovered = row.Cell[16];
      if (isNaN(yearDiscovered)) {
        yearDiscovered = null;
      }

      return {
        atomicNumber: row.Cell[0],
        symbol: row.Cell[1],
        name: row.Cell[2],
        atomicMass: row.Cell[3],
        cpkHexColor: row.Cell[4],
        electronConfiguration: row.Cell[5],
        electronegativity: row.Cell[6],
        atomicRadius: row.Cell[7],
        ionizationEnergy: row.Cell[8],
        electronAffinity: row.Cell[9],
        oxidationStates: row.Cell[10],
        standardState: row.Cell[11],
        meltingPoint: row.Cell[12],
        boilingPoint: row.Cell[13],
        density: row.Cell[14],
        groupBlock: row.Cell[15],
        yearDiscovered,
      };
    });

    console.log(`✅ Lista de elementos obtida: ${elements.length} encontrados.`);
    return elements;
  } catch (error) {
    console.error(`❌ Erro ao obter lista de elementos: ${error.message}`);
    throw error;
  }
};

// **Sincronizar os elementos no pack correto**
const seedElements = async () => {
  try {
    console.log("🔄 Obtendo a lista de elementos do PubChem...");
    const elementList = await fetchElementList();

    // 🔹 Criar ou buscar um único pack global para os elementos
    let globalPack = await PackModel.findOne({ name: "Pack-Elementos" });
    if (!globalPack) {
      globalPack = await PackModel.create({
        name: "Pack-Elementos",
        description: "Pacote global contendo todos os elementos da tabela periódica",
      });
      console.log(`📦 Criado Pack Global: ${globalPack._id}`);
    }

    for (const element of elementList) {
      console.log(`🔄 Processando: ${element.name}`);

      try {
        // **Verificar se os dados do elemento são válidos**
        if (!element.atomicNumber || !element.symbol) {
          console.warn(`⚠️ Elemento inválido ignorado: ${element.name}`);
          continue;
        }

        // **Atualizar ou inserir o elemento no pack correto**
        await dbService.updateOne(
          ChemistryElement,
          { atomicNumber: element.atomicNumber, pack: globalPack._id }, // 🔹 Garante que pertence ao pack correto
          {
            $set: { ...element, pack: globalPack._id, updatedAt: new Date() },
          },
          { upsert: true }
        );

        console.log(`✅ Elemento "${element.name}" sincronizado com pack: ${globalPack._id}`);
      } catch (error) {
        console.error(`❌ Erro ao processar ${element.name}: ${error.message}`);
      }
    }

    // **Remover elementos que não pertencem mais ao Pack-Elementos**
    const validAtomicNumbers = elementList.map((e) => e.atomicNumber);
    await dbService.deleteMany(ChemistryElement, {
      atomicNumber: { $nin: validAtomicNumbers },
      pack: globalPack._id, // 🔹 Garante que remove apenas do Pack-Elementos
    });

    console.log("🗑️ Elementos extras removidos.");
    console.log("✅ Sincronização de elementos concluída.");
  } catch (error) {
    console.error(`❌ Erro no processo de sincronização: ${error.message}`);
  }
};

module.exports = seedElements;
