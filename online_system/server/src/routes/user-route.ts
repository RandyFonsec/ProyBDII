import express from 'express'
import { PostgreSqlUserRepository } from '../controllers/PostgreSqlUserRepository'
import PostgreSQLConnection from '../shared/PostgreSQLConnection'
import { User } from '../model/User'

const router = express.Router()

const userRepository = new PostgreSqlUserRepository(PostgreSQLConnection)

router.post('/auth', async (req, res) => {
  const { username, password } = req.body

  const data = await userRepository.auth(username, password)

  const status = data > 0 ? 200 : Math.abs(data)

  const id = data > 0 ? data : null

  res.status(200).send({ status, id })
})

router.post('/sign_up', async (req, res) => {
  const { nickname, password, fullname, phone, email, userType } = req.body

  const user = new User(nickname, password, fullname, phone, email, userType)

  const status = await userRepository.sign_up(user)

  res.status(status).send()
})

export { router as userRoutes }
