import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Show from './Show';
import ChangeConnection from './ChangeConnection';

// Создаем соеденеие с graphql (таблицей Friends)
// Создаем клиентский state networkStatus в специальном свойстве clientState
// В resolvers описываем мутацию которая будет изменять клиентский state networkStatus
// return null, чтобы не было Missing field updateNetworkStatus in {}
const client = new ApolloClient({
  uri: 'https://954z0pwrr.lp.gql.zone/graphql',
  clientState: {
    defaults: {
      networkStatus: {
        __typename: 'NetworkStatus',
        isConnected: true
      }
    },
    resolvers: {
      Mutation: {
        updateNetworkStatus: (_, { isConnected }, { cache }) => {
          cache.writeData({
            data: {
              networkStatus: {
                __typename: 'NetworkStatus',
                isConnected
              }
            }
          });
          return null;
        }
      }
    }
  }
});

// Пробрасываем client с описанием нашего state networkStatus в другие компоненты,
// которые будут рендерить и менять значение
const App = () => (
  <ApolloProvider client={client}>
  <div>
  <Show />
  <ChangeConnection />
  </div>
 </ApolloProvider>
)



render(<App />, document.getElementById('root'));
