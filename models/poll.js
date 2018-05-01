const mongoose = require("mongoose");

const PollSchema = new mongoose.Schema({
    title : {
        type : String,
        required : "Poll question must have a title",
        maxLength : 256
    },
    options : [{
        title : {
            type : String,
            required : "Option must have a title",
            maxLength : 256
        },
        votes : {
            type : Number,
            required : true,
            default : 0
        }
    }]
},
{
    timestamps : true
});

const Poll = mongoose.model("Poll", PollSchema);

module.exports = Poll;