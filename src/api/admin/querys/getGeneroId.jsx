import { gql } from "@apollo/client";

export const GET_GENERO_ID = gql`
  query GetGeneroId($getGeneroIdId: String!) {
    getGeneroId(id: $getGeneroIdId) {
      genero {
        id_genero
        nombre
        url_imagen
      }
      message
    }
  }`