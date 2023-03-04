const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  desc: { type: String, required: true },
  doneState: { type: Boolean, default: false },
  user_id: { type: String, ref: "User" },
});

module.exports = mongoose.model("Todo", todoSchema);
