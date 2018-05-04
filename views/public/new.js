$(document).ready(function() {

    $("#newPollForm").on("submit", function(e) {
        e.preventDefault();
        let inputs = $("#newPollForm").serializeArray();
        let  submitObj = {
            title : inputs[0].value,
            options : inputs.slice(1).map(option => ({title : option.value}))
        }
        submitPoll(submitObj);
    });

    $("#optionList").on("click", "span", function() {
        removeOptionInput($(this).parent());
    });

    $("#addOption").on("click", function() {
        let newOption = $("<li><input type='text' name='option'><span>X</span></li>");
        $("#optionList").append(newOption);
    });

    function submitPoll(submitObj) {
        $.post("/polls", submitObj)
        .then(function(newPoll) {
            console.log(newPoll);
        })
        .catch(function(err) {
            console.log(err);
        });
    }

    function addOptionInput() {

    }

    function removeOptionInput(optionInput) {
        optionInput.remove();
    }
});
