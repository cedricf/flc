angular.module('myApp.formatNumber', [])
.filter('formatNumber', function() {
  return function(input, numDecimals) {
    input = input || '';
    
    var amt = parseFloat(input);
    if(amt === NaN){
      return input;
    }
    var sep = Number("1.2").toLocaleString().substr(1,1);
    var formatedAmount = amt.toLocaleString().split(sep)[0]
      + sep
      + amt.toFixed(numDecimals).split(sep)[1]
    return formatedAmount;
    };
})