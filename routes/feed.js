const express = require("express");
const router = express.Router();
const { body } = require("express-validator/check");
const feedController = require("../controllers/feed");

//GET /feed/posts
router.get("/posts", feedController.getPosts);

//POST /feed/post
router.post(
  "/post",
  [
    body("title")
      .trim()
      .isLength({ min: 5 })
      .withMessage(
        "The length of the title field should be at least 5 characters"
      ),
    body("content")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Content's length cannont be less than 5 characters"),
  ],
  feedController.createPost
);

module.exports = router;
