const express = require("express");
const router = express.Router();
const moment = require("moment");

const db = require("../models");

//All routes prefixed with /polls/api
router.get("/",  function(req, res, next) {
    db.Poll.find()
        .sort({createdAt : -1})
        .limit(5)
    .then(function(polls) {
        let pollList = polls.map(poll => (
            {
                _id : poll._id,
                title : poll.title,
                createdAt : moment(poll.createdAt).fromNow(),
                votes : poll.options.reduce((acc, cur) => {
                    return acc + parseInt(cur.votes);
                }, 0)
            }
        ));
        res.render("polls/landing", {polls : pollList});
    })
    .catch(function(err) {
        next(err);
    });
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

router.get("/new", function(req, res, next) {
    res.render("polls/new");
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


module.exports = router;