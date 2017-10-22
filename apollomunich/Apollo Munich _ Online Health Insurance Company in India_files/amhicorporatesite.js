  var nVer = navigator.appVersion; var nAgt = navigator.userAgent; var bN = navigator.appName; var fullV = "" + parseFloat(navigator.appVersion); var majorV = parseInt(navigator.appVersion, 10); var nameOffset, verOffset, ix; if ((verOffset = nAgt.indexOf("Opera")) !== -1) { bN = "Opera"; fullV = nAgt.substring(verOffset + 6); if ((verOffset = nAgt.indexOf("Version")) !== -1) { fullV = nAgt.substring(verOffset + 8) } } else { if ((verOffset = nAgt.indexOf("MSIE")) !== -1) { bN = "IE"; fullV = nAgt.substring(verOffset + 5) } else { if ((verOffset = nAgt.indexOf("Chrome")) !== -1) { bN = "Chrome"; fullV = nAgt.substring(verOffset + 7) } else { if ((verOffset = nAgt.indexOf("Safari")) !== -1) { bN = "Safari"; fullV = nAgt.substring(verOffset + 7); if ((verOffset = nAgt.indexOf("Version")) !== -1) { fullV = nAgt.substring(verOffset + 8) } } else { if ((verOffset = nAgt.indexOf("Firefox")) !== -1) { bN = "Firefox"; fullV = nAgt.substring(verOffset + 8) } else { if ((nameOffset = nAgt.lastIndexOf(" ") + 1) < (verOffset = nAgt.lastIndexOf("/"))) { bN = nAgt.substring(nameOffset, verOffset); fullV = nAgt.substring(verOffset + 1); if (bN.toLowerCase() == bN.toUpperCase()) { bN = navigator.appName } } } } } } } if ((ix = fullV.indexOf(";")) !== -1) { fullV = fullV.substring(0, ix) } if ((ix = fullV.indexOf(" ")) !== -1) { fullV = fullV.substring(0, ix) } majorV = parseInt("" + fullV, 10); if (isNaN(majorV)) { fullV = "" + parseFloat(navigator.appVersion); majorV = parseInt(navigator.appVersion, 10) }
  document.getElementsByTagName("body")[0].className += " " + bN + " " + bN + majorV + " cmsHTML cmsHTML5";

function RequestACallBackClick(){
    var digitalData={};
    
    digitalData.page={ 
    linkInfo:{
          linkName:"RequestCallBackPopup",
          linkPosition:"SideNav",
         linkType:"Internal",
      }
    }
    _satellite.track("requestACallbackStart");
  console.log("RequestACallBackClick")
}



  function UserDetails(Heading,SubHeading) {  
    RequestACallBackClick()
    window.open("/buyonline/GetUserDetails.aspx?ProductName=" + Heading + "&ProductVariant=" + SubHeading, '', 'width=370,height=425,top=241,left=972')  
};

function UserDetailsMob(Heading,SubHeading) {  
  RequestACallBackClick()
    window.open("/Request-A-Call-Back.aspx?ProductName=" + Heading + "&ProductVariant=" + SubHeading, '_parent')  
};

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
};


function deleteCookie(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};



$(document).ready(function (){ 
  
  var UrlName;
  $(".MenuSelector").change(function () {    
    
    var path = this.value;        
    document.location.href = path;
   //conceptName = $(".MenuSelector option:selected").val();
    
  });  
  UrlName=$(location).attr('pathname');
  $(".MenuSelector").val(UrlName);
  $('#accordion1 div').hide();
  $('#accordion1 h6').click(function(e){
    $('#accordion1 div').slideUp();
    $('#accordion1 h6').css('background-image','url(/images/iconPlus.png)');
    if($(this).next('div').css('display')=='none'){
    $(this).next('div').slideDown();
    $(this).css('background-image','url(/images/iconPlusSel.png)');
    //$(this).css('background','/images/iconPlusSel.png');
      }else{
      $(this).css('background-image','url(/images/iconPlus.png)');
      }
    e.preventDefault();
  });
  
  
  var ulCount=$('.articleLinks ul').length;
  if(ulCount>1){
    $('.articleLinks ul li:not(ul li ul li)').css({'font-weight' : 'bold', 'list-style' : 'none'});
	$('.articleLinks ul li ul li a').css({'font-weight' : 'normal'});    
    }  
   $("#accordion").accordion({heightStyle: "content"});
  $(".prod-listing:last").css("border-bottom","none");
  
  
});

