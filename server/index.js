const express = require('express')
const mongoose = require('mongoose')

const { ApolloServer } = require('apollo-server-express')
const { resolvers } = require('./graphql/resolvers')
const { typeDefs } = require('./graphql/schemas')

const { mongoUri } = require('./keys')
const Recipe = require('./models/Recipe')
const User = require('./models/User')

const app = express()
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { Recipe, User }
})
server.applyMiddleware({ app })

// send routes to index.html if they don't exist in server || dist folders
if (process.env.NODE_ENV === 'production') {
  const path = require('path')

  // serve production assets if route exists
  app.use(express.static(path.resolve(__dirname, '../client/dist')))
  // serve index.html if route is not recognized
  app.get('*', (req, res) =>
    res.sendFile(__dirname, '../client/dist', 'index.html')
  )
}

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
