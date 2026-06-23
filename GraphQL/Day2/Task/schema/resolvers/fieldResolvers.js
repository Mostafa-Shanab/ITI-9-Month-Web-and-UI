import User from "../../models/User.js";
import Post from "../../models/Post.js";
import Comment from "../../models/Comment.js";

const fieldResolvers = {
  User: {
    posts: async (parent) => {
      return await Post.find({ author: parent.id });
    },
  },

  Post: {
    author: async (parent) => {
      return await User.findById(parent.author);
    },
    comments: async (parent) => {
      return await Comment.find({ post: parent.id });
    },
  },

  Comment: {
    author: async (parent) => {
      return await User.findById(parent.author);
    },
    post: async (parent) => {
      return await Post.findById(parent.post);
    },
  },
};

export default fieldResolvers;
