import { gql } from "@apollo/client";

export const withProductSearch = gql`
query Query($nombre: String, $isbn: String, $genero: String, $autor: String) {
  busquedaLibros(nombre: $nombre, isbn: $isbn, genero: $genero, autor: $autor) {
    book {
      url_imagen
      isbn
      nombre
      autor {
        nombre
      }
      genero {
        nombre
      }
      editorial {
        nombre
      }
      descuento
      descripcion
      precio
      stock
      valoracion {
        cantidad_estrellas
      }
      opiniones {
        nombre_user
        opinion
      }
    }
    message
    success
  }
}
`