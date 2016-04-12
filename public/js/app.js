angular.module('app', ['ngRoute', 'ngResource'])
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider
		.when('/landing', {
			templateUrl: 'html/landing.html',
			requireLogin: false
		})
		.when('/entrar', {
			templateUrl: 'html/entrar.html',
			requireLogin: false
		})
		.when('/cadastrar', {
			templateUrl: 'html/cadastrar.html',
			requireLogin: false
		})
		.otherwise({
			redirectTo: '/landing'
		});

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