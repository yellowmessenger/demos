/**
 * @file
 * Configures and loads TGX ads using TGX 2.0 without compatibility mode.
 */

/* globals jQuery, Drupal, time_dfp console */
(function ($, Drupal, time_dfp) {
  'use strict';

  Drupal.behaviors.timeinc_advertising = {
    attach: function (context, settings) {

      // Set this variable to TRUE after page load
      // to see debugging information logged by this script.
      Drupal.behaviors.timeinc_advertising.is_in_debug_mode = Drupal.behaviors.timeinc_advertising.is_in_debug_mode || (function() {
        var is_test = (typeof time_dfp.dfpUtil.isTestMode == 'function') ? time_dfp.dfpUtil.isTestMode() : false;
        var is_debug = (typeof time_dfp.dfpUtil.isDebugMode == 'function') ? time_dfp.dfpUtil.isDebugMode() : false;
        return is_test || is_debug;
      })();

      var adSettings = Drupal.settings.ad_settings;

      // If time_dfp is not present then tgx.js probably hasn't loaded.
      if (typeof time_dfp === 'object') {

        // Init global configs only once.
        if (window.ti_dfp_config === undefined) {
          // Log the following events to console
          // when ads module is in debug mode.
          var _i, _len, dfpEvents = [
              'dfp.beforeInit',
              'dfp.afterInit',
              'dfp.updateCorrelator',
              'dfp.defineSlot',
              'dfp.slotBeforeDefine',
              'dfp.slotAfterDefine',
              'dfp.refresh',
              'dfp.slotRefresh',
              'dfp.slotRenderEnded'
          ];

          var timeinc_ads_events = [
            // Before overall init.
            'tgxAdInit.beforeAdsLoad',
            // Individual ads.
            'tgxAdInit.beforeAdLoads',
            'tgxAdInit.afterAdLoads',
            'adInView',
            'adOutOfView',
          ];

          for (_i = 0, _len = dfpEvents.length; _i < _len; _i++) {
            window.addEventListener(dfpEvents[_i], function(e){
              Drupal.behaviors.timeinc_advertising.debug_log("GLOBAL Listener: " + e.type, arguments);
            });
          }

          for (_i = 0, _len = timeinc_ads_events.length; _i < _len; _i++) {
            $(document).on(timeinc_ads_events[_i], function(e){
              var type = e.type;
              if (e.namespace) {
                type += '.' + e.namespace;
              }
              Drupal.behaviors.timeinc_advertising.debug_log("GLOBAL Listener: " + type, arguments);
            });
          }

          window.ti_dfp_config = {
            setTargeting: {
                'site': Drupal.settings.ad_settings.adConfig.tgxSiteName
              // Additional targeting globally.
            },
            setGlobalTargeting: {
            },
            // Expecting the call to be done in SRA.
            enableSingleRequest: Drupal.settings.ad_settings.adConfig.enableSingleRequest,
            // This is different than jquery.dfp. if (false) we call googletag.pubads().collapseEmptyDivs(), if (true) we call googletag.pubads().collapseEmptyDivs(true)  see - https://support.google.com/dfp_premium/answer/3072674
            collapseEmptyDivs: Drupal.settings.ad_settings.adConfig.collapseEmptyDivs,
            sitename: Drupal.settings.ad_settings.adConfig.setSitename,
            zone: Drupal.settings.ad_settings.adFactory.setZone,
            useBehaviorTracking: Drupal.settings.ad_settings.adConfig.setBehaviorTracking,
            useRevSciTracking: Drupal.settings.ad_settings.adConfig.setRevSciTracking,
            useQuantcastTracking: Drupal.settings.ad_settings.adConfig.setQuantcastTracking,
            useTacodaTracking: Drupal.settings.ad_settings.adConfig.setTacodaTracking
          };

          if (Drupal.settings.ad_settings.adFactory.setArticleId) {
            window.ti_dfp_config.setGlobalTargeting.aid = Drupal.settings.ad_settings.adFactory.setArticleId;
          }
          if (Drupal.settings.ad_settings.adFactory.setChannel) {
            window.ti_dfp_config.setGlobalTargeting.ch = Drupal.settings.ad_settings.adFactory.setChannel;
          }
          if (Drupal.settings.ad_settings.adFactory.setSubchannel) {
            window.ti_dfp_config.setGlobalTargeting.sch = Drupal.settings.ad_settings.adFactory.setSubchannel;
          }
          if (Drupal.settings.ad_settings.adFactory.setChannelPage) {
            window.ti_dfp_config.setGlobalTargeting.ptype = 'channel';
          }
          if (Drupal.settings.ad_settings.adFactory.setContentPage) {
            window.ti_dfp_config.setGlobalTargeting.ptype = 'content';
          }
          if (Drupal.settings.ad_settings.adFactory.setContentType) {
            window.ti_dfp_config.setGlobalTargeting.ctype = Drupal.settings.ad_settings.adFactory.setContentType;
          }
          if (Drupal.settings.ad_settings.adFactory.setPackageId) {
            window.ti_dfp_config.setGlobalTargeting.pid = Drupal.settings.ad_settings.adFactory.setPackageId;
          }

          for (var item in Drupal.settings.ad_settings.adFactory.setParam) {
            if (Drupal.settings.ad_settings.adFactory.setParam[item]) {
              window.ti_dfp_config.setGlobalTargeting[item] = Drupal.settings.ad_settings.adFactory.setParam[item];
            }
          }

          window.time_dfp.init(ti_dfp_config);
        }

        // Trigger an event so we can alter placeholders before the ads load.
        $(document).trigger('tgxAdInit.beforeAdsLoad', [adSettings]);

        // Get ad placeholders.
        var $placeholders = $('.ad-placeholder').once('timeinc-advertising').sort(callback_sort_ads_by_weight_and_type_from_dom_element);

        // Loop over ad placeholders and load ads.
        $placeholders.each(function () {
          var $placeholder = $(this);
          adAnnounceInView($placeholder);
          adSetDynamicPosition($placeholder);
          timeinc_advertising_init_ad_slot($placeholder);
        });

        // Adding the breakpoint.
        var breakpoints = Drupal.settings.ad_settings.custom.timeinc_advertising_breakpoint_list;
        window.lastBreakPoint = getBreakPoints(breakpoints);

      }
      else {
        Drupal.behaviors.timeinc_advertising.debug_log('tgx.js not available for ads.');
      }

      // On orientation change this event will trigger.
      // This event will rewrite ads if break points differs.
      $(window).on("orientationchange", function(event) {
        // On breakpoint change rewrite all ads once again.
        var lastBreakPoint = window.lastBreakPoint;
        var breakpoints = Drupal.settings.ad_settings.custom.timeinc_advertising_breakpoint_list;
        var currentBreakPoint = getBreakPoints(breakpoints);
        if (lastBreakPoint !== currentBreakPoint) {
          var $orientation_placeholders = $('.ad-placeholder').sort(callback_sort_ads_by_weight_and_type_from_dom_element);
          // Loop over ad placeholders and load ads.
          $orientation_placeholders.each(function () {
            var $orientation_placeholder = $(this);
            if ($orientation_placeholder.html().length > 0) {
              $orientation_placeholder.empty();
            }
            var ad_id = $orientation_placeholder.data('id');
            // Scroll listener is off before reinitializing attachBehavior.
            $(window).off("." + ad_id);
          });
          $('.ad-placeholder').removeOnce('timeinc-advertising');
          Drupal.attachBehaviors(document, Drupal.settings);
        }
      });
    },
    debug_log: function() {
      if (typeof console != 'undefined' && Drupal.behaviors.timeinc_advertising.is_in_debug_mode) {
        console.log.apply(console, arguments);
      }
    },
    timeinc_advertising_render_ad: timeinc_advertising_render_ad
  };

  window['getCurrentBreakPoint'] = function(slotSettings) {
    var breakpoint = 0;
    var windowWidth = $(window).width();
    // Get slot breakpoints sorted in ascending order.
    var breakpoints = Object.keys(slotSettings.sizes).sort(function (a, b) {
      return a - b;
    });

    // Iterate over slot breakpoints and get the current breakpoint.
    for (var index = 0; index < breakpoints.length; ++index) {
      if (windowWidth >= breakpoints[index]) {
        breakpoint = breakpoints[index];
      }
    }
    return breakpoint;
  }

  // Find break point based on list.
  window['getBreakPoints'] = function(breakpointList) {
    var breakpoint = 0;
    var windowWidth = $(window).width();
    var breakpointLists = breakpointList.toString()
    var breakpoints = breakpointLists.split(',');
    // Iterate over slot breakpoints and get the current breakpoint.
    for (var index = 0; index < breakpoints.length; ++index) {
      if (windowWidth >= breakpoints[index]) {
        breakpoint = breakpoints[index];
      }
    }
    return breakpoint;
  }

  // Find ads to be refreshed and refresh them.
  window['adRefresh'] = function() {
    // Cache refreshIds to avoid looking them up in DOM every refresh.
    // Additionally allow global scrope override for pages which
    // need special business requirement handling.
    window.refreshIds = window.refreshIds || [];
    if (0 == window.refreshIds.length) {
      $('.ad-refresh').each(function () {
        var ad_id = $(this).attr('id');
        // This entire integration promices being able to initialize ads
        // based on "breakpoints" to support different ads for different devices.
        // In cases when ad breakpoints configuration *does not* initialize
        // the ad, its html markup with .ad-refresh class still exists.
        // This means that we must ensure the ad infact did initialize
        // with TGX library before we attempt to refresh it, otherwise
        // ads refresh breaks as soon as non-initialized ad ID is requested.
        if (typeof time_dfp.getAdSlot(ad_id) == 'object') {
          window.refreshIds.push(ad_id);
        }
      });
      window.refreshIds.sort(callback_sort_ads_by_weight_and_type_from_id);
    }

    if (window.refreshIds.length) {
      // Synchronize Correlator values across all ads about to be refreshed.
      time_dfp.updateCorrelator();
      time_dfp.refresh(window.refreshIds);
    }
  }

  /**
   * Announce when ad is in view.
   */
  function adAnnounceInView($placeholder) {
    var ad_id = $placeholder.data('id');
    if (Drupal.settings["ad_settings_" + ad_id].announce_in_view) {
      $(window).on('scroll.announceInView' + ad_id, $.throttle(300, function(event) {
        var adIsInView = (isInView($('#ad-' + ad_id)));
        // Keep track of visible state.
        var adWasInView = Drupal.settings["ad_settings_" + ad_id].visible;
        // Announce the fact that it is now visible or now not visible when state changes.
        if (Drupal.settings["ad_settings_" + ad_id].announce_in_view) {
          if (adIsInView && !adWasInView) {
             Drupal.settings["ad_settings_" + ad_id].visible = true;
             $(document).trigger('adInView', [Drupal.settings["ad_settings_" + ad_id]]);
          }
          else if (!adIsInView && adWasInView) {
            Drupal.settings["ad_settings_" + ad_id].visible = false;
            $(document).trigger('adOutOfView', Drupal.settings["ad_settings_" + ad_id]);
          }
        }
      }.bind($('#ad-' + ad_id))));
    }
  }

  /**
   * Set the 'Pos' value for ad dynamically.
   */
  function adSetDynamicPosition($placeholder) {
    var ad_id = $placeholder.data('id');
    var slotSettings = Drupal.settings['ad_settings_' + ad_id];
    var breakpoint = getCurrentBreakPoint(slotSettings);
    var adPos = 0;
    window.tiAdPos = (window.tiAdPos) ? window.tiAdPos : [];

    if (typeof slotSettings.sizes[breakpoint] === 'object') {
      var breakpointSizes = Object.keys(slotSettings.sizes[breakpoint]);
      // Don't set ad position if there are no sizes for this breakpoint.
      if (breakpointSizes.length) {
        if (slotSettings.type === 'regular') {
          // Dynamic Pos applies only if 'Position' text field is empty or zero.
          if (!slotSettings.getAd.setPosition || slotSettings.getAd.setPosition == '0') {
            for (var adSize in slotSettings.sizes[breakpoint]) {
              if (window.tiAdPos.hasOwnProperty(adSize)) {
                window.tiAdPos[adSize]++;
              }
              else {
                window.tiAdPos[adSize] = 1;
              }
              // Assign the highest pos value among available sizes.
              if (window.tiAdPos[adSize] > adPos) {
                adPos = window.tiAdPos[adSize];
              }
            }
            slotSettings.getAd.setPosition = String(adPos);
          }
        }
      }
    }
  }

  /**
   * Set up lazy load ad OR render immediatelly when not lazy ad..
   */
  function timeinc_advertising_init_ad_slot($placeholder) {
    var ad_id = $placeholder.data('id');
    var slotSettings = Drupal.settings['ad_settings_' + ad_id];
    // If lazy load ad AND in view port already, render immediately.
    // Otherwise set up scroll listener to render later.
    if (typeof slotSettings['lazy_load'] != 'undefined' && slotSettings['lazy_load'] && !isAlmostInView($placeholder)) {
      $(window).on('scroll.' + ad_id, $.throttle(500, function(event){
        $placeholder = $(this);
        var ad_id = $placeholder.data('id');
        var slotSettings = Drupal.settings['ad_settings_' + ad_id];
        if (isAlmostInView($placeholder)) {
          // Scroll listener is not needed after ad loads.
          $(window).off("." + ad_id);

          Drupal.behaviors.timeinc_advertising.debug_log(ad_id, "Is almost in view");
          timeinc_advertising_render_ad($placeholder);
        }
        else {
          Drupal.behaviors.timeinc_advertising.debug_log(ad_id, "Not almost in view yet");
        }
      }.bind($placeholder)));
    }
    else {
      timeinc_advertising_render_ad($placeholder);
    }
  }

  /**
   * Checking the ads slot are in viewport.
   */
  function isAlmostInView($placeholder) {
    var ad_id = $placeholder.data('id');
    var slotSettings = Drupal.settings['ad_settings_' + ad_id];
    var breakpoint = getCurrentBreakPoint(slotSettings);
    var $window = $(window);
    // Get if the selector is added for Lazy Loading the AD.
    var selectorBasedOnBreakpoint = slotSettings.lazy_load_based_on_selector[breakpoint] != "undefined" ? slotSettings.lazy_load_based_on_selector[breakpoint] : '';
    // Check if the selector is valid.
    if (selectorBasedOnBreakpoint != "undefined" && selectorBasedOnBreakpoint) {
      var lazyLoadSelector = $(selectorBasedOnBreakpoint);
    }
    else {
      var lazyLoadSelector = '';
    }

    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();
    // If the lazy load selector is available for the current break point get the selector height.
    if (lazyLoadSelector != "undefined" && lazyLoadSelector) {
      var elemTop = lazyLoadSelector.offset().top;
    }
    else {
      var elemTop = $placeholder.offset().top;
    }
    // alert("Element Top - " + elemTop);.
    var elemBottom = elemTop + $placeholder.height();

    Drupal.behaviors.timeinc_advertising.debug_log(parseInt(slotSettings.lazy_load_viewport_offset), (elemBottom <= docViewBottom + parseInt(slotSettings.lazy_load_viewport_offset)),
        (elemTop >= docViewTop - parseInt(slotSettings.lazy_load_viewport_offset)));
    return ((elemBottom <= docViewBottom + parseInt(slotSettings.lazy_load_viewport_offset)) &&
        (elemTop >= docViewTop - parseInt(slotSettings.lazy_load_viewport_offset)));
  }

  // Determines if a DOM element is in view right now.
  function isInView($placeholder) {
    var ad_id = $placeholder.data('id');
    var slotSettings = Drupal.settings['ad_settings_' + ad_id];
    var $window = $(window);

    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();

    var elemTop = $placeholder.offset().top;
    var elemBottom = elemTop + $placeholder.height();

    Drupal.behaviors.timeinc_advertising.debug_log("isInView for " + ad_id + " elemBottom: " + elemBottom +
      " docViewBottom: " + docViewBottom, "elemTop: " + elemTop + " docViewTop: " + docViewTop);

    Drupal.behaviors.timeinc_advertising.debug_log((elemTop <= docViewBottom),
      ad_id + ": The top of the ad is above the bottom of the screen.");

    Drupal.behaviors.timeinc_advertising.debug_log((elemBottom >= docViewTop),
      ad_id + ": The bottom of the ad is below the top of the screen.");

    return ((elemTop <= docViewBottom) &&
        (elemBottom >= docViewTop));
  }

  function timeinc_advertising_render_ad($placeholder) {
    var breakpoint = 0;
    var placeholderId = $placeholder.attr('id');
    var ad_id = $placeholder.data('id');
    var slotSettings = Drupal.settings['ad_settings_' + ad_id];
    window.tiAdPos = (window.tiAdPos) ? window.tiAdPos : [];
    var adPos = 0;

    breakpoint = getCurrentBreakPoint(slotSettings);

    if (typeof slotSettings.sizes[breakpoint] === 'object') {
      var breakpointSizes = Object.keys(slotSettings.sizes[breakpoint]);

      // Don't render this ad if there are no sizes for this breakpoint.
      if (breakpointSizes.length) {
        $(document).trigger('tgxAdInit.beforeAdLoads', [$placeholder]);

        // Invoke tgx method slotRenderEnded() for this slot.
        window.addEventListener('dfp.slotRenderEnded', function(e) {
          // Trigger an event on successful ad load that can be used by other
          // modules.
          if (e.detail.arg.isEmtpy) {

          }
          else {
            placeholderId = e.detail.arg.slot.getSlotId().getDomId();
            $(document).trigger('tgxAdInit.afterAdLoads', [placeholderId]);
          }
        });

        if (slotSettings.multi_ad[breakpoint]) {
          var ad_sizes = [], size_array = [];
          $(breakpointSizes).each(function(index, breakpointSize) {
            size_array = breakpointSize.split('x');
            size_array = $.map(size_array, function(value) { return parseInt(value);
            });
            ad_sizes.push(size_array);
          });
        }
        else {
          var ad_sizes = new Array(parseInt(slotSettings.width[breakpoint]), parseInt(slotSettings.height[breakpoint]));
        }

        window['ad' + ad_id] = {
          'id' : 'ad-' + ad_id,
          'size' : ad_sizes,
          'targeting' : {},
        }

        // Setting companion slots params.
        if (slotSettings.companion) {
          window['ad' + ad_id].companion = true;
        }

        // Setting CM slots params.
        if ('cm' == slotSettings.type) {
          window['ad' + ad_id].targeting = {
            'cmpos' : slotSettings.getAd.setPosition,
            'cmtyp' : slotSettings.cmtype,
            'pos' : slotSettings.getAd.setPosition,
          }

          window['ad' + ad_id].sitename = Drupal.settings.ad_settings.adConfig.setCmSitename;
        }
        else if (slotSettings.getAd.setPosition) {
            window['ad' + ad_id].targeting.pos = slotSettings.getAd.setPosition;
        }

        // Setting trageting params.
        for (var item in slotSettings.getAd.setParam) {
          if (slotSettings.getAd.setParam[item]) {
            window['ad' + ad_id].targeting[item] = slotSettings.getAd.setParam[item];
          }
        }

        if (slotSettings.getAd.setZone) {
          window['ad' + ad_id].zone = slotSettings.getAd.setZone;
        }

        if (slotSettings.updateCorrelator) {
          time_dfp.updateCorrelator();
        }

        if (typeof window['ad' + ad_id] != "undefined") {
          time_dfp.defineSlot(window['ad' + ad_id]);
        }
      }
      else {
        // Remove the ad's panel pane.
        $placeholder.parents('.pane-tgx-ad').remove();
      }
    }
  }

  /**
   * Sorting callback before rendering ads.
   *
   * Sort ads based on DOM element data-id attribute.
   */
  function callback_sort_ads_by_weight_and_type_from_dom_element(a, b) {
    var id_a = $(a).data('id');
    var id_b = $(b).data('id');
    var setting_a = Drupal.settings['ad_settings_' + id_a];
    var setting_b = Drupal.settings['ad_settings_' + id_b];
    return callback_sort_ads_by_weight_and_type_from_ad_setting(setting_a, setting_b);
  }

  /**
   * Sorting callback before rendering ads.
   *
   * Sort ads based on DOM element ID attribute.
   */
  function callback_sort_ads_by_weight_and_type_from_id(id_a, id_b) {
    var id_a = $('#' + id_a).data('id');
    var id_b = $('#' + id_b).data('id');
    var setting_a = Drupal.settings['ad_settings_' + id_a];
    var setting_b = Drupal.settings['ad_settings_' + id_b];
    return callback_sort_ads_by_weight_and_type_from_ad_setting(setting_a, setting_b);
  }

  /**
   * Sorting callback before rendering ads.
   *
   * Sort ads based on ad settings.ad_render_weight property.
   * UAL ads with the same ad_render_weight sorted by original location.
   */
  function callback_sort_ads_by_weight_and_type_from_ad_setting(setting_a, setting_b) {
    if (setting_a.type == setting_b.type) {
      var compare = setting_a.ad_render_weight - setting_b.ad_render_weight;
      if ((compare == 0) && setting_a.hasOwnProperty('inlineAdCount') && setting_b.hasOwnProperty('inlineAdCount')) {
          compare = setting_a.inlineAdCount - setting_b.inlineAdCount;
      }
      return compare;
    }
    else {
      return 'regular' == setting_a.type ? -1 : 1;
    }
  }

  // Enable Object.keys functionality in older browsers.
  if (!Object.keys) {
    Object.keys = function (o) {
      if (o !== Object(o)) {
        throw new TypeError('Object.keys called on a non-object');
      }

      var k = [], p;

      for (p in o) {
        if (Object.prototype.hasOwnProperty.call(o, p)) {
          k.push(p);
        }
      }

      return k;
    };
  }
})(jQuery, Drupal, window.time_dfp);
;/**/
/**
 * @file
 * Tgx ads Sticky Plugin.
 */

