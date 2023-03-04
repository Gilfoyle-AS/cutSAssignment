const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");
const Post = require("../models/post");
const checkAuth = require("../middleware/check-auth");
const mongoose = require("mongoose");

router.get("/:id", checkAuth, (req, res) => {
  const id = req.params.id;
  Comment.findById(id)
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: "id not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/", checkAuth, (req, res) => {
  Post.findById(req.body.postid)
    .then((post) => {
      if (!post) {
        return res.status(404).json({
          message: "Post not found",
        });
      }
      const comment = new Comment({
        _id: new mongoose.Types.ObjectId(),
        user_id: req.userData.id,
        post_id: req.body.postid,
        comment: req.body.comment,
      });
      comment
        .save()
        .then((result) => {
          console.log(result);
          res.status(201).json({
            message: "Success",
            id: result._id,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: "invalid post id", error: err });
    });
});

router.delete("/:id", (req, res) => {
  Comment.remove({ _id: req.params.id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Order deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "invalid post id", error: err });
    });
});

module.exports = router;
