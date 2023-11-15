const express = require('express');
const router = express.Router();
const db = require('./dbConfig'); 

//Base api/


router.get('/orders', async (req, res) => {
  try {
    const data = await db.any('SELECT * FROM get_orders()');
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Hubo un error al obtener las órdenes.' });
  }
});

router.get('/products/:order_id', async (req, res) => {
  const order_id = req.params.order_id;

  try {
    const data = await db.any('SELECT * FROM get_products_by_order($1)', [order_id]);
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/locations', async (req, res) => {
  try {
    
    const { ubicaciones, client_long, client_lat } = req.body;
    

    // Ejecutar la función en PostgreSQL con los nuevos parámetros
    const result = await db.any(
      'SELECT * FROM insertar_ubicaciones($1::jsonb[], $2::float, $3::float)',
      [ubicaciones, client_long, client_lat]
    );

    console.log("RESULT ",JSON.stringify(result));
    res.json((JSON.stringify(result)));
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});






module.exports = router;
