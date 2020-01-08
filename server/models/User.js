const { Schema, model, Types } = require('mongoose')

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  joinedDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  favourites: [
    {
      type: Types.ObjectId,
      ref: 'Recipe'
    }
  ]
})

module.exports = model('User', userSchema)
