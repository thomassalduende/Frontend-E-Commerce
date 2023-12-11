import { gql } from "@apollo/client";


export const GET_CATEGORY = gql`
query GetGeneros {
  getGeneros {
    genero {
      id_genero
      nombre
      url_imagen
    }
  }
}
`