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

export const GET_CURRENT_USER = gql`
  query {
    currentUser {
      username
      email
      joinDate
    }
  }
`
