const axios = require("axios");

const BASE_URL = "http://localhost:2314/api/v1"; // Substitua pela URL do seu backend
const TEST_ELEMENT = {
  atomicNumber: 999,
  symbol: "Xt",
  name: "Xenotium",
  atomicMass: "999.99",
  pack: "65a10fce23a3a2b79dbf6c01", // ID de um pack válido no seu banco
};

let createdElementId = null;
let createdMaterialId = null;

const createElement = async () => {
  const response = await axios.post(`${BASE_URL}/chemistry-element/create`, TEST_ELEMENT, {
    headers: { Authorization: `Bearer ${process.env.TEST_TOKEN}` },
  });

  expect(response.status).toBe(200);
  createdElementId = response.data.data.id;
  console.log(`✅ Elemento criado: ${createdElementId}`);
};

const checkMaterialExists = async () => {
  const response = await axios.post(`${BASE_URL}/material/list`, {
    query: { symbol: TEST_ELEMENT.symbol },
  });

  const material = response.data.data.find((m) => m.symbol === TEST_ELEMENT.symbol);
  expect(material).toBeDefined();
  createdMaterialId = material.id;
  console.log(`✅ Material correspondente encontrado: ${createdMaterialId}`);
};

const updateElement = async () => {
  const response = await axios.put(`${BASE_URL}/chemistry-element/update/${createdElementId}`, {
    name: "Xenotium Updated",
  }, {
    headers: { Authorization: `Bearer ${process.env.TEST_TOKEN}` },
  });

  expect(response.status).toBe(200);
  console.log(`✅ Elemento atualizado.`);
};

const softDeleteElement = async () => {
  const response = await axios.put(`${BASE_URL}/chemistry-element/soft-delete/${createdElementId}`, {}, {
    headers: { Authorization: `Bearer ${process.env.TEST_TOKEN}` },
  });

  expect(response.status).toBe(200);
  console.log(`✅ Elemento desativado.`);
};

const checkMaterialRemoved = async () => {
  const response = await axios.post(`${BASE_URL}/material/list`, {
    query: { symbol: TEST_ELEMENT.symbol },
  });

  expect(response.data.data.length).toBe(0);
  console.log(`✅ Material correspondente removido.`);
};

const deleteElement = async () => {
  const response = await axios.delete(`${BASE_URL}/chemistry-element/delete/${createdElementId}`, {
    headers: { Authorization: `Bearer ${process.env.TEST_TOKEN}` },
  });

  expect(response.status).toBe(200);
  console.log(`✅ Elemento excluído.`);
};

const checkMaterialDeleted = async () => {
  const response = await axios.post(`${BASE_URL}/material/list`, {
    query: { symbol: TEST_ELEMENT.symbol },
  });

  expect(response.data.data.length).toBe(0);
  console.log(`✅ Material correspondente não existe mais.`);
};

const runTests = async () => {
  await createElement();
  await checkMaterialExists();
  await updateElement();
  await softDeleteElement();
  await checkMaterialRemoved();
  await deleteElement();
  await checkMaterialDeleted();
  console.log("🚀 Todos os testes passaram!");
};

runTests().catch(console.error);
