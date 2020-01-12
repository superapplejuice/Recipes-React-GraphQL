import React from 'react'
import { useQuery } from 'react-apollo'

import { FETCH_RECIPES } from '../../graphql/queries'

import RecipesList from '../recipe/RecipesList'

const Home = () => {
  const { data, loading, error } = useQuery(FETCH_RECIPES)

  const renderHome = () => {
    if (loading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>

    return <RecipesList recipes={data.recipesList} />
  }

  return (
    <div>
      <div>Home</div>
      {renderHome()}
    </div>
  )
}

export default Home
