import { gql } from "@apollo/client";

export const DATA_USER = gql`
mutation AgregarDireccionUser($tokenUser: String!, $nombre: String!, $dni: String!, $direccion: String!, $nombreCiudad: String!, $nombreProv: String!, $agregarInfo: String!, $telefono: String!, $codPostal: String!) {
  agregarDireccionUser(tokenUser: $tokenUser, nombre: $nombre, dni: $dni, direccion: $direccion, nombre_ciudad: $nombreCiudad, nombre_prov: $nombreProv, AgregarInfo: $agregarInfo, telefono: $telefono, cod_postal: $codPostal) {
    message
    success
  }
}
`




