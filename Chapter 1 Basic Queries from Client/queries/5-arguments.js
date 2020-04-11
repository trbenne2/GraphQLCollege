const { graphql } = require('graphql');

const schema = require('../schema');

const query = `
  query {
    pinById(id: "1") {
      title
    }
  }
`;

graphql(schema, query).then((result) =>
  console.log(JSON.stringify(result, null, 1))
);
