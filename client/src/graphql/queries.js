import { gql } from 'apollo-boost'

export const FETCH_RECIPES = gql`
  query {
    recipesList {
      _id
      name
      category
      likes
      username
      imageUrl
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
      username
      imageUrl
    }
  }
`

export const SEARCH_RECIPES = gql`
  query($searchTerm: String) {
    searchRecipe(searchTerm: $searchTerm) {
      _id
      name
      category
      description
      instructions
      createdDate
      likes
      username
      imageUrl
    }
  }
`

export const GET_CURRENT_USER = gql`
  query {
    currentUser {
      username
      email
      joinedDate
      favourites {
        _id
        name
      }
    }
  }
`

export const GET_USER_RECIPES = gql`
  query($username: String!) {
    userRecipes(username: $username) {
      _id
      name
      category
      likes
      username
      imageUrl
    }
  }
`
