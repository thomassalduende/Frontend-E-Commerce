import { gql } from "@apollo/client"
export const GET_PRODUCTS_ALL = gql`
query {
  getBook {
    book {
      nombre
      isbn
      url_imagen 
      precio
      stock
      descuento
      descripcion
      editorial {
        nombre
      }
      genero {
        nombre
      }
      autor {
        nombre
      }
            
    }
  }
}
`