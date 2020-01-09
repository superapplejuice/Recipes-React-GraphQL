const { gql } = require('apollo-server-express')

exports.typeDefs = gql`
  # queries
  type Recipe {
    _id: ID!
    name: String!
    category: String!
    description: String!
    instructions: String!
    createdDate: String
    likes: Int
    username: String
  }

  type User {
    _id: ID!
    username: String!
    password: String!
    email: String!
    joinDate: String
    favorites: [Recipe]
  }

  type Query {
    recipesList: [Recipe]!
    usersList: [User]!
  }

  # mutations
  type Token {
    token: String!
  }

  input recipeInput {
    name: String!
    category: String!
    description: String!
    instructions: String!
    username: String
  }

  input registerInput {
    username: String!
    email: String!
    password: String!
  }

  type Mutation {
    createRecipe(recipeInput: recipeInput): Recipe
    userRegister(registerInput: registerInput): Token
  }
`
