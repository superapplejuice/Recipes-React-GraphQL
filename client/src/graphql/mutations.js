import { gql } from 'apollo-boost'

export const REGISTER_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    userRegister(
      registerInput: { username: $username, email: $email, password: $password }
    ) {
      token
    }
  }
`

export const LOGIN_USER = gql`
  mutation($email: String!, $password: String!) {
    userLogin(loginInput: { email: $email, password: $password }) {
      token
    }
  }
`
