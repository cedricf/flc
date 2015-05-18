'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope', 'ExchangeService', function($scope, ExchangeService) {
  
  $scope.currencies = [
    {label: "GBP", value: "GBP"},
    {label: "EUR", value: "EUR"}, 
    {label: "USD", value: "USD"}, 
    {label: "ZAR", value: "ZAR"}
  ];
  
  $scope.sendAmount = "100.00";
  $scope.selectedSendCcy = $scope.currencies[0];
  $scope.receiveAmount = "100.00";
  $scope.selectedReceiveCcy = $scope.currencies[1];
  // Remembers whether the user updated the sending amount or currency or the receiving side
  $scope.updatedSendSide = true;
  
  // Remembers the last currencies and exchange rate
  $scope.lastSendCcy = $scope.selectedSendCcy;;
  $scope.lastReceiveCcy = $scope.selectedReceiveCcy;
  
  
  
  $scope.sendAmountChanged = function(){
    $scope.updatedSendSide = true;
    $scope.update();
  };
  
  $scope.sendCurrencyChanged = function(){
    $scope.updatedSendSide = false;
    $scope.sendAmount = "...";
    //get new exchange rates including spread and fees 
    ExchangeService.getRate($scope.selectedSendCcy.value, $scope.selectedReceiveCcy.value, function(newRate){
      $scope.currentRate = newRate.rate;
      $scope.currentSpread = newRate.spread;
      $scope.currentExchange = newRate.exchange;
      $scope.lastSendCcy = $scope.selectedSendCcy;
//      $scope.$apply(function(){
        $scope.update();
//      });
    });
  };
  
  $scope.receiveAmountChanged = function(){
    $scope.updatedSendSide = false;
    $scope.update();
  };
  
  $scope.receiveCurrencyChanged = function(){
    $scope.updatedSendSide = true;
    $scope.receiveAmount = "...";
    //get new exchange rates including spread and fees 
    ExchangeService.getRate($scope.selectedSendCcy.value, $scope.selectedReceiveCcy.value, function(newRate){
      $scope.currentRate = newRate.rate;
      $scope.currentSpread = newRate.spread;
      $scope.currentExchange = newRate.exchange;
      $scope.lastReceiveCcy = $scope.selectedReceiveCcy;
//      $scope.$apply(function(){
        $scope.update();
//      });
    });
  };
  
  $scope.parseFormattedAmount = function(formattedAmount){
    var amount  = formattedAmount.replace(',', '');
    return parseFloat(amount);
  };
  
  // we do calculations as an Integer to preserve precision
  $scope.update = function(){
    if($scope.updatedSendSide){
      $scope.receiveAmount = $scope.formatAmount(Math.round($scope.parseFormattedAmount($scope.sendAmount) * 100 * $scope.currentRate) / 100);
    }else{
      $scope.sendAmount = $scope.formatAmount(Math.round($scope.parseFormattedAmount($scope.receiveAmount) * 100 / $scope.currentRate) / 100);
    }
  };

  $scope.formatAmount = function(amount){
    var amt = parseFloat(amount);
    if(amt === NaN){
      return amount;
    }
    var sep = Number("1.2").toLocaleString().substr(1,1);
    var formatedAmount = amt.toLocaleString().split(sep)[0]
      + sep
      + amt.toFixed(2).split(sep)[1]
    return formatedAmount;
  };
    
    
  $scope.receiveCurrencyChanged();
}]);