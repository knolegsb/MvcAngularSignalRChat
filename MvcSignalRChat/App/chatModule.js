(function () {

    angular.module('chatModule', []);

    // page load
    $(function () {

        $.connection.hub.logging = true;
        $.connection.hub.start();

    });

    // error handling
    $.connection.hub.error(function (err) {
        console.log("Error occured: " + err);
    });

    // Angular controller SignalR Chat code injection
    angular.module("chatModule")
        .value("chat", $.connection.chat)
        .value("toastr", toastr);

})();