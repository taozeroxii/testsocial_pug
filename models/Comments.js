const { Schema, model } = require('mongoose')

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Users'
  },
  body: {
    type: String,
    required: true,
    maxlength: 5000
  }
})
module.exports = model('Posts', schema)
