import { gql } from "apollo-server-core";

export const authSchema = gql`
input AuthRequest {
    email:String!,
    password:String!,
    mode:String!
}

type AuthResponse {
    token:String,
    email:String,
    name:String,
}

extend type Mutation {
    auth(body:AuthRequest):AuthResponse
}
`