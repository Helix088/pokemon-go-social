var Sequence = require('../models/sequenceGenerator');

var maxMessageId;
var maxPostId;
var sequenceId = null;

function SequenceGenerator() {

  Sequence.findOne()
    .then(function (sequence) {
      sequenceId = sequence._id;
      maxPostId = sequence.maxPostId;
      maxMessageId = sequence.maxMessageId;
    })
    .catch(function (err) {
      console.log("SequenceGenerator error = " + err);
    });
}

SequenceGenerator.prototype.nextId = function(collectionType) {

  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case 'posts':
      maxPostId++;
      updateObject = {maxPostId: maxPostId};
      nextId = maxPostId;
      break;
    case 'messages':
      maxMessageId++;
      updateObject = {maxMessageId: maxMessageId};
      nextId = maxMessageId;
      break;
    default:
      return -1;
  }

  Sequence.updateOne(
    { _id: sequenceId },
    { $set: updateObject },
    function (err) {
      if (err) {
        console.log("An error occurred while updating the sequence: " + err);
      }
    }
  );

  return nextId;
}

module.exports = new SequenceGenerator();