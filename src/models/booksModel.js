const mongoose = require('mongoose')

const { Schema } = mongoose

const booksModel = new Schema(
  {
    title: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    publishDate: { type: Date },
    sales: { type: Number },
    originalCountry: { type: String }
  }
)

module.exports = mongoose.model('Books', booksModel)
