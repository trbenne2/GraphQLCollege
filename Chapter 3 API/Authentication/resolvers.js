const {
  addPin,
  createShortLivedToken,
  sendShortLivedToken,
  createLongLivedToken,
  verify,
  authorize,
  createUser,
} = require('./business-logic');
const database = require('./database');

const resolvers = {
  Query: {
    pins: () => database('pins').select(),
    users: async () => {
      const users = await database('users').select();
      return users;
    },
    me: async (_, __, { token }) => {
      const [user] = await authorize(token);
      return user;
    },
    search: (_, { text }) => {
      return Promise.all([
        database('users').select().where('email', 'like', `%${text}%`),
        database('pins').select().where('title', 'like', `%${text}%`),
      ]);
    },
  },
  Mutation: {
    addPin: async (_, { pin }, { token }) => {
      const [user] = await authorize(token);
      const { user: updatedUser, pin: createdPin } = await addPin(user, pin);
      await database('pins').insert(createdPin);
      return createdPin;
    },
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
  SearchResult: {
    __resolveType: (searchResult) => {
      if (searchResult.admin) {
        return 'Admin';
      }
      if (searchResult.email) {
        return 'User';
      }
      return 'Pin';
    },
  },
};

module.exports = resolvers;
