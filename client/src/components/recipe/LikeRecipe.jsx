import React, { PureComponent } from 'react'
import { Mutation } from 'react-apollo'
import { string, func, object } from 'prop-types'

import { LIKE_RECIPE, UNLIKE_RECIPE } from '../../graphql/mutations'
import { FETCH_RECIPE } from '../../graphql/queries'
import withSession from '../../utils/functions/withSession'

class LikeRecipe extends PureComponent {
  state = {
    username: null,
    liked: false
  }

  componentDidMount() {
    const {
      session: { currentUser },
      _id
    } = this.props
    // returns an element that matches the condition
    // returns -1 (false) || 0 (pass)
    const prevLiked =
      currentUser.favourites.findIndex(item => item._id === _id) > -1

    return (
      currentUser &&
      this.setState({ username: currentUser.username, liked: prevLiked })
    )
  }

  handleLike = (likeRecipe, unlikeRecipe) => {
    const { refetch } = this.props
    const { liked } = this.state

    liked
      ? likeRecipe().then(async () => await refetch())
      : unlikeRecipe().then(async () => await refetch())
  }

  handleClick = (likeRecipe, unlikeRecipe) => {
    this.setState(
      prevState => ({ liked: !prevState.liked }),
      () => this.handleLike(likeRecipe, unlikeRecipe)
    )
  }

  render() {
    const { _id } = this.props
    const { username, liked } = this.state
    console.log(this.props)

    return (
      <Mutation
        mutation={UNLIKE_RECIPE}
        variables={{ _id, username }}
        update={(cache, { data: { unlikeRecipe } }) => {
          const { getRecipe } = cache.readQuery({
            query: FETCH_RECIPE,
            variables: { _id }
          })

          return cache.writeQuery({
            query: FETCH_RECIPE,
            variables: _id,
            data: { getRecipe: { ...getRecipe, likes: unlikeRecipe.likes - 1 } }
          })
        }}
      >
        {unlikeRecipe => (
          <Mutation
            mutation={LIKE_RECIPE}
            variables={{ _id, username }}
            update={(cache, { data: { likeRecipe } }) => {
              const { getRecipe } = cache.readQuery({
                query: FETCH_RECIPE,
                variables: { _id }
              })

              return cache.writeQuery({
                query: FETCH_RECIPE,
                variables: _id,
                data: {
                  getRecipe: { ...getRecipe, likes: likeRecipe.likes + 1 }
                }
              })
            }}
          >
            {likeRecipe =>
              username && (
                <button
                  onClick={() => this.handleClick(likeRecipe, unlikeRecipe)}
                >
                  {liked ? 'Unlike' : 'Like'}
                </button>
              )
            }
          </Mutation>
        )}
      </Mutation>
    )
  }
}

LikeRecipe.propTypes = {
  _id: string.isRequired,
  refetch: func.isRequired,
  session: object.isRequired
}

export default withSession(LikeRecipe)
