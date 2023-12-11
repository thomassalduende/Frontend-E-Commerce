import { gql } from "@apollo/client";

export const POST_VALORACION = gql`
  mutation AgregarValoracion($tokenUser: String!, $isbn: String!, $cantEstrellas: Float!) {
    agregarValoracion(tokenUser: $tokenUser, isbn: $isbn, cant_estrellas: $cantEstrellas) {
      message
      success
    }
  }
`