const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const { verify } = require('jsonwebtoken')

const { ApolloServer } = require('apollo-server-express')
const { resolvers } = require('./graphql/resolvers')
const { typeDefs } = require('./graphql/schemas')

const { mongoUri, jwtKey } = require('./keys')
const Recipe = require('./models/Recipe')
const User = require('./models/User')

const app = express()

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
)

app.use((req, res, next) => {
  const token = req.headers['authorization']

  if (token !== 'null') {
    try {
      const currentUser = verify(token, jwtKey)
      req.currentUser = currentUser
    } catch (err) {
      console.error(err)
    }
  }

  return next()
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ Recipe, User, currentUser: req.currentUser })
})
server.applyMiddleware({ app })

// send routes to index.html if they don't exist in server || build folders
if (process.env.NODE_ENV === 'production') {
  const path = require('path')

  // serve production assets if route exists
  app.use(express.static(path.resolve(__dirname, '../client/build')))
  // serve index.html if route is not recognized
  app.get('*', (req, res) =>
    res.sendFile(__dirname, '../client/build', 'index.html')
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
      console.log(`GraphQL running on port ${PORT}${server.graphqlPath}`)
    )
  )
  .catch(error => console.log(error))
