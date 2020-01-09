const { sign } = require('jsonwebtoken')

exports.createToken = (user, jwtKey, expiresIn) => {
  const { username, email } = user

  return sign({ username, email }, jwtKey, { expiresIn })
}
