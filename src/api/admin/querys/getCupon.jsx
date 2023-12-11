import { gql } from "@apollo/client";

export const GET_CUPON = gql`
  query Query {
    getCupones {
      message
      success
      cupon {
        codigo
        cantidad_descuento
      }
    }
  }
`