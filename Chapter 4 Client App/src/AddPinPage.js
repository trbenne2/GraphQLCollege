import React from 'react';
import { Mutation } from 'react-apollo';
import { AddPinPage } from 'pinapp-components';

import { ADD_PIN, LIST_PINS } from './queries';

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
                refetchQueries: [{ query: LIST_PINS }],
              })
            }
          />
        )}
      </Mutation>
    );
  }
}

export default AddPinPageContainer;
