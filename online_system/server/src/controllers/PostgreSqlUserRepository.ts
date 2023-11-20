import type { User } from '../model/User'
import type { UserRepository } from '../repository/UserRepository'
import type PostgreSQLConnection from '../shared/PostgreSQLConnection'

export class PostgreSqlUserRepository implements UserRepository {
  private readonly connection: typeof PostgreSQLConnection

  constructor(connection: typeof PostgreSQLConnection) {
    this.connection = connection
  }

  async auth(username: string, password: string): Promise<number> {
    const query = 'SELECT * FROM auth($1, $2)'

    return await this.connection
      .query(query, [username, password])
      .then((res) => res.rows[0].auth)
      .catch((error) => {
        console.error('Error executing query', error)
      })
  }

  async sign_up(user: User): Promise<number> {
    const query = 'SELECT * FROM sign_up($1, $2, $3, $4, $5, $6)'

    return await this.connection
      .query(query, [
        user.fullname,
        user.nickname,
        user.password,
        user.phone,
        user.email,
        user.userType,
      ])
      .then((res) => res.rows[0].sign_up)
      .catch((error) => {
        console.error('Error executing query', error)
      })
  }
}
