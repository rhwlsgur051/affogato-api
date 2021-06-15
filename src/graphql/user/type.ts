import { gql } from "apollo-server-core";
export const userSchema = gql`

# Query
extend type Query {
    users:[User],
    getUser(id:Int): User
}

# Mutation
extend type Mutation {
    createUser(body: UserRequest): UserResponse
}

# 요청 타입
input UserRequest {
    name:String!,
    email:String!,
    password: String!,
}

# 반환 타입
type User {
    id: Int,
    name: String,
    email:String,
    projects: [Project]
}

# 반환 타입
type UserResponse {
    name: String,
    email: String,
}

# Projects: 자식테이블
type Project {
    title:String, 
    members: [User]
}
`;
