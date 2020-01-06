exports.resolvers = {
  Query: {
    recipesList: () => {}
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
