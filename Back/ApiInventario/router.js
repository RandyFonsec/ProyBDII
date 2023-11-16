//Manages the routes for the calls to stored procedures

const express = require('express');
const router = express.Router();
const { sql, poolConnect } = require("./dbConfig");



//To get the products from every ware house
router.get("/api/products", async (req, res) => {
  try {
    const pool = await poolConnect;
    const request = new sql.Request(pool);

    const result = await request.query("EXEC GetAllProducts");

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener los productos.");
  }
});


//To get every whs
router.get("/api/whs", async (req, res) => {
  try {
    const pool = await poolConnect;
    const request = new sql.Request(pool);

    const result = await request.query("EXEC GetWarehouses");

    if(result.codigo === 200)
      res.status(200).json(result.recordset);
    else
      res.status(500).send("Error al obtener los productos.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener los productos.");
  }
});



//Get info of the products on an id_list
router.get("/api/getProductInfo", async (req, res) => {
  const {productIds} = req.body;

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



//Get info of a product by id
router.get("/getProductInfo/:product_id", async (req, res) => {
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


//Get summary of stock in each warehouse given a list of unique codes
router.post("/api/getProductStockSummary", async (req, res) => {
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



//Deduce stock from an order
router.post('/api/deduceStock', async (req, res) => {
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



//---------- CRUD Categories
router.post('/api/insertProductCategory', async (req, res) => {
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


router.get('/api/getProductCategories', async (req, res) => {
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


router.post('/api/updateProductCategory', async (req, res) => {
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





router.post('/api/deleteProductCategory', async (req, res) => {
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




//---------- CRUD Products
router.post('/api/insertProduct', async (req, res) => {
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

    
    if(result.recordset[0].Codigo === 200)
       res.status(200).json({insertedId : newProductID});
    else if(result.recordset[0].Codigo === -2)
       res.status(203).json({msg : "Ya hay un producto con este código unico"});
    else
      res.status(500).send("Algo salió mal");

  } catch (error) {
    console.error(error);
    res.status(500).json({error: error.message});
  }
});


router.get('/api/getProducts', async (req, res) => {
  try {
    const pool = await poolConnect;
    const request = new sql.Request(pool);
    const {wh_id} = req.query;

    const result = await request
      .input('wh_id', sql.Int, wh_id)
      .execute('GetProductsMaster');

    const products = result.recordset;
    if(!result.codigo)
      res.status(200).json(result.recordset);
    else
      res.status(500).send("Error al obtener los productos.");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});



// Endpoint para la operación de actualización de productos
router.post('/api/updateProduct', async (req, res) => {
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


router.post('/api/deleteProduct', async (req, res) => {
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


module.exports = router;