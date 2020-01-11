import React from 'react'

const RecipeList = ({ recipes }) => {
  console.log(recipes)
  return (
    <ul>
      {recipes.map(({ _id, name, category, likes }) => (
        <li key={_id}>
          <div>{name}</div>
          <div>{category}</div>
          <div>{likes}</div>
        </li>
      ))}
    </ul>
  )
}

export default RecipeList
