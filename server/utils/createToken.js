import jwt from 'jsonwebtoken'

const secret = 'paslkal secret'

export function createToken (id) {
  return jwt.sign({id}, secret, {
    expiresIn: maxAge
  })
}

export function decodeToken(token) {
  return jwt.verify(token, secret, (err, decoded) => {
    if (err) throw err

    return decoded
  })
}