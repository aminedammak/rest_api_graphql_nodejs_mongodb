const { validationResult } = require("express-validator/check");
const Post = require("../models/post");

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        title: "post 1 title",
        content: "Content of post1",
        imageUrl: "images/duck.jpg",
        creator: "Amine",
        createdAt: new Date(),
      },
    ],
  });
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log("errors not empty", validationResult(req));
    return res.status(422).json({
      message: "Error in post creation",
      errors: errors.array(),
    });
  }
  console.log("no errors", errors);

  const post = new Post({
    title: title,
    content: content,
    imageUrl: "/images/duck.jpg",
    creator: "Amine",
  });
  post
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Post created successfully!",
        post: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
