import express from 'express'
import { createUser, changePassword } from './models/user.js'
export const router = express.Router()

router.use(express.json())

router.get('/', (req, res) => {
  res.send('Hello World')
})

router.post('/signup', async (req, res) => {
  const {email, password} = req.body

  const user = await createUser({email, password})

  res.send(user)
})
