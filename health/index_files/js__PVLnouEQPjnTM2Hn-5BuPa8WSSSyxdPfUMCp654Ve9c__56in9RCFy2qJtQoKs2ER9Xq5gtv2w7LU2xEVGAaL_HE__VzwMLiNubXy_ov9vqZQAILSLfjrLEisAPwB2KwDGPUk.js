/**
 * @file
 * Configures and loads TGX ads.
 */

/* globals jQuery, Drupal, TiiAdConfig, TiiAdFactory, console */
(function ($, Drupal) {
  'use strict';
  // Listen for $(document).trigger('tgxAdInit.afterAdLoads', [placeholderId]).
  $(document).on('tgxAdInit.afterAdLoads', {}, function (placeholder) {

    // Loop through placeholders and set up listeners. The listeners shouldn't care what ad triggered event.
    for (var setting in Drupal.settings) {
      if (setting.indexOf("ad_settings_") >= 0) {
        var thisSetting = Drupal.settings[setting];
        if (thisSetting.hide_ad && thisSetting.hide_ad.hide_when_ads_in_view &&
          !(thisSetting.hide_ad.initialized)) {
          // If there hasn't been a listener set up already, set one up.
          $(document).on('adInView', function (event) {
            var ad_id = $(this).data('id');
            var listenerSetting = Drupal.settings['ad_settings_' +
              ad_id];
            if (typeof listenerSetting !== 'undefined') {
              var waitBeforeHide = 0;
              var minimumTimeToShowAd = parseInt(listenerSetting.hide_ad
                .minimum_time_to_show_ad);
              var date = new Date();
              Drupal.behaviors.timeinc_advertising.debug_log(
                'About to hide in adInView.ad_settings_' + ad_id);
              var hideSelector = $(this);
              if (listenerSetting.hide_ad.hide_selector && $(listenerSetting.hide_ad.hide_selector)) {
                hideSelector = $(listenerSetting.hide_ad.hide_selector);
              }

              // When scrolling fast, there are two issues.
              // 1. While the inline ad is not visible, the adhesive Ad is removed because of 2 second timeout.
              // 2. When scrolling fast, if inline ads becomes OUT OF VIEW, adhesive Ad is placed. Since the
              // existing adhesive Ad will be removed only after two seconds, two adhesive ads are visible.
              // Therefore, track whether an ad is visible at the current time or not.
              listenerSetting.inline_ad_visible = true;

              // Ads might be shown and hidden very quickly.
              // Make sure that ads show for a certain amount of time.
              if (listenerSetting.shownSince && minimumTimeToShowAd) {
                var timeShown = date.getTime() - parseInt(
                  listenerSetting.shownSince);
                waitBeforeHide = minimumTimeToShowAd - timeShown;
                if (waitBeforeHide < 0) {
                  waitBeforeHide = 0;
                }
              }
              listenerSetting.hide_ad.timeout = setTimeout(function (
                $placeholder) {
                // Hide existing Ad.
                $(hideSelector).fadeOut(200);
                listenerSetting.visible = false;

                if (!listenerSetting.visible && !listenerSetting.inline_ad_visible) {
                  // Show Ad.
                  Drupal.behaviors.timeinc_advertising.showAd($(
                    $placeholder), listenerSetting, ad_id);
                }
              }, waitBeforeHide, $(this));
            }
          }.bind($('#' + thisSetting.ad_id)));
          $(document).on('adOutOfView', function (event) {
            var ad_id = $(this).data('id');
            var listenerSetting = Drupal.settings['ad_settings_' +
              ad_id];
            if (typeof listenerSetting !== 'undefined') {
              listenerSetting.inline_ad_visible = false;
              if (!listenerSetting.visible) {
                // Show AD.
                Drupal.behaviors.timeinc_advertising.showAd($(this),
                  listenerSetting, ad_id);
              }
            }
          }.bind($('#' + thisSetting.ad_id)));
          thisSetting.hide_ad.initialized = true;
        }
      }
    }
  });

  // To show Ad.
  Drupal.behaviors.timeinc_advertising.showAd = function (adElement, adSettings, adId) {
    Drupal.behaviors.timeinc_advertising.debug_log(
      'About to show in adInView.ad_settings_' + adId);
    window.refreshIds = ['ad-' + adId];
    window.adRefresh();

    var showSelector = adElement;
    if (adSettings.hide_ad.hide_selector && $(adSettings.hide_ad.hide_selector)) {
      showSelector = $(adSettings.hide_ad.hide_selector);
    }
    $(showSelector).fadeIn(200);
    adSettings.visible = true;
    var date = new Date();
    adSettings.shownSince = date.getTime();
  }
})(jQuery, Drupal);
;/**/
/**
 * @file
 * bootstrap.js
 *
 * Provides general enhancements and fixes to Bootstrap's JS files.
 */

