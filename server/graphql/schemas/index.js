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
    imageUrl: String!
  }

  type User {
    _id: ID!
    username: String!
    password: String!
    email: String!
    joinedDate: String
    favourites: [Recipe]
  }

  type Query {
    recipesList: [Recipe]!
    getRecipe(_id: ID!): Recipe
    searchRecipe(searchTerm: String): [Recipe]
    currentUser: User
    userRecipes(username: String!): [Recipe]!
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
    imageUrl: String!
  }

  input registerInput {
    username: String!
    email: String!
    password: String!
  }

  input loginInput {
    email: String!
    password: String!
  }

  input likeInput {
    _id: ID!
    username: String!
  }

  type Mutation {
    createRecipe(recipeInput: recipeInput): Recipe
    likeRecipe(likeInput: likeInput): Recipe
    unlikeRecipe(likeInput: likeInput): Recipe
    deleteRecipe(_id: ID!): Recipe
    userRegister(registerInput: registerInput): Token
    userLogin(loginInput: loginInput): Token
  }
`
