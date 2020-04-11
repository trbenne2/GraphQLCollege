const { ApolloServer } = require('apollo-server');

const schema = require('./schema');

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    const context = {};
    if (req && req.headers && req.headers.authorization) {
      context.token = req.headers.authorization;
    }
    return context;
  },
  subscriptions: true,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
