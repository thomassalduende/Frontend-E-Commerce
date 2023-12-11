import { gql } from "@apollo/client";

export const DELETE_USER_ADMIN = gql`
  mutation Mutation( $email: String!) {
    deleteUsuario( email: $email) {
      message
      success
    }
  }
`