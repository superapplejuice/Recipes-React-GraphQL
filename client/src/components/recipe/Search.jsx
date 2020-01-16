import React, { useState, useEffect, createRef, Fragment } from 'react'
import { useQuery } from 'react-apollo'

import { SEARCH_RECIPES } from '../../graphql/queries'
import RecipeList from './RecipesList'

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const { data, loading, error } = useQuery(SEARCH_RECIPES, {
    variables: { searchTerm }
  })
  const inputRef = createRef()
  console.log()

  useEffect(() => {
    inputRef.current.focus()
    // eslint-disable-next-line
  }, [])

  const renderRecipes = () => {
    return !error && loading ? (
      <p>Loading...</p>
    ) : error && !loading ? (
      <p>Error while searching for recipes!</p>
    ) : data.searchRecipe.length > 0 ? (
      <Fragment>
        <p>List of Recipes</p>
        <RecipeList recipes={data.searchRecipe} />
      </Fragment>
    ) : (
      <p>No recipes found!</p>
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
