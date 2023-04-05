var express = require("express");
var router = express.Router();
module.exports = router;
const mongoose = require("mongoose");
const sequenceGenerator = require("./sequenceGenerator");
const Message = require("../models/message");

router.get("/", (req, res, next) => {
  Message.find({})
    .then((messages) => {
      return res.status(200).json({ messages: messages });
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
});

router.post("/", async (req, res, next) => {
  try {
    const messageId = await sequenceGenerator.nextId("messages");

    const message = new Message({
      id: messageId,
      poster: req.body.poster,
      msgText: req.body.msgText,
      image: req.body.image,
    });

    const createdMessage = await message.save();
    res.status(201).json({
      messageString: "Message added successfully!",
      message: createdMessage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred",
      error: error,
    });
  }
});


// router.post("/", (req, res, next) => {
//   const maxMessageId = sequenceGenerator.nextId("messages");

//   const messageNew = new Message({
//     id: maxMessageId,
//     subject: req.body.subject,
//     msgText: req.body.msgText,
//     sender: req.body.sender,
//   });

//   messageNew
//     .save()
//     .then((createdMessage) => {
//       res.status(201).json({
//         message: "Message added successfully",
//         messageNew: createdMessage,
//       });
//     })
//     .catch((error) => {
//       res.status(500).json({
//         message: "An error occurred",
//         error: error,
//       });
//     });
// });

router.put("/:id", (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then((message) => {
      message.msgText = req.body.msgText;
      message.sender = req.body.sender;

      Message.updateOne({ id: req.params.id }, message)
        .then((result) => {
          res.status(204).json({
            message: "Message updated successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Message not found.",
        error: { message: "Message not found" },
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then((message) => {
      Message.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: "Message deleted successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Message not found.",
        error: { message: "Message not found" },
      });
    });
});
