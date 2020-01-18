import React from 'react'
import { useQuery } from 'react-apollo'
import { Redirect } from 'react-router-dom'

import { GET_CURRENT_USER } from '../../graphql/queries'

const withAuth = authCondition => Component => props => {
  const { data, loading } = useQuery(GET_CURRENT_USER)

  if (loading) return null

  return authCondition(data) ? <Component {...props} /> : <Redirect to='/' />
}

export default withAuth
