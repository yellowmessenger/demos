
(function($) {

  /*
    utilities - dependency defined in library
    Handlebars - dependency defined in library
    galleryData - part of the gallery slide markup
  */
  var templatePath = '/sites/all/themes/health/templates/components/gallery/handlebars';
  var gallerySlide_Template = templatePath + '/gallery-slide.html';
  var galleryVideoSlide_Template = templatePath + '/gallery-video-slide.html';
  var galleryAdSlide_Template = templatePath + '/gallery-ad-slide.html';
  var galleryViewAll_Template = templatePath + '/gallery-view-all.html';
  var galleryLastSlide_Template = templatePath + '/gallery-last-slide.html';

  var gallery_info = galleryData.main_info;
  var gallery_slides = new Object();
  gallery_slides = galleryData.slides;
  var site_name = '';
  if (Drupal.settings.ti_lsg_hlt_responsive.site_name.length > 0) {
    site_name = Drupal.settings.ti_lsg_hlt_responsive.site_name;
  }
  var current_slide, isAd;
  var date = new Date();
  var adShownSince = date.getTime();
  var minimumTimeToShowAd = 2000;
  var adThrottleTimeout = null;
  var waitBeforeChangeAd;
  // Flag for updating swoop ads.
  var update_swoop_ads = false;

  /**
   * The main gallery router function.
   *
   * Router function to load corresponding templates as the URL and update
   * meta information.
   */
  function gallery_router(url, isScroll, isInitialPageLoad) {
    // Set default value for function parameter as assigning value in the
    // parameter set throws error on ios devices.
    if (typeof(isScroll)==='undefined') isScroll = true;
    var slide_number = get_slide_number_from_url(url);
    var ad_num = '';
    isAd = false;
    if (typeof slide_number == 'string' && slide_number.indexOf('ad') != -1) {
      var ad_num = slide_number;
      slide_number = 'ad';
      isAd = true;
    };
    current_slide = slide_number;
    var updatedHTML = '';
    var moredataHTML = showMoreContent(true);
    // Make swoop ads false by default on each slide refresh.
    update_swoop_ads = false;
    switch(slide_number) {
      case 'view-all':
        updatedHTML = showViewAllSlide();
        break;
      case 'ad':
        updatedHTML = showAdSlide(ad_num);
        current_slide = ad_num;
        break;
      case 'more':
        updatedHTML = showLastSlide(slide_number);
        moredataHTML = showMoreContent(false);
        break;
      default:
        updatedHTML = showSlide(slide_number);
        break;
    }
    $('.gallery').html(updatedHTML);
    $('.more_from_health_content').html(moredataHTML);
    
    if (typeof Drupal.settings.ti_lsg_hlt_video !== 'undefined') {
      //Adding external jumpstart js for gallery slide show
      $.getScript(Drupal.settings.ti_lsg_hlt_video.jumpstart_url);
    }    
    
    updateAdsAndThirdParties(isInitialPageLoad, update_swoop_ads);
    $('.gallery-js-app .gallery .row-gallery-image img, .more-from-health-items .img img').each(function () {
      ti_image_lazy_load.setSrc($(this));
    });
    // Scroll to top.
    if (isScroll == true) {
      navbar_height = $("#navbar").height();
      ad_height = $('.leaderboard-ad-unit').height();
      h = navbar_height+ad_height+35;
      $('html, body').animate({scrollTop: $('.content-body').offset().top -h }, 'slow');
    }
  }

  /**
   * Function which will update all the ads and third-party scripts.
   */
  function updateAdsAndThirdParties(isInitialPageLoad, update_swoop_ads) {
    // Update ads
    refreshAdsWithThrottle();
    // Update social sharing links.
    updateSocialSharing();
    // Update outbrain blocks.
    updateOutbrain();
    // Update Tealium data and omniture.
    // If this is initial page load, tealium already has data, so do not resend.
    if (!isInitialPageLoad) {
      refreshTealiumTag();
    }
    // Update swoop ads
    if (update_swoop_ads) {
      updateSwoopAds();
    }
  }

  /**
   * Function to update the tealium data.
   */
  function refreshTealiumTag() {
    var slide_data;
    if (typeof(window.Ti) !== "undefined" && typeof(window.Ti.udo_metadata) !== "undefined") {
      if (typeof(current_slide) !== "undefined") {
        slide_data = gallery_slides[current_slide];

        // Correct page number.
        if (current_slide === 'view-all' || current_slide === 'more' || isAd) {
          window.Ti.udo_metadata.page_number = current_slide;
        }
        else {
          window.Ti.udo_metadata.page_number = parseInt(current_slide) + 1;
        }

        // Set tealium details specially for view all page as it will not be
        // present in the slide array.
        if (current_slide == 'view-all') {
          window.Ti.udo_metadata.slide_title = 'View All Slide';
          window.Ti.udo_metadata.friendly_url = gallery_info['main_page_url'] + '/view-all';;
        }
        else {
          window.Ti.udo_metadata.slide_title = slide_data['slide_headline'];
          window.Ti.udo_metadata.friendly_url = gallery_info['main_page_url'] + slide_data['slide_url'];
        }
      }
      utag.view(window.Ti.udo_metadata);
    }
  }

  /**
   * Function to update swoop ads.
   */
  function updateSwoopAds() {
    if (typeof SPX !== 'undefined' && typeof SPX.contentUpdated === 'function') {
      SPX.contentUpdated($('.main-container'));
    }
  }

  /**
   * Function which updates the ads when user navigates to next page.
   */
  function refreshAdsWithThrottle() {
    waitBeforeChangeAd = 0;
    // Ads might be shown and hidden very quickly.
    // Make sure that ads show for a certain amount of time.
    if (adShownSince && minimumTimeToShowAd) {
      var nowDate = new Date();
      var nowTime = nowDate.getTime();
      var timeShown = nowTime - parseInt(adShownSince);
      waitBeforeChangeAd = minimumTimeToShowAd - timeShown;
      if (waitBeforeChangeAd < 0) {
        waitBeforeChangeAd = 0;
      }
    }

    // After some time, the ad should refresh (avoiding repeated refreshes).
    if (adThrottleTimeout == null) {
      adThrottleTimeout = setTimeout(function() {
        adRefresh();

        // The new placeholder for the interstitial ad needs to be filled in.
        Drupal.attachBehaviors();
        var shownDate = new Date();
        adShownSince = shownDate.getTime();
        adThrottleTimeout = null;
      }, waitBeforeChangeAd);
    }
  }

  /**
   * Function to get the slide number from the URL.
   *
   * This function will get the slide number from both legacy as well as new
   * contents.
   */
  function get_slide_number_from_url(url) {
    // Regular expression to verify URLs like
    // "/health/gallery/0,,20950170,00.html".
    var url_reg_exp = /health\/gallery\/\d[,]*\d*.([\d]*)[,][0-9]*[.a-zA-Z]*.([a-z0-9_]*.*)/g;
    var legacy_url_parts = url.split(url_reg_exp);
    var slide_number = 0;
    var key;
    for (key in gallery_slides) {
      if (gallery_slides[key].slide_url == url) {
        slide_number = key;
      }
    }
    if (slide_number == 0) {
      // The URL must be containing parameters like "view-all" or "more".
      var url_parts = url.split('/');
      var last_item = url_parts[url_parts.length - 1];
      if (last_item == 'view-all') {
        slide_number = last_item;
      }
      else if (url == '#more' || url.indexOf('#ad') != -1) {
        slide_number = url.replace('#', '');
      }
    }
    return slide_number;
  }

  /**
   * Function to get HTML of a regular slide.
   */
  function showSlide(slide_number) {
    var slide_data;
    slide_data = gallery_slides[slide_number];
    var html = '';
    if (slide_data.slide_type == 'video') {
      html = getHTML(slide_data, galleryVideoSlide_Template);
    }
    else {
      html = getHTML(slide_data, gallerySlide_Template);
      // Show swoop ads only for the normal slide.
      update_swoop_ads = true;
    }
    var slide_title = slide_data['slide_headline'] + ' - ' + gallery_info['gallery_tout_headline'] + ' - ' + 'Health.com';
    updateURL(slide_title, slide_data['slide_url']);
    return html;
  }

  /**
   * Function to get HTML of a more from health content.
   */
  function showMoreContent(more) {
    var slide_data;
    slide_data = gallery_slides['more_content_data'];
    if (more == true) {
      slide_data = gallery_slides['more_slide_data'];
    }
    var html = slide_data;
    return html;
  }


  /**
   * Function to get HTML of ad slide.
   */
  function showAdSlide(slide_number) {
    var ad_data = gallery_slides[slide_number];
    var html = getHTML(ad_data, galleryAdSlide_Template);
    var slide_title = gallery_info['gallery_tout_headline'] + ' - ' + site_name;
    updateURL(slide_title, ad_data['slide_url']);
    return html;
  }

  /**
   * Function to get HTML of view all slide.
   */
  function showViewAllSlide() {
    var html = getHTML(galleryData, galleryViewAll_Template);
    var slide_title = gallery_info['gallery_tout_headline'] + ' - ' + site_name;
    var path =  gallery_info['main_page_url'] + '/view-all';
    updateURL(slide_title, path);
    return html;
  }

  /**
   * Function to get HTML of view all slide.
   */
  function showLastSlide(slide_number) {
    var slide_data = gallery_slides[slide_number];;
    var html = getHTML(slide_data, galleryLastSlide_Template);
    var slide_title = 'Last Slide - ' + gallery_info['gallery_tout_headline'] + ' - ' + site_name;
    var path =  gallery_info['main_page_url'] + '#more';
    updateURL(slide_title, path);
    return html;
  }

  /**
   * Function to update the window title and URL when slide changes.
   */
  function updateURL(title, path) {
    var base_url = window.location.hostname;
    document.title = title;
    window.history.pushState({urlPath: base_url + '/' + path}, title, path);
  }

  /**
   * Function to render the slide HTML using handlebar.
   */
  function getHTML(data, handlebarTemplate) {
    var result = null;
    $.ajax({
        url: handlebarTemplate,
        type: 'get',
        dataType: 'html',
        async: false,
        success: function(data) {
            result = data;
        }
    });
    var template = Handlebars.compile(result);
    var html = template(data);
    return html;
  }

  /**
   * Function to extract img url from image tag.
   */
  function extractSrcFromImg(img) {
    var regex = /<img[^>]+src="?([^"\s]+)"?[^>]*>/g,
        src = regex.exec(img)[1];
    return src;
  }

  /**
   * Function to update social sharing links.
   */
  function updateSocialSharing() {
    var current_slide_data;
    // For ad, view-all and more page, show the details of first slide.
    if (current_slide === 'view-all' || current_slide === 'more' || isAd) {
      current_slide_data = gallery_slides[0];
    }
    else {
      current_slide_data = gallery_slides[current_slide];
    }
    var img = current_slide_data['social_media_image'];
    // Metatags like canonical
    $('link[rel="canonical"]').attr('href', location.protocol + '//' + location.host + location.pathname);
    $('meta[property="og:image"]').attr('content', img);
    $('meta[property="og:description"]').attr('content', current_slide_data['social_media_description']);
    $('meta[property="description"]').attr('content', current_slide_data['social_media_description']);
    $('meta[property="og:url"]').attr('content', location.protocol + '//' + location.host + location.pathname);

    // Update social share icons
    // Facebook
    $('.social-ul a.facebook').attr('href', current_slide_data['fb_link']);
     // Twitter
    $('.social-ul a.twitter').attr('href', current_slide_data['twitter_link']);
     // Pinterest
    $('.social-ul a.pinterest').attr('href', current_slide_data['pinterest_link']);
     // Mail
    $('.social-ul a.email-btn').attr('href', current_slide_data['mail_link']);
    // Pinit Button
    $('.pinit-button a.story-card__media-share').attr('href', current_slide_data['pinterest_link']);
  }

  /**
   * Function to update the outbrain blocks on slide changes.
   */
  function updateOutbrain() {
    // Outbrain should not update on ad slide.
    if (!isAd) {
      var $outbrain_els = $('div.OUTBRAIN'),
        $el,
        outbrain_widget_src,
        outbrain_widget_id;

      $outbrain_els.each(function () {
        $el = $(this);
        outbrain_widget_src = $el.attr('data-src');
        outbrain_widget_id = $el.attr('data-widget-id');
        $el.before('<div class="OUTBRAIN" data-src="' + outbrain_widget_src + '" data-widget-id="' + outbrain_widget_id + '" data-ob-template="realsimple"></div>').remove();
      });

      OBR.extern.researchWidget();
    }

  }

  /**
   * Helper function for debugging the templates.
   */
  Handlebars.registerHelper("debug", function(optionalValue) {
    console.log("Current Context");
    console.log("====================");
    console.log(this);

    if (optionalValue) {
      console.log("Value");
      console.log("====================");
      console.log(optionalValue);
    }
  });

  /**
   * This event function makes sure that the back/forward buttons work as well.
   */
  window.onpopstate = function(event) {
    gallery_router(location.pathname, false, false);
  };
  // Lazy load the image in the js-app.
  $('.gallery-js-app .gallery .row-gallery-image img').each(function () {
    ti_image_lazy_load.setSrc($(this));
  });
  $('.gallery-js-app').show();
  $('#gallery-list').hide();
  var on_load_url_hash = window.location.hash.substr(1);
  if (on_load_url_hash.length > 0) {
    // Run the router with no scroll-up and with the fact that this is the initialPageLoad.
    gallery_router('#' + on_load_url_hash, false, true);
  }

  /**
   * Click event for the gallery links to trigger navigation.
   */
  $(document).on('click', '.node-type-gallery .top.gallery-navigation a', function(e) {
    if (!$(this).hasClass('next-gallery')) {
      var url = $(this).attr("href");
      // We are not using the javascript version of view-all for now.
      // Also, the link to go back to the gallery should cause a page refresh for now.
      var isViewAsGallery = $(this).find(".view-as-gallery-text").length > 0;
      if (url.indexOf("/view-all") == -1 && !isViewAsGallery) {
        e.preventDefault();
        gallery_router(url, false);
      }
    };
  });
  $(document).on('click', '.node-type-gallery .bottom.gallery-navigation a, .node-type-gallery .view-all-gallery-images.gallery-navigation a', function(e) {
    if (!$(this).hasClass('next-gallery')) {
      e.preventDefault();
      var url = $(this).attr("href");
      gallery_router(url, true, false);
    };
  });

  // Swipe event for mobile devices.
  if (isMobile()) {
    /**
     * Swipeleft event for mobile devices.
     */
    $('.gallery').on('swipeleft', '.row-gallery', function(e) {
      if ($('.next-slide').length > 0) {
        var url = $('.next-slide').attr("href");
        gallery_router(url);
      }
    });

    /**
     * Swipeleft event for mobile devices.
     */
    $('.gallery').on('swiperight', '.row-gallery', function(e) {
      if ($('.prev-slide').length > 0) {
        var url = $('.prev-slide').attr("href");
        gallery_router(url);
      }
    });
  };

  // Helper function to detect the device.
  function isMobile() {
    var isMobile = false; //initiate as false
    // device detection
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;
    return isMobile;
  }
})(jQuery);
;/**/
