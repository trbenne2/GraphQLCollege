const search = `
query Search($text: String!){
  search(text: $text) {
    ... on Pin {
      title
    }
    ... on User {
      email
    }
  }
}
`;

const addPin = `
mutation AddPin($pin: PinInput!) {
  addPin(pin: $pin) {
    title
    link
    image
  }
}
`;

const createShortLivedToken = `
mutation CreateShortLivedToken($email: String!) {
  sendShortLivedToken(email: $email)
}
`;

const createLongLivedToken = `
mutation CreateLongLivedToken($token: String!) {
  createLongLivedToken(token: $token)
}
`;

const pinsSubscription = `
  subscription {
    pinAdded {
      title
      link
      image
    }
  }
`;

const me = `
{
  me {
    email
  }
}
`;

module.exports = {
  search,
  addPin,
  createShortLivedToken,
  createLongLivedToken,
  pinsSubscription,
  me,
};
