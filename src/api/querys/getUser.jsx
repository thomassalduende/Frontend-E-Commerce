import { gql } from "@apollo/client";

export const LOGIN = gql`
  query LoginUser($email: String, $password: String) {
    LoginUser(email: $email, password: $password) {
      accessToken
      user{
        es_admin
      }
    }
  } 
`