const mongoose = require('mongoose')

const { Schema } = mongoose

const usersModel = new Schema(
  {
    userName: { type: String, required: true, unique: true, minLength: 6, maxLength: 16 },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true }
  }
)

module.exports = mongoose.model('Users', usersModel)
