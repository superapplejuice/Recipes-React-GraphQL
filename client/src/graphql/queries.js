import { gql } from 'apollo-boost'

export const FETCH_RECIPES = gql`
  query {
    recipesList {
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