/**
 * Iterates .
 *
 * @param {currentAdSlotId} string
 *   Current Ads slot id which has stick-ad class.
 *   the property's values.
 * @param {elementPosition} int
 *   Position of the Current sticky ads slot.
 * @param {forceStickyParam} boolen
 *   Flag value to force sticky ads which out any event.
 *   Eg. If we need to make ads sticky. when rendering the ads and user is out of the ads element view port.
 */

function makeAdSlotSticky(currentAdSlotId, elementPosition, forceStickyParam) {

  $ = jQuery;
  this.adSlot = $('#' + currentAdSlotId);

  var slotSettings = Drupal.settings['ad_settings_' + this.adSlot.data('id')];
  var breakpoint = getCurrentBreakPoint(slotSettings);

  this.stickyDelayTime = slotSettings.sticky_time_delay[breakpoint] == "*" ? slotSettings.sticky_time_delay[breakpoint] : slotSettings.sticky_time_delay[breakpoint] * 1;
  // This field is used to end the Sticky based on the selector defined by the user.
  this.stickyBasedSelector = (slotSettings.end_sticky_based_selector[breakpoint] != '' && $(slotSettings.end_sticky_based_selector[breakpoint]).length > 0) ? slotSettings.end_sticky_based_selector[breakpoint] : '';
  // This field is used to override the sticky header element height that is calculated dynamically through the code base.
  this.overrideTopElementHeight = (slotSettings.override_top_element_height > 0) ? slotSettings.override_top_element_height : '';
  this.stickyCss = 'position:fixed;z-index:9999;';
  this.elementOffsetTop = this.adSlot.offset().top;
  Drupal.settings['ad_settings_' + this.adSlot.data('id')].isStickAlready = this.stickyDelayTime > 0 || this.stickyDelayTime == '*' ? false : true;
  this.sticky_ajax_disable = slotSettings.sticky_ajax_disable;
  this.forceSticky = forceStickyParam;
  this.elementPosition = elementPosition;
  this.stickyClassName = 'sticky_slot_fixed';
  this.stickyAdsSlotClassName = 'sticky-ad';
  this.stickyHeaderClassName = Drupal.settings.ad_settings.custom.stickHeaderSelector;

  // Method which used to Attach stickHandler When Scrolling or Not in viewPort.
  this.stickHandler = function (stickyObject) {
    var adjustTopPixel = 0;

    // Get Top value from Sticky Header Selector. When our Element touches this top value it will turns into Sticky.
    stickyObject.stickAtTop = stickyObject.stickyHeaderClassName ? $(stickyObject.stickyHeaderClassName).height() : 0

    // If two ads are sticky its should not intersect.
    // Todo: Need to check left & width of the previous element & then decide whether it will intersect or not.
    // Todo: As of now Consider only the Top & One Right Rail ad will intersect & sticky.
    if (stickyObject.elementPosition > 0 && $($('.' + stickyObject.stickyAdsSlotClassName)[stickyObject.elementPosition - 1]).hasClass(stickyObject.stickyClassName)) {
      adjustTopPixel = stickyObject.stickAtTop * 1 + $($('.' + stickyObject.stickyAdsSlotClassName)[stickyObject.elementPosition - 1]).find('div').height() * 1;
      stickyObject.stickAtTop = adjustTopPixel;
    }

    isScrollTopGreaterElementTop = $(window).scrollTop() > (stickyObject.elementOffsetTop - stickyObject.stickAtTop);
    isStickClassAdded = !stickyObject.adSlot.hasClass(stickyObject.stickyClassName);
    isStickyAlready = Drupal.settings['ad_settings_' + stickyObject.adSlot.data('id')].isStickAlready == false;
    // Returning the hander if disbale sticky ads for ajax pages or when forcing the sticky.
    // In ajax pages ads id are unique. So we are checking the setting ajax_disable is true and is Already sticky is processed for the ads slot.
    isStickWhenAjaxRequest = (("*" == stickyObject.stickyDelayTime && false == stickyObject.forceSticky) || !stickyObject.sticky_ajax_disable || $.inArray(stickyObject.adSlot.attr('id'), window.tgxAdInit.stickyProcessedSlot) == -1);

    if (isStickyAlready && isScrollTopGreaterElementTop && isStickClassAdded && isStickWhenAjaxRequest) {

      // Getting the Current Offset postion of the Element. So we make sticky we can maintain the same postion.
      stickyObject.previousOffsetTop = stickyObject.adSlot.offset().top - $(window).scrollTop();
      stickyObject.previousOffsetLeft = stickyObject.adSlot.offset().left;

      // If previousOffsetTop is Less than stickAtTop value then replacing with stickAtTop value.
      if (stickyObject.previousOffsetTop < stickyObject.stickAtTop) {
        stickyObject.previousOffsetTop = stickyObject.stickAtTop;
      }

      // When we sticking the element. Parent will lose its height. Too maintain its height Getting the parent height & setting the same height after sticks.
      stickyObject.adSlot.closest('.pane-content').height(stickyObject.adSlot.closest('.pane-content').height());
      stickyObject.adSlot.addClass(stickyObject.stickyClassName).attr('style', stickyObject.stickyCss);

      // When sticky is triggered during loading of ads it doesn't have proper offsetTop & left.
      if (!stickyObject.forceSticky) {
        if (stickyObject.overrideTopElementHeight > 0) {
          stickyObject.adSlot.css({'top': stickyObject.overrideTopElementHeight + 'px'});
        }
        else {
          stickyObject.adSlot.css({'top': stickyObject.previousOffsetTop + 'px'});
        }
        stickyObject.adSlot.css({"left": stickyObject.previousOffsetLeft + "px"});
      }
      else {
        // We can take top from sticky header height.
        if (stickyObject.overrideTopElementHeight > 0) {
          stickyObject.adSlot.css({'top': stickyObject.overrideTopElementHeight + 'px'});
        }
        else {
          stickyObject.adSlot.css({'top': $(stickyObject.stickyHeaderClassName).height() + 'px'});
        }
        // As of now considering top ad will be center aligned.
        // Todo: Need setting to align center/left/right.
        if (stickyObject.elementPosition < 1) {
          offsetLeft = ($(window).width() - stickyObject.adSlot.width()) / 2;
          stickyObject.adSlot.css({"left": offsetLeft + "px"});
        }
      }

      if (adjustTopPixel) {
        stickyObject.adSlot.css('top', adjustTopPixel + 'px');
      }

      // Two object are initialized from Not in viewPort & When scrolling. To stick Only one time Making as setting value
      // So that Both object will not sticky more than one time.
      window.tgxAdInit.stickyProcessedSlot.push(stickyObject.adSlot.attr('id'));
      if (stickyObject.stickyDelayTime != "*") {
        Drupal.settings['ad_settings_' + stickyObject.adSlot.data('id')].isStickAlready = true;
        setTimeout(function() {
          unsetSticky(stickyObject);
        }, stickyObject.stickyDelayTime);
      }
      else if ($(stickyObject.stickyBasedSelector).length > 0) {
        Drupal.settings['ad_settings_' + stickyObject.adSlot.data('id')].isStickAlready = true;
      }

    }
    else if ($(window).scrollTop() < (stickyObject.elementOffsetTop - stickyObject.stickAtTop) && stickyObject.adSlot.hasClass(stickyObject.stickyClassName)) {
      // Remove Sticky when scrollTop moving above the Element.
      stickyObject.adSlot.removeClass(stickyObject.stickyClassName).removeAttr('style');
      stickyObject.adSlot.closest('.pane-content').removeAttr('style');
    }
    // If the element is in view and if the current breakpoint has a valid stickyBasedSelector then unset the sticky.
    if ($(stickyObject.stickyBasedSelector).length > 0 && elementInView($(stickyObject.stickyBasedSelector))) {
      unsetSticky(stickyObject);
    }
    stickyObject.forceSticky = false;
  }

}
// Method used to unset the sticky, If the AD is stick already.
function unsetSticky(stickyObject) {
  var $ = jQuery;
  // Unsetting sticky when in reaches the delay time.
  stickyObject.adSlot.removeClass(stickyObject.stickyClassName).removeAttr('style');
  stickyObject.adSlot.closest('.pane-content').removeAttr('style');

  // When Unsetting check if other next element is sticky and Maintain its top.
  nextElement = window.stickyAdsSlot[stickyObject.elementPosition + 1];
  currentAdSlotHeight = stickyObject.adSlot.height();
  if ($(nextElement).hasClass(stickyObject.stickyClassName)) {
    $(nextElement).css('top', ($(nextElement).offset().top - currentAdSlotHeight) + 'px');
  }

  // Remove Sticky class when setting is stick for one time.
  stickyObject.adSlot.removeClass(stickyObject.stickyAdsSlotClassName);
}

