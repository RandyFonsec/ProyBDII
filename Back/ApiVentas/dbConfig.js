const pgp = require('pg-promise')();

const dbConfig = {
    connectionString: 'postgres://user_sales:1234@localhost:5432/sales',
};

const db = pgp(dbConfig);

module.exports = db;
