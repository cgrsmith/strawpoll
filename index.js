const express = require("express");
const app = express();
const parser = require("body-parser");

const PORT = process.env.PORT || 3000;

const pollRoutes = require("./routes/polls");

app.use(parser.json());
app.use(parser.urlencoded({extended : true}));
app.use(express.static(__dirname + "/views/public"));

app.set("view engine", "ejs");

//setup routes
app.use("/polls", pollRoutes);

//Error Routes
app.use(function(req, res, next) {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500).json({
        error : {
            message : err.message || "Oops, something went wrong."
        }
    });
});

app.listen(PORT, function() {
    console.log("Strawpoll App running on PORT: " + PORT);
});