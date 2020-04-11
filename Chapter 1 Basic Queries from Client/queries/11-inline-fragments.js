const { graphql } = require('graphql');

const schema = require('../schema');

const query = `
  query ($text: String!) {
    search(text: $text) {
      ... on Person {
        email
      }
      ... on Pin {
        title
      }
    }
  }
`;

graphql(schema, query, undefined, undefined, {
  text: 'Hello world',
}).then((result) => console.log(JSON.stringify(result, null, 1)));
