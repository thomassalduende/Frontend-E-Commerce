import { gql } from "@apollo/client";

export const GET_COMENTARIOS_USER = gql`
  query Query($isbn: String!, $tokenUser: String!) {
    ExistComentario(isbn: $isbn, tokenUser: $tokenUser) {
      message
      success
      comentario
      comprado
      id_user
    }
  }
`