var express = require("express");
var router = express.Router();
module.exports = router;
const sequenceGenerator = require("../models/sequenceGenerator");
const Post = require('../models/post');

router.get("/", (req, res, next) => {
    Post.find({}).then((posts) => {
        return res.status(200).json({posts: posts});
    }).catch((err) => {
        return res.status(500).json({ error: err });
    });
});

router.post("/", (req, res, next) => {
    const maxPostId = sequenceGenerator.nextId("posts");

    const post = new Post({
        id: maxPostId,
        poster: req.body.poster,
        text: req.body.text,
        image: req.body.image,
    });

    post.save().then((createdPost) => {
        req.status(201).json({
            message: "Post added successfully",
            post: createdPost,
        });
    }).catch((error) => {
        res.status(500).json({
            message: "An error occured",
            error: error,
        });
    });
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