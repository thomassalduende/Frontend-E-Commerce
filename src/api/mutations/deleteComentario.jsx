import { gql } from "@apollo/client";

export const DELETE_COMENTARIOS = gql`
mutation Mutation($isbn: String!, $tokenUser: String!) {
  deleteOpinion(isbn: $isbn, tokenUser: $tokenUser) {
    message
    success
  }
}
`