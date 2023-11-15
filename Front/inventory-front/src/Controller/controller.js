// Controlador.js
//Controlador redirige las llamadas al dao respectivo

const dao = require('./dao');

const controller = {
  getProducts: async (wh_id) => {
    const response = await dao.getProducts(wh_id);
    return response;
  },
  getProdCategories: async () => {
    const response = await dao.getProdCategories();
    return response;
  },

  insertProduct: async (product) => {
    const response = await dao.insertProduct(product);
    return response;
  },

  updateProduct: async (product) => {
    const response = await dao.updateProduct(product);
    return response;
  },
};

module.exports = controller;


