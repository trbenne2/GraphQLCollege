const {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} = require('graphql-tools');
const { importSchema } = require('graphql-import');

const typeDefs = importSchema('schema.graphql');

const schema = makeExecutableSchema({
  typeDefs,
  resolverValidationOptions: {
    requireResolversForResolveType: false, // Don't require __resolveType() on Interfaces or Unions
  },
});

addMockFunctionsToSchema({ schema });

module.exports = schema;
