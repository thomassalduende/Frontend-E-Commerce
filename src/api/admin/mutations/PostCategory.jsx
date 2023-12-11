import { gql } from "@apollo/client";

export const POST_CATEGORY = gql`
  mutation Mutation($nombre: String!, $urlImagen: String!) {
    insertGenero(nombre: $nombre, url_imagen: $urlImagen) {
      success
      message
    }
  }
`