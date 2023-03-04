const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./api/routes/user");
const todoRoutes = require("./api/routes/todo");
const postRoutes = require("./api/routes/post");
const commentRoutes = require("./api/routes/comment");

// const port = 3000
mongoose.connect("mongodb://localhost:27017/cutshort");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/user", userRoutes);

app.use("/todo", todoRoutes);

app.use("/post", postRoutes);

app.use("/comment", commentRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

// app.get("/user", (req, res) => {
//   res.status(200).json({ msg: "Hello World!" });
// });

// app.get("/login", (req, res) => {
//   res.status(200).json({ msg: "Hello World!" });
// });

// app.get("/todo", (req, res) => {
//   res.status(200).json({ msg: "Hello World!" });
// });

// app.get("/todo", (req, res) => {
//   res.status(200).json({ msg: "Hello World!" });
// });
// app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;
