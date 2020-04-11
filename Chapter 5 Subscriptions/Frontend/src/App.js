import React from 'react';
import { Container, Nav } from 'pinapp-components';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, Observable, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import PinListPage from './PinListPage';
import LoginPage from './LoginPage';
import VerifyPage from './VerifyPage';
import AddPinPage from './AddPinPage';
import ProfilePage from './ProfilePage';

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new ApolloLink((operation, forward) => {
      const request = async (operation) => {
        if (this.state.token) {
          operation.setContext({
            headers: { Authorization: this.state.token },
          });
        }
      };
      return new Observable((observer) => {
        let handle;
        Promise.resolve(operation)
          .then((oper) => request(oper))
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            });
          })
          .catch(observer.error.bind(observer));

        return () => {
          if (handle) handle.unsubscribe();
        };
      });
    }),
    split(
      // split based on operation type
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      new WebSocketLink({
        uri: process.env.REACT_APP_API_URL.replace('https://', 'wss://'),
        options: {
          reconnect: true,
        },
      }),
      new HttpLink({
        uri: process.env.REACT_APP_API_URL,
        credentials: 'same-origin',
      })
    ),
  ]),
  cache: new InMemoryCache(),
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
