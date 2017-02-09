$( document ).ready(function() {
$(".loginOption li").click(function(){
var selLoginOption=$(".loginOption li.selected").html();
if(selLoginOption=='NetBanking'){
$(".otheropt li a").eq(0).html("Forgot Password");
$(".otheropt li a").eq(1).html("Register");
}else{
$(".otheropt li a").eq(0).html("Register");
$(".otheropt li a").eq(1).html("Know More");
}
});
$("#loginsubmit").click(function()
{
     netbankinglogin('popup');
});
$(".otheropt li").eq(0).click(function()
 {	
    netbankinglogin('register');
});
$(".otheropt li").eq(1).click(function()
{	
    netbankinglogin('knowmore');
});

var loginchkedvalue, chkradvalue = false;

function netbankinglogin(type) {
	var login = '';
	var register = '';
	var knowmore = '';
	$( ".loginwrap li" ).each(function () {
		if ($(this).attr("class") == "selected") {
			chkradvalue = true;
			loginchkedvalue = $(this).attr("id");
            
		}
	});
	
	if(loginchkedvalue == 'netbanking')
	{
			login = '/assets/popuppages/netbanking.htm?src=hp';
	register = '/htdocs/common/NetBanking/product/ipin.html?src=hp';
	knowmore = '/personal/ways_to_bank/ways-to-bank-details?id=gts8mitq&accordname=accordian5';
	
	}else if(loginchkedvalue == 'netsafe')
	{
		login = '/assets/netsafedemo/netsafedemo.htm?src=hp';
		register = '/assets/netsafedemo/netsafedemo.htm';
		knowmore = '/personal/making-payments/security-measures/verified-by-visamastercard-securecode';
		
	}else if(loginchkedvalue == 'prepaidcard')
	{
		login = '/assets/popuppages/Prepaid-card.htm?src=hp';
		register = 'https://leads.hdfcbank.com/applications/webforms/apply/forexplus_getcard.htm';
		knowmore = '/personal/products/cards/prepaid-cards';
	}
	else if(loginchkedvalue == 'creditcardlogin')
	{
		login = 'https://netbanking.hdfcbank.com/netbanking/CCLogin.html';
		register = 'https://netbanking.hdfcbank.com/netbanking/CCUserReg.html';
		knowmore = '/personal/ways-to-bank/bank-online/credit-cards-netbanking';
	}
	
	if(type=="popup"){	
window.open(login, '','width=1024,height=650,scrollbars=yes,menubar=yes,status=yes,resizable=yes,directories=false,location=false,left=0,top=0');	
	}else if(type == 'register' && loginchkedvalue == 'netbanking')
        {
               location.href=register;
        }
        else if(type == 'register')
        {
               window.open(register, '', 'width=1024,height=650,scrollbars=yes,menubar=yes,status=yes,resizable=yes,directories=false,location=false,left=0,top=0');
        }
        else if(type == 'knowmore')
        {
               location.href=knowmore;
        }
        	  
}

});

$(window).load(function(){
$('.light_warp').hide();
	msieversion();
	});
	
	
function msieversion() {

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
    {
	
        $('.light_warp, .overlay_box').show();
		
		$(".close, .overlay_box").click(function() {
		$(".overlay_box, .light_warp").hide(); 
	});
    }
    else  // If another browser, return 0
    {
         $('.light_warp').hide();
    }

    return false;
}