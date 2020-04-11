import React from 'react';
import { Container, Nav } from 'pinapp-components';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

import PinListPage from './PinListPage';
import LoginPage from './LoginPage';
import VerifyPage from './VerifyPage';
import AddPinPage from './AddPinPage';
import ProfilePage from './ProfilePage';

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  request: (operation) => {
    if (this.state.token) {
      operation.setContext({ headers: { Authorization: this.state.token } });
    }
  },
});

export default class App extends React.Component {
  state = {
    token: null,
  };
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.setState({ token });
    }
  }
  logout = () => {
    localStorage.removeItem('token');
    this.setState({ token: null });
  };
  render() {
    return (
      <ApolloProvider client={client}>
        <Container>
          <PinListPage />
          <AddPinPage authenticated={!!this.state.token} />
          <LoginPage />
          <VerifyPage
            onToken={(token) => {
              localStorage.setItem('token', token);
              this.setState({ token });
            }}
          />
          <ProfilePage
            authenticated={!!this.state.token}
            logout={this.logout}
          />
          <Nav authenticated={!!this.state.token} />
        </Container>
      </ApolloProvider>
    );
  }
}
