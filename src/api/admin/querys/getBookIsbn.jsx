import { gql } from "@apollo/client";

export const GET_BOOK_ISBN = gql`
query GetBook($isbn: String) {
  getBook(isbn: $isbn) {
    book {
      nombre
      isbn
      url_imagen
      editorial {
        nombre
      }
      autor {
        nombre
      }
      descripcion
      precio
      stock
      genero {
        nombre
      }
      fecha_ingreso
      descuento
    }
  }
}
`