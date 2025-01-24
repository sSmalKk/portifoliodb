const axios = require('axios');
const dbService = require('../utils/dbService');
const Modelos_chemistry_element = require('../model/elements');

// Função para buscar a lista de elementos do PubChem
const fetchElementList = async () => {
  const url = 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/periodictable/JSON';
  try {
    console.log(`Consultando PubChem para lista de elementos: ${url}`);
    const response = await axios.get(url);

    const elements = response.data.Table.Row.map((row) => {
      let yearDiscovered = row.Cell[16];
      if (isNaN(yearDiscovered)) {
        yearDiscovered = null; // Define valores não numéricos como nulos
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
        yearDiscovered, // Adicionando o valor tratado
      };
    });

    console.log(`Lista de elementos obtida: ${elements.length} encontrados.`);
    return elements;
  } catch (error) {
    console.error(`Erro ao obter lista de elementos: ${error.message}`);
    throw error;
  }
};


// Função principal para sincronizar os elementos
const seedElements = async () => {
  try {
    console.log('Obtendo a lista de elementos do PubChem...');
    const elementList = await fetchElementList();

    // Iterar pela lista de elementos
    for (const element of elementList) {
      console.log(`Processando: ${element.name}`);
      try {
        // Garantir que o número atômico seja usado como identificador único
        await dbService.updateOne(
          Modelos_chemistry_element,
          { _id: element.atomicNumber }, // Busca pelo atomicNumber
          { ...element, updatedAt: new Date() }, // Atualiza ou insere novos dados
          { upsert: true } // Cria se não existir
        );
        console.log(`Dados de ${element.name} sincronizados com sucesso.`);
      } catch (error) {
        console.error(`Erro ao processar ${element.name}: ${error.message}`);
      }
    }

    // Remover elementos extras no banco que não estão na lista
    const atomicNumbersFromPubChem = elementList.map((e) => e.atomicNumber);
    await dbService.deleteMany(Modelos_chemistry_element, {
      _id: { $nin: atomicNumbersFromPubChem }, // Exclui itens cujo atomicNumber não está na lista
    });
    console.log('Elementos extras removidos.');

    console.log('Sincronização concluída com sucesso.');
  } catch (error) {
    console.error(`Erro no processo de sincronização: ${error.message}`);
  }
};

module.exports = seedElements;