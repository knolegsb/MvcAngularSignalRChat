
angular.module("chatModule").controller("chatController", function ($scope, chat, toastr) {

    // 메시지 저장 공간
    $scope.messages = [];
        //[{ message: "안녕" }, { message: "반가워" }];
    $scope.isName = false;

    $scope.setName = function () {
        $scope.isName = true; // 비화성화
    };

    $scope.isRoom = false;
    $scope.joinRoom = function () {
        $scope.isRoom = true;

        chat.server.joinRoom($scope.room, $scope.name);
    };
    $scope.leaveRoom = function () {
        $scope.isRoom = false;

        chat.server.leaveRoom($scope.room, $scope.name);
    };
    
    // 전송 버튼 클릭시
    $scope.sendMessage = function () {

        // 서버로 전송
        chat.server.sendMessage({ room: $scope.room, name: $scope.name, message: $scope.message });
        $scope.message = "";
    };

    // 서버에서 클라이언트로 전송되는 브로드캐스트 값 받기
    chat.client.receiveMessage = function (msg) {
        $scope.messages.push({ message: msg }); // AngularJS 밖에서 강제로 먹을 것을 먹이면...
        $scope.$apply();  // 소화시켜 줘야 함 : 소화 사이클
    };

    // 그룹에 들어오고 나가고 하는 정보를 메시지로 출력
    chat.client.newNotification = function (msg) {
        toastr.success(msg);
    };

    chat.client.hitRecoreded = function (cnt) {
        $scope.hitCount = cnt;
        $scope.$apply();
    };

});