import React from 'react'
import { ApolloConsumer } from 'react-apollo'
import { withRouter } from 'react-router-dom'

const Logout = ({ history }) => {
  const handleLogout = ({ resetStore }) => {
    localStorage.removeItem('token')
    resetStore()

    return history.push('/')
  }

  return (
    <ApolloConsumer>
      {client => {
        return <button onClick={() => handleLogout(client)}>Logout</button>
      }}
    </ApolloConsumer>
  )
}

export default withRouter(Logout)
