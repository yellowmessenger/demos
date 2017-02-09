var numbers = new Array();
numbers[0] = "2,505";
numbers[1] = "4,281";
numbers[2] = "12,054"; 
function City() {
    document.write(numbers[0])
}

function Branches() {
    document.write(numbers[1])
}

function atms() {
    document.write(numbers[2]);
}
$(document).ready(function()
{

$("#hometab1").parent().prepend("<div class='tickerWrapper'><div class='ticker'><ul><li><a href='/htdocs/common/denomination-notes/index.htm?src=hp_tickr_Demonetisation' target='_blank'>Cash withdrawal limits from ATMs & branches</a>&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li><li><a target='_self' onclick=\"ceeboxpopup(this,'/assets/popuppages/hdfc-errata.htm','tncceebox',550,500)\" rel='width=515 height=360' href='javascript:;'>We categorically state that Marathi is the regional language option for our Phonebanking in Mumbai. Read more.</a>&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li></ul></div></div>");


$(".smeticker").parent().prepend("<div class='tickerWrapper'><div class='ticker'><ul><li><a href='https://leads.hdfcbank.com/applications/webforms/apply/HDFC_Bank_Credit_Card_Loan/index.aspx?Product=Insta%20Loan&Promocode=P4_HP_Ticker_Instaloan&Sourcecode=Test_Source' target='_blank'>Insta Loan Credited in 15 Minutes*against your Credit card any day, any time. EMI: Rs.23 per Rs.1,000*. Zero Processing Fees. TC Apply. <u>Apply Online</u></a>&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li><li><a href='https://leads.hdfcbank.com/applications/misc/bannercounter/bannercounter_2009.asp?banname=ticker-CL-sme' target='_blank'>Car Loan:- Up to 100% funding, disbursal in 2 days.  <u> Check Eligibility  Now</u></a>&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li></ul></div></div>");


$('.wholesaleTicker').append("<div class='tickerWrapper'><div class='ticker'><ul><li><a href='https://www.hdfcbanksmartapply.com/two-wheeler-loan/compare-interest-rates.html?WT.mc_id=P4_Wholesale_HP_Ticker_TWL' target='_blank'>Two Wheeler Loan. Kick start your new bike with up to 100% funding. <u>Apply Now.</u></a>&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li><li><a href='https://leads.hdfcbank.com/applications/misc/bannercounter/bannercounter_2009.asp?banname=ticker-CL-wholesale' target='_blank'>Car Loan:- Up to 100% funding, disbursal in 2 days.&nbsp;<u>Check Eligibility Now </u></a>.&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li></ul></div></div>");


$('.NRITicker').append("<div class='tickerWrapper'><div class='ticker'><ul><li><a href='http://www.hdfcbank.com/nri_banking/money_transfer/default.htm' target='_blank'>Wherever you are, remitting money to India was never this easy! <u>Know More</u></a>.&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li><li><a href='https://leads.hdfcbank.com/applications/webforms/apply/hdfc_qrops/index.aspx?Promocode=P4_NRI_HP_Ticker_160415_QROPS&SourceCode=Test_Source' target='_blank'>QROPS: Transfer your  UK pension fund to India, tax-free! <u>Know More.</u></a>&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li></ul></div></div>");





var page=window.location.hostname;
$(".tickerWrapper").slideDown();
var tickerWidth = $(".ticker").outerWidth(); 
var tickerUl = 0;
var tickerUlLiLength = parseInt($(".ticker ul li").length);
var isHoverTicker = false;

        $(".ticker ul li").each(function(){
                tickerUl += $(this).outerWidth();
        }); 
        
        var tickerMarginLeft =  (tickerWidth-tickerUl)+"px" 
        var tickerHtml = $(".tickerWrapper ul").html();
        $(".tickerWrapper ul").append(tickerHtml);
        tickerUl = (tickerUl+2)*2;
        var myAnimTime = 30000;
		if(page=="www.hdfcbank.com"){
		var tickerUl = "3114";
        $(".ticker ul").width(tickerUl)
		}else{
		$(".ticker ul").width(tickerUl)
		}
       setTimeout(function(){ticker(tickerMarginLeft,tickerWidth,tickerUl,tickerUlLiLength,tickerHtml,isHoverTicker,30000)},30000);
        var tMarginH = 0;
        $(".ticker ul").on("mouseenter",function(){
                isHoverTicker = true;
                $(".ticker ul").stop(true,false).clearQueue();
                
                
        });
        
        $(".ticker ul").on("mouseleave",function(){
                isHoverTicker = false;
                var tMarginH = parseInt($(".ticker ul").css("margin-left"));
                var tpsMove = (tickerUl/2)/30000;
                myAnimTime = ((tickerUl/2) + tMarginH)/tpsMove;
                ticker(tickerMarginLeft,tickerWidth,tickerUl,tickerUlLiLength,tickerHtml,isHoverTicker,myAnimTime)
        });
        
}); 

function ticker(tickerMarginLeft,tickerWidth,tickerUl,tickerUlLiLength,tickerHtml,isHoverTicker,myAnimTime){

       $(".ticker ul").animate({"margin-left":"-"+(tickerUl/2)},myAnimTime,"linear",function(){
		              
                $(".ticker ul").append(tickerHtml);
                $(".ticker ul li").slice(0,tickerUlLiLength).remove();
               
                $(".ticker ul").css({"margin-left":"0px"});
                if(isHoverTicker == false)
                        ticker(tickerMarginLeft,tickerWidth,tickerUl,tickerUlLiLength,tickerHtml,isHoverTicker,30000)
        });


}


