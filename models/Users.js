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

const preSetPassword = async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, +process.env.SALT_ROUND)
  }
  next()
}

schema.pre('save', preSetPassword)
schema.pre('updateOne', preSetPassword)

schema.methods.comparePassword = async function (password) {
  const result = await bcrypt.compare(password, this.password)
  if (!result) {
    throw new Error('ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง')
  }
  return result
}

module.exports = model('Users', schema)
