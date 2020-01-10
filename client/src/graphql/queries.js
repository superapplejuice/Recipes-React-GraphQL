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
