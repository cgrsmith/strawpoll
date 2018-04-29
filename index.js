const express = require("express");
const app = express();
const parser = require("body-parser");

const PORT = process.env.PORT || 3000;

const pollRoutes = require("./routes/polls");

app.use(parser.json());
app.use(parser.urlencoded({extended : true}));
app.use(express.static(__dirname + "/views/public"));

//app.use("/:pollId", pollRoutes);

app.get("/", function(req, res) {
    res.sendFile("index.html");
});

app.listen(PORT, function() {
    console.log("Strawpoll App running on PORT: " + PORT);
});