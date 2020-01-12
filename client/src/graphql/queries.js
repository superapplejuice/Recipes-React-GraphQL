import { gql } from 'apollo-boost'

export const FETCH_RECIPES = gql`
  query {
    recipesList {
      _id
      name
      category
      likes
    }
  }
`

export const FETCH_RECIPE = gql`
  query($_id: ID!) {
    getRecipe(_id: $_id) {
      _id
      name
      category
      description
      instructions
      createdDate
      likes
    }
  }
`

export const GET_CURRENT_USER = gql`
  query {
    currentUser {
      username
      email
      joinDate
    }
  }
`
