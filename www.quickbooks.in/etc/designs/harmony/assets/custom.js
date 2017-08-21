$(document).ready(function() {

    var $quickNav = $("#mainHeader");  // cache nav container to var
    var $ftrFooter = $("#ftr-Footer"); // cache footer container to var
    var $moreIntuit = $("#moreFromIntuit"); //cache "more from intuit" drawer section
    var $body = $(document.body) // cache the body of the document

    var pgHref = location.href.toLowerCase();
    $(".quickNav-menu .sub-menu > a").each(function() {
        if (pgHref.indexOf(this.href.toLowerCase()) > -1) {
            $("li.nav-bar-highlight").removeClass("nav-bar-highlight");
            $(this).parent().addClass("nav-bar-highlight");
        }
    });


    $moreIntuit.find('a').attr('tabIndex',-1);
    $('#moreFromIntuitLink').click(function() {
        removeTabIndex($moreIntuit);
    });

    $('#closeMoreFromIntuit').click(function() {
        addTabIndex($moreIntuit);
    });


    // make skip-link work in Chrome and Safari. Without this, hitting skip link would continue in normal flow/order.
    $('.skip a').click(function() {
        $("#main").focus();
    });

    /* browser conditional rules */

    /* ie7 - 9 hacks */

    if ($.browser.msie && $.browser.version <= 9 ) {

        $quickNav.find('#quickNavBreadcrumbs li').not(':first-child').prepend('<span style="margin-right: 5px;"></span>'); // add ">" separator between breadcrumbs

    }

    /*/ie7 - 9 hacks */

    /* ie7 - 8 hacks */

//    if ($.browser.msie && $.browser.version <= 8 ) {



    $('#moreFromIntuitLink, #closeMoreFromIntuit').on('click', function(e) {
        e.preventDefault();
        if (!Modernizr.csstransitions) {
            if ($quickNav.hasClass('more-from-intuit-open')) {
                $("#moreFromIntuit").slideUp(200, function() {
                    $quickNav.toggleClass('more-from-intuit-open');
                });

            } else {
                $("#moreFromIntuit").slideDown(200, function() {
                    $quickNav.toggleClass('more-from-intuit-open');
                });
            }
        } else {
            $quickNav.toggleClass('more-from-intuit-open');
        }
    });

    /* /ie7 - 8 hacks */

    /* safari hacks */

    /* earlier than version 536 */

    (function(){

        var ua = navigator.userAgent.toLowerCase();
        var check = function(r) {
            return r.test(ua);
        };
        var isChrome = check(/chrome/);
        var isSafari = !isChrome && check(/safari/);

        if (isSafari && parseInt($.browser.version) < 536 ) {

            $quickNav.addClass('safari-lt-536'); // fix for defect DE4337: ensure proper alignment of property logo on Safari

        }

    })();

    /*/earlier than version 536 */

    /*/safari hacks */

    /* /browser conditional rules */

    /* ------------------------------------------------------- */

    /* custom tracking */
    (function(){

        function quickNavAnalyticsClick(el){
            var scId = $(el).attr('data-wa-link');
            if ((scId != undefined) && (typeof navClick == 'function')) {
                navClick(scId);  // send beacon (call existing fcn from sc_header_common.js)
            }
        }

        $("#mainHeader, footer").on('click', 'a', function(){
            quickNavAnalyticsClick(this);
        });

    })();

    //prevent empty search terms from being submitted
    $('#isearch').submit(function (e) {
        if ($('#search_term').val() == "" || $('#search_term').val() == "Search") {
            e.preventDefault();
        }
        else
        {
            if (typeof(navClick) != "undefined") {
                navClick('hdr-intcom-search'); 
            }
        }
    });

    $('#search_term').focus(function () {
        if ($(this).val() == "Search") {
            $(this).val("");
        }
    }).blur(function () {
         if ($(this).val() == "") {
            $(this).val("Search");
        }
    });

});


/* delay loading / lazy load */

/* determine if DST is in effect */

// A free script from: www.mresoftware.com
function DST(today){
    var yr = today.getFullYear();
    var dst_start = new Date("March 14, "+yr+" 02:00:00"); // 2nd Sunday in March can't occur after the 14th
    var dst_end = new Date("November 07, "+yr+" 02:00:00"); // 1st Sunday in November can't occur after the 7th
    var day = dst_start.getDay(); // day of week of 14th
    dst_start.setDate(14-day); // Calculate 2nd Sunday in March of this year
    day = dst_end.getDay(); // day of the week of 7th
    dst_end.setDate(7-day); // Calculate first Sunday in November of this year
    return (today >= dst_start && today < dst_end);
}

/* /determine if DST is in effect */

$(window).load(function () {

    /* phone info - display call center open/closed */

    var d = new Date();

    // if DST is true and UTC time is between 12-24, except on Sat or Sun, or between 0-1, except on Sun or Mon |OR| DST is false and UTC time is between 13-24, except for on Sat or Sun, or between 0-2, except for Sun or Mon, add the 'open' class to the time module/s
    if (
        (  DST(d) && ( ( d.getUTCHours() >= 12 && !( d.getUTCDay() == 6 || d.getUTCDay() == 0 ) ) || ( d.getUTCHours() < 1 && !( d.getUTCDay() == 0 || d.getUTCDay() == 1 ) ) ) ) ||
            ( !DST(d) && ( ( d.getUTCHours() >= 13 && !( d.getUTCDay() == 6 || d.getUTCDay() == 0 ) ) || ( d.getUTCHours() <= 1 && !( d.getUTCDay() == 0 || d.getUTCDay() == 1 ) ) ) )
        ) {
        $('#mainHeader .call-center-status, #phoneInfoModule .call-center-status').addClass('open');
    }

    /* /phone info - call center open/closed */

    /* nav bar - highlight active primary link */
    function href_path(s, w){
        // console.log(w+"1: " + s);
        if (s.length>1 && s.split('//') > 1){
            var paths = s.split('//')[1].split('?')[0].split('#')[0];
            var c = paths.indexOf("/");
            var s2 =  paths.slice(c).replace(/\x2F$/,'').toLowerCase();
            // console.log(w+"2: " + s2 +"");
            return s2;
        }
        return s;
    }

    $('#mainHeader .nav-bar-top-links > a').each(function() {
        if ( href_path(this.getAttribute('href'),"attr")  ==  href_path(location.href,"location") )
        //console.log("match! " + location.href) ;
            $(this).parent().addClass('active');
    });


    /* /nav bar - highlight active primary link */


});


//make anchor links not navigable by hitting tab if more from intuit drawer is closed
function removeTabIndex(section) {
    section.find('a').removeAttr('tabindex');
    $('.intuit-logo').parent().focus();
}

function addTabIndex(section) {
    section.find('a').attr('tabindex', -1);
}
/* /delay loading / lazy load */


function GetCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function goToCartWithPriorityCode(){
    var pCode = GetCookie("priorityCode");
    host = "quickbooks.intuit.com";

    cartURL = "https://"+host+"/commerce/e2e/cart/shopping_cart.jsp?priorityCode="+pCode; 
    document.location = cartURL;
}


$(document).ready(function () {
	if (/^(qa\.sr|qasp|perf\.sr|perfsp|prod\.cmsauthor|www)\.intuit\.com/g.test(window.location.hostname)) {
		$('#main').addClass('property-www');
	}
});

