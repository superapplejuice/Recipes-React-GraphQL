import React from 'react'
import { useQuery } from 'react-apollo'
import { object } from 'prop-types'

import { GET_USER_RECIPES } from '../../graphql/queries'

import RecipesList from '../../utils/components/RecipesList'

const UserRecipes = ({ session }) => {
  const { data, loading, error } = useQuery(GET_USER_RECIPES, {
    variables: { username: session.currentUser.username }
  })

  const renderRecipes = () => {
    return loading && !error ? (
      <p>Loading...</p>
    ) : !loading && error ? (
      <p>{error}</p>
    ) : data.userRecipes.length > 0 ? (
      <RecipesList recipes={data.userRecipes} />
    ) : (
      <p>You haven't added any recipes!</p>
    )
  }

  return (
    <div>
      <div>User Recipes</div>
      {renderRecipes()}
    </div>
  )
}

UserRecipes.propTypes = {
  session: object.isRequired
}

export default UserRecipes
