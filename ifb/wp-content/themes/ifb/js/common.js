jQuery(function(){
	var productPageUrl = jQuery('#leftnav_ourproduct').attr('data-url');
	var recipePageUrl = jQuery('#leftnav_ourrecipe').attr('data-url');
	var currentTab=parentTab=currentTabHeader=currentTabBigHeader = 1;
	
	

	jQuery('#leftnav .leftnavarrow').toggle(function(){
		jQuery(this).parent().css('left','-5px');											
	},function(){
		jQuery(this).parent().css('left','-205px');		
	});	
	
	jQuery('.common_three_row_setup_rightpanel .right-common_three_row_setup_rightpanel-navarrow').toggle(function(){
		jQuery(this).parent().css('right','-5px');											
	},function(){
		jQuery(this).parent().css('right','-193px');		
	});		   
	
	jQuery('.tab_header li').on('click',function(){
		
		var  jQuerythis = jQuery(this);
		if(!jQuerythis.hasClass('active')){
		jQuerythis.parent().find('li').removeClass('active');
		jQuerythis.addClass('active');
		
		var thisIndex = jQuerythis.index()+1
		jQuery(this).parent().next().find('li:nth-child('+currentTab+')').slideUp();
		jQuery(this).parent().next().find('li:nth-child('+thisIndex+')').slideDown();
		
		currentTab = thisIndex;
		}
	});
	
	jQuery('.tab_header-recipe li').on('click',function(){
		
		var  jQuerythis = jQuery(this);
		if(!jQuerythis.hasClass('active')){
		jQuerythis.parent().find('li').removeClass('active');
		jQuerythis.addClass('active');
		
		var thisIndex = jQuerythis.index()+1
		jQuery(this).parent().next().find('li:nth-child('+currentTab+')').slideUp();
		jQuery(this).parent().next().find('li:nth-child('+thisIndex+')').slideDown();
		
		currentTab = thisIndex;
		}
	});
	
	jQuery('.tabs > header a').on('click',function(){
		
		var jQuerythis = jQuery(this);
		if(!jQuerythis.hasClass('active')){
		jQuerythis.addClass('active');
		
		var thisIndex = jQuerythis.index()+1
		jQuery('.tabs > header div a:nth-child('+currentTabHeader+')').removeClass('active');
		jQuerythis.parent().parent().next().find('> div:nth-child('+ currentTabHeader +')').hide();
		jQuerythis.parent().parent().next().find('> div:nth-child('+ thisIndex +')').show();
		
		currentTabHeader = thisIndex;
		}
	});
	
	jQuery('.tabs-good-fresh > header a').on('click',function(){
		
		var jQuerythis = jQuery(this);
		if(!jQuerythis.hasClass('active')){
		jQuerythis.addClass('active');
		
		var thisIndex = jQuerythis.index()+1
		jQuery('.tabs-good-fresh > header div a:nth-child('+currentTabHeader+')').removeClass('active');
		jQuerythis.parent().parent().next().find('> div:nth-child('+ currentTabHeader +')').hide();
		jQuerythis.parent().parent().next().find('> div:nth-child('+ thisIndex +')').show();
		
		currentTabHeader = thisIndex;
		}
	});
	
	jQuery('.bigtabs > header a').on('click',function(){
		var jQuerythis = jQuery(this);
		if(!jQuerythis.hasClass('active')){
		jQuerythis.addClass('active');
		
		var thisIndex = jQuerythis.index()+1
		jQuery('.bigtabs > header div a:nth-child('+currentTabBigHeader+')').removeClass('active');
		jQuerythis.parent().parent().next().find('> div:nth-child('+ currentTabBigHeader +')').hide();
		jQuerythis.parent().parent().next().find('> div:nth-child('+ thisIndex +')').show();
		
		currentTabBigHeader = thisIndex;
		}
	});	
	jQuery('#cooklist dt').click(function(){
			jQuerythis = jQuery(this);
			jQuerythis.parent().parent().find('a').html(jQuerythis.html());
			jQuerythis.parent().css('height','0');
			var pageAddress = window.location;
			window.location.replace(pageAddress+'our-recipe-book/?tab='+jQuerythis.html().toLowerCase());
			
	});	
	jQuery('#products li a').click(function(){
			jQuerythis = jQuery(this);
			var newURL = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname;
			var pathArray = newURL.split( '/' );
			var myPath = pathArray[0] + '/' + pathArray[1] +'/'+ pathArray[2] + pathArray[3] +'/'+ pathArray[4] +'/'+ pathArray[5] +'/'+ pathArray[6]

			var productTab = jQuerythis.attr('data-tab');
			window.location.replace(productPageUrl+'?tab='+productTab);
			
	});	
	jQuery('#recipes li a').click(function(){
			jQuerythis = jQuery(this);
			var recipeTab = jQuerythis.attr('data-tab');
			window.location.replace(recipePageUrl+'?tab='+recipeTab);
						
	});	
	
	jQuery('#cookDropdown').hover(function(){
			jQuery(this).find('dl').css('height','auto');//jQuery(this).find('dl').css('height','112px');
		},function(){
			jQuery(this).find('dl').css('height','0');
	});
	
	jQuery('.popupclose').click(function(){
		jQuery(this).parent().fadeOut('slow');
		jQuery('#black_overlay').fadeOut('slow');
	});
	
	jQuery('.popupclose_new').click(function(){		
		jQuery(this).parent().fadeOut('slow');
		jQuery('#black_overlay').fadeOut('slow');
	});
	jQuery('.popup_businessclose').click(function(){		
		jQuery(this).parent().fadeOut('slow');
		jQuery('#black_overlay').fadeOut('slow');
	});
	jQuery('.page_popup').click(function(){		
		jQuery('#popup_store_locator, #black_overlay').fadeIn('fast');	
		});
	jQuery('.page_popup_leftcol').click(function(){		
		jQuery('#popup_left_col').fadeIn('fast');	
		});	
	jQuery('.page_popup_business').click(function(){		
		jQuery('#popup_business, #black_overlay').fadeIn('fast');	
		});
	jQuery('.productpage_popup').click(function(){		
		jQuery('#popup_home_delivery, #black_overlay').fadeIn('fast');	
		});
	
		
	showMealTypes();
	showMealtypesdishes();
	
	/*product order online*/
	jQuery('#drp_product_name, #drp_product_quantity').change(function(){
		showProductPrice();	
	});
	jQuery('#reset_online_order').click(function(){
		jQuery('#product_total_price_display').hide();
	})
	jQuery('#order_online_submit').attr('disabled','disabled');
	
	jQuery('#promo_code').keyup(function(){setPromoCode();});
	/**/
	
	jQuery('#clickbtn').click(function(){
		jQuery('#container_form').css('height','130px');
		
		jQuery(this).hide();
		jQuery('#clickbtn_main').show();		
	})
	
	jQuery('#cross_click_to_btn').click(function(){
		jQuery('#clickbtn_main').hide();
		jQuery('#clickbtn').show();
		jQuery('#container_form').css('height','0');
	})	

	

jQuery('.box').toggle(function(){
var $this = $(this);
$this.parent().find('div.class1').slideDown();  
//$('div.class1').find('span').addClass('minus').removeClass('plus');
$this.css({
	cursor: 'auto'
	});
},function(){
var $this = $(this);
$this.parent().find('div.class1').slideUp(); 
});

jQuery('#minus').click(function(event){
$(this).parent().parent().find('div.class1').slideUp();	
$(this).parent().css('cursor', 'pointer');
$(this).removeClass('minus');
jQuery('#show_message').html('');
event.stopPropagation();
})


var dvonlineorderObj = document.getElementById('onlineorder');
var dvonlineordercontactObj = document.getElementById('onlineordercontact');
var dvonlineorderProductObj = document.getElementById('onlineorderproduct');

if(dvonlineorderObj != null){
	document.getElementById('popup_left_col').style.display = 'block';
	//document.getElementById('3colright').style.right = '0%';
}else if(dvonlineordercontactObj != null){
	document.getElementById('popup_left_col').style.display = 'block';	
}else if(dvonlineorderProductObj != null){
	document.getElementById('popup_left_col').style.display = 'block';	
}else{
	document.getElementById('popup_left_col').style.display = 'none';
}


jQuery('#txtphone').focus(function() {
    jQuery('div.example').show();
    jQuery(document).bind('focusin.example click.example',function(e) {
        if ($(e.target).closest('.example, #txtphone').length) return;
        jQuery(document).unbind('.example');
        jQuery('div.example').fadeOut('medium');
    });
});
jQuery('div.example').hide();

 jQuery("#close_click2call").click(function(){
    jQuery("div.example").hide();
  });

	
})//end of ready

