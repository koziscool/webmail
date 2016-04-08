
webmailApp.factory('messageService', ['Restangular', '$sce', function(Restangular, $sce){

    var obj = {};
    var _messages = [];
    var _currentMessage;
    var messageObj = {};

    obj.buildIndex = function(){
      Restangular.all("messages").getList().then(function(messages){
        _messages = messages.map( function(message) {
          message.body = $sce.trustAsHtml( message.body );
          return message;
        });
      });
    };

    obj.getMessages = function(){
        return _messages;
    };

    obj.getCurrentMessage = function(){
        return _currentMessage;
    };

    obj.updateCurrentMessage = function(id){
        _currentMessage = messages[id];
    };

    obj.show = function( id ) {
      return Restangular.one( "messages", id).get();
    };

    obj.update = function( messageObj ){
      messageObj.put();
    };

    obj.create = function ( messageObj ) {
      return Restangular.all( "messages").post( messageObj );
    };

    obj.destroy = function ( id ) {
      Restangular.one("messages", id).remove();
    };

    return obj;
}]);
