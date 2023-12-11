import { gql } from "@apollo/client";

export const POST_CUPON = gql`
  mutation Mutation($codigo: String!, $tokenUser: String!) {
    agregarCupon(codigo: $codigo, tokenUser: $tokenUser) {
      success
      message
      cupon {
        cantidad_descuento
      }
      
    }
  }
`