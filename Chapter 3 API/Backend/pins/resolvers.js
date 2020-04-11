const { addPin } = require('./index');
const { verify, authorize } = require('../authentication');
const database = require('../database');

const resolvers = {
  Query: {
    pins: () => database('pins').select(),
  },
  Mutation: {
    addPin: async (_, { pin }, { token }) => {
      const [user] = await authorize(database, token);
      const { user: updatedUser, pin: createdPin } = await addPin(user, pin);
      await database('pins').insert(createdPin);
      return createdPin;
    },
  },
};

module.exports = resolvers;
