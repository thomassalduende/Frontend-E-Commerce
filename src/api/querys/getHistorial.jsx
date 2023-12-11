import { gql } from "@apollo/client"

export const GET_HOSTORIAL = gql`
  query GetBooksComprados($tokenUser: String!) {
    getBooksComprados(tokenUser: $tokenUser) {
      message
      book {
        isbn
        url_imagen
        nombre
        precio
        stock
        autor {
          nombre
        }
      }
    }
  }
`