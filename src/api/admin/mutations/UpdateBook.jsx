import { gql } from "@apollo/client";

export const UPDATE_BOOK = gql`
mutation Mutation($isbnOrig: String!, $isbn: String!, $imagen: String!, $nombre: String!, $precio: Float!, $stock: Float!, $descripcion: String!, $fechaIngreso: String!, $editorial: String!, $descuento: Float!, $genero: [String!]!, $autor: [String!]!) {
  updateBook(isbn_orig: $isbnOrig, isbn: $isbn, imagen: $imagen, nombre: $nombre, precio: $precio, stock: $stock, descripcion: $descripcion, fecha_ingreso: $fechaIngreso, editorial: $editorial, descuento: $descuento, genero: $genero, autor: $autor) {
    message
    success
  }
}
`