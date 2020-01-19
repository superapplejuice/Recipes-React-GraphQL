import React, { useState, useEffect } from 'react'
import { useMutation } from 'react-apollo'

import { LIKE_RECIPE } from '../../graphql/mutations'

import withSession from '../../utils/functions/withSession'

const LikeRecipe = ({ session: { currentUser }, _id }) => {
  const [username, setUsername] = useState(null)
  const [likeRecipe, { loading }] = useMutation(LIKE_RECIPE)

  useEffect(() => {
    currentUser && setUsername(currentUser.username)
  }, [currentUser])

  return (
    username && (
      <button
        onClick={() => {
          likeRecipe({ variables: { _id, username } })
        }}
      >
        {loading ? 'Loading...' : 'Like'}
      </button>
    )
  )
}

export default withSession(LikeRecipe)
