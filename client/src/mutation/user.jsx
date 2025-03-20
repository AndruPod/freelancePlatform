import {gql} from "@apollo/client";

export const REGISTER = gql`
    mutation($input: UserInput!) {
        register(input: $input) {
            token
        }
    }
`

export const LOGIN = gql`
    mutation($input: UserInput!) {
        login(input: $input) {
            token
        }
    }
`