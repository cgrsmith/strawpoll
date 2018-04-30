const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/strawpoll";

mongoose.connect(DB_URL);
mongoose.Promise = Promise;

module.exports.Poll = require("./poll");