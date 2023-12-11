import { gql } from "@apollo/client";

export const GET_VALORACION = gql`
  query GetBook($isbn: String) {
    getBook(isbn: $isbn) {
      book {
        valoracion {
          cantidad_estrellas
        }
      }
    }
  }
`