require('dotenv').config()
const { makeExecutableSchema } = require('graphql-tools')
const express = require('express')
const gqlMiddleware = require('express-graphql')
const { readFileSync } = require('fs')
const { join } = require('path')
const resolvers = require('./lib/resolvers')

const app = express()
const port = process.env.port || 3000

const typeDefs = readFileSync(join(__dirname, 'lib', 'schema.graphql'), 'utf-8')

const schema = makeExecutableSchema({ typeDefs, resolvers })

app.use('/api', gqlMiddleware({
  schema,
  rootValue: resolvers,
  graphiql: true
}))

app.listen(port, (error) => {
  if (error) {
    return console.log(error.message)
  }
  console.log(`App listening on http://127.0.0.1:${port}`)
})
