angular.module('app', ['ngRoute', 'ngResource'])
.config(['$routeProvider', '$httpProvider',
  function($routeProvider, $httpProvider) {
    $routeProvider
      .when('/landing', {
       templateUrl: 'html/landing.html',
       requireLogin: false
      })
      .when('/entrar', {
       templateUrl: 'html/entrar.html',
       controller: 'LoginController',
       controllerAs: 'loginCtrl',
       requireLogin: false
      })
      .when('/cadastrar', {
       templateUrl: 'html/cadastrar.html',
       controller: 'LoginController',
       controllerAs: 'loginCtrl',
       requireLogin: false
      })
      .when('/painel', {
       templateUrl: 'html/painel.html',
       requireLogin: true
      })
      .otherwise({
       redirectTo: '/landing'
      });
    $httpProvider.interceptors.push('AuthInterceptor');
}])
.run(function($rootScope, $location, AuthToken) {
  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    var requireLogin = next.requireLogin;
    if(requireLogin && !AuthToken.isAuthenticated()) {
      event.preventDefault();
      $location.path('/entrar');
    }
  });
})
.filter('slice', function() {
  return function(list, page, page_size) {
    if(list) {
      var start = (page-1)*page_size;
      var end = start + page_size;
      return list.slice(start, end);
    } else {
      return [];
    }
  }
});