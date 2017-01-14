'use strict';

/**
 *  This is an example of an Event Bus PubSub using Javascript classes.
 */

function Subscription(event_name, callback, emitter) {
    this.callback = callback;
    this.event_name = event_name;
    this.release = function() {
        emitter.release(this);
    }
}
Subscription.uniqueId = 0;


function Emitter() {
    this.subscriptions = {};
}

Emitter.prototype.addSubscription = function(event_name, subscription) {
    if (!(event_name in this.subscriptions)) {
        this.subscriptions[event_name] = [];
    }
    this.subscriptions[event_name].push(subscription);
};

Emitter.prototype.subscribe = function(event_name, callback) {
    var subscription = new Subscription(event_name, callback, this);
    this.addSubscription(event_name, subscription);
    return subscription;
};

Emitter.prototype.release = function(subscription) {
    if (subscription.event_name in this.subscriptions) {
        var event_name = subscription.event_name;
        var event_subscriptions = this.subscriptions[event_name];
        var subscription_idx = -1;
        for (var i = 0; i < event_subscriptions.length ; i++) {
            if (event_subscriptions[i] === subscription) {
                subscription_idx = i;
                break;
            }
        }
        if (subscription_idx >= 0) {
            this.subscriptions[event_name] = event_subscriptions.slice(0, subscription_idx - 1).concat(event_subscriptions.slice(subscription_idx + 1));
        }
    }
};

Emitter.prototype.emit = function(event_name) {
    var args = Array.from(arguments);
    if (event_name in this.subscriptions) {
        var new_args = args.slice(1);
        for (var sub in this.subscriptions[event_name]) {
            var subscription_meta = this.subscriptions[event_name][sub];
            try {
                subscription_meta.callback.apply(null, new_args);
            } catch (e) {
                console.log('Error happened continue');
            }
        }
    }
};

Emitter.prototype.totalSubscriptions = function(suffix) {
    var total = 0;
    for (var event_name in this.subscriptions) {
        total += this.subscriptions[event_name].length;
    }
    return total;
};

Emitter.prototype.logTotal = function(suffix) {
    console.log('Total Subscriptions ' + suffix + ': ' + this.totalSubscriptions())
};

let emitter = new Emitter();
emitter.logTotal('Before Subscription');
let sub = emitter.subscribe('event_name', function() { throw new Error('hahah gotcha'); });
emitter.logTotal('After Subscription');
emitter.emit('event_name', 'foo', 'bar');
sub.release();
emitter.logTotal('After Release');
