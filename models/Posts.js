const { Schema, model } = require('mongoose')

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Users'
  },
  modelId: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'onModel'
  },
  onModel: {
    type: String,
    require: true,
    enum: ['Posts']
  },
  body: {
    type: String,
    required: true,
    maxlength: 10000
  },
})
module.exports = model('Posts', schema)
