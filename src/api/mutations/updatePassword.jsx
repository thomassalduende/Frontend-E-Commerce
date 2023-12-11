import { gql } from "@apollo/client";

export const  UPDATE_PASSWORD = gql`
mutation Mutation($tokenUser: String!, $password: String!) {
  updateUser(tokenUser: $tokenUser, password: $password) {
    message
    success
  }
}
`