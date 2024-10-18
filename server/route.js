import express from 'express'
import { createUser, findUser, changePassword } from './models/user.js'
import cookieParser from 'cookie-parser'
import { createToken, decodeToken } from './utils/createToken.js'

export const router = express.Router()

const maxAge = 3 * 24 * 60 * 60 * 1000

router.use(express.json())
router.use(cookieParser())

const chats = [
  { id: 1, name: 'Emilio' },
  { id: 2, name: 'Papa' },
  { id: 3, name: 'Mama' },
  { id: 4, name: 'Evelena' }
];

router.get('/chat', (req, res) => {
  try {
    const token = decodeToken(req.cookies.jwt)
  
    console.log(token)
  
    res.json(chats)    
  } catch (error) {
    console.log(error)
  }
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

router.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body

    const user = await findUser({email, password})

    if (!user) throw Error('Didn\' find a user')
  
    const token = createToken(user.id)

    res.cookie('jwt', token, {httpOnly: true, maxAge})
    res.json({id: user.id})    
  } catch (error) {
    console.log(error)
  }
})