//Expand collapse as per irda
$(document).ready(function(){
$('.expCol').click(function(){
	var a=$('.expCol img').attr('src');
	if(a=='images/pluss.png'){
		$('.expCol img').attr('src', 'images/minus.png');
		$('.expandCollapse').slideToggle();
		return false;
		}
	else
	$('.expCol img').attr('src', 'images/pluss.png');
		$('.expandCollapse').slideToggle();
		return false;
	});
});

$(document).ready(function(){
$('.expCol1').click(function(){
	var a=$('.expCol1 img').attr('src');
	if(a=='/images/pluss.png'){
		$('.expCol1 img').attr('src', '/images/minus.png');
		$('.expandCollapse1').slideToggle();
		return false;
		}
	else
	$('.expCol1 img').attr('src', '/images/pluss.png');
		$('.expandCollapse1').slideToggle();
		return false;
	});
});

// Home Box JS
$(document).ready(function(){
	$('.homeBox').mouseover(function(){
		$(this).find('.knwMore li').removeClass('bg').addClass('bg');
        $(this).find('.knwMore li a').css('color', '#f26522');				
        var src = $(this).find('img').attr("src").match(/[^\.]+/) + "hover.png";
		//$(this).find('img').attr("src", src);
		return false;
			}).mouseout(function() { 
            $(this).find('.knwMore li').removeClass('hover').addClass('bg');
            $(this).find('.knwMore li a').css('color', '');           			
            var src = $(this).find('img').attr("src").replace("hover.png", ".png");
            $(this).find('img').attr("src", src);
			return false;
			});
			
		$(function() {
            var offset = $(".socialIcons").offset();
            var topPadding = 15;
            $(window).scroll(function() {
                if ($(window).scrollTop() > offset.top) {
                    $(".socialIcons").stop().animate({
                        marginTop: $(window).scrollTop() - offset.top + topPadding
                    });
                } else {
                    $(".socialIcons").stop().animate({
                        marginTop: 0
                    });
                };
            });
        });
  
      $('.homeBox').click(function(){
      var lnk=$(this).find('.heading a').attr('href');
        //alert("hello")
        //alert(lnk.indexOf('optima'))
          
        if(lnk.indexOf('optima')<=-1){
          //alert("hi");
          setCookie("healthinsurance", "individualfamily");        
        }
        else{
          deleteCookie("healthinsurance");
        }
        
        window.location=lnk
        //alert(getCookie("healthinsurance"));
        //return false;
       
      
      });
		
	});

// Home Box JS

// MENU BORDER RIGHT FOR IE
$(document).ready(function(){
$('.megamenu .mega .subCMSListMenuUL li:last-child').css('border','none');
$('footer .container li:last').css('border','none');
});
// MENU BORDER RIGHT FOR IE

// Product Plan Page jQuery //
$(document).ready(function(){
	$('.prodAccord .accordStuff a').click(function(e){
		$('.prodAccord .accordStuff div').slideUp('slow');
		$('.prodAccord .accordStuff span').removeClass('txtOrng');
		$('.prodAccord .accordStuff img').attr('src','/images/iconPlus.png');
		var src = $(this).find('img').attr("src");
		if(src!='/images/iconPlusSel.png'){
		var src = $(this).find('img').attr("src").match(/[^\.]+/) + "Sel.png";
		$(this).find('img').attr("src", src);
		}
        if($(this).next('div').css('display')=='none'){
		$(this).find('span').addClass('txtOrng');
		$(this).next().slideToggle('slow');
          }
      else{
      $(this).find('img').attr('src','/images/iconPlus.png');
      }
		e.preventDefault();
		});  
	});

// Product Plan Page jQuery //
//End

