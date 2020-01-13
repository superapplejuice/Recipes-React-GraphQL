import React from 'react'
import { ApolloConsumer } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { object } from 'prop-types'

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

Logout.propTypes = {
  history: object.isRequired
}

export default withRouter(Logout)
