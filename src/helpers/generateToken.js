const jwt = require('jsonwebtoken')

const generateToken = () => {
  const token = jwt.sign({
    data: 'Aqui van los datos'
  }, process.env.SECRET, { expiresIn: '1d' })

  return token
}

module.exports = generateToken
