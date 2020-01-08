import { hot } from 'react-hot-loader/root'
import React from 'react'
import { ApolloProvider } from 'react-apollo'

import { client } from './graphql'

import App from './components/App'

const AppRoot = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

export default hot(AppRoot)
