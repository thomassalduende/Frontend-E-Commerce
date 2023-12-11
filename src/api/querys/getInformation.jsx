import { gql } from "@apollo/client";

export const GET_INFORMATION = gql`
  query Query($tokenUser: String) {
    LoginUser(tokenUser: $tokenUser) {
      user {
        nombre
        direccion {
          AgregarInfo
          dni
          direccion
          telefono
          ciudad {
            cod_postal
            nombre
            provincia {
              nombre
            }
          }
        }
      }
    }
  }
`