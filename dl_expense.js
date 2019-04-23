"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Case Problem 2

   Author: Micah Fischer
   Date:   4-23-19
   
   Filename: dl_expenses.js
   
   Function List
   =============
   
   validateSummary()
      Validates the data entry in the summary field.
   
   calcClass(sumClass)
      Sums up all of the data values for elements of the sumClass class.
      
   calcExp()
      Calculates the travel expenses from all categories and dates.
      
   formatNumber(val, decimals)
      Formats the value, "val" to the number of decimals indicated 
      by "decimals", adding thousands separators.
      
   formatUSCurrency(val)
      Formats the value, "val", as U.S. currency.
      
*/

// On load loop through the changeCells (sum input fields) and add an eventListener which triggers the calcExp. On submit button click validate the summary field.
window.addEventListener("load", function () {
      var changingCells = document.querySelectorAll("table#travelExp input.sum");
      for (var i = 0; i < changingCells.length; i++) {
            changingCells[i].addEventListener("change", calcExp);
      }
      document.getElementById("submitButton").addEventListener("click", validateSummary);
});

// If validity valueMissing set a custom validation method else don't display a message.
function validateSummary() {
      var summary = document.querySelector("textarea#summary");
      if (summary.validity.valueMissing) {
            summary.setCustomValidity("You must include a summary of the trip in your report.");
      } else {
            summary.setCustomValidity("");
      }
}

// Get sum fields. Set sumTotal to 0. Loop through sumFields and convert string to numeric value. Test if the value is a number and add it to the sumTotal. Return the total.
function calcClass(sumClass) {
      var sumFields = document.getElementsByClassName(sumClass);
      var sumTotal = 0;
      for (var i = 0; i < sumFields.length; i++) {
            var itemValue = parseFloat(sumFields[i].value);
            if (!isNaN(itemValue)) {
                  sumTotal += itemValue;
            }
      }
      return sumTotal;
}

// Calculate the cost. Loop through table rows. Loop through the values and format the numbers.
function calcExp() {
      var expTable = document.querySelectorAll("table#travelExp tbody tr");
      for (var i = 0; i < expTable.length; i++) {
            expTable[i].querySelector("input#subtotal" + i).value = formatNumber(calcClass("date" + i), 2);
      }
      // Get element by id and set the value to the total. Use the calcClass and formatNumber functions to get the correct values.
      document.getElementById("transTotal").value = formatNumber(calcClass("trans"), 2)
      document.getElementById("lodgeTotal").value = formatNumber(calcClass("lodge"), 2)
      document.getElementById("mealTotal").value = formatNumber(calcClass("meal"), 2)
      document.getElementById("otherTotal").value = formatNumber(calcClass("other"), 2)
      document.getElementById("expTotal").value = formatUSCurrency(calcClass("sum"))
}

// Format the number value.
function formatNumber(val, decimals) {
      return val.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
      });
}

// Format the value to US currency.
function formatUSCurrency(val) {
      return val.toLocaleString('en-US', {
            style: "currency",
            currency: "USD"
      });
}