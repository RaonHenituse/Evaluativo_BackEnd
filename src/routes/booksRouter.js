const express = require('express')
const booksControllers = require('../controllers/booksControllers')
const validator = require('express-joi-validation').createValidator({})

const { bodySchema, querySchema, paramsSchema } = require('../validations/booksValidators.js')

const router = (Books) => {
  const booksRouter = express.Router()

  const { getAllBooks, getBooksById, postBooks, putBooksById, deleteById } = booksControllers(Books)

  booksRouter
    .route('/books')
    .get(validator.query(querySchema), getAllBooks)
    .post(validator.body(bodySchema), postBooks)

  booksRouter
    .route('/books/:id')
    .get(validator.params(paramsSchema), getBooksById)
    .put(validator.body(bodySchema), validator.params(paramsSchema), putBooksById)
    .delete(deleteById)

  return booksRouter
}

module.exports = router
