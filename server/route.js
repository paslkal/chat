import express from 'express'
import { createUser, changePassword } from './models/user.js'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

export const router = express.Router()

const maxAge = 3 * 24 * 60 * 60 * 1000

router.use(express.json())
router.use(cookieParser())

router.get('/', (req, res) => {
  res.send('Hello World')
})

router.post('/signup', async (req, res) => {
  try {
    const {email, password} = req.body

    const user = await createUser({email, password})
  
    const token = createToken(user.id)

    res.cookie('jwt', token, {httpOnly: true, maxAge})
    res.json({id: user.id})    
  } catch (error) {
    console.log(error)
  }
})

const createToken = (id) => {
  return jwt.sign({id}, 'paslkal secret', {
    expiresIn: maxAge
  })
}