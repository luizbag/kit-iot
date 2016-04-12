angular.module('app')
.controller('LoginController', ['LoginService', 'AuthToken', '$scope', '$location', function(LoginService, AuthToken, $scope, $location) {
    this.login = function(email, password) {
      LoginService.login(email, password, function(token) {
        if(token !== 'Unauthorized') {
          AuthToken.setToken(token);
          $location.path('/painel');
        } else {
          $scope.error = "Usuario não encontrado";
        }
      });
    };

    this.register = function(email, password) {
      LoginService.register(email, password, function(user) {
        $location.path('/entrar');
      });
    };

    this.logout = function() {
      AuthToken.removeToken();
      $location.path('/landing');
    };
  }]);