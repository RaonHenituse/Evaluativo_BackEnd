const customError = () => {
  const error = new Error()
  error.code = '404'
  error.name = 'ValidationError'
  return error
}
module.exports = customError
