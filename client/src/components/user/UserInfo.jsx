import React from 'react'
import { Link } from 'react-router-dom'
import { object } from 'prop-types'

const UserInfo = ({ session: { currentUser } }) => {
  const { username, email, joinedDate, favourites } = currentUser

  const renderFavourites = () => {
    return favourites.length > 0 ? (
      <ul>
        {favourites.map(({ _id, name }) => (
          <li key={_id}>
            <Link to={`/recipe/view/${_id}`}>
              <p>{name}</p>
            </Link>
          </li>
        ))}
      </ul>
    ) : (
      <p>{username} has no favourite recipe yet!</p>
    )
  }

  return (
    <div>
      <div>User Info</div>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      <p>Joined date: {new Date(Number(joinedDate)).toLocaleDateString()}</p>
      <div>
        <p>{username}'s Favourites:</p>
        {renderFavourites()}
      </div>
    </div>
  )
}

UserInfo.propTypes = {
  currentUser: object.isRequired
}

export default UserInfo
