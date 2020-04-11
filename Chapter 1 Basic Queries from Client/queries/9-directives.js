const { graphql } = require('graphql');

const schema = require('../schema');

const query = `
  query ($withPins: Boolean!) {
    users {
      email
      pins @include(if: $withPins) {
        title
      }
    }
  }
`;

graphql(schema, query, undefined, undefined, {
  withPins: true,
}).then((result) => console.log(JSON.stringify(result, null, 1)));
