module.exports = {
  recipesList: async (parent, args, { Recipe }) => {
    try {
      return await Recipe.find()
    } catch (err) {
      throw err
    }
  },
  getRecipe: async (parent, { _id }, { Recipe }) => {
    const recipe = await Recipe.findOne({ _id })

    if (!recipe) {
      throw new Error('Recipe not found!')
    }

    return recipe
  },
  currentUser: async (parent, args, { currentUser, User }) => {
    if (!currentUser) {
      return null
    }

    const user = await User.findOne({ email: currentUser.email }).populate(
      'favourites'
    )

    return user
  }
}
