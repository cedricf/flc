'use strict';

angular.module('myApp.exchange', [])
.service('ExchangeService', function() {
  
  var self = this;

  JR.apikey('jr-cffdf671e551830d7d303cb38b5de0c3');
     
  self.getRate = function(fromCcy, toCcy, callback){
    var halfSpread = 1.8 / 100 / 2;
    console.log("From: " + fromCcy + " to: " + toCcy);
    JR.from(fromCcy).to(toCcy).get(function(result) {
        console.log('Exchange rate is: ' + result.rate);
        callback(result.rate);
    });
  };

/*
  self.getRate = function(sendCcy, receiveCcy, callback){
    var halfSpread = 1.8 / 100 / 2;
    var exchangeRate = (sendCcy == receiveCcy ? 1 : 1.0684);
    var rate = ((1 - halfSpread) * exchangeRate);
    callback(rate);
  };
*/  

});