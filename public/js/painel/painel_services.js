angular.module('app')
.factory('Sensor', ['$resource', function($resource) {
	return $resource('/sensores/:id');
}])
.factory('User', ['$resource', function($resource) {
	return $resource('/users/:id');
}]);