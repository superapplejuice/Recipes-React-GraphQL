import React from 'react'
import { Link } from 'react-router-dom'
import { array } from 'prop-types'

const RecipeList = ({ recipes }) => (
  <ul>
    {recipes.map(({ _id, name, category, likes }) => (
      <li key={_id}>
        <Link to={`/recipe/view/${_id}`}>
          <div>{name}</div>
          <div>{category}</div>
          <div>{likes}</div>
        </Link>
      </li>
    ))}
  </ul>
)

RecipeList.propTypes = {
  recipes: array.isRequired
}

export default RecipeList
