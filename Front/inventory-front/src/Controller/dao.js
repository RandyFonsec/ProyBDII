//Se encarga de llamar a la api
// API VENTAS EN ESTE PUERTO 
const BASE_INV = "http://localhost:3000/api";
const BASE_SALES = "http://localhost:3000/api";

const daoUsers = {


  getProducts: async (wh_id) => {
    //API BASE + ENDPOINT
    const url = BASE_INV+'/getProducts?wh_id='+wh_id;
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

  getProdCategories: async () => {
    //API BASE + ENDPOINT
    const url = BASE_INV+`/getProductCategories`;
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

  insertProduct: async (productData) => {
    const url = BASE_INV + '/insertProduct';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('La solicitud no fue exitosa');
      }

      return response.json();
    } catch (error) {
      console.error('Error en la función insertProduct:', error);
      throw error;
    }
  },

  updateProduct: async (productData) => {
    const url = BASE_INV + '/updateProduct';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('La solicitud no fue exitosa');
      }

      return response.json();
    } catch (error) {
      console.error('Error en la función insertProduct:', error);
      throw error;
    }
  },
};

module.exports = daoUsers;
