import gql from 'graphql-tag';

export const ADD_PIN = gql`
  mutation AddPin($pin: PinInput!) {
    addPin(pin: $pin) {
      title
      link
      image
    }
  }
`;

export const LIST_PINS = gql`
  {
    pins {
      id
      title
      link
      image
      user_id
    }
  }
`;

export const CREATE_LONG_LIVED_TOKEN = gql`
  mutation CreateLongLivedToken($token: String!) {
    createLongLivedToken(token: $token)
  }
`;

export const CREATE_SHORT_LIVED_TOKEN = gql`
  mutation CreateShortLivedToken($email: String!) {
    sendShortLivedToken(email: $email)
  }
`;

export const ME = gql`
  {
    me {
      email
    }
  }
`;
