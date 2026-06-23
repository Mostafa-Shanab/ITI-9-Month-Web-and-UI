import Comment from "../../../models/Comment.js";

const commentQueries = {
  getAllComments: async () => {
    return await Comment.find();
  },

  getCommentById: async (_, { id }) => {
    return await Comment.findById(id);
  },

  getCommentsByPost: async (_, { postId }) => {
    return await Comment.find({ post: postId });
  },
};

export default commentQueries;
