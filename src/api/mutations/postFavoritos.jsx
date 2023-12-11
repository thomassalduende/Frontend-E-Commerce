import { gql } from "@apollo/client";

export const POST_FAVORITOS = gql`
mutation AgregarFavorito($tokenUser: String!, $isbn: String!) {
  agregarFavorito(tokenUser: $tokenUser, isbn: $isbn) {
    message
    success
  }
}
`