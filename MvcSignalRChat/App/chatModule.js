(function () {

    angular.module('chatModule', []);

    // 페이지 로드
    $(function () {

        $.connection.hub.logging = true;
        $.connection.hub.start();

    });

    // 예외 처리 코드 구현
    $.connection.hub.error(function (err) {
        console.log("에러 발생: " + err);
    });

    // Angular 컨트롤러에 SignalR Chat 코드 주입
    angular.module("chatModule")
        .value("chat", $.connection.chat)
        .value("toastr", toastr);

})();