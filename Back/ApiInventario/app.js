const express = require("express");
const cors = require("cors");
const { sql, poolConnect } = require("./dbConfig");
const bodyParser = require("body-parser");


const app = express();

app.use(cors());
app.use(bodyParser.json());




app.get("/api/products", async (req, res) => {
  try {
    const pool = await poolConnect;
    const request = new sql.Request(pool);

    const result = await request.query("EXEC GetAllProducts");

    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener los productos.");
  }
});


app.get("/api/whs", async (req, res) => {
  try {
    const pool = await poolConnect;
    const request = new sql.Request(pool);

    const result = await request.query("EXEC GetWarehouses");

    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener los productos.");
  }
});




app.get("/api/getProductInfo", async (req, res) => {
  const productIds = [9];

  try {
    const pool = await poolConnect;
    const request = new sql.Request(pool);

    const result = await request
      .input("ProductIDs", sql.NVarChar, productIds.join(",")) 
      .execute("GetProductsInfo");

    const products = result.recordset;
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener información de productos.");
  }
});

app.get("/getProductInfo/:product_id", async (req, res) => {
  const productId = req.params.product_id;

  try {
    const pool = await poolConnect;
    const request = new sql.Request(pool);

    const result = await request
      .input("ProductID", sql.Int, productId)
      .execute("SearchStockInAllRegions");

    const stockResults = result.recordset;
    res.json(stockResults);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener información de stock.");
  }
});

app.post("/api/getProductStockSummary", async (req, res) => {
  const unique_codes = req.body.unique_codes;
  try {
    const pool = await poolConnect;
    const request = new sql.Request(pool);

    const result = await request
      .input("productUniqueCodes", sql.NVarChar, unique_codes)
      .execute("GetProductStockSummary");

    const products = result.recordset;
    res.json(products);

  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener información de stock.");
  }
});


app.post('/api/deduceStock', async (req, res) => {
    try {
        const pool = await poolConnect;
        const request = new sql.Request(pool);
        const productsTable = new sql.Table();

        productsTable.columns.add('unique_code', sql.VarChar(50));
        productsTable.columns.add('quantity', sql.Int);

        const {products,priority} = req.body;


        products.forEach(product => {
            productsTable.rows.add(
                product.unique_code,
                product.quantity
            )
        });

        const result = await request
        .input('Products_In', productsTable)
        .input("Indices", sql.NVarChar, priority)
        .execute('ObtenerNombresInventario');


        const newproducts = result.recordset;
        
        res.json(newproducts);
    } catch (error) {
        console.error(error);

        res.status(500).json(error);
    }
});



//---------- CRUD CATS
app.post('/api/insertProductCategory', async (req, res) => {
  try {
    const pool = await poolConnect;
    const request = new sql.Request(pool);

    const { name } = req.body;

    const result = await request
      .input('Name', sql.VarChar(50), name)
      .execute('InsertProductCategory');

    const newProdCatID = result.recordset[0].prod_cat_id;

    if (newProdCatID > 0) {
      res.json({ success: true, prod_cat_id: newProdCatID });
    } else {
      res.json({ success: false, message: 'La categoría ya existe.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});


app.get('/api/getProductCategories', async (req, res) => {
  try {
    const pool = await poolConnect;
    const request = new sql.Request(pool);

    const result = await request.execute('GetProductCategories');

    const productCategories = result.recordset;
    res.json(productCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


app.post('/api/updateProductCategory', async (req, res) => {
  try {
    const pool = await poolConnect;
    const request = new sql.Request(pool);

    const { prod_cat_id, name } = req.body;

    const result = await request
      .input('prod_cat_id', sql.Int, prod_cat_id)
      .input('Name', sql.VarChar(50), name)
      .execute('UpdateProductCategory');

    const updateSuccess = result.recordset[0].success;

    if (updateSuccess === 1) {
      res.json({ success: true, message: 'Categoría actualizada con éxito.' });
    } else {
      res.json({ success: false, message: 'La categoría no existe o está marcada como eliminada.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});





app.post('/api/deleteProductCategory', async (req, res) => {
  try {
    const pool = await poolConnect;
    const request = new sql.Request(pool);

    const { prod_cat_id } = req.body;

    const result = await request
      .input('prod_cat_id', sql.Int, prod_cat_id)
      .execute('DeleteProductCategory');

    const deleteSuccess = result.recordset[0].success;

    if (deleteSuccess === 1) {
      res.json({ success: true, message: 'Eliminado lógico exitoso.' });
    } else {
      res.json({ success: false, message: 'La categoría no existe.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});


//---------- CRUD PRODS
app.post('/api/insertProduct', async (req, res) => {
  try {
    const pool = await poolConnect;
    const request = new sql.Request(pool);
    const { category_id, wh_id, unique_code, name, price, stock, available } = req.body;

    const result = await request
      .input('category_id', sql.Int, category_id)
      .input('wh_id', sql.Int, wh_id)
      .input('unique_code', sql.VarChar(20), unique_code)
      .input('name', sql.VarChar(100), name)
      .input('price', sql.Decimal(10, 2), price)
      .input('stock', sql.Int, stock)
      .input('available', sql.Bit, available)
      .execute('InsertProductMaster');

    const newProductID = result.recordset[0].product_id;

    if (newProductID > 0) {
      res.json({ success: true, product_id: newProductID });
    } else {
      res.json({ success: false, message: 'La categoría o el almacén no existen.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});


// Endpoint para la operación de lectura de productos disponibles
app.get('/api/getProducts', async (req, res) => {
  try {
    const pool = await poolConnect;
    const request = new sql.Request(pool);
    const {wh_id} = req.query;

    const result = await request
      .input('wh_id', sql.Int, wh_id)
      .execute('GetProductsMaster');

    const products = result.recordset;
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});



// Endpoint para la operación de actualización de productos
app.post('/api/updateProduct', async (req, res) => {
  try {
    const pool = await poolConnect;
    const request = new sql.Request(pool);

    const {
      product_id,
      category_id,
      wh_id,
      unique_code,
      name,
      price,
      stock,
      available
    } = req.body;

    const result = await request
      .input('product_id', sql.Int, product_id)
      .input('category_id', sql.Int, category_id)
      .input('wh_id', sql.Int, wh_id)
      .input('unique_code', sql.VarChar(20), unique_code)
      .input('name', sql.VarChar(100), name)
      .input('price', sql.Decimal(10, 2), price)
      .input('stock', sql.Int, stock)
      .input('available', sql.Bit, available)
      .execute('UpdateProductMaster');

    res.json(result.recordset);

  
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});


app.post('/api/deleteProduct', async (req, res) => {
  try {
    const pool = await poolConnect;
    const request = new sql.Request(pool);

    const { product_id } = req.body;

    const result = await request
      .input('product_id', sql.Int, product_id)
      .execute('DeleteProduct');

    const deleteSuccess = result.recordset[0].success;

    if (deleteSuccess === 1) {
      res.json({ success: true, message: 'Eliminado lógico exitoso.' });
    } else {
      res.json({ success: false, message: 'La categoría no existe.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});


