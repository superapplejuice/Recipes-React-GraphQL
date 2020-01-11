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
    console.log(currentUser)

    const user = await User.findOne({ email: currentUser.email }).populate(
      'favourites'
    )

    if (!user) {
      console.log('User not found!')
    }

    return user
  }
}
