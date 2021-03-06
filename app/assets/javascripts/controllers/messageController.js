webmailApp.controller('messageCtrl', ['messageService', '$scope',  '$stateParams', '$sce', '$mdDialog', '$window', 'Restangular', function(messageService, $scope, $stateParams, $sce, $mdDialog, $window, Restangular){

  // messageService.buildIndex();
  $scope.messages = messageService.getMessages();

  if ($scope.messages.length === 0) {
    messageService.buildIndex();
    console.log($scope.messages);
  }

  if( $stateParams.id ){
    messageService.updateCurrentMessage( $stateParams.id );
  }

  // $scope.currentMessage = messageService.getCurrentMessage();

  $scope.showMessage = function(event, message, index) {
    $mdDialog.show({
      controller: ['$scope', function($scope) {
        $scope.currentMessage = message;
        $scope.close = function() {
          $mdDialog.hide()
        }
      }],
      templateUrl: 'templates/showLayout.html',
      targetEvent: event,
      clickOutsideToClose:true,
    })
  };

  $scope.refresh = function() {
    messageService.buildIndex();
  };
}]);
