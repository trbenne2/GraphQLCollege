import React from 'react';
import { Mutation } from 'react-apollo';
import { LoginPage } from 'pinapp-components';

import { CREATE_SHORT_LIVED_TOKEN } from './queries';

class LoginPageContainer extends React.Component {
  render() {
    return (
      <Mutation mutation={CREATE_SHORT_LIVED_TOKEN}>
        {(createShortLivedToken) => (
          <LoginPage
            authenticate={(email) =>
              createShortLivedToken({ variables: { email } })
            }
          />
        )}
      </Mutation>
    );
  }
}

export default LoginPageContainer;
