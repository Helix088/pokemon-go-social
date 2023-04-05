var express = require("express");
var router = express.Router();
module.exports = router;
const sequenceGenerator = require("../routes/sequenceGenerator");
const Post = require('../models/post');

router.get("/", (req, res, next) => {
  Post.find()
    .then((posts) => {
        console.log(posts)
      res.status(200).json({
        message: "Posts fetched successfully!!!",
        posts: posts,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ title: "An exception occurred", err });
    });
});

router.post("/", async (req, res, next) => {
  try {
    const postId = await sequenceGenerator.nextId("posts");

    const post = new Post({
      id: postId,
      poster: req.body.poster,
      text: req.body.text,
      image: req.body.image,
    });

    const createdPost = await post.save();
    res.status(201).json({
      message: "Post added successfully!",
      post: createdPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred",
      error: error,
    });
  };
});

router.put("/:id", (req, res, next) => {
    Post.findOne({ id: req.params.id }).then((post) => {
        post.poster = req.body.poster;
        post.text = req.body.text;
        post.image = req.body.image;

        Post.updateOne({id: req.params.id}, post).then((result) => {
            res.status(204).json({
                message: "Post updated successfully",
            });
        }).catch((error) => {
            res.status(500).json({
                message: "An error occured",
                error: error,
            });
        });
    }).catch((error) => {
        res.status(500).json({
            message: "Post not found",
            error: { post: "Post not found" },
        });
    });
});

router.delete("/:id", (req, res, next) => {
    Post.findOne({ id: req.params.id }).then((post) => {
        Post.deleteOne({id: req.params.id}).then((result) => {
            res.status(204).json({
                message: "Post deleted successfully",
            });
        }).catch((error) => {
            res.status(500).json({
                message: "An error occured",
                error: error,
            });
        });
    }).catch((error) => {
        res.status(500).json({
            message: "Post not found",
            error: {post: "Post not found"},
        })
    })
})