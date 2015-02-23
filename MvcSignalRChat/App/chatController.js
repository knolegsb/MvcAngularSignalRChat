
angular.module("chatModule").controller("chatController", function ($scope, chat, toastr) {

    // message repository
    $scope.messages = [];
        //[{ message: "Hello" }, { message: "Nice to see you" }];
    $scope.isName = false;

    $scope.setName = function () {
        $scope.isName = true; // inactive
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
    
    // when click send button
    $scope.sendMessage = function () {

        // send to server
        chat.server.sendMessage({ room: $scope.room, name: $scope.name, message: $scope.message });
        $scope.message = "";
    };

    // broadcasting value from server --> client
    chat.client.receiveMessage = function (msg) {
        $scope.messages.push({ message: msg }); // from outside of AngularJS 
        $scope.$apply();  // take the message
    };

    // group in out info to message
    chat.client.newNotification = function (msg) {
        toastr.success(msg);
    };

    chat.client.hitRecoreded = function (cnt) {
        $scope.hitCount = cnt;
        $scope.$apply();
    };

});