function refPopup(){
		var id='#refcodePopUp';
	//$('a[name=modal]').click(function(e) {
		//Cancel the link behavior
		
		//Get the A tag
		//var id = $(this).attr('href');
		//Get the screen height and width
		var maskHeight = $(document).height();
		var maskWidth = $(window).width();
	
		//Set heigth and width to mask to fill up the whole screen
		$('#screen').css({'width':maskWidth,'height':maskHeight});
		
		//transition effect		
		$('#screen').fadeIn(1000);	
		$('#screen').fadeTo("slow",0.7);	
	
		//Get the window height and width
		var winH = $(window).height();
		var winW = $(window).width();
              
		//Set the popup window to center
		//alert(winH/2-$(id).height()/2);
		//alert(winW/2-$(id).width()/2);
		$(id).css('top',  winH/2-$(id).height()/2);
		$(id).css('left', winW/2-$(id).width()/2);
	
		//transition effect
		$(id).fadeIn(2000); 
	
	};
//Grievance Script Starts Here	
	$('.tabContent:first-child').show();	
	$('#grievanceContainer .tab').on('mouseover',function(){
		if (!$(this).hasClass('selClick')) {
			$(this).addClass('selHover');
        	var src = $(this).find('img').attr("src").match(/[^\.]+/) + "Hover.png";
		$(this).find('img').attr("src", src);
		}
			}).on('mouseout',function(){	
			if (!$(this).hasClass('selClick')) {        			
            var src = $(this).find('img').attr("src").replace("Hover.png", ".png");
		$(this).find('img').attr("src", src);
			$(this).removeClass('selHover');
			}
				});
				
				//

$('#Griev').on('change', function(){
  var $this = $(this),
  $value = $this.val();
  
  var currTab=$value;//$(this).attr('id');
     
		var currTabContent=currTab+'Content';
       
  //$('#grievanceContainer .tab').removeClass('selClick');
  
  $('#grievanceContainer .tabContent').hide();
 
		$('#'+currTabContent).show();
  

});

                 //
	
	$('#grievanceContainer .tab').on('click', function(e){
      //alert('id');
		var selTab = $('#grievanceContainer .tab').closest('.selClick').attr('id');
		var srcSel=$('#'+selTab).find('img').attr("src");		
		var srcMatchSel=srcSel.substr(-9);	
            var src1 = $('#'+selTab).find('img').attr("src").replace("Hover.png", ".png");			
			$('#'+selTab).removeClass('selClick');		
			$('#'+selTab).removeClass('selHover');
			$('#'+selTab).find('img').attr("src", src1);	
		var currTab=$(this).attr('id');
      //alert(currTab);
		var src=$(this).find('img').attr("src");
		var srcMatch=src.substr(-9);
		if(srcMatch!='Hover.png'){
        var src = $(this).find('img').attr("src").match(/[^\.]+/) + "Hover.png";
		$(this).find('img').attr("src", src);
		}
		var currTabContent=currTab+'Content';
      //alert(currTabContent);
		$('#grievanceContainer .tab').removeClass('selClick');
		$('#grievanceContainer .tabContent').hide();
		$('#'+currTabContent).show();
		$(this).addClass('selClick');		
		});
	//Grievance Script ends Here


//Grievance Validation Starts Here
$('.regSubmit input.FormButton').click(function(){
  gname=$('.TextBoxField:eq(0)').val();
  gemail=$('.TextBoxField:eq(1)').val();
  gcontact=$('.TextBoxField:eq(2)').val();
  namepattern=/^[a-zA-Z.\s]+$/;
  emailpattern=/^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
  contactpattern=/^[0-9\s]+$/;
  
  if(gname==""){
     alert("Please enter your Name");
     return false;
  }
  
   if(namepattern.test(gname)==false){
     alert("Invalid Name");
     return false;
   }
  
  if(gemail==""){
     alert("Please enter your Email-id");
     return false;
  }
  
  if(emailpattern.test(gemail)==false){
     alert("Invalid Email-id");
     return false;
   }
  
  if(gcontact==""){
     alert("Please enter your Contact");
     return false;
  }
  
  if(contactpattern.test(gcontact)==false){
     alert("Invalid Contact");
     return false;
   }
   
  /*var isChecked = $('#chkterms').children('input[type="checkbox"]').is(':checked');
  if(isChecked==false){
     alert("Please Check Terms & Conditions");
     return false;
  }*/
  
  
});

$('.caseSubmit input.FormButton').click(function(){
gcaseid=$('.TextBoxField:eq(0)').val();
  
if(gcaseid==""){
     alert("Please enter your Case ID");
     return false;
  }
  
});

//Grievance Validation Ends Here

