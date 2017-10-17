(function($, Drupal) {
    'use strict';
    var plchldr;
    $("body").on("focus", "input", function() {
        plchldr = $(this).attr("placeholder");
        $(this).attr("placeholder", "");
    });
    $("body").on("blur", "input", function() {
        $(this).attr("placeholder", plchldr);
    });

    $("body").on("click", ".SerachToggleBox input", function(e) {
        e.stopPropagation();
    });

	$(document).ready(function() {
    $('.bundleLoanAmount').keyup(function(event) {

        if (event.which >= 37 && event.which <= 40) return;

        var Numval = $(this).val();
        Numval = Numval.replace(/\,/g, "");
        var newNumVal = Numval;
        Numval = inrFormat(Numval);

        $(this).val(Numval);

        newNumVal = newNumVal.replace(/\,/g, "");
        newNumVal = Number(newNumVal);

        var slctLoan = $("#Loan :selected").text();
        slctLoan = $.trim(slctLoan);

        if (slctLoan == "Personal Loan") {
            if (newNumVal > 2500000) {
                $('.errormsgBdlLA').css("visibility", "").text('Maximum ticket size for Personal Loan is INR 25 Lakh');
            }else if (newNumVal < 100000) {
                $('.errormsgBdlLA').css("visibility", "").text('Minimum ticket size for Personal Loan is INR 1 Lakh');
            }else {
                $('.errormsgBdlLA').css("visibility", "hidden");
            }
        } else if (slctLoan == "Line of Credit") {

        } else if (slctLoan == "Home Loan") {
            if (newNumVal > 100000000) {
                $('.errormsgBdlLA').css("visibility", "").text('Maximum ticket size for Home Loan is INR 10 Crore');
            }else if (newNumVal < 1500000) {
                $('.errormsgBdlLA').css("visibility", "").text('Minimum ticket size for Home Loan is INR 15 Lakh');
            } else {
                $('.errormsgBdlLA').css("visibility", "hidden");
            }
        } else if (slctLoan == "HL Balance Transfer") {
            if (newNumVal > 100000000) {
                $('.errormsgBdlLA').css("visibility", "").text('Maximum ticket size for Home Loan Balance Transfer  is INR 10 Crore');
            }else if (newNumVal < 1500000) {
                $('.errormsgBdlLA').css("visibility", "").text('Minimum ticket size for Home Loan Balance Transfer  is INR 15 Lakh');
            } else {
                $('.errormsgBdlLA').css("visibility", "hidden");
            }
        } else if (slctLoan == "Loan Against Property") {
            if (newNumVal > 15000000) {
                $('.errormsgBdlLA').css("visibility", "").text('Maximum ticket size for Home Loan Against Property is INR 1.5 Crore');
            }else if (newNumVal < 1000000) {
                $('.errormsgBdlLA').css("visibility", "").text('Maximum ticket size for Home Loan Against Property is INR 10 Lakh');
            } else {
                $('.errormsgBdlLA').css("visibility", "hidden");
            }
        } else if (slctLoan == "LAP Balance Transfer") {
            if (newNumVal > 15000000) {
                $('.errormsgBdlLA').css("visibility", "").text('Maximum ticket size for Home Loan Against Property Balance Transfer is INR 1.5 Crore');
            }else if (newNumVal < 1000000) {
                $('.errormsgBdlLA').css("visibility", "").text('Maximum ticket size for Home Loan Against Property is INR 10 Lakh');
            } else {
                $('.errormsgBdlLA').css("visibility", "hidden");
            }
        }
    });
	});

    function inrFormat(x) { // nStr is the input string
        x = x.toString();

        var lastThree = x.replace(/\D/g, '').substring(x.length - 3);
        var otherNumbers = x.substring(0, x.length - 3);
        if (otherNumbers != '') {
            lastThree = ',' + lastThree;
        }
        var res = otherNumbers.replace(/\D/g, '').replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

        return res;
    }

    $(".subscriptionSubmit").click(function(e) {
        e.preventDefault();
        var ErrEmail = $(this).parent('div').siblings('.emailMsize').find('.errormsg').css('display');
        var Emailval = $(this).parent('div').siblings('.emailMsize').find('.subscriptionEmail').val();
        if (Emailval) {
            if (ErrEmail == "none") {
                $('#SubscriptionModel').modal();
            }
        }

    });

    $("body").on("click", "#SubscriptionModel .close", function(e) {
        $('.subscriptionEmail').val('');
    });

    $(".ViewAll").mouseenter(function() {
        $(this).children("span").animate({
            "width": "80px"
        });
        $(this).children("i").animate({
            "width": "80px"
        });
    }).mouseleave(function() {
        $(this).children("span").animate({
            "width": "35px"
        });
        $(this).children("i").animate({
            "width": "35px"
        });
    });

    $(".ViewFull").mouseenter(function() {

    }).mouseleave(function() {
        var VFths = $(this);
        setTimeout(function() {
            VFths.children("span").removeAttr('style');
        }, 600);
    });

    $(".ViewFull").click(function() {
        if ($(window).width() + 15 < 991) {
            $(this).children("span").css({
                "width": "100%"
            });
            //$(this).children("p").css("color","#28d8d8");
        } else {
            $(this).children("span").css({
                "width": "30%"
            });

        }
    });

    $(".ViewAll").click(function() {
        $(this).children("span").css({
            "width": "80px",
            "background": "#28d8d8"
        });
        $(this).children("i").css({
            "width": "80px",
            "background": "#28d8d8"
        });
        $(this).children("p").css("color", "#28d8d8");
    });

    $(".ShareIcon").click(function(e) {
        e.stopPropagation();
        $(".ShareIcon").html('<img class="insideshareicon" src="images/Assets/share_icon_black.svg">');
        $(this).html('<span  class="OFli"></span><span  class="OFtw"></span><span  class="OFfb"></span>');
    });

    $(window).scroll(function() {
        var breckPoint = 100;
        var wwdth = $(window).width();
        if (wwdth < 768) {
            breckPoint = 30;
        }

        var wscrl = $('.OUTsideDownArrowLink').offset().top;
        if (!$('.OUTsideDownArrowLink').hasClass('transparentBG') && wscrl > breckPoint) {
            $('.OUTsideDownArrowLink').addClass('transparentBG');
            $('.OUTsideDownArrowLink .headerRightMenu span').css("color", "#262d3f");

            if ($('.OUTsideDownArrowLink').hasClass('WhiteFontHeader')) {
                $('.OUTsideDownArrowLink .headerRightMenu span a').removeClass("SpcfcBlankHoverWht");
                $('.OUTsideDownArrowLink .headerRightMenu span a').addClass("SpcfcBlankHover");
                $('.OUTsideDownArrowLink .websiteName img').attr("src", "sites/all/themes/bajajfinserv/images/Direct_logo.png");
                $('.OUTsideDownArrowLink .headerRightMenu > a').css({
                    "background": "#262d3f",
                    "border": "2px solid #262d3f"
                });
                $('.OUTsideDownArrowLink .headerRightMenu > a span').css("background", "#fff");
            }
        }


        if (wscrl > breckPoint) {
            if (!$('.OUTsideDownArrowLink').hasClass('HeaderPDAnmt')) {
                $('.OUTsideDownArrowLink').addClass('HeaderPDAnmt');

                $(".HomeHeaderBoxFirst .affix").animate({
                    'padding': '1% 6%'
                }, 500);
                $(".HomeHeaderBoxFirst .affix .websiteName img").animate({
                    "width": "150px"
                }, 500);
            }
        } else if (wscrl < 220) {
            if ($('.OUTsideDownArrowLink').hasClass('HeaderPDAnmt')) {
                $('.OUTsideDownArrowLink').removeClass('transparentBG');
                $('.OUTsideDownArrowLink').removeClass('HeaderPDAnmt').addClass('LastCycle');
                $(".HomeHeaderBoxFirst .affix").animate({
                    'padding': '3% 6%'
                }, 500);
                $(".HomeHeaderBoxFirst .affix .websiteName img").animate({
                    "width": "230px"
                }, 500);


                $(".OUTsideDownArrowLink .websiteName img").removeAttr('style');
                $(".OUTsideDownArrowLink").removeAttr('style');
                $('.OUTsideDownArrowLink .headerRightMenu span').removeAttr('style');
                if ($('.OUTsideDownArrowLink').hasClass('WhiteFontHeader')) {
                    $('.OUTsideDownArrowLink .headerRightMenu span a').removeClass("SpcfcBlankHover");
                    $('.OUTsideDownArrowLink .headerRightMenu span a').addClass("SpcfcBlankHoverWht");
                    $('.OUTsideDownArrowLink .websiteName img').attr("src", "sites/all/themes/bajajfinserv/images/Direct_logo_wht.png");
                    $('.OUTsideDownArrowLink .headerRightMenu > a').removeAttr('style');
                    $('.OUTsideDownArrowLink .headerRightMenu > a span').removeAttr('style');

                }

                if ($('.SearchToggle').hasClass('animated')) {
                    $('.searchOpen').hide();
                }

            }

            if ($('.OUTsideDownArrowLink').hasClass('LastCycle')) {
                $('.OUTsideDownArrowLink').removeClass('LastCycle');
                /* setTimeout(function(){
					     $(".OUTsideDownArrowLink .websiteName img").removeAttr('style');  
				         $(".OUTsideDownArrowLink").removeAttr('style');},700);*/
            }


        }
    });

	// Bundle Section
    $("body").on("click", ".BunDleSelectBtn", function(e) {
        $(this).siblings('select').trigger('click');
    });

    $("body").on("click", ".BundlerRightBox li select", function(e) {
        //	$('.BundlerRightBox li select').click(function(e){
        if (
            navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPod/i)) {} else {
            e.preventDefault();
            e.stopPropagation();
            //$(this).attr("disabled", "disabled");
            var sid = $(this).attr('id');
            $(this).children("option[value='']").hide();
            var Opts = $(this).html().replace(/option/g, "span");
            $('.BundlSelectOpt').remove();
            var thObjBdl = $(this);
            setTimeout(function() {
                thObjBdl.parents('li').append('<div sid="' + sid + '" class="BundlSelectOpt">' + Opts + '</div>');
                $('.BundlSelectOpt').addClass(' animated bounceIn');
            }, 250);
            // $(this).removeAttr("disabled");
        }
    });

	$(document).ready(function() {
		$("select option").filter(function(){
			return ($.trim($(this).text()) ==  'Loan Protection and Property Protection Plan' || $.trim($(this).text()) ==  'Property Dossier');
		}).css("display", "none");
    });

    $("body").on("click", ".BundlSelectOpt span", function(e) {

        //	$('.BundlSelectOpt option').click(function(e){
        //var $(this).text();
        var SelectID = $(this).parent('.BundlSelectOpt').attr('sid');
        var SlcVAl = $(this).attr('value');

		if(SelectID == 'Loan'){
			$('#Insurance').val("");
			$('#VAS').val("");
		}

		if(SlcVAl == 'SOL'){
			$("select option").filter(function(){
				return ($.trim($(this).text()) ==  'Loan Protection and Property Protection Plan' || $.trim($(this).text()) ==  'Property Dossier');
			}).css("display", "none");
			$("select option").filter(function(){
				return $.trim($(this).text()) ==  'Loan Protection Plan';
			}).css("display", "block");
		}else{
			$("select option").filter(function(){
				return $.trim($(this).text()) ==  'Loan Protection Plan';
			}).css("display", "none");
			$("select option").filter(function(){
				return ($.trim($(this).text()) ==  'Loan Protection and Property Protection Plan' || $.trim($(this).text()) ==  'Property Dossier');
			}).css("display", "block");
		}

        $('#' + SelectID).val(SlcVAl);
        //$('.rateofIntrest h1').text(SlcVAl);
        $('.BundlSelectOpt').remove();
        if (SelectID == "Loan") {
            $('.bundleLoanAmount').trigger('keyup');
        }

    });

	$("body").click('.BundlerRightBox', function(e) {
		if( $("#loanAmtInput").val() != '' && $("#Loan option:selected").val() !='' && ( $("#Insurance option:selected").val() !='' || $("#VAS option:selected").val() != '' ) ){
			$(".calculate_savings_btn").removeClass('calculate_savings_btn_disable');
		}else{
			$(".calculate_savings_btn").addClass('calculate_savings_btn_disable');
		}
	});

    $(document).ready(function() {
        var totalBndl = $(".BundlerRightBox li").length;
        $("ul.BundlerRightBox li:lt(" + totalBndl + ")").hide();
        $("ul.BundlerRightBox li:lt(4)").show();
    });

    $("body").on("click", ".BundlerRightBox li .minus", function() {
        $(this).parents("li").css("display", "none");
    });

    $("body").on("click", ".BundlerRightBox li .plus", function() {
  		$('.BundlerRightBox li[style*="display: none"]').each(function (index, value) { 
			 $( '.BundlerRightBox li[style*="display: none"]' ).eq( 0 ).css("display", "block");
			 return false;
		});
    });

	$(document).ready(function() {
		$("body").click(function(){
		  $('.BundlSelectOpt').remove();
		});
	});

    $(".form-group input").blur(function() {
        if ($(this).hasClass('emailVD')) {
            var a = $(this).val();
            var filter = /^[A-Za-z0-9!#$%&\'*+-/=?^_`{|}~]+@[A-Za-z0-9-]+(\.[AZa-z0-9-]+)+[A-Za-z]$/;
            if (filter.test(a)) {
                $(this).siblings(".errormsg").hide();
            } else {
                $(this).siblings(".errormsg").show().text("Please enter your valid email ID");
            }
        }
    });

    $("body").on("click", ".infoImg", function() {
        var dropselect = $(this).siblings('select').attr('id');
        var dropselect1 = $('#' + dropselect + ' option:selected').val();
        $('.infoImg').attr('id', '#' + dropselect1);
        var bunPopID = $('.infoImg').attr("id");
        $(bunPopID).modal();
    });

    $(document).ready(function() {
        var intresetLoanBg = $(".intresetLoanBg").height();
		var termLoanBg = $(".termLoanBg").height();
		if(  (typeof intresetLoanBg  !== "undefined") && (typeof termLoanBg  !== "undefined") ){
			if(intresetLoanBg > termLoanBg){
				$('.intresetLoanBg').height(intresetLoanBg);
				$('.termLoanBg').height(intresetLoanBg);
			}else{
				$('.intresetLoanBg').height(termLoanBg);
				$('.termLoanBg').height(termLoanBg);
			}
		}
    });

})(jQuery, Drupal);