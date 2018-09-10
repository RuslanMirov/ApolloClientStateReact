import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

// Запрос, чтобы узнать статус
// @client - индификатор означает, что запрос выполняется на клиенте
const ConnectQuery = gql`
  query {
    networkStatus @client {
    isConnected
  }
}
`
;

// Рендерим статус
const Show = () =>(
  <Query query = {ConnectQuery}>
  {({ loading, data }) =>
     !loading ? (
       <h1>{ data.networkStatus.isConnected ? "connected" : 'diconnected' }</h1>
     ) : null
   }
 </Query>
)

export default Show;
