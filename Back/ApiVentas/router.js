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

module.exports = router;
