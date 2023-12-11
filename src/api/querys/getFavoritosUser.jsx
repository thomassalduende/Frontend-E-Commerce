import { gql } from "@apollo/client";

export const GET_FAVORITOS_USER = gql`
  query Query($tokenUser: String!) {
    getFavoritos(tokenUser: $tokenUser) {
      message
      success
      favoritos {
        books {
          isbn
          nombre
          url_imagen
        }
      }
    }
  }
` 