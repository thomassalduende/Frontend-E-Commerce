import { gql } from "@apollo/client";

export const GET_USER_ADMIN = gql`
  query GetUsersAdmin {
    getUsersAdmin {
      users {
        nombre
        email
      }
    }
  }
`