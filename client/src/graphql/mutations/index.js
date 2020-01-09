import { gql } from 'apollo-boost'

export const REGISTER_USER = gql`
  mutation($username: String!, $email: String, $password: String!) {
    userRegister(
      registerInput: { username: $username, email: $email, password: $password }
    ) {
      token
    }
  }
`
