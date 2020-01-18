import React from 'react'
import { useQuery } from 'react-apollo'
import { Link } from 'react-router-dom'
import { array } from 'prop-types'

import { GET_CURRENT_USER } from '../../graphql/queries'

const RecipesList = ({ recipes }) => {
  const { data } = useQuery(GET_CURRENT_USER)

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
            username === data.currentUser.username && <button>Delete</button>}
        </li>
      ))}
    </ul>
  )
}

RecipesList.propTypes = {
  recipes: array.isRequired
}

export default RecipesList
