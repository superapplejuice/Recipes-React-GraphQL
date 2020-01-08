exports.resolvers = {
  Query: {
    recipesList: async (parent, args, { Recipe }, info) => {
      try {
        return await Recipe.find()
      } catch (error) {
        throw error
      }
    }
  },
  Mutation: {
    createRecipe: async (parent, { recipeInput }, { Recipe }, info) => {
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
