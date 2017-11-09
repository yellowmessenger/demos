$(document).ready(function () {
    GetEncriptedCode();

    var PageIndex = 0;
    $(".totalcount").html("<span></span>");
    GetReviewProductId(PageIndex);

    $('.btnLoadmore').click(function () {
        PageIndex += 1;
        GetReviewProductId(PageIndex);

    });

    console.log(PageIndex);

    $('body').on('click', '.like', function () {

        var Type = 1;
        var prdid = $("#hdprd").val();
        var usercommid = $(".like").attr('data-id');

        if (prdid != "" || prdid != null && usercommid != "" || usercommid != null) {
            UserLikeUnlike(Type, prdid, usercommid);
            $(this).css('opacity', '0.5').removeClass('like');
        }
    });

    $('body').on('click', '.unlike', function () {
        var Type = 2;
        var prdid = $("#hdprd").val();
        var usercommid = $(".unlike").attr('data-id');

        if (prdid != "" || prdid != null && usercommid != "" || usercommid != null) {
            UserLikeUnlike(Type, prdid, usercommid);
            $(this).css('opacity', '0.5').removeClass('unlike');
        }
    });

})


function GetReviewProductId(PageIndex) {
    $.ajax({
        type: 'GET',
        url: '/umbraco/surface/ProductReviewFinance/GetReviewProductId',
        async: false,
        data: { PageIndex: PageIndex, url:window.location.href },
        success: function (response) {
            console.log(response);
            //alert(msg);
           
            //var response = JSON.parse(response);
            //var numberOfElements = response.Table.length;

            //console.log("TOtal Reviews: " + numberOfElements)

            if (response != "Fail") {

                if (response.reviews == null) {
                    $('#UserProductReview,#left-blockquote,#righ-blockquote').hide();
                }

                if (response.reviews.length>= 5) {
                    $('.btnLoadmore').show();
                }
                else {
                    $('.btnLoadmore').hide();
                }

                $('.ratingCount').text(response.totalCount + " reviews");

                $('#hdaggregator').attr("Value", response.avgRating);
                $('#hdtotalcount').attr("Value", response.totalCount);

                //alert(response.Table1[0].Count);
                //$('#lbloverallrating').text('Review Count :' + response.Table1[0].Count);
                //$('#lbltotalreviewCount').text('Total Reviews ' + response.Table1[0].Count + ' Reviews');
                $("#hdprd").attr("Value", response.reviews[0].productId);
                var productiddata = 'id=' + response.reviews[0].productId;

                if (productiddata != '' || productiddata != null) {

                    //GetEncriptedCode(productiddata);
                }

                //swapnil
                /* Reviews uppend on left  - Rakesh */

                var ReviewLeft1 = response.oneRatingCount * 100 / response.totalCount;
                var ReviewLeft2 = response.twoRatingCount * 100 / response.totalCount;
                var ReviewLeft3 = response.threeRatingCount * 100 / response.totalCount;
                var ReviewLeft4 = response.fourRatingCount * 100 / response.totalCount;
                var ReviewLeft5 = response.fiveRatingCount * 100 / response.totalCount;

                $('.ReviewLeft1').css('width', ReviewLeft1 + '%');
                $('.ReviewLeft2').css('width', ReviewLeft2 + '%');
                $('.ReviewLeft3').css('width', ReviewLeft3 + '%');
                $('.ReviewLeft4').css('width', ReviewLeft4 + '%');
                $('.ReviewLeft5').css('width', ReviewLeft5 + '%');

                /* End Reviews uppend on left - Rakesh */

                $('#totlaCount1').text(response.oneRatingCount);
                $('#totlaCount2').text(response.twoRatingCount);
                $('#totlaCount3').text(response.threeRatingCount);
                $('#totlaCount4').text(response.fourRatingCount);
                $('#totlaCount5').text(response.fiveRatingCount);


                $('.average').text(response.avgRating);

                $('#dvmosthelpful').html('');

                $(response.topTwoReviews).each(function (x, y) {



                    var datanana = '<div class="quote-tag"><i class="fa fa-quote-left"></i></div>';
                    datanana += '<div class="media"><a href="javascript:void(0);" class="pull-left"><h4> ' + y.username + ' </h4></a>';
                    datanana += '<div class="media-body text-center"><p class="media-heading" style="color: #000; font-size: 50px; font-style: normal; font-weight: 900;">' + y.rating + '</p></div>';
                    datanana += '<p> ' + y.review.substring(0, 49) + '</p></div>';

                    //alert(datanana);


                    $('#dvmosthelpful').append(datanana);

                });



                //swapnil


                //$('#dvratingdivsion').html(
                //response.Table2[0].one + '<br />' + response.Table3[0].two + '<br />' + response.Table4[0].three + '<br />' + response.Table5[0].four + '<br />' + response.Table6[0].five);

                var dataforreview = "";
                var countOfVal;
                for (var i = 0; i < response.reviews.length; i++) {

                    countOfVal = response.reviews[i].rating;
                    countOfVal = countOfVal * 20;
                    countOfVal = countOfVal + '%';

                    dataforreview += '<div class="media">';
                    dataforreview += '<a href="javascript:void(0);" class="pull-left"><img src="/media/finance/review-thumb.jpg" class="media-object" alt="Sample Image"></a>';
                    dataforreview += '<div class="media-body">';
                    dataforreview += '<h4 class="media-heading"><span class="rvname">' + response.reviews[i].username + ' </span><small><span class="date">' + response.reviews[i].CreateDate + '</span></small></h4>';

                    dataforreview += '<div class="rvRating">';
                    //dataforreview += '<span itemprop="reviewRating" style="visibility:hidden;" class="ratingCount">' + response.Table[i].Rating + '</span>';
                    dataforreview += '<div class="avgbg2"><div style="width:' + countOfVal + '" class="avgrate2"></div></div>';
                    dataforreview += '<div class="userrating"></div>'
                    dataforreview += '</div>';
                    dataforreview += '<div class="review-inner">';
                    dataforreview += '<p>' + response.reviews[i].review + '</p>';
                    dataforreview += '</div>';
                    dataforreview += '<div class="pull-right clearfix"><p><span class="like" data-id=' + response.reviews[i].Id + '>Was this review helpful? Yes</span><span><i class="fa fa-circle"></i></span><span class="unlike" data-id=' + response.reviews[i].Id + '>No</span></p></div>'
                    dataforreview += '</div></div>';


                }

                $('#UserProductReview, #dvmob-review').append(dataforreview);

                device();
                $(".productreview").show();
 
                $(".customProductSchema > div span").each(function (e) {
                    if($(this).attr('itemprop') == 'aggregateRating'){
                       $(this).children().each(function(){
                        if($(this).attr('itemprop') == 'ratingValue'){
                            $(this).attr('content',response.avgRating);
                        }
                        else if($(this).attr('itemprop') == 'ratingCount'){
                            $(this).attr('content',response.totalCount);
                        }
                       })
                        
                      
                    }
                 });
            }
            else {
                $(".customProductSchema").html("");
                $(".productreview").hide();
                // console.log("in");
                $(".totalcount").html("<span>0 reviews</span>");
            }
        },
        error: function (msg)
        {
            //alert('error');
            console.log(msg);
        }
    });
}

