import React from 'react'
import { object } from 'prop-types'

import withAuth from '../../utils/functions/withAuth'

import UserInfo from './UserInfo'
import UserRecipes from './UserRecipes'

const Profile = ({ session }) => {
  return (
    <div>
      <div>Profile</div>
      <UserInfo session={session} />
      <UserRecipes session={session} />
    </div>
  )
}

Profile.propTypes = {
  session: object.isRequired
}

const authCondition = session => session && session.currentUser

export default withAuth(authCondition)(Profile)
