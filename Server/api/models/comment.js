const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  post_id: { type: String, ref: "Post", required: true },
  user_id: { type: String, ref: "User", required: true },
  comment: { type: String, required: true },
});

module.exports = mongoose.model("Comment", commentSchema);
