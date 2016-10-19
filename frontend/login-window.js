$(function () {

    $("#loginButton").click(function () {
        $.post("http://localhost:3002/login",
            {
                name: $("#name").val()
            },
            function (data, status) {
                if (status == "success") {
                    alert("Data: " + data + "\nStatus: " + status);
                    $("#modal-window").css("display", "none");
                }
            })
            .fail(function () {
                console.log("User already exist.");
            });
    });

    $("#name").on('keyup', _.debounce(function (e) {
        console.log($("#name").val());
        $.post("http://localhost:3002/check",
            {
                name: $("#name").val()
            },
            function (data, status) {
                $("#error").empty();
                $("input").css("border", "1px solid #ccc");
                $("button#loginButton").prop('disabled', false);
            })
            .fail(function () {
                $("button#loginButton").prop('disabled', true);
                $("input").css("border", "3px solid #c62133");
                console.log("Authentication failed. User already exist.");
            });
    }, 300));
});