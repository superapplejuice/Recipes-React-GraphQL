import React from 'react'
import { Query } from 'react-apollo'

import { fetchRecipesList } from '../graphql/queries'

const Home = () => (
  <div>
    <div>Home</div>
    <Query query={fetchRecipesList}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>
        if (error) return <div>Error!</div>

        console.log(data)

        return <p>Recipes</p>
      }}
    </Query>
  </div>
)

export default Home
