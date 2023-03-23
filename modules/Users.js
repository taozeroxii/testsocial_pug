const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')
const schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

const presetPassword = async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, +process.env.SALT_ROUND)
  }
  next()
}

schema.pre('save', presetPassword)
schema.pre('updateOne', presetPassword)

schema.methods.comparePassword = async function (password) {
  const result = await bcrypt(password, this.password)
  if (!result) {
    throw new Error('ชื่อผู้ใช้งานไม่ถูกต้อง')
  }
  return result
}

module.exports = model('Users', schema)
