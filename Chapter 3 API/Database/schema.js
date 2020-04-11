const {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} = require('graphql-tools');
const { importSchema } = require('graphql-import');

const typeDefs = importSchema('schema.graphql');
const resolvers = require('./resolvers');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;
