import { gql } from "@apollo/client";

export const GET_COMENTARIOS = gql`
query GetBook($isbn: String) {
  getBook(isbn: $isbn) {
    book {
      opiniones {
        opinion
        nombre_user
        users {
          id
        }
      }
    }
  }
}
`