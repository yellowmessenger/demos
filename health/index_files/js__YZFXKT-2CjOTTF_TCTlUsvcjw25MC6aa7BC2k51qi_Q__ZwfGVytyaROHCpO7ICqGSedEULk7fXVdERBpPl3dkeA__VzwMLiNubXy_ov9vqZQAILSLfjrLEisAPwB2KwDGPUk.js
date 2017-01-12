// Filename: responsiveUtilities.js

/**
 * utilities contains methods and properties used throughout the site.
 */

// @todo: make this available to other javascript files with a global in a Drupal way :)
var Utilities = (function($) {

  var Utilities = function () {
    this.oldIE = ($('html').hasClass('lt-ie9')) ? true : false;
    this.callbacks = {};
  };

  Utilities.prototype.getBrowserWidth = function () {
    var width;
    if (document.body && document.body.offsetWidth) {
      width = document.body.offsetWidth;
    }
    if (document.compatMode === 'CSS1Compat' &&
        document.documentElement &&
        document.documentElement.offsetWidth ) {
      width = document.documentElement.offsetWidth;
    }
    if (window.innerWidth) {
      width = window.innerWidth;
    }

    return width;
  };

  Utilities.prototype.getUrlParameter = function(key, alternateQueryString, noHash, delimiter) {
    delimiter = typeof delimiter == 'string' && delimiter !== '' ? delimiter : '&';
    key = key.replace(/[\[]/, '\\\[').replace (/[\]]/, '\\\]');
    var regex = new RegExp('[\\?' + delimiter + ']' + key + '=([^' + delimiter + (typeof noHash == 'boolean' && noHash ? '' : '#') + ']*)');
    var result = regex.exec (typeof alternateQueryString == 'string' && alternateQueryString.length > 0 ? '?' + alternateQueryString : location.href);
    return result === null ? '' : result [1];
  };

  Utilities.prototype.toggleClasses = function(element) {
    var $this = element,
        $togglePrefix = $this.data('prefix') || 'this',
        $toggled = $('.' + $this.data('toggled'));

    $this.toggleClass($togglePrefix + '-is-active');
    $toggled.toggleClass($togglePrefix + '-is-active');

    // Remove a class on another element, if needed.
    if ($this.data('remove')) {
      $('.' + $this.data('remove')).removeClass($this.data('remove'));
    }
  };

  Utilities.prototype.add_listener = function (event, callback, context) {
    if (this.callbacks[event] === undefined) {
        this.callbacks[event] = [];
    }
    this.callbacks[event].push([callback, context]);
  };

  utilities = new Utilities();

  return utilities;
})(jQuery);
;/**/
