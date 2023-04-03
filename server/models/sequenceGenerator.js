const mongoose = require("mongoose");

const sequenceSchema = mongoose.Schema({
  maxPostId: { type: Number, required: true },
  maxMessageId: { type: Number, required: true },
});

module.exports = mongoose.model("Sequence", sequenceSchema);
