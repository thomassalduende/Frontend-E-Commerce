import { gql } from "@apollo/client";

export const DELETE_CATEGORY = gql`
mutation Mutation($nombre: String!) {
  deleteGenero(nombre: $nombre) {
    message
    success
  }
}
`