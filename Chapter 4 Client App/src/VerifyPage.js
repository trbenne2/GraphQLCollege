import React from 'react';
import { Mutation } from 'react-apollo';
import { VerifyPage } from 'pinapp-components';

import { CREATE_LONG_LIVED_TOKEN, ME } from './queries';

class VerifyPageContainer extends React.Component {
  render() {
    return (
      <Mutation
        mutation={CREATE_LONG_LIVED_TOKEN}
        update={(cache, { data }) => {
          if (data && data.createLongLivedToken) {
            this.props.onToken(data.createLongLivedToken);
          }
        }}
      >
        {(createLongLivedToken) => (
          <VerifyPage
            verify={(shortLivedToken) =>
              createLongLivedToken({
                variables: {
                  token: shortLivedToken,
                },
                refetchQueries: [{ query: ME }],
              })
            }
          />
        )}
      </Mutation>
    );
  }
}

export default VerifyPageContainer;
