angular.module('app')
.directive('leiturasTable', function() {
	return {
		restrict: 'E',
		scope: {
			leituras: '=leituras',
			colunas: '=colunas'
		},
		templateUrl: 'html/tabela.html'
	};
})
.directive('formatDate', function() {
	return {
		restrict: 'E',
		scope: {
			miliseconds: '=data_hora'
		},
		link: function(scope, element, attrs) {
			element.text(moment(scope.miliseconds).format('DD/MM/YYYY HH:mm:ss'));
		}
	};
})
.directive('capitalize', function() {
	return {
		restrict: 'E',
		scope: {
			text: '=text'
		},
		link: function(scope, element, attrs) {
			element.text(scope.text.charAt(0).toUpperCase() + scope.text.slice(1));
		}
	};
});
