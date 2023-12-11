import { gql } from "@apollo/client";

export const POST_GOOGLE = gql`
mutation LoginGoogle($nombre: String, $email: String, $password: String) {
  LoginGoogle(nombre: $nombre, email: $email, password: $password) {
    accessToken
  }
}
`