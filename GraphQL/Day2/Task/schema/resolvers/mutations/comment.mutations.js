import { GraphQLError } from "graphql";
import Comment from "../../../models/Comment.js";
import Post from "../../../models/Post.js";
import { requireAuth } from "../../../middleware/auth.js";

const commentMutations = {
  addComment: async (_, { input }, context) => {
    const currentUser = requireAuth(context);

    const post = await Post.findById(input.postId);
    if (!post) {
      throw new GraphQLError("Post not found", {
        extensions: { code: "NOT_FOUND" },
      });
    }

    const comment = await Comment.create({
      text: input.text,
      author: currentUser.id,
      post: input.postId,
    });

    return comment;
  },

  updateComment: async (_, { id, input }, context) => {
    const currentUser = requireAuth(context);

    const comment = await Comment.findById(id);
    if (!comment) {
      throw new GraphQLError("Comment not found", {
        extensions: { code: "NOT_FOUND" },
      });
    }

    if (comment.author.toString() !== currentUser.id) {
      throw new GraphQLError("You can only update your own comments", {
        extensions: { code: "FORBIDDEN" },
      });
    }

    comment.text = input.text;
    await comment.save();

    return comment;
  },

  deleteComment: async (_, { id }, context) => {
    const currentUser = requireAuth(context);

    const comment = await Comment.findById(id);
    if (!comment) {
      throw new GraphQLError("Comment not found", {
        extensions: { code: "NOT_FOUND" },
      });
    }

    if (comment.author.toString() !== currentUser.id) {
      throw new GraphQLError("You can only delete your own comments", {
        extensions: { code: "FORBIDDEN" },
      });
    }

    await Comment.findByIdAndDelete(id);
    return comment;
  },
};

export default commentMutations;
