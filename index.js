const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const { ApolloServer } = require('apollo-server-express')
const { resolvers } = require('./graphql/resolvers')
const { typeDefs } = require('./graphql/schemas')

const { mongoUri } = require('./keys')

const app = express()
const server = new ApolloServer({ typeDefs, resolvers })
server.applyMiddleware({ app })

const PORT = process.env.PORT || 5000
mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(
    app.listen(PORT, () =>
      console.log(`GraphQL on port ${PORT}${server.graphqlPath}`)
    )
  )
  .catch(error => console.log(error))
