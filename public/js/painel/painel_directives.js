angular.module('app')
.directive('leiturasTable', function() {
	return {
		restrict: 'E',
		scope: {
			leituras: '=leituras',
			colunas: '=colunas'
		},
		controller: function($scope) {
			var n_pages = Math.ceil($scope.leituras.length/15);
			$scope.leituras.sort(function(a, b) {
				return b.data_hora - a.data_hora;
			});
			$scope.pages = [];
			$scope.index = 1;
			for(var i=1;i<=n_pages;i++) {
				$scope.pages.push(i);
			}

			$scope.select = function(i) {
				if(i>=1 && i<=n_pages) {
					$scope.index = i;
				}
			};

			$scope.isActive = function(i) {
				return $scope.index === i;
			};
		},
		controllerAs: 'ctrl',
		templateUrl: 'html/tabela.html'
	};
})
.directive('formatDate', function() {
	return {
		restrict: 'E',
		scope: {
			miliseconds: '=miliseconds'
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
			scope.text = scope.text.replace("_", "/");
			element.text(scope.text.charAt(0).toUpperCase() + scope.text.slice(1));
		}
	};
});
