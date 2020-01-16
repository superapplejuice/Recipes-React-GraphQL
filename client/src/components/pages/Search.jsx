import React, { useState, useEffect, createRef } from 'react'
import { useQuery } from 'react-apollo'

import { SEARCH_RECIPES } from '../../graphql/queries'

import RecipesList from '../../utils/components/RecipesList'

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const { data, loading, error } = useQuery(SEARCH_RECIPES, {
    variables: { searchTerm }
  })
  const inputRef = createRef()

  useEffect(() => {
    inputRef.current.focus()
    // eslint-disable-next-line
  }, [])

  const renderRecipes = () => {
    return !error && loading ? (
      <p>Loading...</p>
    ) : error && !loading ? (
      <p>Error while searching for recipes!</p>
    ) : (
      <RecipesList recipes={data.searchRecipe} />
    )
  }

  return (
    <div>
      <label>Search for a Recipe</label>
      <input
        type='text'
        ref={inputRef}
        placeholder='Recipe'
        onChange={event => setSearchTerm(event.target.value)}
        value={searchTerm}
      />
      <div>{renderRecipes()}</div>
    </div>
  )
}

export default Search
