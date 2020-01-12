import React from 'react'
import { useQuery } from 'react-apollo'

import { FETCH_RECIPE } from '../../graphql/queries'

const RecipePage = ({ match }) => {
  const { id } = match.params
  const { data, loading, error } = useQuery(FETCH_RECIPE, {
    variables: { _id: id }
  })

  console.log(data)

  const renderRecipePage = () => {
    if (loading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>

    const {
      name,
      category,
      description,
      instructions,
      createdDate,
      likes
    } = data.getRecipe

    return (
      <div>
        <div>{name}</div>
        <div>{category}</div>
        <div>{description}</div>
        <div>{instructions}</div>
        <div>{new Date(Number(createdDate)).toDateString()}</div>
        <div>{likes} likes</div>
      </div>
    )
  }

  return (
    <div>
      <div>Your recipe</div>
      {renderRecipePage()}
    </div>
  )
}

export default RecipePage
