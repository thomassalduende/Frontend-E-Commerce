import { gql } from "@apollo/client";

export const POST_COMENTARIOS = gql`
  mutation Mutation($coment: String!, $isbn: String!, $tokenUser: String!) {
    agregarOpinion(coment: $coment, isbn: $isbn, tokenUser: $tokenUser) {
      message
      success
    }
  }
`