// Determines if a DOM element is in view right now.
function elementInView($element) {
  var $window = $(window);

  var docViewTop = $window.scrollTop();
  var docViewBottom = docViewTop + $window.height();

  var elemTop = $element.offset().top;
  var elemBottom = elemTop + $element.height();

  return ((elemTop <= docViewBottom) &&
      (elemBottom >= docViewTop));
}


/* globals jQuery, Drupal console */
(function ($, Drupal) {
  'use strict';

  window.tgxAdInit = {};
  window.tgxAdInit.stickyProcessedSlot = [];
  window.stickyAdsSlot = [];
  window.stickObjContainer = [];

  Drupal.behaviors.timeinc_advertising_sticky_plugin = {
    attach: function (context, settings) {
      // Getting All the sticky ads slot and Create a sticky Object.
      $('.sticky-ad').once('sticky-ad').each(function(i) {
        window.stickObjContainer.push(new makeAdSlotSticky($(this).attr('id'), i, false));
        window.stickyAdsSlot.push($(this).attr('id'));
      });

    }
  };

  // When scroll trigger sticky Handler.
  $(window).bind('scroll',function() {
    $(window.stickObjContainer).each(function() {
      this.stickHandler(this);
    });
  });

  // When Ads not in view port during rendering of ads trigger sticky Handler.
  $(document).on('tgxAdInit.afterAdLoads', function(e, placeholderId) {
    if ($('#' + placeholderId).hasClass('sticky-ad') && $(window).scrollTop() > $('#' + placeholderId).offset().top) {
      var elementPosition = $.inArray(placeholderId, window.stickyAdsSlot);
      var stickyObj = new makeAdSlotSticky(placeholderId, elementPosition, true);
      stickyObj.stickHandler(stickyObj);
    }
  });

})(jQuery, Drupal);
;/**/
