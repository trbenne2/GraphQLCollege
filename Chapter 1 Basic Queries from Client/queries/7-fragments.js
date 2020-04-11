const { graphql } = require('graphql');

const schema = require('../schema');

const query = `
  query {
    pins {
      ...pinFields
    }
    users {
      email
      pins {
        ...pinFields
      }
    }
  }
  fragment pinFields on Pin {
    title
  }
`;

graphql(schema, query).then((result) =>
  console.log(JSON.stringify(result, null, 1))
);
