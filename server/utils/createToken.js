const { sign } = require('jsonwebtoken')

const createToken = (user, jwtKey, expiresIn) => {
  const { username, email } = user

  return sign({ username, email }, jwtKey, { expiresIn })
}

module.exports = createToken
