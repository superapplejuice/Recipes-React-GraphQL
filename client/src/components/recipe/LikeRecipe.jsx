import React, { PureComponent } from 'react'
import { Mutation } from 'react-apollo'

import { LIKE_RECIPE } from '../../graphql/mutations'
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

  handleLike = likeRecipe => {
    const { refetch } = this.props
    const { liked } = this.state

    liked
      ? likeRecipe().then(async ({ data }) => {
          console.log(data)
          return await refetch()
        })
      : console.log('unlike')
  }

  handleClick = likeRecipe => {
    this.setState(
      prevState => ({ liked: !prevState.liked }),
      () => this.handleLike(likeRecipe)
    )
  }

  render() {
    const { _id } = this.props
    const { username, liked } = this.state

    return (
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
            data: { getRecipe: { ...getRecipe, likes: likeRecipe.likes + 1 } }
          })
        }}
      >
        {likeRecipe =>
          username && (
            <button onClick={() => this.handleClick(likeRecipe)}>
              {liked ? 'Unlike' : 'Like'}
            </button>
          )
        }
      </Mutation>
    )
  }
}

export default withSession(LikeRecipe)
