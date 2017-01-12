/**
 * @file
 * Handles manipulation of ad panes prior to ads loading.
 */

/* globals jQuery, Drupal */
(function ($, Drupal) {
  'use strict';

  $(document).on('tgxAdInit.beforeAdsLoad', {}, function (event, adSettings) {
    var $placeholders = $('.ad-placeholder.relocate');

    // Loop over ad placeholders.
    $placeholders.each(function () {
      var $placeholder = $(this);

      if ($placeholder.hasClass('relocate')) {
        var $pane = $placeholder.parents('.pane-tgx-ad');
        var paneData = $placeholder.data();
        var $selector = $(paneData.relocateSelector);

        // Verify the destination selector exists.
        if ($selector.length) {
          $selector[paneData.relocatePosition]($pane);
          $placeholder.removeClass('relocate').addClass('relocated');
        }
        else if (paneData.relocateRemove) {
          $pane.remove();
        }
      }
    });
  });

})(jQuery, Drupal);
;/**/
