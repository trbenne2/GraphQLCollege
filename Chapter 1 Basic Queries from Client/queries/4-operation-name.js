const { graphql } = require('graphql');

const schema = require('../schema');

const query = `
  query GetUsers {
    users {
      email
      pins {
        title
      }
    }
  }
`;

graphql(schema, query).then((result) =>
  console.log(JSON.stringify(result, null, 1))
);
