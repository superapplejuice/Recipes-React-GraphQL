const rootQueries = require('./rootQueries')
const rootMutations = require('./rootMutations')

exports.resolvers = {
  Query: {
    ...rootQueries
  },
  Mutation: {
    ...rootMutations
  }
}
