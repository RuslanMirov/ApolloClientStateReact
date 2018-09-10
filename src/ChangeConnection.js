import React from 'react';
import { gql } from 'apollo-boost';
import { graphql, compose} from 'react-apollo';

//Запрос, чтобы узнать статус
const getNetworkStatus = gql`
  query {
    networkStatus @client {
    isConnected
  }
}
`
;

// Кнопка в компоненте вызывает мутацию updateNetworkStatus
// мутацию мы пробрасываем в компонент с помощью метода compose из модуля react-apollo
// Аналог connect в Redux
// Передаем параметры в свойстве variables
const ChangeConnection = ({ mutate, data: { loading, networkStatus } }) => (
!loading ? (
  <button onClick={() =>
      mutate({
        variables: {
          isConnected: !networkStatus.isConnected
        }
      })
  }>
  change connection
  </button>
): null
);

// Описываем мутацию, чтобы изменить статус
const changeConnectionMutation = gql`
  mutation updateNetworkStatus($isConnected: Boolen){
    updateNetworkStatus(isConnected: $isConnected) @client
  }
`
;

// Проброс getNetworkStatus и changeConnectionMutation в компонент ChangeConnection

export default compose(
  graphql(getNetworkStatus),
  graphql(changeConnectionMutation)
)(ChangeConnection)
