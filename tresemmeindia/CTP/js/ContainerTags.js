var _mlbPrefix = '';
var UDM = {};
var CT = {
    emailLinkClicked: false,
    addThisEventHandler: function (evt) {
        switch (evt.type) {
            case "addthis.menu.open":
                //alert('menu opened; surface=' + evt.data.pane);
                break;
            case "addthis.menu.close":
                CT.emailLinkClicked = false;
                break;
            case "addthis.menu.share":
                //avoid the tag firing when chain event is raised invoked by Facebook API
                if (evt.data.service != 'facebook_like' && evt.data.service != 'facebook_unlike' && evt.data.service!='tweet') {
                    if (CT.emailLinkClicked) {
                        UDM.evq.push(['trackEvent', 'Referral', 'Email', _mlbPrefix + 'Content']);
                        CT.emailLinkClicked = false;
                    } else {
                        UDM.evq.push(['trackEvent', 'Referral', 'Add this Share', _mlbPrefix + evt.data.service]);
                    }
                }
                if(evt.data.service=='tweet'){
                    UDM.evq.push(['trackEvent', 'Referral', 'tweet', _mlbPrefix + evt.data.service]);
                }
                break;
        }
    },
    handleSpecialCharAndHtmlTags: function (name) {
        if (name !== undefined) {
            name = name.split('&').join('and'); //'analytics team requested '&' to be replaced to 'and' irrespective of the culture
            name = name.split('<sup>').join('');
            name = name.split('</sup>').join('');
            name = name.split('<strong>').join('');
            name = name.split('</strong>').join('');
        }
        return name;
    },
    //handles google plus click
    /*googlePlusEventHandler: function () {
        var trackingInfo = ($(this.AF).parent('.socialmediaitems').length) ? "Google Plus-Content" : "Google Plus-Brand";
        UDM.evq.push(['trackEvent', 'Referral', 'Share', trackingInfo]);
    },*/
    //handles Youtube player state change
    onPlayerStateChange: function (evt, key) {
        if (evt.data == YT.PlayerState.PLAYING) {
            if (videoPlaying[key] == false) {
                UDM.evq.push(['trackEvent', 'Other', 'Video Plays', videoNames[key], 'Task Start']);
                videoPlaying[key] = true;
            }
        }
        else if (evt.data == YT.PlayerState.ENDED) {
            UDM.evq.push(['trackEvent', 'Other', 'Video Plays', videoNames[key], 'Task Complete']);
            videoPlaying[key] = false;
        }
    },
    //handles Ooyala video state change
    onOoyalaStateChanged: function (eventArgs, videoName) {
        if (eventArgs.state == "playing" && videoPlaying[videoName] != true) {
            UDM.evq.push(['trackEvent', 'Other', 'Video Plays', _mlbPrefix + videoName, 'Task Start']);
            videoPlaying[videoName] = true;
        }

    },
    //handles twitter events
    handleTwttrEvents: function (event) {
        if (event) {
            var eventType = event.type;
            var source = 'Content';
            if (eventType == 'follow') { eventType = 'Follow on Twitter'; source = 'Header'; }
            UDM.evq.push(['trackEvent', 'Referral', eventType, source]);
        }
    }
}

var videoPlayerIds = videoPlayerIds || {};
var videoEmbedCodes = videoEmbedCodes || {};
var videoNames = videoNames || {};
var videoPlaying = videoPlaying || {};
var players = players || [];

// This function executes after the Youtube API code downloads.
function onYouTubeIframeAPIReady() {
    var playerId;
    var embedCode;
    $.each(videoPlayerIds, function (key, value) {
        playerId = videoPlayerIds[key];
        embedCode = videoEmbedCodes[key];
        players[key] = new YT.Player(playerId, {
            videoId: embedCode,
            events: {
                'onReady': function (event) {
                    if (typeof ytPlayerReadyCallback === 'function') {
                        ytPlayerReadyCallback(event);
                    }
                },
                'onStateChange': function (evt) { CT.onPlayerStateChange(evt, key); }
            }
        });
    });

    //    for (var key in videoPlayerIds) {
    //        playerId = videoPlayerIds[key];
    //        embedCode = videoEmbedCodes[key];
    //        players[key] = new YT.Player(playerId, {
    //            videoId: embedCode,
    //            events: {
    //                //'onReady': onPlayerReady,
    //                'onStateChange': function (evt) { CT.onPlayerStateChange(evt, key); }
    //            }
    //        });
    //    }
};

