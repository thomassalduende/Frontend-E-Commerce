import { gql } from "@apollo/client";

export const DELETE_CUPON = gql`
mutation Mutation($codigo: String!) {
  DeleteCupon(codigo: $codigo) {
    message
    success
  }
}
`