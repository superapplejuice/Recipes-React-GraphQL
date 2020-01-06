const { gql } = require('apollo-server-express')

exports.typeDefs = gql`
  type Recipe {
    name: String!
    category: String!
    description: String!
    instructions: String!
    createdDate: String
    likes: Int
    username: String
  }

  type User {
    username: String!
    password: String!
    email: String!
    joinDate: String
    favorites: [Recipe]
  }

  input recipeInput {
    name: String!
    category: String!
    description: String!
    instructions: String!
    username: String
  }

  type RootQuery {
    recipesList: [Recipe]!
    usersList: [User]!
  }

  type RootMutation {
    createRecipe(recipeInput: recipeInput): Recipe
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`
