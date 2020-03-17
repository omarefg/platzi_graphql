const Mutation = require('./mutation')
const Query = require('./query')
const types = require('./types')

module.exports = {
  Query,
  Mutation,
  ...types
}
