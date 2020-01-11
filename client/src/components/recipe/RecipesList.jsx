import React from 'react'
import { Link } from 'react-router-dom'

const RecipeList = ({ recipes }) => {
  console.log(recipes)
  return (
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
}

export default RecipeList
