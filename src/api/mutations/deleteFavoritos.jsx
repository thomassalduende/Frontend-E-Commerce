import { gql } from "@apollo/client";

export const  DELETE_FAVORITOS = gql`
  mutation Mutation($tokenUser: String!, $isbn: String!) {
    deleteFavorito(tokenUser: $tokenUser, isbn: $isbn) {
      message
      success
    }
  }
`