module.exports = {
  recipesList: async (parent, args, { Recipe }) => {
    try {
      return await Recipe.find()
    } catch (err) {
      throw err
    }
  },
  currentUser: async (parent, args, { currentUser, User }) => {
    if (!currentUser) {
      return null
    }

    const user = await User.findOne({ email: currentUser.email }).populate(
      'favourites'
    )

    if (!user) {
      console.error('User not found!')
    }

    return user
  }
}
