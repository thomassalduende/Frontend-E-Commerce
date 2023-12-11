import { gql } from "@apollo/client";

export const POST_CART = gql`
mutation Mutation($isbn: String!, $cantidad: Float!, $tokenUser: String!) {
  AgregarItem(isbn: $isbn, cantidad: $cantidad, tokenUser: $tokenUser) {
    message
    success
  }
}
`