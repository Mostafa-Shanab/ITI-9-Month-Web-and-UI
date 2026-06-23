import { gql } from "graphql-tag";

const postTypeDefs = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    comments: [Comment!]
    createdAt: String
    updatedAt: String
  }

  input AddPostInput {
    title: String!
    content: String!
  }

  input UpdatePostInput {
    title: String
    content: String
  }

  type Query {
    getAllPosts: [Post!]!
    getPostById(id: ID!): Post
    getPostsByUser(userId: ID!): [Post!]!
  }

  type Mutation {
    addPost(input: AddPostInput!): Post!
    updatePost(id: ID!, input: UpdatePostInput!): Post!
    deletePost(id: ID!): Post!
  }
`;

export default postTypeDefs;
