module.exports = {
  recipesList: async (parent, args, { Recipe }) => {
    try {
      return await Recipe.find()
    } catch (error) {
      throw error
    }
  }
}
