const { graphql } = require('graphql');

const schema = require('../schema');

const query = `
  query {
    firstPin: pinById(id: "1") {
      title
    }
    secondPin: pinById(id: "2") {
      title
    }
  }
`;

graphql(schema, query).then((result) =>
  console.log(JSON.stringify(result, null, 1))
);
