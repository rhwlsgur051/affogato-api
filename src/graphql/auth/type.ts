import { gql } from "apollo-server-core";

export const authSchema = gql`
extend type Mutation {
    auth(body:AuthRequest):AuthResponse
}

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
`