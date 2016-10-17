$(function () {
    var modal = document.getElementById('modal-window');

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    $("#loginButton").click(function () {
        $.post("http://localhost:3002/login",
            {
                name: $("#name").val()
            },
            function (data, status) {
                if (status == "success") {
                    alert("Data: " + data + "\nStatus: " + status);
                }
                else {
                    // ???
                    $("#error").val("Authentication failed. User already exist.");
                }
            });
    });

    $("#name").on('keyup', _.debounce(function (e) {
        console.log($("#name").val());
        $.post("http://localhost:3002/check",
            {
                name: $("#name").val()
            },
            function (data, status) {
                if (status != "success") {
                    // ???
                    console.log("!!!");
                }
            });
    }, 300));
});