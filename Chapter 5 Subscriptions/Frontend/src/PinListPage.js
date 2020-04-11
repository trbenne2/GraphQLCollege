import React from 'react';
import { Query } from 'react-apollo';
import { PinListPage, Spinner } from 'pinapp-components';

import { LIST_PINS, PINS_SUBSCRIPTION } from './queries';

class PinListQuery extends React.Component {
  render() {
    return (
      <Query query={LIST_PINS}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) {
            return <Spinner accessibilityLabel='Loading pins' show />;
          }
          if (error) {
            return <div>Error</div>;
          }
          const subscribeToMorePins = () => {
            return subscribeToMore({
              document: PINS_SUBSCRIPTION,
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data || !subscriptionData.data.pinAdded) {
                  return prev;
                }
                const newPinAdded = subscriptionData.data.pinAdded;

                return Object.assign({}, prev, {
                  pins: [...prev.pins, newPinAdded],
                });
              },
            });
          };
          return this.props.children({
            pins: data.pins,
            subscribeToMore: subscribeToMorePins,
          });
        }}
      </Query>
    );
  }
}

class PinListPageContainer extends React.Component {
  componentDidMount() {
    this.props.subscribeToMore();
  }
  render() {
    return <PinListPage pins={this.props.pins} />;
  }
}

export default () => (
  <PinListQuery>
    {({ pins, subscribeToMore }) => (
      <PinListPageContainer pins={pins} subscribeToMore={subscribeToMore} />
    )}
  </PinListQuery>
);
