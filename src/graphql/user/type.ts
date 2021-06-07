import { gql } from "apollo-server-core";
export const userSchema = gql`

extend type Query {
    users:[User],
    getUser(id:Int): User
}

extend type Mutation {
    createUser(body: UserRequest): UserResponse
}

type User {
    id: Int,
    name: String,
    email:String,
    projects: [Project]
}

input UserRequest {
    name:String!,
    email:String!,
    password: String!,
}

type UserResponse {
    name: String,
    email: String,
}

type Project {
    title:String, 
    members: [User]
}
`;
