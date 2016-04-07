angular.module('app', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.
		when('/landing', {
			templateUrl: 'html/landing.html',
		})
		.otherwise({
			redirectTo: '/landing'
		});
	}]);