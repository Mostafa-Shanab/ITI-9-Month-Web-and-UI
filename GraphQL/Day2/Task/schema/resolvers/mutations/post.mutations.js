import { GraphQLError } from "graphql";
import Post from "../../../models/Post.js";
import { requireAuth } from "../../../middleware/auth.js";

const postMutations = {
  addPost: async (_, { input }, context) => {
    const currentUser = requireAuth(context);

    const post = await Post.create({
      title: input.title,
      content: input.content,
      author: currentUser.id,
    });

    return post;
  },

  updatePost: async (_, { id, input }, context) => {
    const currentUser = requireAuth(context);

    const post = await Post.findById(id);
    if (!post) {
      throw new GraphQLError("Post not found", {
        extensions: { code: "NOT_FOUND" },
      });
    }

    if (post.author.toString() !== currentUser.id) {
      throw new GraphQLError("You can only update your own posts", {
        extensions: { code: "FORBIDDEN" },
      });
    }

    if (input.title !== undefined) post.title = input.title;
    if (input.content !== undefined) post.content = input.content;
    await post.save();

    return post;
  },

  deletePost: async (_, { id }, context) => {
    const currentUser = requireAuth(context);

    const post = await Post.findById(id);
    if (!post) {
      throw new GraphQLError("Post not found", {
        extensions: { code: "NOT_FOUND" },
      });
    }

    if (post.author.toString() !== currentUser.id) {
      throw new GraphQLError("You can only delete your own posts", {
        extensions: { code: "FORBIDDEN" },
      });
    }

    await Post.findByIdAndDelete(id);
    return post;
  },
};

export default postMutations;