function UserLikeUnlike(CountType, ProductId, UserCommentId) {

    $.ajax({
        type: 'GET',
        url: '/umbraco/surface/ProductReviewFinance/UserLikeUnlike',
        data: {CountType: CountType, ProductId: ProductId, UserCommentId: UserCommentId },
        success: function (msg) {
            //alert(msg);

            if (msg == "Success") {

            }
        }
    });
}

function device() {
    if (/Android|webOS|iPhone|iPod|Windows Phone|BlackBerry/i.test(navigator.userAgent)) {
        $('#mobileReview').show();
        $('#dvmob-review').show();
        //$('#UserProductReview,#left-blockquote,#righ-blockquote,.media .media-body .pull-right').hide();
        $('#UserProductReview,#righ-blockquote,.media .media-body .pull-right').hide();


    } else {
        $('#mobileReview').hide();
        $('#dvmob-review').hide();
        $('#UserProductReview,#left-blockquote,#righ-blockquote').show();
    }

    var sWidth = screen.width;
    if (sWidth < 320) {
        $('#mobileReview').show();
        $('#dvmob-review').show();
        //$('#UserProductReview,#left-blockquote,#righ-blockquote,.media .media-body .pull-right').hide();
        $('#UserProductReview,#righ-blockquote,.media .media-body .pull-right').hide();
    }
}

function GetEncriptedCode() {

    $.ajax({
        type: 'GET',
        url: '/umbraco/surface/ProductReviewFinance/GetEncriptedCode',
        data: { url: window.location.href },
        success: function (msg) {
            if (msg != "Fail")
            {
                $(".WriteReview").each(function () {
                    $(this).attr('href', '/finance/review.aspx?' + msg);
                });
            }
            else
            {
                $(".WriteReview").each(function () {
                    $(this).attr('href', '/finance/review.aspx');
                });
            }
           
        }
    });
}