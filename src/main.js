import Vue from 'vue';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import VueApollo from 'vue-apollo';
import App from './App';

Vue.config.productionTip = false;

// graphql server address, change this if server is on another machine
const GraphqlAddress = 'localhost:4000';

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' &&
      operation === 'subscription';
  },
  new WebSocketLink({
    uri: `ws://${GraphqlAddress}`,
    options: {
      reconnect: true,
    },
  }),
  new HttpLink({ uri: `http://${GraphqlAddress}` }),
);

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  provide: apolloProvider.provide(),
  render: h => h(App),
});
