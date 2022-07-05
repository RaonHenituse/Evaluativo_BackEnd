const httpStatus = require('../helpers/httpStatus')
const customError = require('../helpers/customError')

const booksControllers = (Books) => {
  const getAllBooks = async (req, res, next) => {
    try {
      const { query } = req

      const response = await Books.find(query)
      return res.status(httpStatus.OK).json(response)
    } catch (err) {
      next(err)
    }
  }

  const postBooks = async (req, res, next) => {
    try {
      const { body } = req

      const books = await new Books(body)
      await books.save()

      return res.status(httpStatus.CREATED).json(books)
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  const putBooksById = async (req, res, next) => {
    try {
      const { params, body } = req

      const checkData = await Books.findOne({
        _id: params.id
      })

      if (checkData === null) {
        const error = customError()
        throw error
      }

      await Books.updateOne(
        {
          _id: params.id
        }, {
          $set: {
            title: body.title,
            author: body.author,
            publishDate: body.publishDate,
            sales: body.sales,
            originalCountry: body.originalCountry
          }
        })
      return res.status(httpStatus.CREATED).send('data successfully updated')
    } catch (err) {
      next(err)
    }
  }

  const getBooksById = async (req, res, next) => {
    try {
      const { params } = req

      const checkData = await Books.findOne({
        _id: params.id
      })

      if (checkData === null) {
        const error = customError()
        throw error
      }

      const response = await Books.findById(params.id)

      return res.status(httpStatus.OK).json(response)
    } catch (err) {
      next(err)
    }
  }

  const deleteById = async (req, res, next) => {
    try {
      const { params } = req

      const checkData = await Books.findOne({
        _id: params.id
      })

      if (checkData === null) {
        const error = customError()
        throw error
      }

      await Books.findByIdAndDelete(params.id)

      return res.status(httpStatus.OK).send('data deleted successfully')
    } catch (err) {
      next(err)
    }
  }

  return { getAllBooks, getBooksById, postBooks, putBooksById, deleteById }
}

module.exports = booksControllers
