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
    .min(8)
    .required()
    .messages({
      'string.empty': 'กรุณาระบุรหัสผ่าน',
      'string.min': 'กรุณาระบุรหัสผ่านอย่างน้อย 8 ตัวอักษร'
    }),
  password2: Joi.any()
    .valid(Joi.ref('password'))
    .required()
    .messages({ 'string.empty': 'กรุณาระบุรหัสผ่าน', 'any.only': 'กรุณาระบุรหัสผ่านให้ตรงกัน' })
})

module.exports = validateSchema(schema)
