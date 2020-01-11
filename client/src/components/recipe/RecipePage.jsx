import React from 'react'

const RecipePage = ({ match }) => {
  const { id } = match.params

  return (
    <div>
      <div>Your recipe</div>
    </div>
  )
}

export default RecipePage
