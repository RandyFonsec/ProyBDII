const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');

// Habilita CORS para todas las solicitudes entrantes
app.use(cors());


// Importa la configuración de la base de datos
const db = require('./dbConfig');

// Middleware para analizar JSON
app.use(express.json());

app.get('/orders', async (req, res) => {
    try {
        // Ejecuta la función get_orders()}
        const data = await db.any('SELECT * FROM get_orders()');
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Hubo un error al obtener las órdenes.' });
    }
});

app.get('/products/:order_id', async (req, res) => {
    const order_id = req.params.order_id;

    try {
        // Ejecuta la función get_products_by_order(1)
        const data = await db.any('SELECT * FROM get_products_by_order($1)', [order_id]);
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
});
