const Sequence = require("../models/sequenceGenerator");

let maxMessageId;
let maxPostId;
let sequence;

async function getSequence() {
  try {
    sequence = await Sequence.findOne();
    maxPostId = sequence.maxPostId;
    maxMessageId = sequence.maxMessageId;
    maxJournalId = sequence.maxJournalId;
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
      case "journals":
        await getSequence();
        maxJournalId++;
        updateObject = { maxJournalId };
        nextId = maxJournalId;
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