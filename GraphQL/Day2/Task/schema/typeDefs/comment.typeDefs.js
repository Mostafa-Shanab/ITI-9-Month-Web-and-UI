import { gql } from "graphql-tag";

const commentTypeDefs = gql`
  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
    createdAt: String
    updatedAt: String
  }

  input AddCommentInput {
    text: String!
    postId: ID!
  }

  input UpdateCommentInput {
    text: String!
  }

  type Query {
    getAllComments: [Comment!]!
    getCommentById(id: ID!): Comment
    getCommentsByPost(postId: ID!): [Comment!]!
  }

  type Mutation {
    addComment(input: AddCommentInput!): Comment!
    updateComment(id: ID!, input: UpdateCommentInput!): Comment!
    deleteComment(id: ID!): Comment!
  }
`;

export default commentTypeDefs;
