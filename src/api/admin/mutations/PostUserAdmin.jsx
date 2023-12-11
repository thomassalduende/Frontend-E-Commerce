import { gql } from "@apollo/client";

export const POST_USER_ADMIN = gql`
  mutation Mutation($nombre: String!, $email: String!, $password: String!) {
    UserAdminRegister(nombre: $nombre, email: $email, password: $password) {
      accessToken
      message
      success
    }
  }
`