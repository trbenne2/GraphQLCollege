const {
  createShortLivedToken,
  sendShortLivedToken,
  createLongLivedToken,
  authorize,
  createUser,
} = require('./index');
const database = require('../database');

const resolvers = {
  Query: {
    users: async () => {
      const users = await database('users').select();
      return users;
    },
    me: async (_, __, { token }) => {
      const [user] = await authorize(database, token);
      return user;
    },
  },
  Mutation: {
    sendShortLivedToken: async (_, { email }) => {
      let user;
      const userExists = await database('users').select().where({ email });
      if (userExists.length) {
        user = userExists[0];
      } else {
        user = createUser(email);
        await database('users').insert(user);
      }
      const token = createShortLivedToken(user);
      return sendShortLivedToken(email, token);
    },
    createLongLivedToken: (_, { token }) => {
      return createLongLivedToken(token);
    },
  },
  Person: {
    __resolveType: (person) => {
      if (person.admin) {
        return 'Admin';
      }
      return 'User';
    },
  },
  User: {
    pins(person) {
      return database('pins').select().where({ user_id: person.id });
    },
  },
};

module.exports = resolvers;
