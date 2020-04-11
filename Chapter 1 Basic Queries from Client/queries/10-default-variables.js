const { graphql } = require('graphql');

const schema = require('../schema');

const query = `
  query ($withPins: Boolean = true) {
    users {
      email
      pins @include(if: $withPins) {
        title
      }
    }
  }
`;

graphql(schema, query).then((result) =>
  console.log(JSON.stringify(result, null, 1))
);
