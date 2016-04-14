angular.module('app')
.controller('TabsController', [function() {
	var tabs = this;
	this.active = 0;

	this.isActive = function(index) {
		return index === tabs.active;
	};

	this.select = function(index) {
		tabs.active = index;
	};
}])
.controller('SensorsController', ['Sensor', function(Sensor) {
	var ctrl = this;
	this.sensores = Sensor.query();
}]);