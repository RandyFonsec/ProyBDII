import 'dotenv/config'

export default {
  port: process.env.PORT ?? 5000,
  postgresqlConn: process.env.POSTGRESQL_CONNECTION,
}
