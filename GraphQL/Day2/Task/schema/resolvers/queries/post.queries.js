import Post from "../../../models/Post.js";

const postQueries = {
  getAllPosts: async () => {
    return await Post.find();
  },

  getPostById: async (_, { id }) => {
    return await Post.findById(id);
  },

  getPostsByUser: async (_, { userId }) => {
    return await Post.find({ author: userId });
  },
};

export default postQueries;
