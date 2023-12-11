import { gql } from "@apollo/client";

export const POST_CUPON = gql`
mutation Mutation($codigo: String!, $descuento: Float!) {
  InsertCupon(codigo: $codigo, descuento: $descuento) {
    message
    success
  }
}
`