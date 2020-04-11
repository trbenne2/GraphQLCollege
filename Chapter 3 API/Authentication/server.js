const { ApolloServer } = require('apollo-server');

const schema = require('./schema');

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    return { token: req.headers.authorization };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
