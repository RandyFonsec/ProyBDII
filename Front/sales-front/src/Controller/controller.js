// Controlador.js
//Controlador redirige las llamadas al dao respectivo

const dao = require('./dao');

const controller = {
  getOrders: async () => {
    const response = await dao.getOrders();
    return response;
  },
  getProducts: async (id_order) => {
    const response = await dao.getProducts(id_order);
    return response;
  },
  getProductStockSummary: async (productUniqueCodes) => {
    const response = await dao.getProductStockSummary(productUniqueCodes);
    return response;
  },
};

module.exports = controller;