jQuery('#clickbtn_main').live('click',function()
{
	var error=false;
	//var formName=document.clicktocall.
	var phone_no=jQuery('#txtphone').val();
	var error_message='';
	if (phone_no=="")
	{
		error_message +="Please enter your phone number!<br>";
		document.clicktocall.txtphone.focus();
		error=true;
	}
	var re10digit=/^\d{10}$/ 
	if (phone_no.search(re10digit)==-1)
	{
		error_message +="Please enter your valid phone number!";
		document.clicktocall.txtphone.focus();
		error=true;
		
	}
	if(error==true)
	{
		jQuery('#show_message').show();
		jQuery('#show_message').html(error_message);
			
			return false;
	}
	else
	{
	
		var url='http://www.ifbfreshcatch.com/click2call.php?agentnumber=9883898838&callernumber='+phone_no;
		
		jQuery.get( url, function( data ) {
				jQuery('#show_message').show();
				jQuery('#show_message').html(data);
			});
		
	}
});

var currentScrollTopValue = 0;
jQuery(window).scroll(function(){
	currentScrollTopValue  = jQuery(window).scrollTop();
	console.log(jQuery('#footer').offset().top);
	if(currentScrollTopValue > jQuery('#footer').offset().top){
			jQuery('.stickypanelwrap').css({
			position: 'absolute',
			bottom: '51px'
			})
			
	}
	else {
		jQuery('.stickypanelwrap').css({
			position: 'fixed',
			bottom: '0'
			})
	}
});
/*product order online*/
var promoCode;
var product_total_price=0;
var noFixedOrderValue = false;
function showProductPrice(){

	/* product online */
	var product_price_list = {
	'Prawns Extra Large (Wt.: 100g)': 175,
	'Prawns Jumbo (Wt.: 200g)': 230,
	'Prawns Jumbo (Wt.: 500g)': 500,	
	'Prawns Large (Wt.: 200g)': 160,	
	'Prawns Medium (Wt.: 200g)': 150,	
	'Prawns Small (Wt.: 200g)': 130,	
	'Prawns Small (Wt.: 500g)': 300,	
	'Prawns Super Jumbo (Wt.: 200g)': 270,	
	'Fish Fingers (Wt.: 200g)': 170,	
	'Fish Fingers (Wt.: 400g)': 325,	
	'Breaded Fish Fillets (Wt.: 200g)': 150,	
	'Breaded Fish Fillets (Wt.: 400g)': 290,	
	'Butterfly Shrimps (Wt.: 150g)': 160,	
	'Prawn Pops (Wt.: 200g)': 175,		
	'Prawn Spring Rolls (Wt.: 200g)': 160,	
	'Prawn Sticks (Wt.: 200g)': 175,	
	'Prawn Torpedo (Wt.: 150g)': 165,	
	'Fish Poppers (Wt.: 300g)': 160,	
	'Basa Fish Fillets (Wt.: 1000g)': 400,	
	'Basa Fish Portions (Wt.: 500g)': 220,
	}
	
	var product_name = document.getElementById('drp_product_name').value;
	var product_quantity = parseInt(document.getElementById('drp_product_quantity').value,10);
	
	
	var productPrice = product_price_list[product_name];
	productPrice = parseInt(productPrice,10);
	
	jQuery('#order_online_error_message, #product_total_price_display').hide();	
	jQuery('#dv_promo_code').show();	
	jQuery('#promo_code').val('');
	
	if(product_name != '' && product_quantity != 0){
		product_total_price = (productPrice * product_quantity);
		
		if(isNaN(product_total_price) == false){
			jQuery('#product_total_price_display').show().html("<strong>Total price - </strong>" + product_total_price);			
			jQuery('#dv_promo_code').show();
		}else{
			jQuery('#order_online_error_message').hide();
			jQuery('#order_online_submit').attr('disabled','disabled');
			return false;		
		}
		jQuery("[name='product_quantity']").val(product_quantity);
		jQuery("[name='total_product_price']").val(product_total_price);
		jQuery("[name='product_name']").val(product_name);
	
		checkProductTotalPrice(product_total_price);
		
	}
}
function checkProductTotalPrice(product_total_price){
	if(product_total_price > 1000){
		jQuery('#order_online_submit').removeAttr('disabled');
		jQuery('#order_online_error_message').hide();	
		jQuery('#order_online_submit').removeClass('disabled');
		}else {
		jQuery('#order_online_submit').attr('disabled','disabled');
		jQuery('#order_online_error_message').show().html('Order value should not be less than Rs. 1000');
		jQuery('#order_online_submit').addClass('disabled');
		}
		
}
function checkProductTotalPriceNoFixedOrderValue(){
	if(noFixedOrderValue == false){
		jQuery('#order_online_submit').removeAttr('disabled');
		jQuery('#order_online_error_message').hide();	
		jQuery('#order_online_submit').removeClass('disabled');
		}else {
		jQuery('#order_online_submit').attr('disabled','disabled');
		jQuery('#order_online_error_message').show().html('Order value should not be less than Rs. 1000');
		jQuery('#order_online_submit').addClass('disabled');
		}
		
}
function setPromoCode(){

promoCode = jQuery('#promo_code').val().toLowerCase();
checkPromoCode(product_total_price, promoCode);
//console.log('noFixedOrderValue ' + noFixedOrderValue);
/*special code*/
if(product_total_price <=1000){
    if(noFixedOrderValue==true){
		    jQuery('#order_online_submit').removeAttr('disabled');
		    jQuery('#order_online_error_message').hide();	
		    jQuery('#order_online_submit').removeClass('disabled');
	    }else if(noFixedOrderValue==false){
		    jQuery('#order_online_submit').attr('disabled','disabled');
		    jQuery('#order_online_error_message').show().html('Order value should not be less than Rs. 1000');
		    jQuery('#order_online_submit').addClass('disabled');
	    }
 }

 if(product_total_price >=600 && promoCode == 'fcgb7'){

		jQuery('#order_online_submit').removeAttr('disabled');
		jQuery('#order_online_error_message').hide();	
		jQuery('#order_online_submit').removeClass('disabled');
 }
	
}

