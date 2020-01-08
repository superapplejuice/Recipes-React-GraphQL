import { gql } from 'apollo-boost'

export const fetchRecipesList = gql`
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
