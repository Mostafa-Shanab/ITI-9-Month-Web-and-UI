import { gql } from "apollo-server";

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post]
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User
    comments: [Comment]
  }

  type Comment {
    id: ID!
    text: String!
    post: Post
    author: User
  }

  type Query {
    # Retrieve all records
    getAllUsers: [User]
    getAllPosts: [Post]
    getAllComments: [Comment]

    # Retrieve a specific record by ID
    getUserById(id: ID!): User
    getPostById(id: ID!): Post
    getCommentById(id: ID!): Comment

    # Relationship queries
    getPostsByUser(userId: ID!): [Post]
    getUserOfPost(postId: ID!): User
    getCommentsByPost(postId: ID!): [Comment]
    getPostOfComment(commentId: ID!): Post
  }

  type Mutation {
    # User mutations
    addUser(name: String!, email: String!): User
    updateUser(id: ID!, name: String, email: String): User
    deleteUser(id: ID!): User

    # Post mutations
    addPost(title: String!, content: String!, authorId: ID!): Post
    updatePost(id: ID!, title: String, content: String): Post
    deletePost(id: ID!): Post

    # Comment mutations
    addComment(text: String!, postId: ID!, authorId: ID!): Comment
    updateComment(id: ID!, text: String): Comment
    deleteComment(id: ID!): Comment
  }
`;

export default typeDefs;
