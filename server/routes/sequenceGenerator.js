// var Sequence = require('../models/sequenceGenerator');

// var maxMessageId;
// var maxPostId;
// var sequenceId = null;

// function SequenceGenerator() {

//   Sequence.findOne()
//     .then(function (sequence) {
//       sequenceId = sequence._id;
//       maxPostId = sequence.maxPostId;
//       maxMessageId = sequence.maxMessageId;
//     })
//     .catch(function (err) {
//       console.log("SequenceGenerator error = " + err);
//     });
// }

// SequenceGenerator.prototype.nextId = function(collectionType) {

//   var updateObject = {};
//   var nextId;

//   switch (collectionType) {
//     case 'posts':
//       maxPostId++;
//       updateObject = {maxPostId: maxPostId};
//       nextId = maxPostId;
//       break;
//     case 'messages':
//       maxMessageId++;
//       updateObject = {maxMessageId: maxMessageId};
//       nextId = maxMessageId;
//       break;
//     default:
//       return -1;
//   }

//   Sequence.updateOne(
//     { _id: sequenceId },
//     { $set: updateObject },
//     function (err) {
//       if (err) {
//         console.log("An error occurred while updating the sequence: " + err);
//       }
//     }
//   );

//   return nextId;
// }

// module.exports = new SequenceGenerator();

const Sequence = require("../models/sequenceGenerator");

let maxMessageId;
let maxPostId;
let sequence;

async function getSequence() {
  try {
    sequence = await Sequence.findOne();
    maxPostId = sequence.maxPostId;
    maxMessageId = sequence.maxMessageId;
  } catch (err) {
    console.log(`SequenceGenerator error: ${err}`);
  }
}

getSequence();

class SequenceGenerator {
  static async nextId(collectionType) {
    let updateObject = {};
    let nextId;

    switch (collectionType) {
      case "posts":
        await getSequence();
        maxPostId++;
        updateObject = { maxPostId };
        nextId = maxPostId;
        break;
      case "messages":
        await getSequence();
        maxMessageId++;
        updateObject = { maxMessageId };
        nextId = maxMessageId;
        break;
      default:
        return -1;
    }

    try {
      await Sequence.updateOne({ _id: sequence._id }, { $set: updateObject });
    } catch (err) {
      console.log(`An error occurred while updating the sequence: ${err}`);
    }

    return nextId;
  }
}

module.exports = SequenceGenerator;