const { Schema, model } = require('mongoose')

const recipeSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  instructions: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  username: {
    type: String
  }
})

recipeSchema.index({ '$**': 'text' })

module.exports = model('Recipe', recipeSchema)
