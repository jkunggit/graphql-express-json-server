import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from './myGraphqlSchema.js'

const app = express()

const PORT = process.env.PORT || 3000

// browse to localhost:3000/graphql
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true // disable this on production
}))

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`)
})