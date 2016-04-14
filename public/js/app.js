angular.module('app', ['ngRoute', 'ngResource'])
	.config(['$routeProvider', '$locationProvider', '$httpProvider',
		function($routeProvider, $locationProvider, $httpProvider) {
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
		//$locationProvider.html5Mode(true);
	}])
	.run(function($rootScope, $location, AuthToken) {
    	$rootScope.$on('$routeChangeStart', function(event, next, current) {
      		var requireLogin = next.requireLogin;
      		if(requireLogin && !AuthToken.isAuthenticated()) {
        		event.preventDefault();
        		$location.path('/entrar');
      		}
    	});
    });