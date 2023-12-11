import { gql } from "@apollo/client";

export const UPDATE_CATEGORY = gql`
mutation Mutation($nombreOrig: String!, $nombre: String!, $urlImagen: String!) {
  updateGenero(nombre_orig: $nombreOrig, nombre: $nombre, url_imagen: $urlImagen) {
    message
    success
  }
}
`