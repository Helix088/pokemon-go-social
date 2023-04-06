var express = require("express");
var router = express.Router();
module.exports = router;
const sequenceGenerator = require("../routes/sequenceGenerator");
const Journal = require('../models/journal');

router.get("/", (req, res, next) => {
    Journal.find()
      .then((journals) => {
        console.log(journals);
        res.status(200).json({
          message: "Journals fetched successfully!!!",
          journals: journals,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ title: "An exception occurred", err });
      });
})

router.post("/", async (req, res, next) => {
  try {
    const journalId = await sequenceGenerator.nextId("journals");

    const journal = new Journal({
      id: journalId,
      date: req.body.date,
      text: req.body.text,
    });

    const createdJournal = await journal.save();
    res.status(201).json({
      message: "Journal added successfully!",
      journal: createdJournal,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred",
      error: error,
    });
  }
});

router.put("/:id", (req, res, next) => {
  Journal.findOne({ id: req.params.id })
    .then((journal) => {
      journal.date = req.body.date;
      journal.text = req.body.text;

      Journal.updateOne({ id: req.params.id }, journal)
        .then((result) => {
          res.status(204).json({
            message: "Journal updated successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occured",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Journal not found",
        error: { journal: "Journal not found" },
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Journal.findOne({ id: req.params.id })
    .then((journal) => {
      Journal.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: "Journal deleted successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occured",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Journal not found",
        error: { journal: "Journal not found" },
      });
    });
});