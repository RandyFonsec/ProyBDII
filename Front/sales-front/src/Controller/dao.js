//Se encarga de llamar a la api
// API VENTAS EN ESTE PUERTO 
const BASE = "http://localhost:3001/api";
const BASE_INV = "http://localhost:3000";

const daoUsers = {


  getOrders: async () => {
    //API BASE + ENDPOINT
    const url = BASE+`/orders`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('La solicitud no fue exitosa');
      }
      return response.json();
    } catch (error) {
      console.error('Error en la función getOrders:', error);
      throw error;
    }
  },


  getProducts: async (id_order) => {
    const url = BASE+`/products/${id_order}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('La solicitud no fue exitosa');
      }
      return response.json(); 
    } catch (error) {
      console.error('Error en la función getProducts:', error);
      throw error;
    }
  },

  getProductStockSummary: async (productUniqueCodes) => {
    const url = `${BASE_INV}/api/getProductStockSummary?productUniqueCodes=${productUniqueCodes}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('La solicitud no fue exitosa');
      }
      return response.json();
    } catch (error) {
      console.error('Error en la función getProductStockSummary:', error);
      throw error;
    }
  },

};

module.exports = daoUsers;
