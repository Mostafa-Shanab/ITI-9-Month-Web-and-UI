import { users, posts, comments } from "./data";

const resolvers = {
  Query: {
    getAllUsers: () => users,
    getAllPosts: () => posts,
    getAllComments: () => comments,

    getUserById: (parent, args) => users.find((u) => u.id === args.id),
    getPostById: (parent, args) => posts.find((p) => p.id === args.id),
    getCommentById: (parent, args) => comments.find((c) => c.id === args.id),

    getPostsByUser: (parent, args) =>
      posts.filter((p) => p.authorId === args.userId),

    getUserOfPost: (parent, args) => {
      const post = posts.find((p) => p.id === args.postId);
      if (!post) return null;
      return users.find((u) => u.id === post.authorId);
    },

    getCommentsByPost: (parent, args) =>
      comments.filter((c) => c.postId === args.postId),

    getPostOfComment: (parent, args) => {
      const comment = comments.find((c) => c.id === args.commentId);
      if (!comment) return null;
      return posts.find((p) => p.id === comment.postId);
    },
  },

  User: {
    posts: (parent) => posts.filter((p) => p.authorId === parent.id),
  },

  Post: {
    author: (parent) => users.find((u) => u.id === parent.authorId),
    comments: (parent) => comments.filter((c) => c.postId === parent.id),
  },

  Comment: {
    post: (parent) => posts.find((p) => p.id === parent.postId),
    author: (parent) => users.find((u) => u.id === parent.authorId),
  },

  Mutation: {
    addUser: (parent, args) => {
      const newUser = {
        id: String(users.length + 1),
        name: args.name,
        email: args.email,
      };
      users.push(newUser);
      return newUser;
    },
    updateUser: (parent, args) => {
      const user = users.find((u) => u.id === args.id);
      if (!user) return null;
      if (args.name) user.name = args.name;
      if (args.email) user.email = args.email;
      return user;
    },
    deleteUser: (parent, args) => {
      const index = users.findIndex((u) => u.id === args.id);
      if (index === -1) return null;
      const deleted = users[index];
      users.splice(index, 1);
      return deleted;
    },

    addPost: (parent, args) => {
      const newPost = {
        id: String(posts.length + 1),
        title: args.title,
        content: args.content,
        authorId: args.authorId,
      };
      posts.push(newPost);
      return newPost;
    },
    updatePost: (parent, args) => {
      const post = posts.find((p) => p.id === args.id);
      if (!post) return null;
      if (args.title) post.title = args.title;
      if (args.content) post.content = args.content;
      return post;
    },
    deletePost: (parent, args) => {
      const index = posts.findIndex((p) => p.id === args.id);
      if (index === -1) return null;
      const deleted = posts[index];
      posts.splice(index, 1);
      return deleted;
    },

    addComment: (parent, args) => {
      const newComment = {
        id: String(comments.length + 1),
        text: args.text,
        postId: args.postId,
        authorId: args.authorId,
      };
      comments.push(newComment);
      return newComment;
    },
    updateComment: (parent, args) => {
      const comment = comments.find((c) => c.id === args.id);
      if (!comment) return null;
      if (args.text) comment.text = args.text;
      return comment;
    },
    deleteComment: (parent, args) => {
      const index = comments.findIndex((c) => c.id === args.id);
      if (index === -1) return null;
      const deleted = comments[index];
      comments.splice(index, 1);
      return deleted;
    },
  },
};

export default resolvers;
