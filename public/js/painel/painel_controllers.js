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
	
	var init = function() {
		Sensor.query().$promise.then(function(data) {
			data.forEach(function(sensor) {
				sensor.colunas = [];
				for(var k in sensor.leituras[0]) {
					sensor.colunas.push(k);
				}
			});
			ctrl.sensores = data;
		});
	};

	this.addSensor = function(nome) {
		console.log(nome);
		if(nome) {
			var sensor = {};
			sensor.nome = nome;
			Sensor.save(sensor, function(sensor) {
				init();
			});
		}
	};

	init();
}])
.controller('UserController', ['User', function(User) {
	var ctrl = this;
	User.query().$promise.then(function(data) {
		ctrl.user = data[0];
  	});
}]);