import React from 'react';
import { Mutation } from 'react-apollo';
import { AddPinPage } from 'pinapp-components';

import { ADD_PIN } from './queries';

class AddPinPageContainer extends React.Component {
  render() {
    return (
      <Mutation mutation={ADD_PIN}>
        {(addPin) => (
          <AddPinPage
            authenticated={this.props.authenticated}
            addPin={(pin) =>
              addPin({
                variables: { pin },
              })
            }
          />
        )}
      </Mutation>
    );
  }
}

export default AddPinPageContainer;
