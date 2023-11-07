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

app.get("/api/getProductStockSummary", async (req, res) => {
  const productUniqueCodes = req.query.productUniqueCodes;

  try {
    const pool = await poolConnect;
    const request = new sql.Request(pool);

    const result = await request
      .input("productUniqueCodes", sql.NVarChar, productUniqueCodes)
      .execute("GetProductStockSummary"); // Nombre del procedimiento almacenado

    const products = result.recordset;
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener información de stock.");
  }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
