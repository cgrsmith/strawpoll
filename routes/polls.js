const express = require("express");
const router = express.Router();

const db = require("../models");


router.get("/", function(req, res) {
    res.send("route");
});

router.post("/", function(req, res) {
    res.send("post");
});

router.get("/:poll_id", function(req, res) {
    res.send("get" + req.params.poll_id);
});

router.put("/:poll_id", function(req, res) {
    res.send("put" + req.params.poll_id);
});

router.delete("/:poll_id", function(req, res) {
    res.send("delete" + req.params.poll_id);
});


module.exports = router;