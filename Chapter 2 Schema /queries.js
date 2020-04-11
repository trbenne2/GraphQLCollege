const { graphql } = require('graphql');

const schema = require('./schema');

const sendShortLivedToken = `
mutation CreateShortLivedToken($email: String!) {
  sendShortLivedToken(email: $email)
}
`;

const getUsers = `
{
  users {
    id
    email
    pins {
      id
      title
      link
      image
      user_id
    }
  }
}
`;

const addPin = `
mutation AddPin($pin: PinInput!) {
  addPin(pin: $pin) {
    id
    title
    link
    image
    user_id
  }
}
`;

graphql(schema, sendShortLivedToken, undefined, undefined, {
  email: 'name@example.com',
})
  .then(() => graphql(schema, getUsers))
  .then(({ data: { users } }) =>
    graphql(
      schema,
      addPin,
      undefined,
      {
        user: users[0],
      },
      {
        pin: {
          title: 'Hello world',
          link: 'http://graphql.college/graphql-webapps',
          image: 'http://graphql.college/graphql-webapps',
        },
      }
    )
  )
  .then((result) => console.log(JSON.stringify(result, null, 2)));
