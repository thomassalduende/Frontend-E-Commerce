import { gql } from "@apollo/client";

export const GET_VENTAS = gql`
query GetFactura {
  getFactura {
    message
    success
    factura {
      fecha
      monto
      factura_detalle {
        cantidad
        precio
        book {
          nombre
        }
      }
    }
  }
}
`