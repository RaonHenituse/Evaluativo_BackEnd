const bcrypt = require('bcrypt')
const generateToken = require('../helpers/generateToken')
const httpStatus = require('../helpers/httpStatus')
const customError = require('../helpers/customError')

const authController = (Users) => {
  const logIn = async (req, res, next) => {
    try {
      const { body } = req

      const user = await Users.findOne({
        userName: body.userName
      })

      if (user === null || !(await bcrypt.compare(body.password, user.password))) {
        return res.status(httpStatus.FORBIDDEN).send('Invalid credentials')
      }

      const token = generateToken()

      return res.status(httpStatus.OK).json({
        status: 'OK',
        token
      })
    } catch (err) {
      next(err)
    }
  }

  const register = async (req, res, next) => {
    try {
      const { body } = req

      const encryptedPassword = await bcrypt.hash(body.password, 10)

      const encryptedData = {
        ...body,
        password: encryptedPassword
      }

      const users = await new Users(encryptedData)
      await users.save()

      return res.status(httpStatus.CREATED).json(users)
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  const getAllUsers = async (req, res, next) => {
    try {
      const { query } = req

      const response = await Users.find(query)
      return res.status(httpStatus.OK).json(response)
    } catch (err) {
      next(err)
    }
  }

  const putUserById = async (req, res, next) => {
    try {
      const { params, body } = req

      const checkData = await Users.findOne({
        _id: params.id
      })

      if (checkData === null) {
        const error = customError()
        throw error
      }

      const encryptedPassword = await bcrypt.hash(body.password, 10)

      await Users.updateOne(
        {
          _id: params.id
        }, {
          $set: {
            userName: body.userName,
            password: encryptedPassword,
            email: body.email
          }
        })
      return res.status(httpStatus.CREATED).send('data successfully updated')
    } catch (err) {
      next(err)
    }
  }

  const getUserById = async (req, res, next) => {
    try {
      const { params } = req

      const checkData = await Users.findOne({
        _id: params.id
      })

      if (checkData === null) {
        const error = customError()
        throw error
      }

      const response = await Users.findById(params.id)

      return res.status(httpStatus.OK).json(response)
    } catch (err) {
      next(err)
    }
  }

  const deleteUserById = async (req, res, next) => {
    try {
      const { params } = req

      const checkData = await Users.findOne({
        _id: params.id
      })

      if (checkData === null) {
        const error = customError()
        throw error
      }

      await Users.findByIdAndDelete(params.id)

      return res.status(httpStatus.OK).send('data deleted successfully')
    } catch (err) {
      next(err)
    }
  }

  return { logIn, register, getAllUsers, putUserById, getUserById, deleteUserById }
}

module.exports = authController
