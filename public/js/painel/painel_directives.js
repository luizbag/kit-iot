angular.module('app')
    .directive('leiturasTable', function() {
	return {
	    restrict: 'E',
	    scope: {
		leituras: '=leituras'
	    },
	    templateUrl: 'html/tabela.html'
	};
    })
    .directive('formatDate', function() {
	return {
	    restrict: 'E',
	    scope: {
		data_hora: '=data_hora'
	    },
	    link: function(scope, element, attrs) {
		element.text(moment(scope.data_hora).format('DD/MM/YYYY HH:mm:ss'))
	    }
	};
    });
