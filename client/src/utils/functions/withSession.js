import React from 'react'
import { useQuery } from 'react-apollo'

import { GET_CURRENT_USER } from '../../graphql/queries'

const withSession = Component => props => {
  const { data, loading, refetch } = useQuery(GET_CURRENT_USER)

  if (loading) return null

  return <Component {...props} refetch={refetch} session={data} />
}

export default withSession
