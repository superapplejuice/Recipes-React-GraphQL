module.exports = {
  recipesList: async (parent, args, { Recipe }) => {
    try {
      return await Recipe.find().sort({ createdDate: 'desc' })
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
  searchRecipe: async (parent, { searchTerm }, { Recipe }) => {
    if (searchTerm) {
      return await Recipe.find({ name: searchTerm }).sort({
        likes: 'desc',
        createdDate: 'desc'
      })
    }

    return await Recipe.find().sort({ likes: 'desc', createdDate: 'desc' })
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
