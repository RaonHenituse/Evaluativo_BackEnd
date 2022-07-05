const httpStatus = require('../helpers/httpStatus')

const ERROR_HANDLERS = {
  MongoServerError: (res, err) =>
    res.status(httpStatus.FORBIDDEN).send({ error: err.name, cause: 'Dato ya existente en la base de datos' }),
  ValidationError: (res, err) =>
    res.status(httpStatus.NOT_FOUND).send({ error: err.name, cause: 'No se encontro el contenido solicitado' }),
  CastError: (res, err) =>
    res.status(httpStatus.BAD_REQUEST).send({ error: err.name, cause: 'El id no tiene un formato valido' }),
  TypeError: (res, err) =>
    res.status(httpStatus.FORBIDDEN).send({ error: err.name, cause: 'Algo esta mal escrito' }),
  defaultError: (res, err) =>
    res.status(httpStatus.NOT_FOUND).send({ error: err.name, cause: err.message })
}

const errorHandler = (err, req, res, next) => {
  const handler = ERROR_HANDLERS[err.name] || ERROR_HANDLERS.defaultError
  handler(res, err)
}

module.exports = errorHandler
