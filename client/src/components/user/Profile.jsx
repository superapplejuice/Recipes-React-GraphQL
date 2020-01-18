import React from 'react'
import { object } from 'prop-types'

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

export default Profile
