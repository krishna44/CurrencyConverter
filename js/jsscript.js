"use strict";

//convert from currency rate
function convertCurrency() {
    var from = document.getElementById('from').value;
    var to = document.getElementById('to').value;
    var amountFrom = document.getElementById("fromAmount").value;
    var amountTo = document.getElementById("toAmount").value;
    var currency = localStorage.getItem("newCurrency");
    var jsResult = JSON.parse(currency);
    jsResult["EUR"] = 1;
    var oneUnit = jsResult[to] / jsResult[from];
    document.getElementById("toAmount").value = (oneUnit * amountFrom).toFixed(2);
}

//page load on currency rates.
function pageLoad() {

    var http = new XMLHttpRequest();
    var url = "http://api.fixer.io/latest"; // api call for loading all currency rates
    http.open("GET", url, true);
    http.send();
    http.onreadystatechange = function() {

        if (http.readyState === 4 && http.status === 200) {
            var result = http.responseText;
            var jsResult = JSON.parse(result);
            var currentRate = jsResult.rates;
            localStorage.setItem("newCurrency", JSON.stringify(currentRate));
            for (var k in currentRate) {
                if (currentRate.hasOwnProperty(k)) {
                    var country = document.createElement("TR");
                    var countryCode = document.createElement("TD");
                    var currencyValue = document.createElement("TD");
                    var tablelist = document.getElementById("countries");
                    countryCode.innerHTML = k;
                    currencyValue.innerHTML = currentRate[k];
                    country.appendChild(countryCode);
                    country.appendChild(currencyValue);
                    tablelist.appendChild(country);

                }
            }

        }

    }

}

