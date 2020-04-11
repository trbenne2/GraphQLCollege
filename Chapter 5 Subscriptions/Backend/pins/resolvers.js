const { PostgresPubSub } = require('graphql-postgres-subscriptions');

const { addPin } = require('./index');
const { verify, authorize } = require('../authentication');
const database = require('../database');

const pubsub = new PostgresPubSub({
  connectionString: `${process.env.DATABASE_URL}?ssl=true`,
});

const resolvers = {
  Query: {
    pins: () => database('pins').select(),
  },
  Mutation: {
    addPin: async (_, { pin }, { token }) => {
      const [user] = await authorize(database, token);
      const { user: updatedUser, pin: createdPin } = await addPin(user, pin);
      await database('pins').insert(createdPin);
      pubsub.publish('pinAdded', { pinAdded: createdPin });
      return createdPin;
    },
  },
  Subscription: {
    pinAdded: {
      subscribe: () => {
        return pubsub.asyncIterator('pinAdded');
      },
    },
  },
};

module.exports = resolvers;
