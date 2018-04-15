// JavaScript Document

function valid_pannno(panno)
{
  var patt = new RegExp(/^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/);
  return patt.test(panno);
}
  
jQuery(document).ready(function() {
	//==========top links scripts starts from here==========//
	jQuery(".top-links ul li").hover(
		function() {
		   jQuery(this).children('.submenu-container').fadeIn();
		},
		function(){
		   jQuery(this).children('.submenu-container').hide();
		}
	);	
	
	//==========search on focus script==========//
	 jQuery(".header form input.search").focus(
                function() {
                  jQuery(this).delay(200).animate({width:"280px"});
                   //$('div.focusdiv').delay(300).fadeIn();
                }
	);
	
	jQuery(".header form input.search").blur(
		function() {
                    
		   //$('div.focusdiv').fadeOut();
		   jQuery(this).delay(100).animate({width:"123px"});
		}
	);
	
	//==========increase font size script==========//
	/*var currFFZoom = 1;
    var currIEZoom = 100;

    $('#normal').on('click',function(){
        if ($.browser.mozilla){
            var step = 0.02;
            currFFZoom -= step; 
            $('body').css('MozTransform','scale(' + currFFZoom + ')');
			return false;
        } 
		else {
            var step = 2;
            currIEZoom -= step;
            $('body').css('zoom', ' ' + currIEZoom + '%');
			return false;
        }
    });

    $('#increaseone').on('click',function(){
        if ($.browser.mozilla){
            var step = 0.02;
            currFFZoom += step;                 
            $('body').css('MozTransform','scale(' + currFFZoom + ')');
			return false;
        } 
		else {
            var step = 2;
            currIEZoom += step;
            $('body').css('zoom', ' ' + currIEZoom + '%');
			return false;
        }
    });*/
	
	
	//==========home page banner scripts starts from here==========//
	$('.iosSlider').iosSlider({
		scrollbar: true,
		snapToChildren: true,
		desktopClickDrag: true,
		scrollbarLocation: 'top',
		scrollbarMargin: '10px 10px 0 10px',
		scrollbarBorderRadius: '0',
		responsiveSlideWidth: true,
		navSlideSelector: $('.iosSliderButtons .button'),
		infiniteSlider: true,
		startAtSlide: '1',
		autoSlide: true,
		onSlideChange: slideContentChange,
		onSlideComplete: slideContentComplete,
		onSliderLoaded: slideContentLoaded
	});
	
	function slideContentChange(args) {
		
		/* indicator */
		$(args.sliderObject).parent().find('.iosSliderButtons .button').removeClass('selected');
		$(args.sliderObject).parent().find('.iosSliderButtons .button:eq(' + (args.currentSlideNumber - 1) + ')').addClass('selected');
		
	}
	
	function slideContentComplete(args) {
		
		if(!args.slideChanged) return false;
		
		/* animation */
		$(args.sliderObject).find('.text1, .text2').attr('style', '');
		
		$(args.currentSlideObject).children('.text1').animate({
			right: '100px',
			opacity: '1'
		}, 400, 'easeOutQuint');
		
		$(args.currentSlideObject).children('.text2').delay(200).animate({
			right: '50px',
			opacity: '1'
		}, 400, 'easeOutQuint');
		
	}
	
	function slideContentLoaded(args) {
		
		/* animation */
		$(args.sliderObject).find('.text1, .text2').attr('style', '');
		
		$(args.currentSlideObject).children('.text1').animate({
			right: '100px',
			opacity: '1'
		}, 400, 'easeOutQuint');
		
		$(args.currentSlideObject).children('.text2').delay(200).animate({
			right: '50px',
			opacity: '1'
		}, 400, 'easeOutQuint');
		
		/* indicator */
		$(args.sliderObject).parent().find('.iosSliderButtons .button').removeClass('selected');
		$(args.sliderObject).parent().find('.iosSliderButtons .button:eq(' + (args.currentSlideNumber - 1) + ')').addClass('selected');
		
	}
	
	$(".banner-icons .comment").hover(
		function() {
		   $(".banner-icons p").fadeIn();
		},
		function(){
		   $(".banner-icons p").fadeOut();
		}
	);
	
	
	//==========events scripts starts from here==========//
	jQuery('#next').click(function(event) {
            event.preventDefault();         // cancel click through
            // get current list item
            var currli = $('#events li:visible');
            // get next list item
            var nextli = currli.next();
            // if nextli length is 0, make it equal to first li
            if (nextli.length == 0) {
                nextli = currli.siblings('#events li:first-child');
            }
            currli.fadeOut();
            nextli.animate({'margin-top':"0px"}).hide().fadeIn();
        });
        jQuery('#prev').click(function(event) {
                event.preventDefault();         // cancel click through
                // get current list item
                var currli = $('#events li:visible');
                // get next list item
                var prevli = currli.prev();
                // if nextli length is 0, make it equal to first li
                if (prevli.length == 0) {
                    prevli = currli.siblings('#events li:last-child ');
                }
                currli.fadeOut();
                prevli.animate({'margin-top':"0px"}).hide().fadeIn();
        });
        jQuery('#events li:nth-child(1)').show();
	if(jQuery("#events ul li").size()<2){
           jQuery('.calender-buttons').hide(); 
        }
	
	//==========social media home page script==========//
	jQuery("li#facebook").click(function(){
		displayNone();
		jQuery("#facebook-content").css("display","block");
		jQuery(this).addClass("active");
		return false;
	});
	
	jQuery("li#twitter").click(function(){
		displayNone();
		jQuery("#twitter-content").css("display","block");
		jQuery(this).addClass("active");
		return false;
	});
	
	jQuery("li#google-plus").click(function(){
		displayNone();
		jQuery("#googleplus-content").css("display","block");
		jQuery(this).addClass("active");
		return false;
	});
	
	jQuery("li#youtube").click(function(){
		displayNone();
		jQuery("#youtube-content").css("display","block");
		jQuery(this).addClass("active");
		return false;
	});
	
	jQuery("li#mobile").click(function(){
		displayNone();
		jQuery("#mobile-content").css("display","block");
		jQuery(this).addClass("active");
		return false;
	});
	
	function removeclass(){
		if(jQuery('.connect-left li').hasClass("active"))
		{
			jQuery('.connect-left li').removeClass("active");
		}
		if(jQuery('.social-stream-left li').hasClass("active"))
		{
			jQuery('.social-stream-left li').removeClass("active");
		}  
	}
	
	function displayNone(){
		removeclass();
		jQuery("#facebook-content").css("display","none");
		jQuery("#twitter-content").css("display","none");
		jQuery("#googleplus-content").css("display","none");
		jQuery("#youtube-content").css("display","none");
		jQuery("#mobile-content").css("display","none");
	}
	//jQuery('#facebook-content').show();
	
	/////////Hem///////////////////
	function hideshowDiv(id,totdiv){                
		objdiv1=eval("document.getElementById('Id"+id+"')")
		objimg1=eval("document.getElementById('img"+id+"')")	
		for(i=1;i<=totdiv;i++){	
			objdiv=eval("document.getElementById('Id"+i+"')")
			objimg=eval("document.getElementById('img"+i+"')")
			objdiv.style.display='none'
			objimg.className=''
		}	
		objdiv1.style.display='block'
		objimg1.className='active'                
	}		
	
});

   function signinCallback(authResult) {
        if (authResult['status']['signed_in']) {
            gapi.client.load('oauth2', 'v2', function()
            {
              gapi.client.oauth2.userinfo.get()
                .execute(function(response)
                {
                    // Shows user email
                    jQuery('#comments-form-name1').val(response.name);
                    jQuery('#comments-form-email1').val(response.email);
                    jQuery('.comment-login').hide();
                    jQuery('#gplus-logout>img').attr('src',response.picture);
                    jQuery('#gplus-logout .name').html(response.name);
                    jQuery('#gplus-logout').show();
                });
            });

        } else {
          console.log('Sign-in state: ' + authResult['error']);
        }
      }
      function gplus_logout(){
            var logoutUrl = 'http://mail.google.com/mail/u/0/?logout&hl=en'
            var imgWindow = window.open(logoutUrl,'sharer','toolbar=0,status=0,width=530,height=330');
            jQuery('#gplus-logout').hide();
            jQuery('.comment-login').show();
            try{
                imgWindow.onload = function(){
                    imgWindow.close();
                };
            }catch(e){
                imgWindow.close();
            }
      }
      function twitter_login(name, image, username){
            jQuery('#comments-form-name1').val(name);
            jQuery('#comments-form-email1').val(username+'@twitter.com');
            jQuery('.comment-login').hide();
            jQuery('#twitter-logout>img').attr('src',image);
            jQuery('#twitter-logout .name').html(name);
            jQuery('#twitter-logout').show();
      }
      function twitter_logout(){
            jQuery('#twitter-logout').hide();
            jQuery('.comment-login').show();
            jQuery('#comments-form-name1').val('');
            jQuery('#comments-form-email1').val('');
      }
      function facebook_logout(){
            FB.logout();
            jQuery('#fb-logout').hide();
            jQuery('.comment-login').show();
            jQuery('#comments-form-name1').val('');
            jQuery('#comments-form-email1').val('');
      }
    
    function fblogin(){
        FB.login(function(response) {
            if (response.status === 'connected') {
                FB.api('/me', function(response) {
                    jQuery('#comments-form-name1').val(response.name);
                    jQuery('#comments-form-email1').val(response.email);
                    jQuery('.comment-login').hide();
                    jQuery('#fb-logout>img').attr('src',"http://graph.facebook.com/"+response.id+"/picture?type=square");
                    jQuery('#fb-logout .name').html(response.name);
                    jQuery('#fb-logout').show();
                });
            }
        }, {scope: 'email'});
    }