function checkPromoCode(prprice, prcode) {
    noFixedOrderValue = false;
	//var promo_code_list = [['FCGB1', 10,'p'],['FCGB2', 20,'p'],['FCGB3', 100,'f'],['FCGB4', 20,'s'],['FCGB5',15,'pmin'],['FCGB6', 500,'f'],['FCGB7', 50,'p']]; // p->percentage, pmin-> percentage and min amt. ,f->fixed amount to be deducted, s->special code, no fixed order value
	var promo_code_list = [['FCGB1', 10,'p'],['FCGB2', 20,'p'],['FCGB3', 0,'f'],['FCGB4', 0,'s'],['FCGB5',15,'pmin'],['FCGB6', 500,'f'],['FCGB7', 50,'pmin']]; // p->percentage, pmin-> percentage and min amt. ,f->fixed amount to be deducted, s->special code, no fixed order value
	var discountPercent = 0;
	var percentage = false;
	var fixedDeductableAmount = pmin = false;
	var promoCode = '';
	for (i=0;i<promo_code_list.length;i++){
		if(promo_code_list[i][0].toLowerCase()==prcode.toLowerCase()){
		promoCode = prcode.toLowerCase();
		discountPercent = promo_code_list[i][1];
		switch (promo_code_list[i][2]){
			case 'f':
				fixedDeductableAmount	= true;
			break;
			case 's':
				fixedDeductableAmount = true;
				noFixedOrderValue = true;
			break;
            case 'pmin':
                 pmin = true;
				 break;
			case 'p':
				percentage = true;
			default:
			//noFixedOrderValue = false;
			//checkProductTotalPriceNoFixedOrderValue(product_total_price);	
			
		}
		
		} else {
			//noFixedOrderValue = false;
			//checkProductTotalPriceNoFixedOrderValue(product_total_price);
		}
	}
	
	var discountprice=0;
	if(!fixedDeductableAmount){
		
		if(!pmin){
		
		discountprice=(prprice * discountPercent / 100);
		prprice = prprice - discountprice;	
		//prprice = prprice - (prprice * discountPercent / 100);
		
        } else if(prprice >= 1500 && promoCode == 'fcgb5' ){
		
        prprice = prprice - (prprice * discountPercent / 100);   

        }else if(prprice >= 600 && promoCode == 'fcgb7'){
        prprice = prprice - (prprice * 0.5);   

        }else if(percentage == true){
		
				discountprice=(prprice * discountPercent / 100);
				prprice = prprice - discountprice;

			}		
	}else{
		
			prprice = prprice - discountPercent;
			discountprice=discountPercent;
		
	}
	
	
/* 	var discountprice=0;
	 discountprice=(prprice * discountPercent / 100);
	prprice = prprice - discountprice; */
	
	jQuery('#product_total_price_display').html("<strong>Total price - </strong>" + prprice);
	jQuery("[name='total_product_price']").val(prprice);
	jQuery("[name='discount_amount']").val(discountprice);
	
	//return prprice;
}
function reset_online_order_form_fields(){
	jQuery('#order_online_error_message, #product_total_price_display').html('').hide();	
	} 
	

/**/
function getQueryStringValueByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function showPopup(objId){
	jQuery('#'+objId).fadeIn('fast');
}

function showMealTypes(){
var tab = getQueryStringValueByName('tab');
if(tab != null && tab != ''){
	jQuery('#tabBtnMealTypes').click();
  switch(tab)
	{
	case 'lunch':
	  jQuery('#'+tab).click();	  
	  break;
	case 'snacks':
	  jQuery('#'+tab).click();	  
	  break;
	case 'appetizers':
	  jQuery('#'+tab).click();	  
	  break;
	case 'dinner':
	  jQuery('#'+tab).click();	  
	  break;
	}
}	
}
function setnewslettervalue(check){
	if(check){
		jQuery('#newsletter_option').val('Yes');
	}
	else
	{
		jQuery('#newsletter_option').val('');
	}
}
function showMealtypesdishes(){
var tab = getQueryStringValueByName('tab').split('-');
if(tab[0] != null && tab[0] != ''){
	jQuery('#'+tab[0]).click();
}
if(tab[1] != null && tab[1] != ''){
	jQuery('#'+tab[1]).click();
}
}


