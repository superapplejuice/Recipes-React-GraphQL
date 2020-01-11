import ApolloClient from 'apollo-boost'

export const graphqlUri = 'http://localhost:5000/graphql'

export const client = new ApolloClient({
  uri: graphqlUri,
  fetchOptions: { credentials: 'include' },
  request: operation => {
    const token = localStorage.getItem('token')
    operation.setContext({
      headers: { authorization: token }
    })
  },
  onError: ({ networkError }) => {
    networkError && console.error(networkError)
  }
})
