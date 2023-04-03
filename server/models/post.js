const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  id: { type: String, required: true },
  poster: { type: String, required: true },
  text: { type: String },
  image: { type: String },
  children: { type: Array, ref: "Post" },
});

module.exports = mongoose.model("Post", postSchema);
