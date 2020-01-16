import React from 'react'
import { useQuery } from 'react-apollo'

import { FETCH_RECIPES } from '../../graphql/queries'

import RecipesList from '../../utils/components/RecipesList'

const Home = () => {
  const { data, loading, error } = useQuery(FETCH_RECIPES)

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  return (
    <div>
      <div>Home</div>
      <RecipesList recipes={data.recipesList} />
    </div>
  )
}

export default Home
