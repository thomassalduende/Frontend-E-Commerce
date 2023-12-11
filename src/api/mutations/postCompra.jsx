import { gql } from "@apollo/client";

export const POST_COMPRA = gql`
mutation Mutation($tokenUser: String!) {
  realizarCompra(tokenUser: $tokenUser) {
    init_p
    message
    success
  }
}
`