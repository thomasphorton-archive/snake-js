function Clock() {

  var defaults = {
    tick: null,
    tickEvent: new Event('tick'),
    interval: 50,
    running: false
  };

  var data = $.extend({}, defaults);

  var ontick = function() {
    clearInterval(data.tick);
    window.dispatchEvent(data.tickEvent);
    data.tick = setInterval(ontick, data.interval);
  };

  this.start = function() {
    data.tick = setInterval(ontick, data.interval);
    data.running = true;
    return this;
  };

  this.stop = function() {
    clearInterval(data.tick);
    data.running = false;
    return this;
  };

  this.reset = function() {
    clearInterval(data.tick);
    data = $.extend({}, defaults);
    return this;
  };

  this.set = function(key, value) {
    if (data.hasOwnProperty(key)) {
      data[key] = value;
    }
    return this;
  }

  this.get = function(key, mode) {
    var obj;

    if (mode === 'default') {
      obj = defaults;
    } else {
      obj = data;
    }

    if (obj.hasOwnProperty(key)) {
      return obj[key];
    } else {
      return undefined;
    }
  };
};

var clock = new Clock();