import React from 'react';
import { Query } from 'react-apollo';
import { PinListPage, Spinner } from 'pinapp-components';

import { LIST_PINS } from './queries';

class PinListPageContainer extends React.Component {
  render() {
    return (
      <Query query={LIST_PINS}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Spinner accessibilityLabel='Loading pins' show />;
          }
          if (error) {
            return <div>Error</div>;
          }
          return <PinListPage pins={data.pins} />;
        }}
      </Query>
    );
  }
}

export default PinListPageContainer;
