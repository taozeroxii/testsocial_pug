const Joi = require('Joi')
const validateSchema = require('../utils/validateSchema')

const schema = Joi.object({
  displayName: Joi.string()
    .max(50)
    .allow('')
    .messages({
      'string.max': 'กรุณาระบุที่สั้นกว่า 50 ตัวอักษร'
    }),
  gender: Joi.string()
    .valid('male', 'female', 'none')
    .required()
    .messages({
      'any.valid': 'กรุณาระบุเพศให้ถูกต้อง'
    }),
  birthDate: Joi.string()
    .optional()
})

module.exports = validateSchema(schema)
