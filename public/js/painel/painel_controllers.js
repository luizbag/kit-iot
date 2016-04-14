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

	this.addSensor = function(nome) {
		var sensor = {};
		sensor.nome = nome;
		Sensor.save(sensor, function(sensor) {
			ctrl.sensores = Sensor.query();
		});
	};
}])
.controller('UserController', ['User', function(User) {
	var ctrl = this;
	User.query().$promise.then(function(data) {
		ctrl.user = data[0];
  	});
}]);