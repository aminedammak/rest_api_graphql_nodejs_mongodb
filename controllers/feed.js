const { validationResult } = require("express-validator/check");

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
  const creator = { name: "aaaa" };
  const createdAt = new Date();

  const errors = validationResult(req).errors;
  if (!errors.isEmpty) {
    res.status(422).json({
      message: errors[0].msg,
    });
  } else {
    res.status(201).json({
      message: "Post created successfully!",
      post: {
        _id: new Date().toISOString(),
        title: title,
        content: content,
        creator: creator,
        createdAt: createdAt,
      },
    });
  }
};
