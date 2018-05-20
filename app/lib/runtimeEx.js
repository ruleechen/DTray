/*
* runtime extends
*/

const EventEmitter = require('events');

function extendGlobal() {
  global.setTimeoutEx = (handler, time) => {
    const timeoutId = setTimeout(handler, time);
    const subscription = {
      dispose() {
        clearTimeout(timeoutId);
      },
    };
    return subscription;
  };
  global.setIntervalEx = (handler, time) => {
    const intervalId = setInterval(handler, time);
    const subscription = {
      dispose() {
        clearInterval(intervalId);
      },
    };
    return subscription;
  };
}

function extendEventEmitter() {
  function onEx(eventName, listener) {
    const me = this;
    me.on(eventName, listener);
    const subscription = {
      dispose() {
        me.removeListener(eventName, listener);
      },
    };
    return subscription;
  }
  function onceEx(eventName, listener) {
    const me = this;
    me.once(eventName, listener);
    const subscription = {
      dispose() {
        me.removeListener(eventName, listener);
      },
    };
    return subscription;
  }
  EventEmitter.prototype.onEx = onEx;
  EventEmitter.prototype.onceEx = onceEx;
}

module.exports = () => {
  extendGlobal();
  extendEventEmitter();
};
