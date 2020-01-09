import React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from 'react-apollo'

import { client } from './graphql'

import App from './components/App'

const rootElement = document.querySelector('#root')
const renderApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

render(renderApp(), rootElement)