var Drupal = Drupal || {};

(function($, Drupal){
  "use strict";

  Drupal.behaviors.bootstrap = {
    attach: function(context) {
      // Provide some Bootstrap tab/Drupal integration.
      $(context).find('.tabbable').once('bootstrap-tabs', function () {
        var $wrapper = $(this);
        var $tabs = $wrapper.find('.nav-tabs');
        var $content = $wrapper.find('.tab-content');
        var borderRadius = parseInt($content.css('borderBottomRightRadius'), 10);
        var bootstrapTabResize = function() {
          if ($wrapper.hasClass('tabs-left') || $wrapper.hasClass('tabs-right')) {
            $content.css('min-height', $tabs.outerHeight());
          }
        };
        // Add min-height on content for left and right tabs.
        bootstrapTabResize();
        // Detect tab switch.
        if ($wrapper.hasClass('tabs-left') || $wrapper.hasClass('tabs-right')) {
          $tabs.on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
            bootstrapTabResize();
            if ($wrapper.hasClass('tabs-left')) {
              if ($(e.target).parent().is(':first-child')) {
                $content.css('borderTopLeftRadius', '0');
              }
              else {
                $content.css('borderTopLeftRadius', borderRadius + 'px');
              }
            }
            else {
              if ($(e.target).parent().is(':first-child')) {
                $content.css('borderTopRightRadius', '0');
              }
              else {
                $content.css('borderTopRightRadius', borderRadius + 'px');
              }
            }
          });
        }
      });
    }
  };

  /**
   * Behavior for .
   */
  Drupal.behaviors.bootstrapFormHasError = {
    attach: function (context, settings) {
      if (settings.bootstrap && settings.bootstrap.formHasError) {
        var $context = $(context);
        $context.find('.form-item.has-error:not(.form-type-password.has-feedback)').once('error', function () {
          var $formItem = $(this);
          var $input = $formItem.find(':input');
          $input.on('keyup focus blur', function () {
            var value = $input.val() || false;
            $formItem[value ? 'removeClass' : 'addClass']('has-error');
            $input[value ? 'removeClass' : 'addClass']('error');
          });
        });
      }
    }
  };

  /**
   * Bootstrap Popovers.
   */
  Drupal.behaviors.bootstrapPopovers = {
    attach: function (context, settings) {
      if (settings.bootstrap && settings.bootstrap.popoverEnabled) {
        var $currentPopover = $();
        if (settings.bootstrap.popoverOptions.triggerAutoclose) {
          $(document).on('click', function (e) {
            if ($currentPopover.length && !$(e.target).is('[data-toggle=popover]') && $(e.target).parents('.popover.in').length === 0) {
              $currentPopover.popover('hide');
              $currentPopover = $();
            }
          });
        }
        var elements = $(context).find('[data-toggle=popover]').toArray();
        for (var i = 0; i < elements.length; i++) {
          var $element = $(elements[i]);
          var options = $.extend({}, settings.bootstrap.popoverOptions, $element.data());
          if (!options.content) {
            options.content = function () {
              var target = $(this).data('target');
              return target && $(target) && $(target).length && $(target).clone().removeClass('element-invisible').wrap('<div/>').parent()[$(this).data('bs.popover').options.html ? 'html' : 'text']() || '';
            }
          }
          $element.popover(options).on('click', function (e) {
            e.preventDefault();
          });
          if (settings.bootstrap.popoverOptions.triggerAutoclose) {
            $element.on('show.bs.popover', function () {
              if ($currentPopover.length) {
                $currentPopover.popover('hide');
              }
              $currentPopover = $(this);
            });
          }
        }
      }
    }
  };

  /**
   * Bootstrap Tooltips.
   */
  Drupal.behaviors.bootstrapTooltips = {
    attach: function (context, settings) {
      if (settings.bootstrap && settings.bootstrap.tooltipEnabled) {
        var elements = $(context).find('[data-toggle="tooltip"]').toArray();
        for (var i = 0; i < elements.length; i++) {
          var $element = $(elements[i]);
          var options = $.extend({}, settings.bootstrap.tooltipOptions, $element.data());
          $element.tooltip(options);
        }
      }
    }
  };

  /**
   * Anchor fixes.
   */
  var $scrollableElement = $();
  Drupal.behaviors.bootstrapAnchors = {
    attach: function(context, settings) {
      var i, elements = ['html', 'body'];
      if (!$scrollableElement.length) {
        for (i = 0; i < elements.length; i++) {
          var $element = $(elements[i]);
          if ($element.scrollTop() > 0) {
            $scrollableElement = $element;
            break;
          }
          else {
            $element.scrollTop(1);
            if ($element.scrollTop() > 0) {
              $element.scrollTop(0);
              $scrollableElement = $element;
              break;
            }
          }
        }
      }
      if (!settings.bootstrap || settings.bootstrap.anchorsFix !== '1') {
        return;
      }
      var anchors = $(context).find('a').toArray();
      for (i = 0; i < anchors.length; i++) {
        if (!anchors[i].scrollTo) {
          this.bootstrapAnchor(anchors[i]);
        }
      }
      $scrollableElement.once('bootstrap-anchors', function () {
        $scrollableElement.on('click.bootstrap-anchors', 'a[href*="#"]:not([data-toggle],[data-target],[data-slide])', function(e) {
          if (this.scrollTo) {
            this.scrollTo(e);
          }
        });
      });
    },
    bootstrapAnchor: function (element) {
      element.validAnchor = element.nodeName === 'A' && (location.hostname === element.hostname || !element.hostname) && (element.hash.replace(/#/,'').length > 0);
      element.scrollTo = function(event) {
        var attr = 'id';
        var $target = $(element.hash);
        // Check for anchors that use the name attribute instead.
        if (!$target.length) {
          attr = 'name';
          $target = $('[name="' + element.hash.replace('#', '') + '"]');
        }
        // Immediately stop if no anchors are found.
        if (!this.validAnchor && !$target.length) {
          return;
        }
        // Anchor is valid, continue if there is an offset.
        var offset = $target.offset().top - parseInt($scrollableElement.css('paddingTop'), 10) - parseInt($scrollableElement.css('marginTop'), 10);
        if (offset > 0) {
          if (event) {
            event.preventDefault();
          }
          var $fakeAnchor = $('<div/>')
            .addClass('element-invisible')
            .attr(attr, $target.attr(attr))
            .css({
              position: 'absolute',
              top: offset + 'px',
              zIndex: -1000
            })
            .appendTo($scrollableElement);
          $target.removeAttr(attr);
          var complete = function () {
            location.hash = element.hash;
            $fakeAnchor.remove();
            $target.attr(attr, element.hash.replace('#', ''));
          };
          if (Drupal.settings.bootstrap.anchorsSmoothScrolling) {
            $scrollableElement.animate({ scrollTop: offset, avoidTransforms: true }, 400, complete);
          }
          else {
            $scrollableElement.scrollTop(offset);
            complete();
          }
        }
      };
    }
  };

  /**
   * Tabledrag theming elements.
   */
  Drupal.theme.tableDragChangedMarker = function () {
    return '<span class="tabledrag-changed glyphicon glyphicon-warning-sign text-warning"></span>';
  };

  Drupal.theme.tableDragChangedWarning = function () {
    return '<div class="tabledrag-changed-warning alert alert-warning messages warning">' + Drupal.theme('tableDragChangedMarker') + ' ' + Drupal.t('Changes made in this table will not be saved until the form is submitted.') + '</div>';
  };

})(jQuery, Drupal);
;/**/
