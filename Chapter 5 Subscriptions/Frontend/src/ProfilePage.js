import React from 'react';
import { Query } from 'react-apollo';
import { ProfilePage } from 'pinapp-components';

import { ME } from './queries';

class ProfilePageContainer extends React.Component {
  render() {
    if (!this.props.authenticated) {
      return (
        <ProfilePage
          authenticated={this.props.authenticated}
          logout={this.props.logout}
          user={null}
        />
      );
    }
    return (
      <Query query={ME}>
        {({ loading, error, data }) => {
          return (
            <ProfilePage
              authenticated={this.props.authenticated}
              logout={this.props.logout}
              user={{ email: data && data.me ? data.me.email : null }}
            />
          );
        }}
      </Query>
    );
  }
}

export default ProfilePageContainer;
