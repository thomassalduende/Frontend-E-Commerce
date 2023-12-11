import { gql } from "@apollo/client";

//TRAIGO LIBROS POR ISBN, LO USO PARA EL TEMPLATE
export const GET_BOOK_CATEGORY = gql`
query GetBook($genero: String!) {
  getBook(genero: $genero) {
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