const { createToken } = require('../../utils')
const { jwtKey } = require('../../keys')

module.exports = {
  createRecipe: async (parent, { recipeInput }, { Recipe }) => {
    const { name, category, description, instructions, username } = recipeInput

    const newRecipe = new Recipe({
      name,
      category,
      description,
      instructions,
      username
    }).save()

    try {
      return newRecipe
    } catch (error) {
      throw error
    }
  },
  userRegister: async (parent, { registerInput }, { User }) => {
    const { username, email, password } = registerInput

    const existingUser = await User.findOne({ username })
    const existingEmail = await User.findOne({ email })

    if (existingUser) {
      throw new Error('User already exists')
    } else if (existingEmail) {
      throw new Error('Email already taken')
    }

    try {
      const newUser = new User({
        username,
        email,
        password
      }).save()

      return { token: createToken(newUser, jwtKey, '1hr') }
    } catch (error) {
      throw error
    }
  }
}
