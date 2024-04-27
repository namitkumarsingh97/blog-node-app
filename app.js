const express = require("express");
const bodyParser = require("body-parser");
const posts = require("./data/postsData");

const app = express();
const port = 4000;

let lastId = 3;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// GET All posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const specificID = req.params.id;
  const findPost = posts.find((post) => post.id == specificID);
  res.json(findPost);
});

// Create a new post
app.post("/posts", (req, res) => {
  const newId = (lastId += 1);
  const newPost = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
  };
  lastId = newId;
  posts.push(newPost);
  res.status(201).json(newPost);
});

// Partially update a post
app.patch("/posts/:id", (req, res) => {
  const idOfPost = req.params.id;
  const findPostById = posts.find((post) => post.id == idOfPost);
  if (!findPostById) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) {
    findPostById.title = req.body.title;
  }
  if (req.body.content) {
    findPostById.content = req.body.content;
  }
  if (req.body.author) {
    findPostById.author = req.body.author;
  }

  res.json(findPostById);
});

// DELETE a specific post by providing the post id.
app.delete("/posts/:id", (req, res) => {
  const idOfPost = req.params.id;
  const postIndex = posts.findIndex((post) => post.id == idOfPost);
  if (postIndex == -1) {
    return res.status(404).json({ message: "Post didn't found." });
  }
  posts.splice(postIndex, 1);
  res.json({ message: "Post Deleted" });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
