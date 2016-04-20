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
.controller('SensorsController', ['Sensor', '$timeout', function(Sensor, $timeout) {
	var ctrl = this;
	
	var load = function() {
		Sensor.query().$promise.then(function(data) {
			data.forEach(function(sensor) {
				sensor.colunas = [];
				for(var k in sensor.leituras[0]) {
					sensor.colunas.push(k);
				}
			});
			ctrl.sensores = data;
		});

    $timeout(function() {
      load();
    }, 300000);
	};

	this.addSensor = function(nome) {
		if(nome) {
			var sensor = {};
			sensor.nome = nome;
			Sensor.save(sensor, function(sensor) {
				load();
			});
		}
	};

	this.deleteSensor = function(id) {
		Sensor.delete({id: id}, function() {
			load();
		});
	};

	load();
}])
.controller('UserController', ['User', function(User) {
	var ctrl = this;
	User.query().$promise.then(function(data) {
		ctrl.user = data[0];
  	});
}]);