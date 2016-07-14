var app = angular.module('app', ['chart.js', 'ui.bootstrap'])
    
    .controller('profilerCtrl', ['$http', '$scope', '$interval', function($http, $scope, $interval){
        $scope.intTimer =1000;
        $scope.cores = {};
        var timer;
        
        $scope.tab = function(e){
            e.preventDefault();

            var targetid = e.currentTarget.getAttribute('href').replace('#', '');
            var panel = document.getElementById(targetid);
            var panelparent = panel.parentNode;
            for (var i = 0; i < panelparent.childNodes.length; i++) {
            if (typeof(panelparent.childNodes[i].className) !== 'undefined' && panelparent.childNodes[i].className.match("active") !== null) {
              panelparent.childNodes[i].className = 'tab-pane';
              break;
            }        
            }
            panel.className = 'tab-pane active';


            var parent = e.currentTarget.parentNode;
            var moreparent = parent.parentNode;
            for (var i = 0; i < moreparent.childNodes.length; i++) {
            if (typeof(moreparent.childNodes[i].className) !== 'undefined' && moreparent.childNodes[i].className.match("active") !== null) {
              moreparent.childNodes[i].className = '';
              break;
            }        
            }
            parent.className = 'active';

        }
        //cpuchart
        $scope.cpuLabels_idle = [];
        $scope.cpuSeries_idle = [];
        $scope.cpuData_idle = [];
        $scope.cpuOnClick_idle = function (points, evt) {
          console.log(points, evt);
        };

        $scope.cpuLabels_sys = [];
        $scope.cpuSeries_sys = [];
        $scope.cpuData_sys = [];
        $scope.cpuOnClick_sys = function (points, evt) {
          console.log(points, evt);
        };

        $scope.cpuLabels_user = [];
        $scope.cpuSeries_user = [];
        $scope.cpuData_user = [];
        $scope.cpuOnClick_user = function (points, evt) {
          console.log(points, evt);
        };
        

        //memchart
        $scope.memLabels = [];
        $scope.memSeries = ['Total Memory', 'Free Memory'];
        $scope.memData = [[],[]];

        $scope.heapLabels = [];
        $scope.heapSeries = ['Total Heap', 'Used Heap', 'Free Heap'];
        $scope.heapData = [[],[],[]];

        function getData(){
            var callDate = new Date();
            $http.get('/sandbox').success(function(d){
            
          var recDate = new Date();
          var calltime = recDate.getHours() +':'+recDate.getMinutes()+":"+recDate.getSeconds();
          //console.log(d);
            $scope.cores = d;
            console.log($scope.cores);
            //mem
            if ($scope.memLabels.length < 40){
                $scope.memLabels.push('');
                $scope.memData[0].push(d.totalMem / 1000);
                $scope.memData[1].push(d.freeMem / 1000);
            }
            else{
                $scope.memLabels.shift();
                $scope.memData[0].shift();
                $scope.memData[1].shift();
                $scope.memLabels.push('');
                $scope.memData[0].push(d.totalMem / 1000);
                $scope.memData[1].push(d.freeMem / 1000);
            }
            //mem
            if ($scope.heapLabels.length < 40){
                $scope.heapLabels.push('');
                $scope.heapData[0].push(d.processMem.heapTotal / 1000);
                $scope.heapData[1].push(d.processMem.heapUsed / 1000);
                $scope.heapData[2].push((d.processMem.heapTotal - d.processMem.heapUsed) / 1000);
            }
            else{
                $scope.heapLabels.shift();
                $scope.heapData[0].shift();
                $scope.heapData[1].shift();
                $scope.heapData[2].shift();
                $scope.heapLabels.push('');
                
                $scope.heapData[0].push(d.processMem.heapTotal / 1000);
                $scope.heapData[1].push(d.processMem.heapUsed / 1000);
                $scope.heapData[2].push((d.processMem.heapTotal - d.processMem.heapUsed) / 1000);
           }
            //cpu idle
            if ($scope.cpuLabels_idle.length < 20){
                $scope.cpuLabels_idle.push('');
            }
            else{
                $scope.cpuLabels_idle.shift();
                $scope.cpuLabels_idle.push('');
            }
            for (i = 0; i < d.cpu.length; i++){
                if ($scope.cpuData_idle.length < d.cpu.length){
                    $scope.cpuData_idle.push([]);
                    $scope.cpuSeries_idle.push('core' + (i + 1));
                }
            
                if ($scope.cpuLabels_idle.length < 20){
                    $scope.cpuData_idle[i].push(d.cpu[i].times.idle / 1000);
                }else{                
                    $scope.cpuData_idle[i].shift();
                    $scope.cpuData_idle[i].push(d.cpu[i].times.idle / 1000);
                }
            }
            //cpu sys
            if ($scope.cpuLabels_sys.length < 20){
                $scope.cpuLabels_sys.push('');
            }
            else{
                $scope.cpuLabels_sys.shift();
                $scope.cpuLabels_sys.push('');
            }
            for (i = 0; i < d.cpu.length; i++){
                if ($scope.cpuData_sys.length < d.cpu.length){
                    $scope.cpuData_sys.push([]);
                    $scope.cpuSeries_sys.push('core' + (i + 1));
                }
            
                if ($scope.cpuLabels_sys.length < 20){
                    $scope.cpuData_sys[i].push(d.cpu[i].times.sys / 1000);
                }else{                
                    $scope.cpuData_sys[i].shift();
                    $scope.cpuData_sys[i].push(d.cpu[i].times.sys / 1000);
                }
            }
            //cpu user
            if ($scope.cpuLabels_user.length < 20){
                $scope.cpuLabels_user.push('');
            }
            else{
                $scope.cpuLabels_user.shift();
                $scope.cpuLabels_user.push('');
            }
            for (i = 0; i < d.cpu.length; i++){
                if ($scope.cpuData_user.length < d.cpu.length){
                    $scope.cpuData_user.push([]);
                    $scope.cpuSeries_user.push('core' + (i + 1));
                }
            
                if ($scope.cpuLabels_user.length < 20){
                    $scope.cpuData_user[i].push(d.cpu[i].times.user / 1000);
                }else{                
                    $scope.cpuData_user[i].shift();
                    $scope.cpuData_user[i].push(d.cpu[i].times.user / 1000);
                }
            }
            $scope.latency = recDate-callDate;
            })
           
            
        }
        $scope.getSandbox = function(){
            timer = $interval(getData,$scope.intTimer);
        }
        $scope.stopInt = function (){
            $interval.cancel(timer);
        };

        

    }])
    