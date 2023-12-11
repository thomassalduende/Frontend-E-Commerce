import { gql } from "@apollo/client";

export const POST_BOOK = gql`
mutation Mutation($isbn: String!, $imagen: String!, $nombre: String!, $precio: Float!, $stock: Float!, $descripcion: String!, $fechaIngreso: String!, $editorial: String!, $descuento: Float!, $genero: [String!]!, $autor: [String!]!) {
  insertBook(isbn: $isbn, imagen: $imagen, nombre: $nombre, precio: $precio, stock: $stock, descripcion: $descripcion, fecha_ingreso: $fechaIngreso, editorial: $editorial, descuento: $descuento, genero: $genero, autor: $autor) {
    message
    success
  }
}
`