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
    //get new exchange rates includeing spread and fees 
    ExchangeService.getRate($scope.selectedSendCcy.value, $scope.selectedReceiveCcy.value, function(newRate){
      $scope.lastRate = newRate;
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
    //get new exchange rates includeing spread and fees 
    ExchangeService.getRate($scope.selectedSendCcy.value, $scope.selectedReceiveCcy.value, function(newRate){
      $scope.lastRate = newRate;
      $scope.lastReceiveCcy = $scope.selectedReceiveCcy;
//      $scope.$apply(function(){
        $scope.update();
//      });
    });
  };
  
  // we do calculations as an Integer to preserve precision
  $scope.update = function(){
    if($scope.updatedSendSide){
      $scope.receiveAmount = $scope.formatAmount(Math.round(parseFloat($scope.sendAmount) * 100 * $scope.lastRate) / 100);
    }else{
      $scope.sendAmount = $scope.formatAmount(Math.round(parseFloat($scope.receiveAmount) * 100 / $scope.lastRate) / 100);
    }
  };

  $scope.formatAmount = function(amount){
    var DecimalSeparator = Number("1.2").toLocaleString().substr(1,1);

    var AmountWithCommas = amount.toLocaleString();
    var arParts = String(AmountWithCommas).split(DecimalSeparator);
    var intPart = arParts[0];
    var decPart = (arParts.length > 1 ? arParts[1] : '');
    decPart = (decPart + '00').substr(0,2);

    return intPart + DecimalSeparator + decPart;
  };
  
  $scope.receiveCurrencyChanged();
}]);