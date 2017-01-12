(function($, Drupal) {
  if (typeof Drupal.settings.package_modal != 'undefined') {
    var modal_url = Drupal.settings.package_modal.package_modal_url;
    var package_modal_cookie = getCookie('package_modal');
    var show_modal = false;
    var width = "90%";
    var height = "90%";

    // Criteria for showing the modal
    // 1. URL should contain package_modal=1 query parameter.
    // 2. If the cookie ('package_modal', 'show') is set, modal should not show.
    // 3. Even if cookie is set modal should show if URL contain query
    //    parameters package_modal=1 and force_modal=1.
    if (window.location.search.length > 0) {
      var queryString = window.location.search;
      if (queryString.indexOf('package_modal=1') !== -1) {
        show_modal = true;
        if (queryString.indexOf('force_modal=1') === -1) {
          if(package_modal_cookie !== null) {
            show_modal = false;
          }
        }
      }
    }

    if($(window).width() > 960) { width = "900" }
    if($(window).width() == 414) { height = "85%" }
    if($(window).width() >= 768 && $(window).width() < 960) { height = "550" }
    if($(window).height() > 700 && $(window).width() > 960) { height = "450" }
    if (show_modal) {
      $.colorbox({
        href: modal_url,
        scrolling: true,
        iframe: true,
        width: width,
        height: height,
        closeButton: true,
        onClosed: function() {
          setCookie('package_modal', 'show', 365);
        }
      });
    }

    // Show colorbox when you click the link.
    $('.content-challange a').colorbox({
      href: modal_url,
      scrolling: true,
      iframe: true,
      width: width,
      height: height,
      closeButton: true,
      onClosed: function() {
        setCookie('package_modal', 'show', 365);
      }
    })

    // Checking the ad content is loading or not.
    if ($('.ad170x30-logo').is(':empty')) {
      $('.package-ad-section').css('display', 'none');
    }
    else {
      $('.package-ad-section').css('display', 'table');
    }

    // Adding a class to package header for no image.
    $('.no-header-image').parent('.package-header').addClass('package-header-no-image');

    // Adding a style for content-tile if package header exists.
    if($('.package-header').find('.no-header-image').length > 0) {
      $('.content-title').addClass('content-title package-content-title');
    }
    if($('.package-header').length > 0) {
      $('.breadcrump-header').hide();
    }
  }
})(jQuery, Drupal);

/**
 * Function to set a cookie.
 *
 * @param string cookieName
 *  Name of the cookie.
 * @param string cookieValue
 *  value of the cookie
 * @param int expireDays
 *  No of days of expiration
 *
 * @see http://www.w3schools.com/js/js_cookies.asp
 */
function setCookie(cookieName, cookieValue, expireDays) {
  var dateValue = new Date();
  dateValue.setTime(dateValue.getTime() + (expireDays*24*60*60*1000));
  var expires = "expires=" + dateValue.toUTCString();
  document.cookie = cookieName + "=" + cookieValue + "; " + expires;
}

/**
 * Function to get a cookie.
 *
 * @param string cookieName
 *  Name of cookie
 *
 * @return
 *  null if cookie not found.
 *  string if cookie is found.
 *
 * @see http://www.w3schools.com/js/js_cookies.asp
 */
function getCookie(cookieName) {
  var name = cookieName + "=";
  var cookieArray = document.cookie.split(';');
  for(var i = 0; i < cookieArray.length; i++) {
    var cookieValue = cookieArray[i];
    while (cookieValue.charAt(0) == ' ') {
      cookieValue = cookieValue.substring(1);
    }
    if (cookieValue.indexOf(name) == 0) {
      return cookieValue.substring(name.length, cookieValue.length);
    }
  }
  return null;
}
;/**/
/**
 * @file
 * Script for Newsletter Signup Section.
 */

(function ($, Drupal) {
  Drupal.behaviors.Newsletter = {
    attach: function () {
      // Lazyload Newsletter Signup Background Image.
      var newsletter_lazyload_threshold = 500;
      var newsletter_status = true;
      $(window).on('scroll', $.throttle(200, function (event) {
        if (($(".newsletter-block").length > 0) && (parseInt($(window).scrollTop()) + parseInt($(window).height()) + newsletter_lazyload_threshold) >= (parseInt($('.newsletter-block').offset().top)) && (newsletter_status)) {
          // Newsletter signup background image will load once the scroll
          // reached the newsletter viewport with threshold value.
          $(".newsletter-block").addClass("newsletter-bg-image");
          newsletter_status = false;
        }
      }));
    }('jQuery')
  };
})(jQuery, Drupal);
;/**/
