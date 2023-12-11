import { gql } from "@apollo/client";

export const GET_ADMIN = gql`
query Query($tokenUser: String) {
  LoginUser(tokenUser: $tokenUser) {
    user {
      es_admin
    }
  }
}
`