//OOYALA video
function receiveOoyalaEvent(playerId, eventName, eventArgs) {
    //old_receiveOoyalaEvent.apply(this, [playerId, eventName, eventArgs]);
    switch (eventName) {
        case "playheadTimeChanged":
            break;
        case "stateChanged":
            CT.onOoyalaStateChanged(eventArgs, document.getElementById(playerId).getTitle());
            break;
        case "currentItemEmbedCodeChanged":
            break;
        case "totalTimeChanged":
            break;
        case "embedCodeChanged":
            break;
        case "volumeChanged":
            break;
        case "apiReady":
            //note: apiReady event has no eventArgs (3rd call-back parameter)
            if (typeof ooyalaReadyCallback === 'function') {
                ooyalaReadyCallback(playerId, eventName, eventArgs);
            }
            break;
        case "playComplete":
            var videoName = document.getElementById(playerId).getTitle();
            videoName = CT.handleSpecialCharAndHtmlTags(videoName);
            UDM.evq.push(['trackEvent', 'Other', 'Video Plays', videoName, 'Task Complete']);
            videoPlaying[videoName] = false;
            break;
    }
};

function decodeSpecialChars(inputStr) {
    var decodedStr = '';
    if (inputStr != undefined) {
        decodedStr = $("<div />").html(inputStr).text();
        decodedStr = decodedStr.replace(/&gt;/g, ">");
        decodedStr = decodedStr.replace(/&lt;/g, "<");
        decodedStr = decodedStr.replace(/&amp;/g, " and ");
        decodedStr = decodedStr.replace(/&[a-z][a-z][a-z][a-z]?;/g, "");
        decodedStr = decodedStr.replace("&", " and ");
        decodedStr = decodedStr.replace(/<\/?[^>]+(>|$)/g, "");
    }

    return decodedStr;
}

function InitializeYTTracking(playerId, embedCode, videoName) {
    if (players[playerId] === undefined) {
        videoPlayerIds[playerId] = playerId;
        videoEmbedCodes[playerId] = embedCode;
        videoNames[playerId] = CT.handleSpecialCharAndHtmlTags(videoName);
        videoPlaying[playerId] = false;
    }
};

