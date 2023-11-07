const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');
const db = require('./dbConfig');



app.use(cors());
app.use(express.json());



const router = require('./router');
app.use('/api', router);




app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
