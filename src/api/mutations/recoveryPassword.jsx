import { gql } from "@apollo/client";

export const RECOVERY_PASSWORD = gql`
mutation Mutation($email: String!) {
  RecoveryPassword(email: $email) {
    message
    success
  }
}
`