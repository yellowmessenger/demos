$(window).load(function () {
    if (queryString("tabname") != "false") {
        var tabquerystring = queryString("tabname");
        if (tabquerystring == 'tab2') {
            tabquerystring = 2;
        } else {
            tabquerystring = 1;
        }
        if (queryString("accordname") != "false") {
            var accordquerystring = queryString("accordname");
            openaccord_intab('customertab', tabquerystring, accordquerystring);
        } else {
            openaccord_intab('customertab', tabquerystring);
        }
    } else {
        if (queryString("accordname") != "false") {
            var accordquerystring = queryString("accordname");			
            openaccord(accordquerystring);
        }
if (queryString("siteaccord") != "false") {
            var accordquerystring = queryString("siteaccord");

            sitelinkfocus(accordquerystring);
        }
    }
   
    //$(".expandcollapse .accordtitle").on('click', function () {
	$(document).on('click','.expandcollapse .accordtitle',function(){
        $(this).children("h3").toggleClass("active");
		//return false;
        $(this).parent().next(".accordian_item").find(".accordtitle").addClass("headingalt");
        if ($(this).children("h3").hasClass("active")) {
            $(this).parent().next(".accordian_item").find(".accordtitle").removeClass("headingalt");
        }
        $(this).next(".accordContent").slideToggle(function () {
            if ($(this).parent().next().hasClass("accordlast")) {
                if ($(this).children("h3").hasClass("active")) {
                    $(this).parent().next().removeClass("headinglast");
                    $(this).parent().next().addClass("expandcontentlast");
                } else {
                    $(this).parent().next().removeClass("expandcontentlast");
                    $(this).parent().next().addClass("headinglast");
                }
            }
            var accordblockDiv = true;
            $(this).parents(".expandcollapse").find(".accordian_item").each(function () {
                if ($(this).find(".accordContent").css("display") == "none") {
                    accordblockDiv = false;
                }
            });
            if (accordblockDiv) {
                $(this).parents(".expandcollapse").find(".expandcollapselinks").children(".toggleaccord").html("Collapse All");
                $(this).parents(".expandcollapse").find(".expandcollapselinks").children(".toggleaccord").addClass("collapseall");
                $(this).parents(".expandcollapse").find(".expandcollapselinks").children(".toggleaccord").removeClass("expandall");
            } else {
                $(this).parents(".expandcollapse").find(".expandcollapselinks").children(".toggleaccord").html("Expand All");
                $(this).parents(".expandcollapse").find(".expandcollapselinks").children(".toggleaccord").addClass("expandall");
                $(this).parents(".expandcollapse").find(".expandcollapselinks").children(".toggleaccord").removeClass("collapseall");
            }
        });
    });
    $(".smallaccord .accordtitle").click(function () {
        $(this).next(".accordContent").slideToggle();
        $(this).toggleClass("active");
    });
});

function toggleexpancollapse(_this, _id) {
    if ($(_this).hasClass("expandall")) {
        $("#" + _id + " .toggleaccord").removeClass("expandall");
        $("#" + _id + " .toggleaccord").addClass("collapseall");
        $("#" + _id + " .toggleaccord").html("Collapse All");
        $(_this).parent().parent().find(".accordtitle").children("h3").addClass("active");
        $(_this).parent().parent().find(".accordtitle").removeClass("headingalt");
        $(_this).parent().parent().find(".accordlast").removeClass("headinglast");
        $(_this).parent().parent().find(".accordlast").addClass("expandcontentlast");
        $(_this).parent().parent().find(".accordContent").slideDown();
    } else {
        $("#" + _id + " .toggleaccord").addClass("expandall");
        $("#" + _id + " .toggleaccord").removeClass("collapseall");
        $("#" + _id + " .toggleaccord").html("Expand All");
        $('html, body').animate({
            scrollTop: $("#" + _id).offset().top
        }, 1000, function () {
            $(_this).parent().parent().find(".accordtitle").children("h3").removeClass("active");
            $(_this).parent().parent().find(".accordtitle").addClass("headingalt");
            $(_this).parent().parent().find(".accordlast").removeClass("expandcontentlast");
            $(_this).parent().parent().find(".accordlast").addClass("headinglast");
            $(_this).parent().parent().find(".accordContent").slideUp();
        });
    }
}

