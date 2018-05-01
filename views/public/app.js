$(document).ready(function() {
    const pollId = $("main").attr("poll");
    $.getJSON("/polls/api/" + pollId)
        .then(showOptions);

    
    $("button").on("click", function() {
        addVote($(this).parent());
    });

    $("#optionList").on("click", ".option", function() {
        addVote($(this));
    })

    function showOptions(pollData) {
        $(".loader").hide();
        $(".content").show();

        $("#pollTitle").text(pollData.title)
        pollData.options.forEach(function(option, index) {
            addOption(option, index);
        });

        var options = $("#optionList").children().children(".votes");

        (function pollServer() {
            $.getJSON("/polls/api/" + pollId, function(data) {
                showVotes(options, data);
                setTimeout(pollServer, 500);
            })
        })();
    }


    function addOption(option, index) {
        var newOption = $("<li class='option'><span>"+option.title+": </span><span class='votes'>"+option.votes+
            "</span><span> Votes</span></li>");
        newOption.data("index", index);
        $("#optionList").append(newOption);
    }

    async function addVote(option) {
        $.ajax({
            method : "PUT",
            url : "/polls/" + pollId, 
            data: {optionIndex : option.data("index")}
        })
        .catch(function(err) {
            console.log("ajax error" +err);
        });
    }

    function showVotes(options, newData) {
        //console.log(newData);
        options.each(function(index) {
            options[index].textContent = newData.options[index].votes;
        })
    }
});

