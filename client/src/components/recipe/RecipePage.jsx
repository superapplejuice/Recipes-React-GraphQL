import React from 'react'
import { useQuery } from 'react-apollo'
import { object } from 'prop-types'

import { FETCH_RECIPE } from '../../graphql/queries'

import LikeRecipe from './LikeRecipe'

const RecipePage = ({ match }) => {
  const { id } = match.params
  const { data, loading, error } = useQuery(FETCH_RECIPE, {
    variables: { _id: id }
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  const {
    _id,
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
      <h2>{name}</h2>
      <div>
        <p>{category}</p>
        <p>{likes} likes</p>
      </div>
      <div>
        <div>Recipe by {username}</div>
        <div>{description}</div>
        <p>{instructions}</p>
      </div>
      <div>{new Date(Number(createdDate)).toLocaleString()}</div>
      <LikeRecipe _id={_id} />
    </div>
  )
}

RecipePage.propTypes = {
  match: object.isRequired
}

export default RecipePage
