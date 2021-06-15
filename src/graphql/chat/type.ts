import { gql } from "apollo-server-core";
export const chatSchema = gql`

# Query
extend type Query {
    getChats:[Chat],
}

# Mutation
extend type Mutation {
    createChat(body: ChatRequest): ChatResponse
}

# 요청 타입
input ChatRequest {
    content: String!,
}

# 반환 타입
type Chat {
    id: Int,
    content: String,
}

# 반환 타입
type ChatResponse {
    content: String,
}
`;
