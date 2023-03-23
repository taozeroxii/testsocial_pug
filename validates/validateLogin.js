const Joi = require('Joi')
const validateSchema = require('../utils/validateSchema')

const schema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'กรุณาระบุที่อยู่อีเมล',
      'string.email': 'กรุณาระบุที่อยู่อีเมลให้ถูกต้อง'
    }),
  password: Joi.string()
    .required()
    .messages({
      'string.empty': 'กรุณาระบุรหัสผ่าน'
    })
})

module.exports = validateSchema(schema)
