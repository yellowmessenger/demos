$(document).ready(function() {
	$(".headerWrapper .navigation > ul > li").each(function() {
var _this = $(this);
var n = $(".headerWrapper .navigation > ul > li").length;
if(_this.find('.menutext .mainlink').text()=="Offers"){
var offersInd=_this.index();        
for(var i=0;i<=n-1;i++){
 $(".headerWrapper .navigation > ul > li").eq(offersInd).remove();
$(".headerWrapper .navigation > ul > li").eq(offersInd-1).after('<li class="smartBuyTab"><div class="menutext"><a class="mainlink" target="_blank" href="http://offers.smartbuy.hdfcbank.com/?src=hp_nav5"><img src="/assets/images/smartbuy_offers_tab.jpg" /></a><img src="/assets/images/nav_pointer.png" class="pointer"/></div><div class="dropdownWrap"><div class="topcrv"></div><div class="midcrv"><div class="lhssection"><ul><li class="selected"><span class="mainlink"><a href="http://offers.smartbuy.hdfcbank.com/list_offer/credit_card?src=dhtml" target="_blank">Credit Card Offers</a></span></li><li><span class="mainlink"><a href="http://offers.smartbuy.hdfcbank.com/list_offer/debit_card?src=dhtml" target="_blank">Debit Card Offers</a></span></li><li><span class="mainlink"><a href="https://offers.smartbuy.hdfcbank.com/list_offer/net_banking/3?src=dhtml&_ga=2.26896955.72850578.1499057061-1418481055.1490935645" target="_blank">NetBanking Offers</a></span></li><li><span class="mainlink"><a href="http://offers.smartbuy.hdfcbank.com/list_offer/prepaid_card?src=dhtml" target="_blank">Prepaid Card Offers</a></span></li></ul></div><a href="https://offers.smartbuy.hdfcbank.com/?src=Hp_popup" target="_blank"><img src="/assets/images/smartBuy-dropdownImg.png" /></a></div></div></li>')
} 
}
});

    $(".navigation ul li .dropdownWrap .navbannerurl").each(function() {
        $(this).attr({
            "rel": $(this).html()
        })
    });
    $(".navigation > ul > li").hover(function() {
        $(".dropdownWrap").hide();
        $(".navigation  ul  li").removeClass("nextlinav");
        var imageurl = $(this).find(".dropdownWrap").find(".innerNavs").eq(0).find(".navbannerurl").attr("rel");
        var navbannerimg = "<img src='" + imageurl + "'/>";
        $(this).find(".dropdownWrap").find(".innerNavs").eq(0).find(".navbannerurl").html(navbannerimg);
        if ($(this).hasClass("last")) {
            $(this).addClass("lastselected")
        } else {
            if (!($(this).hasClass("select"))) {
                $(this).next("li").addClass("nextlinav");
                $(this).addClass("selected")
            }
        }
        $(this).find("img.pointer").show();
        $(this).find(".dropdownWrap").slideDown();
        var _lhsheight = $(this).find(".lhssection").outerHeight();
        $(this).find(".rhssection").css("min-Height", _lhsheight);
        $(this).find(".rhssection").children(".innerNavs").css("min-Height", _lhsheight);
        $("#overlay").hide();
        if ($(this).find(".dropdownWrap").is(":visible")) {
            $("#overlay").show()
        }
    }, function() {
        $(this).removeClass("selected");
        $(this).removeClass("lastselected");
        $(".navigation  ul  li").removeClass("nextlinav");
        if (!($(this).hasClass("select"))) {
            $(this).find("img.pointer").hide()
        }
        $(".dropdownWrap .lhssection ul li").removeClass("selected");
        $(".dropdownWrap .rhssection .innerNavs").hide();
        $(".dropdownWrap .rhssection").each(function() {
            $(this).find(".innerNavs").eq(0).show()
        });
        $(".dropdownWrap .lhssection").each(function() {
            $(this).find("li").eq(0).addClass("selected")
        });
        $(this).find(".dropdownWrap").hide();
        $("#overlay").hide()
    });
    $(".dropdownWrap .lhssection ul li").hover(function() {
        var _index = $(this).index();
        $(this).addClass("selected").siblings("li").removeClass("selected");
        _rhsnav = $(this).parents(".lhssection").next(".rhssection").find(".innerNavs");
        _rhsnav.css({
            "width": 0
        });
        _rhsnav.hide();
        _rhsnav.eq(_index).show();
        _rhsnav.eq(_index).animate({
            "width": "536px"
        });
        var imageurl = _rhsnav.eq(_index).find(".navbannerurl").attr("rel");
        var navbannerimg = "<img src='" + imageurl + "'/>";
        _rhsnav.eq(_index).find(".navbannerurl").html(navbannerimg)
    }, function() {
        $(this).removeClass("selected");
        _rhsnav.eq(0).css({
            "width": "536px"
        })
    });
    $(".dropdownWrap .rhssection").hover(function() {
        var _rhsindex = $(this).find(".innerNavs:visible").index();
        $(this).prev(".lhssection").find("li").eq(_rhsindex).addClass("selected")
    })
});