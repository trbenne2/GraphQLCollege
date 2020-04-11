const { graphql } = require('graphql');

const schema = require('../schema');

const query = `
  mutation AddPin($pin: PinInput!) {
    addPin(pin: $pin) {
      id
      title
      link
      image
    }
  }
`;

graphql(schema, query, undefined, undefined, {
  pin: {
    title: 'Hello world',
    link: 'Hello world',
    image: 'Hello world',
  },
}).then((result) => console.log(JSON.stringify(result, null, 1)));
