import queries from "./queries/index.js";
import mutations from "./mutations/index.js";
import fieldResolvers from "./fieldResolvers.js";

const resolvers = {
  Query: queries,
  Mutation: mutations,
  ...fieldResolvers, // adds User.posts, Post.author, Post.comments, Comment.author, Comment.post
};

export default resolvers;
