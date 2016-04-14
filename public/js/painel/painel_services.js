angular.module('app')
.factory('Sensor', ['$resource', function($resource) {
	return $resource('/sensores/:id');
}]);