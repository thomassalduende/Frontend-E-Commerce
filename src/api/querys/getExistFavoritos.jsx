import { gql } from "@apollo/client";

export const GET_EXIST_FAVORITO = gql`
query Query($tokenUser: String!, $isbn: String!) {
  ExistFavorito(tokenUser: $tokenUser, isbn: $isbn) {
    message
    success
  }
}
`