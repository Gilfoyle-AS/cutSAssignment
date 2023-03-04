const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const Todo = require("../models/todo");
const mongoose = require("mongoose");

router.post("/", checkAuth, (req, res) => {
  const todo = new Todo({
    _id: new mongoose.Types.ObjectId(),
    desc: req.body.desc,
    user_id: req.userData.id,
  });
  todo
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
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Todo.findById(id)
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
router.delete("/", checkAuth, (req, res) => {
  Todo.findById(req.params.id)
    .populate("user_id")
    .exec()
    .then((doc) => {
      if (doc && doc.user_id._id == req.userData.id) {
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
      }
    });
});
router.patch("/toggle/:id", checkAuth, (req, res) => {
  Todo.findById(req.params.id)
    .populate("user_id")
    .exec()
    .then((doc) => {
      console.log(doc);
      console.log(req.userData);
      if (doc && doc.user_id._id == req.userData.id) {
        Todo.updateOne({ _id: req.params.id }, { doneState: !doc.doneState })
          .exec()
          .then((result) => {
            console.log(result);
            return res.status(200).json({
              message: "Marked as " + !doc.doneState,
            });
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json({
              error: err,
            });
          });
      } else {
        return res.status(404).json({ message: "id not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.patch("/:id", checkAuth, (req, res) => {
  Todo.findById(req.params.id)
    .populate("user_id")
    .exec()
    .then((doc) => {
      if (doc && doc.user_id._id == req.userData.id) {
        if (req.body.desc) {
          Todo.updateOne({ _id: req.params.id }, { desc: req.body.desc })
            .exec()
            .then((result) => {
              console.log(result);
              return res.status(200).json({
                message: "todo updated",
              });
            })
            .catch((err) => {
              console.log(err);
              return res.status(500).json({
                error: err,
              });
            });
        } else {
          return res.status(403).json({
            message: "desc parameter missing",
          });
        }
      } else {
        return res.status(404).json({ message: "id not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
