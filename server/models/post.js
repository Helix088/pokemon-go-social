const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  id: { type: String, required: true },
  poster: { type: String, required: true },
  text: { type: String },
  image: { type: String },
});

module.exports = mongoose.model("Post", postSchema);
