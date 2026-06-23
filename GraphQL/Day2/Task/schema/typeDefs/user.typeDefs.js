import { gql } from "graphql-tag";

const userTypeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    posts: [Post!]
    createdAt: String
    updatedAt: String
  }

  # Returned after register/login: the token must be sent as
  # "Authorization: Bearer <token>" header on future requests.
  type AuthPayload {
    token: String!
    user: User!
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input UpdateUserInput {
    username: String
    email: String
  }

  type Query {
    getAllUsers: [User!]!
    getUserById(id: ID!): User
  }

  type Mutation {
    register(input: RegisterInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): User!
  }
`;

export default userTypeDefs;
