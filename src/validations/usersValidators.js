const joi = require('joi')

const bodySchema = joi.object({
  userName: joi.string().alphanum().trim().min(6).max(16).required(),
  password: joi.string().alphanum().trim().required(),
  email: joi.string().email().required()
})

const querySchema = joi.object().keys({
  userName: joi.string().min(6).max(16),
  email: joi.string().email()
}
)

const paramsSchema = joi.object({
  id: joi.string().alphanum().min(24).max(24).required()
})

module.exports = { bodySchema, querySchema, paramsSchema }
