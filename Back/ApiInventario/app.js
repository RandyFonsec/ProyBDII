const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");


const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const router = require('./router');
app.use('/', router);


app.listen(PORT, () => {
  console.log(`Api Inventario en puerto ${PORT}`);
});