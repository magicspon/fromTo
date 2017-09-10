(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global['mud-fromto'] = factory());
}(this, (function () { 'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Animate $target from start to end
 * @param {Object} options
 * @param {Function} onTick - function to be called at each tick
 * @return {Promise}
 */
function fromTo() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var onTick = arguments[1];

  var defaults = {
    easing: function easing(t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t + b;
      return -c / 2 * (--t * (t - 2) - 1) + b; // eslint-disable-line
    },

    duration: 1000
  };

  var _defaults$options = _extends({}, defaults, options),
      easing = _defaults$options.easing,
      duration = _defaults$options.duration,
      start = _defaults$options.start,
      end = _defaults$options.end;

  var condition = function condition(lastTick, next, end) {
    return start <= end ? next <= end && lastTick <= next : next >= end && lastTick >= next;
  };

  var next = 0;
  var timeElapsed = null;
  var timeStart = null;
  var frame = null;
  return new Promise(function (resolve) {
    var loop = function loop(currentTime) {
      var lastTick = next || start;
      if (!timeStart) timeStart = currentTime;
      timeElapsed = currentTime - timeStart;

      next = Math.round(easing(timeElapsed, start, end - start, duration));
      if (condition(lastTick, next, end)) {
        frame = requestAnimationFrame(loop);
        onTick && onTick(next);
      } else {
        resolve(lastTick);
        cancelAnimationFrame(frame);
        timeElapsed = null;
        timeStart = null;
        frame = null;
        lastTick = null;
      }
    };
    frame = window.requestAnimationFrame(loop);
  });
}

fromTo({ start: 0, end: 1000 }).then(function (v) {
  console.log('done', v);
});

return fromTo;

})));
