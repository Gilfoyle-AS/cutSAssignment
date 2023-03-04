const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const mongoose = require("mongoose");
const checkAuth = require("../middleware/check-auth");

router.get("/:id", checkAuth, (req, res) => {
  const id = req.params.id;
  Post.findById(id)
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
  const post = new Post({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    content: req.body.content,
  });
  post
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
});
router.delete("/", checkAuth, (req, res) => {
  Post.remove({ _id: req.params.id })
    .exec()
    .then((result) => {
      res
        .status(200)
        .json({
          message: "User Deleted",
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
          });
        });
    });
});
// router.patch("/", (req, res) => {});

module.exports = router;