function LoadYTApi() {
    // This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');
    tag.src = "//www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

//COMMON GATEWAY FUNCTION TO HANDLE ALL THE CONTAINER TAGS CALLS
//ACCEPTS {ANALYTICS PARAMS:VALUES}
function trackEvent(args) {
    args.enabled = typeof(args.enabled) !='undefined' ? args.enabled : true;
    if (args.enabled) {
        /*
        *   Function : UDM.evq.push(['trackEvent', category, action, information, funnel]);
        *   For Video Player : Funnel Parameters like Start & Completion needs to passed as value (i.e "Task Start" & "Task End"
        */
        if (args.information == undefined && args.funnel == undefined) {
            UDM.evq.push(['trackEvent', args.category, args.action]);
        } else if (args.funnel == undefined) {
            UDM.evq.push(['trackEvent', args.category, args.action, decodeSpecialChars(args.information)]);
        } else {
            UDM.evq.push(['trackEvent', args.category, args.action, decodeSpecialChars(args.information), args.funnel]);
        }
    }
}

//pinterest tracking
var pinItTracking = true;

function setIntervalX(callback, delay, repetitions, selector) {
    var x = 0;
    var intervalID = window.setInterval(function() {

        callback();

        if (++x === repetitions || $(selector).length > 0) {
            window.clearInterval(intervalID);
        }
    }, delay);
}

// pin-it button tracking for content
// TODO - remove the interval() methods once JS API is available for Pinterest
function pinItButtonTracking() {
    setIntervalX(function() {
        if ($("a[data-pin-log='button_pinit']").length > 0 && pinItTracking) {
            $("a[data-pin-log='button_pinit']").on('click', function() {
                if (typeof UDM !== "undefined") {
                    UDM.evq.push(['trackEvent', 'Referral', 'Pinterest', 'Content']);
                }
            });
            pinItTracking = false;
        } else {
            console.log('interval clear success - maximum interval reached for PinIt button tracking method');
        }
    }, 1000, 5, "a[data-pin-log='button_pinit']");
}

    if (typeof CT != 'undefined' && typeof CT.config != 'undefined') {
        //UDM Param values
        UDM.globalbrand = decodeSpecialChars(CT.config.globalbrand);
        UDM.category = decodeSpecialChars(CT.config.category);
        UDM.channel = decodeSpecialChars(CT.config.channel);
        UDM.localbrand = decodeSpecialChars(CT.config.localbrand);
        UDM.country = decodeSpecialChars(CT.config.country);
        UDM.sitetype = decodeSpecialChars(CT.config.sitetype);

        if (CT.config != undefined) { UDM.fabric = CT.config.fabric; }
        UDM.evq = [];

        UDM.gid = CT.config.gid;
        UDM.gaa = CT.config.gaa;
        UDM.dom = CT.config.dom;
    }

    //Container Tag server inputs
    if (jQuery("#hidGlobalBrandName").length > 0) {
        UDM.globalbrand = jQuery("#hidGlobalBrandName").val();
    }

    if (jQuery("#hidBrandName").length > 0) {
        UDM.localbrand = jQuery("#hidBrandName").val();
    }

    if (jQuery("#hidTaggingCategory").length > 0) {
        UDM.category = jQuery("#hidTaggingCategory").val();
    }

    if (jQuery("#hidTaggingChannel").length > 0) {
        UDM.channel = jQuery("#hidTaggingChannel").val();
    }

    if (jQuery("#hidCountry").length > 0) {
        UDM.country = jQuery("#hidCountry").val();
    }

    if (jQuery("#hidSiteType").length > 0) {
        UDM.sitetype = jQuery("#hidSiteType").val();
    }

    UDM.AcxiomId = (jQuery("#hidAcxiomkey").length > 0) ? jQuery("#hidAcxiomkey").val() : "";

    UDM.evq = [];
    (function (d, u) {
        var ctServerUrl = '';

        if (typeof CT != 'undefined' && typeof CT.config != 'undefined') {
            ctServerUrl = ('https:' == document.location.protocol ? 'https://' : 'http://') + decodeSpecialChars(CT.config.serverUrl);
        }

        if (jQuery("#hidContainerTagServerUrl").length > 0) {
            ctServerUrl = ('https:' == document.location.protocol ? 'https://' : 'http://') + jQuery("#hidContainerTagServerUrl").val();
        }

        if (jQuery("#hidTaggingGID").length > 0) {
            UDM.gid = jQuery("#hidTaggingGID").val();
        }

        if (jQuery("#hidTaggingGAA").length > 0) {
            UDM.gaa = jQuery("#hidTaggingGAA").val();
        }

        u = ctServerUrl;

        UDM.dom = '.' + document.domain.replace(/^www\.|^secure\./, "");
       /* var a = d.createElement('script'); a.type = 'text/javascript'; a.async = 'async';
        a.src = u + '/ct/' + UDM.gid + '/u.js';
        var s = d.getElementsByTagName('script')[0]; s.parentNode.insertBefore(a, s);*/
        var url = u + "/ct/" + UDM.gid + "/u.js";
        jQuery.getScript(url);
    })(document);

    jQuery(document).ready(function () {
    // Listen to AddThis events
    if (typeof addthis != 'undefined') {
        addthis.addEventListener('addthis.menu.open', CT.addThisEventHandler);
        addthis.addEventListener('addthis.menu.close', CT.addThisEventHandler);
        addthis.addEventListener('addthis.menu.share', CT.addThisEventHandler);
    }

    //Acquisition: Mktg Opt ins
    if (jQuery('input[ct-type=corporateOptIn]').length > 0) {
        var corporateOptIn = jQuery('input[ct-type=corporateOptIn]').val();
        if (corporateOptIn == 'true') {
            UDM.evq.push(['trackEvent', 'Conversion', 'Acquisition: Mktg Opt ins', 'Corporate Opt-In']);
        }
    }
    if (jQuery('input[ct-type=corporateOptIn]').length > 0) {
        var brandOptIn = jQuery('input[ct-type=brandOptIn]').val();
        if (brandOptIn == 'true') {
            UDM.evq.push(['trackEvent', 'Conversion', 'Acquisition: Mktg Opt ins', 'Brand Opt-In']);
        }
    }

    //Subscriptions-Newsletter Sign Up
    if (jQuery('input[ct-type=corporateOptIn]').length > 0) {
        var newsletterSignUp = jQuery('input[ct-type=newsletterSignUp]').val();
        if (newsletterSignUp == 'true') {
            UDM.evq.push(['trackEvent', 'Other', 'Subscriptions - Newsletter Sign up']);
        }
    }

    //Youtube : Include these custom attributes if required to be tracked- ct-type, ct-player-id, ct-embed-code, ct-video-name
    if (jQuery("iframe[ct-type=youtube]").length > 0) {
        jQuery("iframe[ct-type=youtube]").each(function () {
            var playerId = jQuery(this).attr("ct-player-id");
            var embedCode = jQuery(this).attr("ct-embed-code");
            var videoName = jQuery(this).attr("ct-video-name");
            InitializeYTTracking(playerId, embedCode, videoName);
        });

        if (typeof (YT) == "undefined") {
            LoadYTApi();
        }
    }

    //Hero Navigation Click (right arrow, left arrow, circle)
    if (jQuery("a[ct-type=heroNavigationClick],span[ct-type=heroNavigationClick]").length > 0) {
        jQuery("a[ct-type=heroNavigationClick],span[ct-type=heroNavigationClick]").click(function (e) {
            // allow only for real click (bypass fake clicks by timer)
            if (typeof (e.originalEvent) !== 'undefined') {
                var targetType = jQuery(this).attr('ct-target-type');
                UDM.evq.push(['trackEvent', 'Custom', 'Navigation Click', targetType])
            }
        });
    }
    //Recipe Click
    if (jQuery("a[ct-type='recipeClick'],a[ct-type='Recipe']").length > 0) {
        var trackingLabel,
            trackingInfo,
            dataLinkType;
        jQuery("a[ct-type='recipeClick'],a[ct-type='Recipe']").each(function () {
            jQuery(this).click(function () {
                trackingInfo = jQuery(this).attr("ct-target-value");
                if (trackingInfo == '') { trackingInfo = jQuery(this).text(); }
                
                trackingLabel = jQuery(this).attr("ct-target-type"),
                dataLinkType = jQuery(this).attr("data-link-type"),
                trackingLabel = CT.handleSpecialCharAndHtmlTags(trackingLabel);

                if(typeof dataLinkType == "undefined"){   
                    UDM.evq.push(['trackEvent', 'Other', 'Recipe Click', trackingLabel + ' - ' + trackingInfo]);
                }
            });
        });
    }
    //Article Click
    if (jQuery("a[ct-type='articleClick'],a[ct-type='Article'],a[ct-type='Expert']").length > 0) {
        var trackingLabel,
            trackingInfo,
            dataLinkType;
        jQuery("a[ct-type='articleClick'],a[ct-type='Article'],a[ct-type='Expert']").each(function () {
            jQuery(this).click(function () {
                trackingInfo = jQuery(this).attr("ct-target-value");
                if (trackingInfo == '') { trackingInfo = jQuery(this).text(); }

                trackingLabel = jQuery(this).attr("ct-target-type"),
                dataLinkType = jQuery(this).attr("data-link-type"),
                trackingLabel = CT.handleSpecialCharAndHtmlTags(trackingLabel);

                if(typeof dataLinkType == "undefined"){
                    UDM.evq.push(['trackEvent', 'Other', 'Article Click', trackingLabel + ' - ' + trackingInfo]);
                }
            });
        });
    }
    //Email
    jQuery('a.addthis_button_email').click(function () {
        CT.emailLinkClicked = true;
    });

    //jiaThisEmail
    jQuery('a.jt_button_email').click(function () {
        UDM.evq.push(['trackEvent', 'Referral', 'Email', 'Content']);
    });

    //Print
    jQuery("span[ct-type=print]").click(function () {
        var targetType = jQuery(this).attr('ct-target-type');
        UDM.evq.push(['trackEvent', 'Other', 'Print', _mlbPrefix + targetType]);
    });
    //rating-reviews
    if (jQuery("button[ct-type=rating-reviews]").length > 0) {
        jQuery("button[ct-type=rating-reviews]").each(function () {
            jQuery(this).click(function () {
                UDM.evq.push(['trackEvent', 'Other', 'Rating/Review']);
            });
        });
    }

    //Site Search
    if (jQuery("form[ct-type=basicSearch]").length > 0) {
        jQuery("form[ct-type=basicSearch]").submit(function () {
            var keyword = jQuery(this).find('input[ct-target-type=keyword]').val();
            UDM.evq.push(['trackEvent', 'Other', 'Site Search', _mlbPrefix + 'Basic Recipe Search - ' + keyword]);
        });
    }
    if (jQuery("input[ct-type=basicSearch],button[ct-type=basicSearch]").length > 0) {
        jQuery("input[ct-type=basicSearch],button[ct-type=basicSearch]").click(function () {
            var keyword = jQuery('input[ct-target-type=keyword]').val();
            UDM.evq.push(['trackEvent', 'Other', 'Site Search', _mlbPrefix + 'Basic Recipe Search - ' + keyword]);
        });
    }
    if (jQuery("form[ct-type=advancedSearch]").length > 0) {
        jQuery("form[ct-type=advancedSearch]").submit(function () {
            var keyword = jQuery(this).find("input[ct-target-type=keyword]").val();
            UDM.evq.push(['trackEvent', 'Other', 'Site Search', _mlbPrefix + 'Advanced Recipe Search - ' + keyword]);
        });
    }
    if (jQuery("input[ct-type=advancedSearch],button[ct-type=advancedSearch]").length > 0) {
        jQuery("input[ct-type=advancedSearch],button[ct-type=advancedSearch]").click(function () {
            var keyword = jQuery('input[ct-target-type=keyword]').val();
            UDM.evq.push(['trackEvent', 'Other', 'Site Search', _mlbPrefix + 'Advanced Recipe Search - ' + keyword]);
        });
    }
    // GLOBALSEARCH
    if (jQuery("form[ct-type=globalSearch]").length > 0) {
        jQuery("form[ct-type=globalSearch]").submit(function () {
            var keyword = jQuery(this).find('input[ct-target-type=keyword]').val();
            UDM.evq.push(['trackEvent', 'Other', 'Global Search', _mlbPrefix + 'Global Site Search - ' + keyword]);
        });
    }
    //Click to Purchase
    if (jQuery("form[ct-type=whereToBuy]").length > 0) {
        var product = jQuery("h1[ct-component=Product],strong[ct-component=Product]").text();
        product = CT.handleSpecialCharAndHtmlTags(product);
        jQuery("form[ct-type=whereToBuy]").submit(function () {
            if (jQuery(this).valid()) {
                UDM.evq.push(['trackEvent', 'Conversion', 'Click to Purchase', _mlbPrefix + 'In Store-' + product]);
            }
        });
    }
    if (jQuery("form[ct-type=storeLocator]").length > 0) {
        var selectedProduct;
        jQuery("form[ct-type=storeLocator]").submit(function () {
            selectedProduct = jQuery("ul.product-list-container li input[checked='checked']").next().text();
            selectedProduct = CT.handleSpecialCharAndHtmlTags(selectedProduct);
            if (jQuery(this).valid()) {
                UDM.evq.push(['trackEvent', 'Conversion', 'Click to Purchase', _mlbPrefix + 'In Store-' + selectedProduct]);
            }
        });
        if (jQuery("button[ct-type=storeLocator]").length > 0) {
            jQuery("button[ct-type=storeLocator]").click(function () {
                if (jQuery('input[ct-target-type=buyOnline]').is(':checked')) {
                    selectedProduct = jQuery("ul.product-list-container li input[checked='checked']").next().text();
                    selectedProduct = CT.handleSpecialCharAndHtmlTags(selectedProduct);
                    UDM.evq.push(['trackEvent', 'Conversion', 'Click to Purchase', _mlbPrefix + 'Online-' + selectedProduct]);
                }
            });
        }
    }

    //BIN TRACKING FOR PRODUCT DETAIL PAGES
    if (jQuery("a[ct-type=BIN]").length > 0 && jQuery("h1[ct-component=Product],strong[ct-component=Product]").length > 0) {
        var product = jQuery("h1[ct-component=Product],strong[ct-component=Product]").text();
        product = CT.handleSpecialCharAndHtmlTags(product);
        jQuery("a[ct-type=BIN]").click(function (e) {
            UDM.evq.push(['trackEvent', 'Conversion', 'Click to Purchase', _mlbPrefix + 'Online-' + product])
        });
    }

    var registrationCT = $("input[ct-type='registration']");
    if (registrationCT.length > 0) {
        if (registrationCT.val() === 'True') {
            var provider = registrationCT.attr("data-provider");
            UDM.evq.push(['trackEvent', 'Other', 'Registration', provider + ' Register']);
        }
        else {
            UDM.evq.push(['trackEvent', 'Other', 'Registration', 'Register']);
        }
    }

    var loginCT = $("input[ct-type='login']");
    if (loginCT.length > 0) {
        if (loginCT.val() === 'True') {
            UDM.evq.push(['trackEvent', 'Other', 'Sign Ins', 'Login']);
        }
        else {
            var provider = loginCT.attr("data-provider");

            if (provider !== '') {
                UDM.evq.push(['trackEvent', 'Other', 'Sign Ins', provider + ' Connect']);
            }
        }
    }

    //Twitter
    if (jQuery("script[id=twitter-wjs]").length > 0) {
        var intervalId = setInterval(function () {
            if (typeof twttr !== 'undefined' && typeof twttr.events != 'undefined') {
                clearInterval(intervalId);
                try {
                    twttr.ready(function (twttr) {
                        twttr.events.bind('tweet', CT.handleTwttrEvents);
                        twttr.events.bind('retweet', CT.handleTwttrEvents);
                        twttr.events.bind('favorite', CT.handleTwttrEvents);
                        twttr.events.bind('follow', CT.handleTwttrEvents);
                    });
                } catch (e) { }
            }
        }, 100);
    }
    //Pinterest
    if (jQuery("a[data-pin-aha='button_pinit']").length > 0) {
        jQuery("a[data-pin-aha='button_pinit']").click(function () {
            UDM.evq.push(['trackEvent', 'Referral', 'Pinterest', _mlbPrefix + 'Content']);
        });
    }

    pinItButtonTracking();

    /* Social Media Icons : Icons Implementation */
    //Pinterest
    if (jQuery("a[ct-type='pinterest']").length > 0) {
        jQuery("a[ct-type='pinterest']").click(function () {
            UDM.evq.push(['trackEvent', 'Referral', 'Pinterest', jQuery(this).attr('ct-target-type')]);
        });
    }
    //GooglePlus
    if (jQuery("a[ct-type='gplus']").length > 0) {
        jQuery("a[ct-type='gplus']").live('click', function () {
            UDM.evq.push(['trackEvent', 'Referral', 'Share', jQuery(this).attr('ct-target-type')]);
        });
    }

    //Facebook
    if (jQuery("a[ct-type='facebook']").length > 0) {
        jQuery("a[ct-type='facebook']").click(function () {
            UDM.evq.push(['trackEvent', 'Referral', 'Like', jQuery(this).attr('ct-target-type')]);
        });
    }
    //Twitter
    if (jQuery("a[ct-type='twitter']").length > 0) {
        jQuery("a[ct-type='twitter']").click(function () {
            UDM.evq.push(['trackEvent', 'Referral', 'Follow on Twitter', jQuery(this).attr('ct-target-type')]);
        });
    }

    //Tumblr
    if (jQuery("a[ct-type='tumblr']").length > 0) {
        jQuery(document).on("click", "a[ct-type='tumblr']", function () {
            UDM.evq.push(['trackEvent', 'Referral', 'Tumblr', _mlbPrefix + jQuery(this).attr('ct-target-type')]);
        });
    }

    //Google Plus
    setTimeout(function () {
        if (jQuery("div.g-plus").length > 0 && typeof gapi != "undefined") {
            jQuery("div.g-plus").each(function () {
                var trackingInfo = ($(this).parent('.socialmediaitems').length) ? "Google Plus-Content" : "Google Plus-Brand";
                // gapi.plusone.render(this, { "callback": CT.googlePlusEventHandler });
                gapi.plusone.render(this, { 'callback': function (params) {
                    if (params['state'] === 'on') {
                        UDM.evq.push(['trackEvent', 'Referral', 'Share', trackingInfo]);
                    }
                }
                });
            });
        }
    }, 5000);
    
    //Instagram
    if (jQuery("[ct-type='instagram']").length > 0) {
        jQuery("[ct-type='instagram']").click(function () {
            var labelValue = $(this).attr('ct-target-type');
            UDM.evq.push(['trackEvent', 'Custom', 'Link to Instagram', labelValue]);
        });
    }

    //Product Info
    if (jQuery("a[ct-type='productInfo']").length > 0) {
        var componentName;
        var productName;
        jQuery("a[ct-type='productInfo']").each(function () {
            jQuery(this).click(function () {
                componentName = jQuery(this).attr("ct-target-type");
                productName = jQuery(this).attr("ct-target-value");
                if (productName == '') { productName = jQuery(this).text(); }
                productName = CT.handleSpecialCharAndHtmlTags(productName);
                UDM.evq.push(['trackEvent', 'Other', 'Product Info', productName + " - " + componentName])
            });
        });
    }

    //Thumbnail Gallery
    if (jQuery("[ct-type='thumbnailGallery']").length > 0) {
        var galleryItemName;
        jQuery("[ct-type='thumbnailGallery']").each(function () {
            jQuery(this).click(function () {
                galleryItemName = jQuery(this).attr("ct-target-value");
                galleryItemName = CT.handleSpecialCharAndHtmlTags(galleryItemName);
                clickedTagElem = $(this).prop("tagName").toLowerCase();
                if (jQuery(this).attr("ct-info") != undefined) {
                    UDM.evq.push(['trackEvent', 'Custom', 'Thumbnail Click', galleryItemName + ' - ' + jQuery(this).attr("ct-info")])
                } else {
                    UDM.evq.push(['trackEvent', 'Custom', 'Thumbnail Click', galleryItemName])
                }
            });
        });
    }

    /*Thumbnail Overlay Navigation Arrows*/
    if (jQuery("[ct-type='overlayNavigationClick']").length > 0) {
        var pos, direction;
        jQuery("[ct-type='overlayNavigationClick']").each(function () {
            jQuery(this).click(function () {
                if (!$(this).hasClass('disabled')) {
                    pos = $(this).hasClass("arrow") ? 'Top' : 'Bottom';
                    direction = ($(this).hasClass("next") || $(this).hasClass("forward")) ? 'Right' : 'Left';
                    UDM.evq.push(['trackEvent', 'Custom', 'Navigation Click', 'Thumbnail Carousel ' + pos + ' - ' + direction + ' Arrow']);
                }
            });
        });
    }

    /* Country Selector */
    if (jQuery("[ct-type='countrySelector']").length > 0) {
        jQuery("[ct-type='countrySelector']").click(function () {
            var trackingValue = jQuery(this).attr('ct-target-value');
            UDM.evq.push(['trackEvent', 'Custom', 'Country Selector', trackingValue]);
        });
    }

    /* Language Selector */
    if (jQuery("[ct-type='languageSelector']").length > 0) {
        jQuery("[ct-type='languageSelector']").click(function () {
            var trackingValue = jQuery(this).attr('ct-target-value');
            UDM.evq.push(['trackEvent', 'Custom', 'Language Selector', trackingValue]);
        });
    }

    /* Language Selector : Dropdown */
    if (jQuery("select#language").length > 0) {
        jQuery("select#language").change(function () {
            UDM.evq.push(['trackEvent', 'Custom', 'Language Selector', jQuery(this).find('option:selected').attr('ct-target-value')]);
        });
    }

    /*Track Download Links*/
    jQuery("[data-link-type='downloads']").click(function () {
        var trackingValue = jQuery(this).attr('href');
        componentName = jQuery(this).attr("ct-target-type");
        UDM.evq.push(['trackEvent', 'Other', 'Downloads', trackingValue + " - " + componentName]);
    });

    /*Track External Links*/
    jQuery("[data-link-type='externalLink']").click(function () {
        var trackingValue = jQuery(this).attr('href'),
                componentName = jQuery(this).attr("ct-target-type");
        UDM.evq.push(['trackEvent', 'Custom', 'External Link', trackingValue + " - " + componentName]);
    });


    /*Track Internal Links*/

    jQuery("[data-link-type='internalLink']").click(function () {

        var trackingValue = jQuery(this).attr('ct-target-value');
        trackingLabel = jQuery(this).attr('ct-type'),
             componentName = jQuery(this).attr("ct-target-type");
        if (trackingLabel == 'Product') { trackingLabel = trackingLabel + ' ' + 'Info' };
        if ((trackingLabel == 'Article') || (trackingLabel == 'Recipe')) { trackingLabel = trackingLabel + ' ' + 'Click' };
        
        if((trackingLabel == 'ProductCategory')||(trackingLabel == 'ArticleCategory')) {
            UDM.evq.push(['trackEvent', 'Custom', trackingLabel, trackingValue + " - " + componentName]);
        }
        else
        UDM.evq.push(['trackEvent', 'Other', trackingLabel, trackingValue + " - " + componentName]);
    });

    //CUSTOM TRACKING FOR CMS ENLABED CONTENT
    jQuery("[data-enabled='true']").click(function () {
        var $this = jQuery(this);
        var data = {
            element: $this,
            category: $this.attr('data-category'),
            action: $this.attr('data-action'),
            information: $this.attr('data-label'),
            funnel: $this.attr('data-funnel')
        };
        trackEvent(data);
    });

    // ERROR PAGE TRACKING 404/500
    if (jQuery('.static-error-page, .notfound-content-container').length != 0) {
        UDM.evq.push(['trackEvent', 'Custom', "Error Page", jQuery('#error-page-type').val()]);
    }
    
    //handles iqiyi video player - BWS CHINA ENHANCEMENT
    if (jQuery("#videoIqiyiEmbed > embed").length > 0) {
        jQuery("#videoIqiyiEmbed > embed").each(function () {
            var videoName = jQuery(this).attr("embed-ct-video-name") == '' ? jQuery(this).text() : jQuery(this).attr("embed-ct-video-name");
            if ((!videoName == '') || (!videoName == 'undefined')) {
                UDM.evq.push(['trackEvent', 'Other', 'Video Plays', CT.handleSpecialCharAndHtmlTags(videoName), 'Task Start']);
            }
        });
    }

    //handles Tudou video player - BWS CHINA ENHANCEMENT
    if (jQuery("#videoTudouEmbed > embed").length > 0) {
        jQuery("#videoTudouEmbed > embed").each(function () {
            var videoName = jQuery(this).attr("embed-ct-video-name") == '' ? jQuery(this).text() : jQuery(this).attr("embed-ct-video-name");
            if ((!videoName == '') || (!videoName == 'undefined')) {
                UDM.evq.push(['trackEvent', 'Other', 'Video Plays', CT.handleSpecialCharAndHtmlTags(videoName), 'Task Start']);
            }
        });
    }

    //handles youku video player - BWS CHINA ENHANCEMENT
    if (jQuery("#videoYoukuEmbed > iframe").length > 0) {
        jQuery("#videoYoukuEmbed > iframe").each(function () {
            var videoName = jQuery(this).attr("embed-ct-video-name") == '' ? jQuery(this).text() : jQuery(this).attr("embed-ct-video-name");
            UDM.evq.push(['trackEvent', 'Other', 'Video Plays', CT.handleSpecialCharAndHtmlTags(videoName), 'Task Start']);
        });
    }

    //handles recipe featured hero iqiyi video player - BWS CHINA ENHANCEMENT
    if (jQuery(".recipe-featured-hero > a").length > 0) {
        jQuery(".recipe-featured-hero > a").each(function () {
            jQuery(this).click(function () {
                var videoName = jQuery(this).attr("embed-ct-video-name") == '' ? jQuery(this).text() : jQuery(this).attr("embed-ct-video-name");
                UDM.evq.push(['trackEvent', 'Other', 'Video Plays', CT.handleSpecialCharAndHtmlTags(videoName), 'Task Start']);
            });
        });
    }

    //handles iqiyi video player start - BWS CHINA ENHANCEMENT 
    if (jQuery(".embed a[ct-type='navigationClick']").length > 0) {
        jQuery(".embed a[ct-type='navigationClick']").each(function () {
            jQuery(this).click(function () {
                var videoName = jQuery(this).attr("embed-ct-video-name") == '' ? jQuery(this).text() : jQuery(this).attr("embed-ct-video-name");
                UDM.evq.push(['trackEvent', 'Other', 'Video Plays', CT.handleSpecialCharAndHtmlTags(videoName), 'Task Start']);
            });
        });
    }

    //handles Jia this Share event - BWS CHINA ENHANCEMENT 
    if (jQuery(".share-jia-this a").length > 0) {
        var trackingInfo = "";
        var trackingEvent = "";
        jQuery(".share-jia-this a").each(function () {
            jQuery(this).click(function () {
                trackingInfo = (jQuery(this).attr('ct-target-type') == "") ? jQuery(this).attr("ct-type") : jQuery(this).attr("ct-type") + '-' + jQuery(this).attr("ct-target-type");
                trackingEvent = (jQuery(this).attr('ct-target-type') == "") ? "Add this Share" : "Share";
                UDM.evq.push(['trackEvent', 'Referral', trackingEvent, trackingInfo]);
            });
        });
    }

    //handles Tencent Weibo Share event - BWS CHINA ENHANCEMENT 
    if (jQuery("div[ct-type='Tencent Weibo']").length > 0) {
        jQuery("div[ct-type='Tencent Weibo']").each(function () {
            jQuery(this).click(function () {
                UDM.evq.push(['trackEvent', 'Referral', 'Share', 'Tencent Weibo']);
            });
        });
    }

    setTimeout(function () {
        var bvRParams = window.bvRParams || [];
        if (bvRParams != undefined && bvRParams.length != 0) {
            UDM.evq.push(['trackEvent', jQuery.data(document.body).bvcategory, jQuery.data(document.body).bvaction, jQuery.data(document.body).bvlabel]);
        }
    }, 10000);

});

//facebook
var oldfbAsyncInit = window.fbAsyncInit;
window.fbAsyncInit = function () {
    FB.Event.subscribe('edge.create',
                    function (response) {
                        if (response.toString().toLowerCase().indexOf('www.facebook.com') > -1) {
                            UDM.evq.push(['trackEvent', 'Referral', 'Like', _mlbPrefix + 'Brand']);
                        } else {
                            UDM.evq.push(['trackEvent', 'Referral', 'Like', _mlbPrefix + 'Content']);
                        }
                    }
                );
    FB.Event.subscribe('comment.create',
            function (response) {
                UDM.evq.push(['trackEvent', 'Other', 'Comments', response])
            }
        );

    if (oldfbAsyncInit !== 'undefined') {
        if (typeof oldfbAsyncInit === 'function' && !oldfbAsyncInit.hasRun) {
            oldfbAsyncInit();
        }
    }
}
