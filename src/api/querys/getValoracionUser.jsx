import { gql } from "@apollo/client";

export const GET_VALORACION_USER = gql`
query Query($isbn: String!, $tokenUser: String!) {
  existValoracion(isbn: $isbn, tokenUser: $tokenUser) {
    message
    success
    cantidad_estrellas
  }
}
`