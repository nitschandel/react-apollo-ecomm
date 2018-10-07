import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { ApolloLink } from 'apollo-link';
import { onError } from "apollo-link-error";
import { toastr } from 'react-redux-toastr';
import * as AuthUtils from './auth';

const httpLink = createHttpLink({
    uri: 'http://localhost:4000',
  });

const authLink = setContext((_, { headers }) => {
    const token = AuthUtils.getAuthCookie();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  });

const errorLink = onError(({ networkError, graphQLErrors }) => {
    if (graphQLErrors) {
        toastr.error('',graphQLErrors[0].message);
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

const link = ApolloLink.from([
authLink,
errorLink,
httpLink,
]);



export const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
  })