import type { User } from '../model/User'

export interface UserRepository {
  auth: (username: string, password: string) => Promise<number>

  sign_up: (user: User) => Promise<number>
}
