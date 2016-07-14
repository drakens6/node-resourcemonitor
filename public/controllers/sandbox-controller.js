var app = angular.module('app')

    .controller('privateController', function ($scope,$routeParams,$http) {
        
        $scope.getSandbox = function(){
              $scope.intervalVar =
                  setInterval(function(){
                      var callDate = new Date();
                      $http.get('/sandbox').success(function(d){
                          var recDate = new Date();
                          $scope.latency = recDate-callDate;
                          console.log(d);
                          $scope.cores = d;
                      })

                  },$scope.intTimer);
            $scope.intervalVar();
        };

        $scope.stopInt = function (){
            clearInterval($scope.intervalVar);
        };
        $scope.numCores = 2;
        $scope.intTimer =1000;

    });