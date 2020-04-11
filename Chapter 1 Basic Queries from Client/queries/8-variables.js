const { graphql } = require('graphql');

const schema = require('../schema');

const query = `
  query ($id: String!) {
    pinById(id: $id) {
      title
    }
  }
`;

graphql(schema, query, undefined, undefined, {
  id: '1',
}).then((result) => console.log(JSON.stringify(result, null, 1)));
