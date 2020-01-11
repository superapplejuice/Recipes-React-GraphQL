import React from 'react'

const RecipeList = ({ recipes }) => {
  console.log(recipes)
  return (
    <ul>
      {recipes.map(({ _id, name, category, description, likes }) => (
        <li key={_id}>
          <div>{name}</div>
          <div>{category}</div>
          <div>{description}</div>
          <div>{likes} like</div>
        </li>
      ))}
    </ul>
  )
}

export default RecipeList