function tabchange(_this, _id, carousalid) {
    $(_this).parent().addClass("selected").siblings("li").removeClass("selected");
    var tabindex = $(_this).parent().index() + 1;
    $("." + _id).hide();
    $("#" + _id + tabindex).fadeIn();
        documentclick();
    if (carousalid != undefined) {
        $('#' + carousalid).tinycarousel();
    }
}

function openaccord_intab(_tabclass,_tabindex,_id)
{	
	$('html, body').animate({
		scrollTop: $("#customertabs").offset().top
	},1000,function(){
		
		$("#customertabs").find(".tabcontainer").find("li").eq(_tabindex-1).addClass("selected").siblings("li").removeClass("selected");	
		
		$("." + _tabclass).hide();
		$("#" + _tabclass + _tabindex).show();		
		documentclick();	
		if(_id!= undefined)
		{
			$('html, body').animate({
			scrollTop: $("#" + _id).offset().top
		}, 1500,function()
		{
			$("#" + _id).children("h3").addClass("active");
			$("#" + _id).next(".accordContent").slideDown();	
			if($("#" + _id).parent().next().hasClass("accordlast"))
			{
				$("#" + _id).parent().next().removeClass("headinglast");
				$("#" + _id).parent().next().addClass("expandcontentlast");
			}
			
			$("#" + _id).parent().next(".accordian_item").children(".accordtitle").removeClass("headingalt");
			
			var accordblockDiv = true;
			$("#" + _id).parent().find(".accordContent").each(function(){
				if($(this).css("display") == "none")
				{
					accordblockDiv = false;
				}
			});
			if(accordblockDiv)
			{
				$("#" + _id).parent().find(".expandcollapselinks").children(".toggleaccord").html("Collapse All");
				$("#" + _id).parent().find(".expandcollapselinks").children(".toggleaccord").addClass("collapseall");
				$("#" + _id).parent().find(".expandcollapselinks").children(".toggleaccord").removeClass("expandall");			
			}
			else{
				$("#" + _id).parent().find(".expandcollapselinks").children(".toggleaccord").html("Expand All");	
				$("#" + _id).parent().find(".expandcollapselinks").children(".toggleaccord").addClass("expandall");
				$("#" + _id).parent().find(".expandcollapselinks").children(".toggleaccord").removeClass("collapseall");
			}
			
		});	
		}
	});
}

function openaccord(_id, _faqid) {
    $('html, body').animate({
        scrollTop: $("#" + _id).offset().top - 220
    }, 1000, function () {
        $("#" + _id).children("h3").addClass("active");
        $("#" + _id).next(".accordContent").slideDown(function () {
            if (_faqid != undefined) {
                $('html, body').animate({
                    scrollTop: $("#" + _faqid).offset().top
                }, 1500);
            }
        });
        if ($("#" + _id).parent().next().hasClass("accordlast")) {
            $("#" + _id).parent().next().removeClass("headinglast");
            $("#" + _id).parent().next().addClass("expandcontentlast");
        }
        $("#" + _id).parent().next(".accordian_item").children(".accordtitle").removeClass("headingalt");
        var accordblockDiv = true;
        $("#" + _id).parent().find(".accordContent").each(function () {
            if ($(this).css("display") == "none") {
                accordblockDiv = false;
            }
        });
        if (accordblockDiv) {
            $("#" + _id).parent().find(".expandcollapselinks").children(".toggleaccord").html("Collapse All");
            $("#" + _id).parent().find(".expandcollapselinks").children(".toggleaccord").addClass("collapseall");
            $("#" + _id).parent().find(".expandcollapselinks").children(".toggleaccord").removeClass("expandall");
        } else {
            $("#" + _id).parent().find(".expandcollapselinks").children(".toggleaccord").html("Expand All");
            $("#" + _id).parent().find(".expandcollapselinks").children(".toggleaccord").addClass("expandall");
            $("#" + _id).parent().find(".expandcollapselinks").children(".toggleaccord").removeClass("collapseall");
        }
    });
}

function siteaccord(_this) {
    $(_this).children("h3").toggleClass("active");
    $(_this).next().slideToggle();
}

function sitelinkfocus(_id) {
    $('html, body').animate({
        scrollTop: $("#" + _id).offset().top
    }, function () {
        $("#" + _id).find("h3").addClass("active");
        $("#" + _id).next(".sitepageslinks").slideDown();
    });
}