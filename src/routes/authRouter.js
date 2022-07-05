const express = require('express')
const authController = require('../controllers/authController')
const validator = require('express-joi-validation').createValidator({})

const { bodySchema, querySchema, paramsSchema } = require('../validations/usersValidators.js')

const router = (Users) => {
  const authRouter = express.Router()

  const { logIn, register, getAllUsers, getUserById, putUserById, deleteUserById } = authController(Users)

  authRouter.route('/auth/login').post(validator.body(bodySchema), logIn)

  authRouter.route('/auth/register').post(validator.body(bodySchema), register)

  authRouter.route('/auth').get(validator.query(querySchema), getAllUsers)

  authRouter.route('/auth/:id')
    .get(validator.params(paramsSchema), getUserById)
    .put(validator.body(bodySchema), validator.params(paramsSchema), putUserById)
    .delete(deleteUserById)

  return authRouter
}

module.exports = router
