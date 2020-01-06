exports.resolvers = {
  Query: {
    recipesList: async (root, args, { Recipe }) => {
      try {
        return await Recipe.find()
      } catch (error) {
        throw error
      }
    }
  },
  Mutation: {
    createRecipe: async (root, { recipeInput }, { Recipe }) => {
      const {
        name,
        category,
        description,
        instructions,
        username
      } = recipeInput

      const newRecipe = new Recipe({
        name,
        category,
        description,
        instructions,
        username
      })

      try {
        return await newRecipe.save()
      } catch (error) {
        throw error
      }
    }
  }
}
