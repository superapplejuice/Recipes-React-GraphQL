import ApolloClient from 'apollo-boost'

export const graphqlUri = 'http://localhost:5000/graphql'

export const client = new ApolloClient({
  uri: graphqlUri
})
