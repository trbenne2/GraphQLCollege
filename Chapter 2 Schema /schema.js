const { makeExecutableSchema } = require('graphql-tools');
const { importSchema } = require('graphql-import');

const resolvers = require('./resolvers');
const typeDefs = importSchema('schema.graphql');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;
