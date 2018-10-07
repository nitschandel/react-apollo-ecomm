import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo' 
import * as configuredStore from './store';
import configureRoutes from './route';
import { client } from './utils/apollo-client';

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={configuredStore.store}>
      {configureRoutes()}
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
