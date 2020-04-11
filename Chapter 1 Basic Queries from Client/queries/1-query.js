const { graphql } = require('graphql');

const schema = require('../schema');

const query = `
  {
    users {
      email
    }
  }
`;

graphql(schema, query).then((result) =>
  console.log(JSON.stringify(result, null, 1))
);
