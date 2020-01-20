import { gql } from 'apollo-boost'

export const REGISTER_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    userRegister(
      registerInput: { username: $username, email: $email, password: $password }
    ) {
      token
    }
  }
`

export const LOGIN_USER = gql`
  mutation($email: String!, $password: String!) {
    userLogin(loginInput: { email: $email, password: $password }) {
      token
    }
  }
`

export const CREATE_RECIPE = gql`
  mutation(
    $name: String!
    $category: String!
    $description: String!
    $instructions: String!
    $username: String!
  ) {
    createRecipe(
      recipeInput: {
        name: $name
        category: $category
        description: $description
        instructions: $instructions
        username: $username
      }
    ) {
      _id
      name
      category
      description
      instructions
      createdDate
      likes
      username
    }
  }
`

export const LIKE_RECIPE = gql`
  mutation($_id: ID!, $username: String!) {
    likeRecipe(likeInput: { _id: $_id, username: $username }) {
      _id
      name
      likes
    }
  }
`

export const UNLIKE_RECIPE = gql`
  mutation($_id: ID!, $username: String!) {
    unlikeRecipe(likeInput: { _id: $_id, username: $username }) {
      _id
      name
      likes
    }
  }
`

export const DELETE_RECIPE = gql`
  mutation($_id: ID!) {
    deleteRecipe(_id: $_id) {
      _id
      name
      username
    }
  }
`
