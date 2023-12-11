import { gql } from "@apollo/client"
export const DELETE_CART = gql`
mutation Mutation($isbn: String!, $tokenUser: String!) {
  deleteItem(isbn: $isbn, tokenUser: $tokenUser) {
    message
    success
  }
}
`