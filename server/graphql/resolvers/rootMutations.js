const { hash, compare } = require('bcrypt')

const createToken = require('../../utils/createToken')
const { jwtKey } = require('../../keys')

module.exports = {
  createRecipe: async (parent, { recipeInput }, { Recipe, User }) => {
    const { name, category, description, instructions, username } = recipeInput
    if (!username) {
      throw new Error('You must be logged in to do that!')
    }

    const existingUser = await User.findOne({ username })
    if (!existingUser) {
      throw new Error(`User ${username} does not exist!`)
    }

    const newRecipe = new Recipe({
      name,
      category,
      description,
      instructions,
      username
    }).save()

    try {
      return newRecipe
    } catch (err) {
      throw err
    }
  },
  deleteRecipe: async (parent, { _id }, { Recipe }) => {
    if (!_id) {
      throw new Error('Recipe not found!')
    }

    try {
      return await Recipe.findOneAndDelete({ _id })
    } catch (err) {
      throw err
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

    const hashPassword = await hash(password, 15)

    try {
      const newUser = await new User({
        username,
        email,
        password: hashPassword
      }).save()

      return { token: createToken(newUser, jwtKey, '1hr') }
    } catch (err) {
      throw err
    }
  },
  userLogin: async (parent, { loginInput }, { User }) => {
    const { email, password } = loginInput

    const user = await User.findOne({ email })
    if (!user) {
      throw new Error('Email does not exist')
    }

    const passCompare = await compare(password, user.password)
    if (!passCompare) {
      throw new Error('Password is incorrect!')
    }

    try {
      return { token: createToken(user, jwtKey, '1hr') }
    } catch (err) {
      throw err
    }
  }
}
