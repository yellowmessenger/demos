/*
$(document).ready(function(){
var text='<div class="homePageBanner-overlay" style=" position:fixed;  top:0; left:0; width:100%; height:100%; background:#000; z-index:1000000; opacity:0.7; filter: alpha(opacity=70)"></div>';
text+='<div class="popup-homePageBanner" style="background:#fff; width:800px; position:fixed; top:0; z-index:1000001; margin:0 auto; top:10px; height:400px">'
text+='<div id="cee_closeBtn" style="text-indent:0; top:-15px; cursor:pointer; right:5px;background-image:none"><img src="/assets/images/close.png" alt="Close"></div>';

text += '<div><a onclick="dataLayer.push({\'event\':\'GAevent\', \'gaEventCategory\':\'TakeOver\', \'gaEventAction\':\'Click\', \'gaEventLabel\':\'screen_gtakeover_UPI\'});" href="https://offers.smartbuy.hdfcbank.com/offer_details/60062?" class="MyPopup" target="_blank"><img src="/assets/images/screen_snapdeal.jpg" alt="Close"></a></div>';
text+='<div class="clear"></div>';

//text += '<div><img src="/assets/images/screen_takeover_Loan_Assist.jpg" alt="Close"></div>';
text+='<div class="clear"></div>';

//text += '<div><iframe width="800" height="420" src="https://www.youtube.com/embed/PsYMwSWPlaI" frameborder="0" allowfullscreen></iframe></div>';
text+='<div class="clear"></div>';
 
$(".mainBodyContainer").after(text);
	//$("#wrapper").append(text);
	//$(".homebanner_wrapper").after(text);  //for sme homepage
	//$(".sectioncontainer").after(text);    //for aboutus section
	//$(".csrBannerwrapper").parents('.wrapper').after(text);  //for CSR
	//$(".inner_cont").parents(".wholsale_container").after(text);    //for wholesale
	//$(".inner_cont").parents(".nri_container").after(text);   //for NRI

$(".popup-homePageBanner").css({'left':($(window).width() - $(".popup-homePageBanner").width())/2})
if($(window).height() > $(".popup-homePageBanner").height()) $(".popup-homePageBanner").css({'top':($(window).height() - $(".popup-homePageBanner").height())/2}) 
$(".popup-homePageBanner #cee_closeBtn, .popup-homePageBanner, .homePageBanner-overlay").click(function(){
	$(".popup-homePageBanner").hide();
	$('.homePageBanner-overlay').hide();
})
				
				//setTimeout(function(){ 						
							$('.homePageBanner-overlay').hide();
							$('.popup-homePageBanner').hide();
						}, 25000);
			
				
})


*/
/*
$(document).ready(function () {
    var text = '<div class="homePageBanner-overlay" style="position:fixed; top:0; left:0; width:100%; height:100%; background:#000; z-index:1000; opacity:0.7; filter: alpha(opacity=70)"></div>';
    text += '<div class="popup-homePageBanner" style="background:#fff; width:800px; position:fixed; top:0; z-index:1001; margin:0 auto; top:10px; height:400px; ">'
    text += '<div id="cee_closeBtn" style="text-indent:0; top:-15px; cursor:pointer; right:9px; background-image: none;"><img src="/assets/images/close.png" alt="Close"></div>';
    text += '<div><a onclick="dataLayer.push({\'event\':\'GAevent\', \'gaEventCategory\':\'TakeOver\', \'gaEventAction\':\'Click\', \'gaEventLabel\':\'screen_take_over\'});" href="http://mailer.hdfcbank.com/campaign/Nov16/500_1000_CurrencyNotes/mailer.html" class="MyPopup"><img src="/assets/images/screen_take_over.jpg" alt="Close"></a></div>';

    $(".mainBodyContainer").after(text);
	//$("#wrapper").append(text);
	//$(".homebanner_wrapper").after(text);
	//$(".sectioncontainer").after(text);
	//$(".csrBannerwrapper").parents('.wrapper').after(text);
	//$(".inner_cont").parents(".wholsale_container").after(text);
	//$(".inner_cont").parents(".nri_container").after(text);
    $(".popup-homePageBanner").css({ 'left': ($(window).width() - $(".popup-homePageBanner").width()) / 2 })
    if ($(window).height() > $(".popup-homePageBanner").height()) $(".popup-homePageBanner").css({ 'top': ($(window).height() - $(".popup-homePageBanner").height()) / 2 })
	
	
//Add repleace code start
    $(".popup-homePageBanner #cee_closeBtn, .popup-homePageBanner, .homePageBanner-overlay").click(function () {
        $(".popup-homePageBanner").hide();
        $('.homePageBanner-overlay').hide();
    })


    $(".popup-homePageBanner").hide();
    $('.homePageBanner-overlay').hide();
    pageName = location.href;
	var popupName = $(".popup-homePageBanner").find('.MyPopup').attr('href');
	//console.log(popupName);

    if (getCookie('popup-homePageBanner') == undefined) { setCookie('popup-homePageBanner', "", 1); }

    if ($.cookie("popup-homePageBanner")){
    }
    else {
        $(".popup-homePageBanner").show();
        $('.homePageBanner-overlay').show();
        setCookie('popup-homePageBanner', getCookie('popup-homePageBanner') + ";" + popupName, 1);
    }  
		setTimeout(function(){ 						
							$('.homePageBanner-overlay').hide();
							$('.popup-homePageBanner').hide();
						}, 25000);
	
})


function getCookie(c_name){
	var _this=$("."+c_name)
	var i,x,y,ARRcookies=document.cookie.split(";");
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++){
	  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
	  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
	  x=x.replace(/^\s+|\s+$/g,"");
	  if (x==c_name){
		return unescape(y);
	  }
	}
}

function setCookie(c_name, value, exdays){		
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}
*/