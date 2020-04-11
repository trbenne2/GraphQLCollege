const merge = require('lodash.merge');

const searchResolvers = require('./search/resolvers.js');
const authenticationResolvers = require('./authentication/resolvers.js');
const pinsResolvers = require('./pins/resolvers.js');

const resolvers = merge(
  searchResolvers,
  authenticationResolvers,
  pinsResolvers
);

module.exports = resolvers;
