import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import config from './config.ts'

import { userRoutes } from './routes/user-route.ts'

const app = express()

const { port } = config

// middlewares
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())

app.use('/user', userRoutes)
// app.use("/enrollment", enrollmentRouter);
// app.use("/subjects", subjectRouter);

app.get('/', (_, res) => {
  res.send('hello')
})

app.listen(port, () => {
  console.log(`[APP] - Starting application on port ${port}`)
})
