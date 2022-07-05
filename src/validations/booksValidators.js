const joi = require('joi')

const bodySchema = joi.object({
  title: joi.string().required(),
  author: joi.string().alphanum().required(),
  publishDate: joi.date(),
  sales: joi.number(),
  originalCountry: joi.string().alphanum()
})

const querySchema = joi.object().keys({
  title: joi.string(),
  author: joi.string()
}
)

const paramsSchema = joi.object({
  id: joi.string().alphanum().min(24).max(24).required()
})

module.exports = { bodySchema, querySchema, paramsSchema }
