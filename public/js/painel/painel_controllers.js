angular.module('app')
.controller('TabsController', [function() {
	var tabs = this;
	this.active = 1;

	this.isActive = function(index) {
		return index === tabs.active;
	};

	this.select = function(index) {
		tabs.active = index;
	};
}]);