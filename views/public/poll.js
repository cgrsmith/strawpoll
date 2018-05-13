$(document).ready(function() {
    const pollId = $("main").attr("poll");


    $.getJSON("/polls/api/" + pollId)
        .then(showOptions);

    $("button").on("click", function() {
        addVote($(this).parent());
    });

    $("#optionList").on("click", "li.enabled", function() {
        addVote($(this));
    })

    function showOptions(pollData) {
        var date = new Date(pollData.createdAt)
        $(".loader").hide();
        $(".content").show();

        $("#pollTitle").text(pollData.title);
        $(".timestamp").text(date.toLocaleString());
        pollData.options.forEach(function(option, index) {
            addOption(option, index);
            if(index !== pollData.length - 1) {
                $("#optionList").append($("<hr>"));
            }
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
        var newOption = $("<li class='option enabled'><span><strong>"+option.title+": </strong></span><span class='votes'>"
            +option.votes+"</span><span> Votes</span></li>");
        newOption.data("index", index);
        $("#optionList").append(newOption);
    }

    function addVote(option) {
        //option.removeClass("enabled");
        let a = $.ajax({
            method : "PUT",
            url : "/polls/" + pollId, 
            data: {optionIndex : option.data("index")}
        }).then(function() {
            option.addClass("enabled");
        })
        .catch(function(err) {
            option.addClass("enabled");
        });
    }

    function showVotes(options, newData) {
        //console.log(newData);
        options.each(function(index) {
            options[index].textContent = newData.options[index].votes;
        });

        drawChart(newData);
    }

    function drawChart(data){
        var options = {
            grid: {
                drawBorder: false, 
                drawGridlines: false,
                shadow:false
            },
            seriesDefaults: {
              renderer: jQuery.jqplot.PieRenderer,
              rendererOptions: { padding: 8, showDataLabels: true }
            },
            legend: { show:true, location: 's' }
        };
        let chartData = data.options.map(option => [option.title, option.votes]);
        $.jqplot('chartContainer', [[...chartData]], options);
        
    };

});

