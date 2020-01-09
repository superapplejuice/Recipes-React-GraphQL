const { createToken } = require('../../utils')

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

    const user = await User.findOne({ username })
    if (user) {
      throw new Error('User already exists')
    }

    const newUser = await new User({
      username,
      email,
      password
    }).save()

    return { token: createToken(newUser, jwtKey, '1hr') }
  }
}
