import { gql } from "@apollo/client";

export const DELETE_BOOK = gql`
mutation Mutation($isbn: String!) {
    deleteBook(isbn: $isbn) {
      message
      success
    }
  }
`