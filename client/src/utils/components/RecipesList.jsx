import React from 'react'
import { useQuery, useMutation } from 'react-apollo'
import { Link } from 'react-router-dom'
import { array } from 'prop-types'

import {
  FETCH_RECIPES,
  GET_CURRENT_USER,
  GET_USER_RECIPES
} from '../../graphql/queries'
import { DELETE_RECIPE } from '../../graphql/mutations'

const RecipesList = ({ recipes }) => {
  const { data } = useQuery(GET_CURRENT_USER)
  const [deleteRecipe, { loading }] = useMutation(DELETE_RECIPE, {
    update: (cache, { data: { deleteRecipe } }) => {
      const { recipesList } = cache.readQuery({ query: FETCH_RECIPES })

      return cache.writeQuery({
        query: FETCH_RECIPES,
        data: {
          // return recipes !== to the deleted recipe
          recipesList: recipesList.filter(
            recipe => recipe._id !== deleteRecipe._id
          )
        }
      })
    },
    refetchQueries: () => [
      { query: FETCH_RECIPES },
      { query: GET_CURRENT_USER },
      {
        query: GET_USER_RECIPES,
        variables: { username: data.currentUser.username }
      }
    ]
  })

  const handleDelete = (deleteRecipe, _id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this recipe?'
    )

    return confirmDelete && deleteRecipe({ variables: { _id } })
  }

  return (
    <ul>
      {recipes.map(({ _id, name, category, likes, username, imageUrl }) => (
        <li key={_id}>
          <Link to={`/recipe/view/${_id}`}>
            <div>{name}</div>
            <div>{category}</div>
            <div>{likes} likes</div>
            <img src={imageUrl} alt='recipe_image' />
          </Link>
          {data.currentUser !== null &&
            username === data.currentUser.username && (
              <button onClick={() => handleDelete(deleteRecipe, _id)}>
                {loading ? 'Deleting recipe...' : 'Delete'}
              </button>
            )}
        </li>
      ))}
    </ul>
  )
}

RecipesList.propTypes = {
  recipes: array.isRequired
}

export default RecipesList
