
function fbShare(url, title, descr, image) {
    var winTop = 300;
    var winLeft = 300;
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + url + '&picture=' + image + '&title=' + title + '&description=' + descr, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=500,height=300');
}

function TweetShare(url, descr) {
    var winTop = 300;
    var winLeft = 300;
    window.open('https://twitter.com/share?url=' + url + '&text=' + descr, 'tweeter', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=500,height=300');
}

function linkedInShare(url, title, descr) {
    var winTop = 300;
    var winLeft = 300;
    window.open('https://www.linkedin.com/shareArticle?mini=true&url=' + url + '&title=' + title + '&summary=' + descr, 'tweeter', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=500,height=300');
}

function pinterestShare(url, descr, image) {
    var winTop = 300;
    var winLeft = 300;
    window.open('https://pinterest.com/pin/create/link/?url=' + url + '&description=' + descr + '&media=' + image, 'tweeter', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=500,height=300');
}


var MYBLOG_LIMIT = 6;
var CLASS_Recent = 'owlContentrecent';
var CLASS_Popular = 'owlContentPopular';

var WP = {
    open: function (b) {
        var a = {
            posts: function () {
                var d = MYBLOG_LIMIT; var e = 0; var c = {
                    all: function (g) { var f = b + "?json=get_recent_posts"; f += "&count=" + d + "&page=" + e + "&callback=?"; jQuery.getJSON(f, function (l) { var k = l.posts; for (var j = 0; j < k.length; j++) { var h = k[j]; h.createComment = function (i, m) { i.postId = h.id; a.comments().create(i, m) } } g(k) }) },
                    findBySlug: function (f, h) { var g = b + "?json=get_post"; g += "&slug=" + f + "&callback=?"; jQuery.getJSON(g, function (i) { h(i.post) }) }, limit: function (f) { d = f; return c }, page: function (f) { e = f; return c }
                }; return c
            }
        }; return a
    }
};

var blog = WP.open('https://blog.bajajfinserv.in/');

var blogArray = [];

var popularBlogArray = [];
var sortColumnName = "viewCount";
//var urlShareCountArray = [];

blog.posts().all(function (posts) {
    $('.loaderImg').show();
    // console.log(posts.length)
    //----------------------------------For Recent Blog Feed ---------------------------------
    for (var i = 0; i < posts.length; i++) {
        blogArray.push({
            "count": posts[i].custom_fields.dankov_post_views_count,
            "position": i
        });

        if (i < 6) {
            var viewCount = 0;
            var commentsCount = 0;

            if (posts[i].custom_fields.dankov_post_views_count != "" && posts[i].custom_fields.dankov_post_views_count != "0") {
                viewCount = posts[i].custom_fields.dankov_post_views_count;
                commentsCount = posts[i].comment_count;
            }
            //console.log("Views: " + );
            var totalCount = 0;
            var fbapi = "https://graph.facebook.com/?id=" + posts[i].url;
            var fbCount = 0;
            $.ajax({
                type: "get",
                url: fbapi,
                async: false,
                success: function (msg) {
                    fbCount = msg.share.share_count;
                }
            });
            var lnkapi = "https://www.linkedin.com/countserv/count/share?url=" + posts[i].url + "&callback=?";
            var lnkCount = 0;
            $.getJSON(lnkapi, function (linkdindata) {
                lnkCount = linkdindata.count;
            });
            totalCount = fbCount + lnkCount;
            var dateString = '';
            
            dateString = posts[i].date;
            dateString = dateString.split(" ")[0];
            var date = new Date(dateString);
            var finalDate = date.getDate() + "/" + (parseInt(date.getMonth()) + 1) + "/" + date.getFullYear();
          

            popularBlogArray.push({
                "thumbnail": posts[i].thumbnail,
                "date": finalDate,
                "title": posts[i].title,
                "excerpt": posts[i].excerpt, // description
                "url": posts[i].url,
                "fbCount": fbCount,
                "lnkCount": lnkCount,
                "totalCount": totalCount,
                "viewCount": parseInt(viewCount),
                "commentsCount": parseInt(commentsCount)
            });

           

            //console.log(finalDate);
            //jQuery('.' + CLASS_Recent).append(function () {
            //    return '<div class="item option-blog"><div class="imgside"><img class="item-img" src="' + posts[i].thumbnail + '" alt="blog image" /></div><div class="contentside"><div class="caption"><label>' + posts[i].date.split(' ')[0] + '</label><h5 class="title">' + posts[i].title + '...</h5><p>' + posts[i].excerpt.substring(0, 75) + '...</p> </div><a class="item-url" href="' + posts[i].url + ' target="_blank"></a>'
            //        + "<span>Total Shares: " + totalcount + "</span><a href=\"javascript:fbShare('" + posts[i].url + "', '" + posts[i].title + "', '" + $(posts[i].excerpt).text() + "','" + posts[i].thumbnail + "')\"> <img src='http://www.bfl.in/finance/images/facebook.gif' class='socialshares' /> </a><span>" + fbCount + "</span>"
            //        + "<a href=\"javascript:TweetShare('" + posts[i].url + "','" + $(posts[i].excerpt).text() + "')\"> <img src='http://www.bfl.in/finance/images/tweeter.gif' class='socialshares' /> </a>"
            //        + "<span>" + lnkCount + "</span><a href=\"javascript:linkedInShare('" + posts[i].url + "', '" + posts[i].title + "', '" + $(posts[i].excerpt).text() + "')\"> <img src='http://www.bfl.in/finance/images/linkedin.gif' class='socialshares' /> </a>"
            //        + "<a href=\"mailto:?subject=" + posts[i].title + "&amp;body= URL : " + posts[i].url + "%0D%0A" + $(posts[i].excerpt).text() + "\"> <img src='http://www.bfl.in/finance/images/mail.gif' class='socialshares' /> </a>"
            //        + "<a href=\"javascript:pinterestShare('" + posts[i].url + "', '" + posts[i].title + "', '" + posts[i].thumbnail + "')\"> <img src='http://www.bfl.in/finance/images/pinterest.gif' class='socialshares' /> </a>"
            //        + "</div></div>";
            //});
            jQuery('.' + CLASS_Recent).append(function () {
                return '<div class="item option-blog"><a class="item-url" href="' + posts[i].url + '" target="_blank"><div class="imgside"><img class="item-img" src="' + posts[i].thumbnail + '" alt="blog image" /></div></a><div class="contentside clearfix"><a class="item-url" href="' + posts[i].url + '" target="_blank" class="clearfix"><div class="caption"><h5 class="title">' + posts[i].title + '</h5></a></div><a class="item-url" href="' + posts[i].url + '" target="_blank"></a>'
                    + "<div class='clearfix'><div class='socialIco'><a href=\"javascript:fbShare('" + posts[i].url + "', '" + posts[i].title + "', '" + $(posts[i].excerpt).text() + "','" + posts[i].thumbnail + "')\" class='icons'> <img src='/media/finance/facebook.gif' class='socialshares' /> <span class='count'>" + fbCount + " Shares</span></a>"
                   // + "<span><a href=\"javascript:TweetShare('" + posts[i].url + "','" + $(posts[i].excerpt).text() + "')\"> <img src='http://www.bfl.in/finance/images/tweeter.gif' class='socialshares' /> </a>"
                    + "<a class='icons' href=\"javascript:linkedInShare('" + posts[i].url + "', '" + posts[i].title + "', '" + $(posts[i].excerpt).text() + "')\"> <img src='/media/finance/linkedin.gif' class='socialshares' /><span class='count'>" + lnkCount + " Shares</span> </a></div><br /><br /><div class='iconstotal'><span>Total Shares: " + totalCount + "</span></div></a></div>"
                    + "</div>"
                + '<div class="viewVal"><div class="pos-1"><img src="/media/finance/eye-icon.png"/></div><div class="pos-2"><span>' + viewCount + '</span></div></div><div class="dateVal"><div class="pos-1"><img src="/media/finance/calender-ico.png"/></div><label>' + finalDate + '</label></div><div class="commentVal"><div class="pos-1"><img src="/media/finance/comment-ico.png"/></div><span>' + commentsCount + '</span></div></div>';
            });
        }
    }
    //----------------------------------For Recent Blog Feed end---------------------------------

    //----------------------------------For Most Popular Blog Feed ---------------------------------

    if (popularBlogArray.length > 0 && popularBlogArray.length == 6) {
        popularBlogArray.sort(SortPopularArray);
        popularBlogArray.reverse();
        $(popularBlogArray).each(function (index, value) {
            // alert("Count: " + value.viewCount)
            jQuery('.' + CLASS_Popular).append(function () {
                return '<div class="item option-blog"><a class="item-url" href="' + value.url + '" target="_blank"><div class="imgside"><img class="item-img" src="' + value.thumbnail + '" alt="blog image" /></a></div><div class="contentside"><a class="item-url" href="' + value.url + '" target="_blank" class="clearfix"><div class="caption"><h5 class="title">' + value.title + '</h5></div><a class="item-url" href="' + value.url + '" target="_blank"></a>'
                    + "<div class='clearfix'><div class='socialIco'><a href=\"javascript:fbShare('" + value.url + "', '" + value.title + "', '" + $(value.excerpt).text() + "','" + value.thumbnail + "')\" class='icons'> <img src='/media/finance/facebook.gif' class='socialshares' /> <span class='count'>" + value.fbCount + " Shares</span></a>"
                   // + "<span><a href=\"javascript:TweetShare('" + posts[i].url + "','" + $(posts[i].excerpt).text() + "')\"> <img src='http://www.bfl.in/finance/images/tweeter.gif' class='socialshares' /> </a>"
                    + "<a class='icons' href=\"javascript:linkedInShare('" + value.url + "', '" + value.title + "', '" + $(value.excerpt).text() + "')\"> <img src='/media//finance/linkedin.gif' class='socialshares' /><span class='count'>" + value.lnkCount + " Shares</span> </a></div><br /><br /><div class='iconstotal'><span>Total Shares: " + value.totalCount + "</span></div></div>"
                     + "</div>"
                + '<div class="viewVal"><div class="pos-1"><img src="/media/finance/eye-icon.png"/></div><div class="pos-2"><span>' + value.viewCount + '</span></div></div><div class="dateVal"><div class="pos-1"><img src="/media/finance/calender-ico.png"/></div><label>' + finalDate + '</label></div><div class="commentVal"><div class="pos-1"><img src="/media/finance/comment-ico.png"/></div><span>' + value.commentsCount + '</span></div></div>';


            });
        });
    }
    //----------------------------------For Most Popular Blog Feed end---------------------------------


    function SortPopularArray(x, y) {
        return ((x[sortColumnName] == y[sortColumnName]) ? 0 : ((x[sortColumnName] > y[sortColumnName]) ? 1 : -1));
    }


    // ascending order
    function SortByCount(x, y) {
        return x.count - y.count;
    }

    function SortByPosition(x, y) {
        return ((x.position == y.position) ? 0 : ((x.position > y.position) ? 1 : -1));
    }

    //  // Call Sort By Name
    blogArray.sort(SortByCount);
    blogArray.reverse();

    //var fbapi = "//graph.facebook.com/?id=" + posts[i].url;
    //var fbCount = 0;
    //$.ajax({
    //    type: "GET",
    //    url: fbapi,
    //    async: false,
    //    //data: { action: "GetDownloadCounterForUser", mobile: mobile, uid: uid, teamid: teamid },
    //    success: function (msg) {
    //        fbCount = msg.share.share_count;
    //    }
    //});

    //for (var i = 0; i < 6; i++) {
    //    jQuery('.' + CLASS_Popular).append(function () {
    //        return '<div class="item option-blog"><div class="imgside"><img class="item-img" src="' + posts[blogArray[i].position].thumbnail + '" alt="blog image" /></div><div class="contentside"><div class="caption"><label>' + posts[blogArray[i].position].date.split(' ')[0] + '</label> <label class="pull-right"><em class="fa fa-eye" aria-hidden="true"></em> ' + posts[blogArray[i].position].custom_fields.dankov_post_views_count + '</label><h5 class="title">' + posts[blogArray[i].position].title + '</h5><p>' + posts[blogArray[i].position].excerpt + '</p> </div><a class="item-url" href="' + posts[blogArray[i].position].url + '"></a>'
    //            + "<span>Total Shares: " + fbCount + "</span><a href=\"javascript:fbShare('" + posts[blogArray[i].position].url + "', '" + posts[blogArray[i].position].title + "', '" + $(posts[blogArray[i].position].excerpt).text() + "','" + posts[blogArray[i].position].thumbnail + "')\"> <img src='http://www.bfl.in/finance/images/facebook.gif' class='socialshares' /> </a><span>" + fbCount + "</span>"
    //            + "<a href=\"javascript:TweetShare('" + posts[blogArray[i].position].url + "','" + $(posts[blogArray[i].position].excerpt).text() + "')\"> <img src='http://www.bfl.in/finance/images/tweeter.gif' class='socialshares' /> </a>"
    //            + "<a href=\"javascript:linkedInShare('" + posts[blogArray[i].position].url + "', '" + posts[blogArray[i].position].title + "', '" + $(posts[blogArray[i].position].excerpt).text() + "')\"> <img src='http://www.bfl.in/finance/images/linkedin.gif' class='socialshares' /> </a>"
    //            + "<a href=\"mailto:?subject=" + posts[blogArray[i].position].title + "&amp;body= URL : " + posts[blogArray[i].position].url + "%0D%0A" + $(posts[blogArray[i].position].excerpt).text() + "\"> <img src='http://www.bfl.in/finance/images/mail.gif' class='socialshares' /> </a>"
    //            + "<a href=\"javascript:pinterestShare('" + posts[blogArray[i].position].url + "', '" + posts[blogArray[i].position].title + "', '" + posts[blogArray[i].position].thumbnail + "')\"> <img src='http://www.bfl.in/finance/images/pinterest.gif' class='socialshares' /> </a>"
    //            + "</div></div>";
    //    });
    //}



    //$("#blogCarousal").owlCarousel();

    $('.loaderImg').hide();
});

$(window).load(function () {
    $('.blogPost a.recentlyBlog').click();
});

$(document).ready(function () {
    $('.blogPost a').click(function () {
        $('.blogPost a').removeClass('active');
        if ($(this).hasClass('recentlyBlog')) {
            $(this).addClass('active');
            $('.owlContentrecent').fadeIn();
            $('.owlContentPopular').hide();
            var owl = $("#blogCarousal-recent");
        } else {

            $(this).addClass('active');
            $('.owlContentPopular').fadeIn();
            $('.owlContentrecent').hide();
            var owl = $("#blogCarousal-popular");
        }

        var options = {
            autoPlay: false, //Set AutoPlay to 3 seconds
            rewindNav: false,
            pagination: false,
            items: 3,
            navigation: true,
            navigationText: [
         "<em class='icon-chevron-left icon-white'><em class='fa fa-angle-left'></em></em>",
         "<em class='icon-chevron-right icon-white'><em class='fa fa-angle-right'></em></em>"
            ],
            itemsDesktop: [1199, 3],
            itemsDesktopSmall: [979, 3]
        };

        owl.owlCarousel(options);

        $("#blogCarousalWrap .next").click(function () {
            owl.trigger('owl.next');
        });
        $("#blogCarousalWrap .prev").click(function () {
            owl.trigger('owl.prev');
        });
    });

    
});


