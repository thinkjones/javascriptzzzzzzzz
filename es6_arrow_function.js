"use strict";

console.log('1 - Arrow Functions');

// ES5
var variableFnGreeting = function (message, name) {
    return 'variableFnGreeting: ' + message + ' ' + name + '!';
};

// ES6 - Multiple Variables long form
var arrowGreeting = (message, name) => {
    return 'arrowGreeting: ' + message + ' ' + name + '!';
};

// ES6 - Multiple Variables short form
var arrowGreetingShort = (message, name) => 'arrowGreetingShort: ' + message + ' ' + name + '!';

// ES6 - If only one parameters
var arrowGreetingOneParam = message => 'arrowGreetingOneParam: ' + message + '!';
var squared = x => x * x;

// ES5 - That-This pattern
var deliveryPerson = {
    name: 'Gene',
    handleMessage: function (message, handler) {
      handler(message);
    },
    receive: function() {
        var that = this;

        this.handleMessage('ThatThis ', function(message) {
            console.log(message + that.name);
        });
    }
};

// ES6 - Arrow Function makes this available
var deliveryPersonArrow = {
    name: 'Gene',
    handleMessage: function (message, handler) {
        handler(message);
    },
    receive: function() {
        // NOTICE THIS NOT THAT HAS GONE
        // Lexical Scope: Arrow Functions are shorthand that also remove function scope; this becomes outer this.
        // I assume that a new scope only now applies if the function with curly braces is used.
        // Curly braces with Fn are new scopes not implicit scopes from arrow functions shorthand.
        this.handleMessage('ArrowFn ', message => console.log(message + this.name));
    }
};

console.log(variableFnGreeting('Welcome', 'gene'));
console.log(arrowGreeting('Welcome', 'gene'));
console.log(arrowGreetingShort('Welcome', 'gene'));
console.log(arrowGreetingOneParam('Welcome'));
console.log('2 squared = ' + squared(2));
deliveryPerson.receive();
deliveryPersonArrow.receive();
