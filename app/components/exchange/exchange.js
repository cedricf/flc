'use strict';

angular.module('myApp.exchange', [])
.service('ExchangeService', function($http) {
  
  var self = this;

  self.getRate = function(fromCcy, toCcy, callback){
    $http.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20(%22'
       + fromCcy + toCcy + '%22)&format=json&env=store://datatables.org/alltableswithkeys&callback=').
      success(function(data, status, headers, config) {
        console.log("From: " + fromCcy + " to: " + toCcy);
        callback(data.query.results.rate.Rate);
        // when the response is available
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    };
/*
  JR.apikey('jr-cffdf671e551830d7d303cb38b5de0c3');
     
  self.getRate = function(fromCcy, toCcy, callback){
    var halfSpread = 1.8 / 100 / 2;
    
    JR.from(fromCcy).to(toCcy).get(function(result) {
        console.log('Exchange rate is: ' + result.rate);
        callback(result.rate);
    });
  };


  self.getRate = function(sendCcy, receiveCcy, callback){
    var halfSpread = 1.8 / 100 / 2;
    var exchangeRate = (sendCcy == receiveCcy ? 1 : 1.0684);
    var rate = ((1 - halfSpread) * exchangeRate);
    callback(rate);
  };
*/  

});