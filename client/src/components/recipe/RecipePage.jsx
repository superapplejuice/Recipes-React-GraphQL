import React from 'react'
import { useQuery } from 'react-apollo'
import { object } from 'prop-types'

import { FETCH_RECIPE } from '../../graphql/queries'

const RecipePage = ({ match }) => {
  const { id } = match.params
  const { data, loading, error } = useQuery(FETCH_RECIPE, {
    variables: { _id: id }
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  const {
    name,
    category,
    description,
    instructions,
    createdDate,
    likes,
    username
  } = data.getRecipe

  return (
    <div>
      <div>Your recipe</div>
      <div>
        <div>{name}</div>
        <div>Created by {username}</div>
        <div>{category}</div>
        <div>{description}</div>
        <div>{instructions}</div>
        <div>{new Date(Number(createdDate)).toDateString()}</div>
        <div>{likes} likes</div>
      </div>
    </div>
  )
}

RecipePage.propTypes = {
  match: object.isRequired
}

export default RecipePage
