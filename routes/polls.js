const express = require("express");
const router = express.Router();

const db = require("../models");

//All routes prefixed with /polls/api
router.get("/",  function(req, res, next) {
    res.send("home page");
});

//Create
router.post("/",  function(req, res, next) {
    db.Poll.create(req.body)
    .then(function(newPoll) {
        res.status(201).json(newPoll);
    })
    .catch(function(err) {
        next(err);
    });
});

//Api for access to raw json
router.get("/api/:poll_id",  function(req, res, next) {
    db.Poll.findById(req.params.poll_id)
    .then(function(foundPoll) {
        res.json(foundPoll);
    })
    .catch(function(err) {
        next(err);
    });
});



//Show
router.get("/:poll_id",  function(req, res, next) {
    res.render("polls/poll", {poll : req.params.poll_id});
});

// Update (Increment option by 1 vote)
router.put("/:poll_id",  function(req, res, next) {
    db.Poll.findByIdAndUpdate(req.params.poll_id, {$inc : { [`options.${req.body.optionIndex}.votes`] : 1}})
    .then(function() {
        res.sendStatus(204);
    })
    .catch(function(err) {
        next(err);
    });
});

//Delete DEFUNCT???
// router.delete("/:poll_id", async function(req, res, next) {



module.exports = router;