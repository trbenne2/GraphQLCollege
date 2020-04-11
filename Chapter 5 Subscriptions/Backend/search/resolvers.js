const database = require('../database');

const resolvers = {
  Query: {
    search: async (_, { text }) => {
      return Promise.all([
        database('users').select().where('email', 'like', `%${text}%`),
        database('pins').select().where('title', 'like', `%${text}%`),
      ]).then(([users, pins]) => [...users, ...pins]);
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
