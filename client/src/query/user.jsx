import {gql} from "@apollo/client";

export const GET_ALL_USERS = gql`
    query {
        getAllUsers {
            id
            username
            role    
        }
    }
`

// const GET_ONE_USER = gql`
//
// `

// export const CHECK_AUTH = gql`
//     query($input: CheckAuthInput!) {
//         checkAuth(input: $input) {
//             user {
//                 id
//             }, token
//         }
//     }
// `

export const CHECK_AUTH = gql`
    query {
        checkAuth {
            token
        }
    }
`