var items='';
function showBoxes(frm){

    $('.alerttopic:checked').each(function() {
        if(items=='')
           items=this.value;
       else
           items=items+','+this.value;

   });

}
function showme(id)
{ 
    jQuery('.reset-error').hide();
    var display = jQuery( "#"+id ).css( "display" );
    jQuery('.login-popup').slideUp(); 
    
    if(display=='block')
       jQuery("#"+id).slideUp();
   else
       {
       jQuery("#"+id).slideDown(); 
       refreshCaptcha('imgver_'+id);
       }
}
function hideNotice()
{
    jQuery("#form_notification").slideUp();
    jQuery( "body" ).css( "background-position-y","-50px" );
   
    
}

$(document).ready(function() {
    
    // validate email subscription
    jQuery.validator.addMethod("checkEmail", function(username) {
        var isSuccess = false;
        $.ajax({ url: "/check-user.php",
          data: "email=" + $("#subscriber_email").val()+'&subscribe=email',
          async: false,
          success:
          function(msg) {  isSuccess = msg === "TRUE" ? true : false }
      });
        return isSuccess;
    },"");

     // validate captcha 
     jQuery.validator.addMethod("checkCaptcha", function(captchacode) {
        var isSuccess = false;
        $.ajax({ url: "/check-user.php",
          data: "captchacode=" + captchacode+"&check=captcha",
          async: false,
          success:
          function(msg) { isSuccess = msg === "TRUE" ? true : false }
      });
        return isSuccess;
    },"");


   //custom validation allowed charecters
   jQuery.validator.addMethod("accept", function(value, element, param) {
     return value.match(new RegExp("^" + param + "$"));
   });


   jQuery("#join_event_frm").validate({
      onkeyup:true,
    //onfocusout:true,
       rules: {
           name: {
              required: true,
              accept: "[a-zA-Z_ ]+",
              minlength: 3
          },

          email: {
              required: true,
              email: true,
              accept: "[0-9a-zA-Z_\\.@]+",
              checkEmail: true
          }
      },
      messages: {
       name: {
          required: "Please enter your Name",
          accept: "Please enter a valid Name",
          minlength: "Enter at least 3 characters"
      },
      email: {
          required: "Please enter your Email address",
          accept: "Please enter a valid Email address",
          email: "Please enter a valid Email address",
          checkEmail: "Your email is already registerd"
      }
      }

   });
   jQuery("#email_subscription").validate({
      onkeyup:true,
    //onfocusout:true,
    rules: {
        subscriber_name: {
           required: true,
           accept: "[a-zA-Z_ ]+",
           minlength: 3
       },

       subscriber_email: {
           required: true,
           accept: "[0-9a-zA-Z_\\.@]+",
           email: true,
           checkEmail: true
       },
       subscriber_verification: {
        required: true,
        checkCaptcha: true
    }
   },
   messages: {
       subscriber_name: {
           required: "Please enter your Name",
           accept: "Please enter a valid Name",
           minlength: "Enter at least 3 characters"
       },
       subscriber_email: {
           required: "Please enter your Email address",
           accept: "Please enter a valid Email address",
           email: "Please enter a valid Email address",
           checkEmail: "Your email is already registerd"
       },
       subscriber_verification: {
        required: "Please enter the code above",
        checkCaptcha: "You have entered wrong captcha"
       }
   },

   submitHandler: function(form) {
       subscribeMe(1);
   }

   });

   jQuery("#getalerts_subscription").validate({
      onkeyup:true,
    //onfocusout:true,
    rules: {
        alert_subscriber_name: {
           required: true,
           accept: "[a-zA-Z_ ]+",
           minlength: 3
       },

       alert_subscriber_email: {
           required: true,
           accept: "[0-9a-zA-Z_\\.@]+",
           email: true
       },
       alert_verification: {
        required: true,
        checkCaptcha: true
    },
    alertsid: {
        required: true
    }
   },
   messages: {
    alert_subscriber_name: {
       required: "Please enter your Name",
       accept: "Please enter a valid Name",
       minlength: "Enter at least 3 characters"
   },
   alert_subscriber_email: {
       required: "Please enter your Email address",
       accept: "Please enter a valid Email address",
       email: "Please enter a valid Email address"
   },
   alert_verification: {
    required: "Please enter the code above",
    checkCaptcha: "You have entered wrong captcha"
   },
   alertsid: {
    required: "Please choose atleast one category"
   }
   },

   submitHandler: function(form) {
       subscribeMealert(items);
       items='';
   }

   }); 

});