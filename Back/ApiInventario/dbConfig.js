const sql = require("mssql");

const config = {
  user:  'user_inv', // sql user
  password:  '1234', //sql user password
  server:  'localhost', // if it does not work try- localhost
  database:  'Inventory',
  options: {
    trustedconnection:  true,
    enableArithAbort:  true,
	trustServerCertificate: true,
	instancename:  ''
  },
  port : 1433
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();


module.exports = {
  sql,
  pool,
  poolConnect,
};
