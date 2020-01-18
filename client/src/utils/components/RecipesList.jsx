import React from 'react'
import { useQuery, useMutation } from 'react-apollo'
import { Link } from 'react-router-dom'
import { array } from 'prop-types'

import { GET_CURRENT_USER } from '../../graphql/queries'
import { DELETE_RECIPE } from '../../graphql/mutations'

const RecipesList = ({ recipes }) => {
  const { data } = useQuery(GET_CURRENT_USER)
  const [deleteRecipe] = useMutation(DELETE_RECIPE)

  const handleDelete = (deleteRecipe, _id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this recipe?'
    )

    return (
      confirmDelete &&
      deleteRecipe({ variables: { _id } }).then(({ data }) => console.log(data))
    )
  }

  return (
    <ul>
      {recipes.map(({ _id, name, category, likes, username }) => (
        <li key={_id}>
          <Link to={`/recipe/view/${_id}`}>
            <div>{name}</div>
            <div>{category}</div>
            <div>{likes} likes</div>
          </Link>
          {data.currentUser !== null &&
            username === data.currentUser.username && (
              <button onClick={() => handleDelete(deleteRecipe, _id)}>
                Delete
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
