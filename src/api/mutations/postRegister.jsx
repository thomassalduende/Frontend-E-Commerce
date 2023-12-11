import { gql } from "@apollo/client";

export const REGISTER = gql`
mutation Mutation($nombre: String!, $email: String!, $password: String!) {
  registrarse(nombre: $nombre, email: $email, password: $password) {
    accessToken
    message
    success
    user {
      nombre
      email
      password
    }
  }
}
`