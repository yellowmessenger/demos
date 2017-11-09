/***
 * Created by sagar 
 * This helps to remove all the logs from the UI while running the application.
 * Ideally we should use this when we are in prod mode.
 * 4:25 PM 11/15/2016
 */

function monkeyPatch() {
    var method;
    var noop = function () {
        
    };
    //'error'
    var methods = [
      'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 
      'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
      'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
      'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});
 
    while (length--) {
      method = methods[length];

      // Only stub undefined methods.
      if (console[method]) {
        console[method] = noop;
      }
    }
}

monkeyPatch();