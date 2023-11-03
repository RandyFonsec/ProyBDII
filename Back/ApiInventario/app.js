const express = require("express");
const cors = require("cors");
const { sql, poolConnect } = require("./dbConfig");

const app = express();

app.use(cors());

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
  // Obtén la lista de productIds desde el cuerpo de la solicitud
  const productIds = [9];

  try {
    const pool = await poolConnect;
    const request = new sql.Request(pool);

    // Ejecuta el procedimiento almacenado y pasa la lista de productIds
    const result = await request
      .input("ProductIDs", sql.NVarChar, productIds.join(",")) // Suponiendo que la lista se envía como un arreglo
      .execute("GetProductsInfo"); // Nombre del procedimiento almacenado

    const products = result.recordset;
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener información de productos.");
  }
});

app.get("/getProductInfo/:product_id", async (req, res) => {
  // Obtén el product_id de los parámetros de la URL
  const productId = req.params.product_id;

  try {
    const pool = await poolConnect;
    const request = new sql.Request(pool);

    // Ejecuta el procedimiento almacenado y pasa el productId
    const result = await request
      .input("ProductID", sql.Int, productId)
      .execute("SearchStockInAllRegions"); // Nombre del procedimiento almacenado

    const stockResults = result.recordset;
    res.json(stockResults);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener información de stock.");
  }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
