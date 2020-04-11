const {
  addPin,
  createShortLivedToken,
  sendShortLivedToken,
  createLongLivedToken,
  createUser,
} = require('./business-logic');

const database = {
  users: {},
  pins: {},
};

const resolvers = {
  Query: {
    pins: () => Object.values(database.pins),
    users: () => Object.values(database.users),
    search: (_, { text }) => {
      return [
        ...Object.values(database.pins).filter((pin) =>
          pin.title.includes(text)
        ),
        ...Object.values(database.users).filter((user) =>
          user.email.includes(text)
        ),
      ];
    },
  },
  Mutation: {
    addPin: async (_, { pin }, { user }) => {
      const { user: updatedUser, pin: createdPin } = await addPin(user, pin);
      database.pins[createdPin.id] = createdPin;
      database.users[user.id] = updatedUser;
      return createdPin;
    },
    sendShortLivedToken: (_, { email }) => {
      let user;
      const userExists = Object.values(database.users).find(
        (u) => u.email === user.email
      );
      if (userExists) {
        user = userExists;
      } else {
        user = createUser(email);
        database.users[user.id] = user;
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
    pins({ id }) {
      return Object.values(database.pins).filter((pin) => pin.user_id === id);
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
