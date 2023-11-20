import config from '../config.ts'

import pg from 'pg'

const { postgresqlConn } = config

const PostgreSQLConnection = new pg.Pool({
  connectionString: postgresqlConn,
})

export default PostgreSQLConnection
