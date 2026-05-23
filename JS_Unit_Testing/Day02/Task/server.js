const express = require("express");

const app = express();

app.use(express.json());

let posts = [
  {
    id: 1,
    title: "First Post",
  },
];

app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

app.post("/posts", (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  };

  posts.push(newPost);

  res.status(201).json(newPost);
});

module.exports = app;
