let users = [
  { id: "1", name: "Ahmed", email: "ahmed@example.com" },
  { id: "2", name: "Sara", email: "sara@example.com" },
];

let posts = [
  { id: "1", title: "My First Post", content: "Hello world!", authorId: "1" },
  {
    id: "2",
    title: "GraphQL is fun",
    content: "Learning GraphQL today",
    authorId: "2",
  },
];

let comments = [
  { id: "1", text: "Nice post!", postId: "1", authorId: "2" },
  { id: "2", text: "Thanks for sharing", postId: "1", authorId: "1" },
  { id: "3", text: "I agree!", postId: "2", authorId: "1" },
];

export default { users, posts, comments };
