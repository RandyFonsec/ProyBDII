// daoUsers.js

//Se encarga de llamar a la api
const BASE = "http://localhost:3000";

const daoUsers = {
  getOrders: async () => {
    // Construye la URL con los parámetros adecuados para la API en tu servidor
    const url = BASE+`/orders`;
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('La solicitud no fue exitosa');
      }
      return response.json(); // Parsea la respuesta JSON y la retorna
    } catch (error) {
      console.error('Error en la función getOrders:', error);
      throw error;
    }
  },
  getProducts: async (id_order) => {
    // Construye la URL con los parámetros adecuados para la API en tu servidor
    const url = BASE+`/products/${id_order}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('La solicitud no fue exitosa');
      }

      return response.json(); // Parsea la respuesta JSON y la retorna
    } catch (error) {
      console.error('Error en la función getProducts:', error);
      throw error;
    }
  },

};

module.exports = daoUsers;
