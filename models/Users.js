const { Schema, model } = require('mongoose')
const { DateTime } = require('luxon')
const bcrypt = require('bcrypt')
const { faker } = require('@faker-js/faker')
const schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    username: {
      type: String,
      required: true,
      unique: true,
      default: () => `User_${faker.random.alphaNumeric(20)}`
    },
    password: {
      type: String,
      required: true
    },
    displayName: String,
    birthDate: {
      type: Date,
      get (date) {
        const d = DateTime.fromJSDate(date)
        return d.toISODate()
      }
    },
    avatarUrl: {
      type: String,
      get (url) {
        if (!url) {
          return 'https://via.placeholder.com/150'
        }
      }
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'none'],
      default: 'none'
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
