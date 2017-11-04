// JavaScript Document
$(window).load(function() {
	
		$('.envideo').on('click', function(e) {
			e.preventDefault();
  $('#enVideo').fadeIn();
			
  $('#hiVideo').hide('fast');
  $('.tabs a.hivideos').removeClass('active');
			
			 $('#KVideo').hide('fast');
  $('.tabs a.KVideo').removeClass('active');
			
			 $('#Tevideos').hide('fast');
  $('.tabs a.Tevideos').removeClass('active');
			
			 $('#Tavideos').hide('fast');
  $('.tabs a.Tavideos').removeClass('active');
			
  $(this).addClass('active');
 });
	
 $('.hivideos').on('click', function(e) {
	 e.preventDefault();
  $('#hivideos').fadeIn();
  $('#enVideo').hide('fast');
  $('.tabs a.envideo').removeClass('active');
	 
	 			 $('#KVideo').hide('fast');
  $('.tabs a.KVideo').removeClass('active');
			
			 $('#Tevideos').hide('fast');
  $('.tabs a.Tevideos').removeClass('active');
			
			 $('#Tavideos').hide('fast');
  $('.tabs a.Tavideos').removeClass('active');
	 
  $(this).addClass('active');
 }); 
	
	
	 $('.KVideo').on('click', function(e) {
	 e.preventDefault();
  $('#KVideo').fadeIn();
  $('#enVideo').hide('fast');
  $('.tabs a.envideo').removeClass('active');
	 
	 			 $('#hivideos').hide('fast');
  $('.tabs a.hivideos').removeClass('active');
			
			 $('#Tevideos').hide('fast');
  $('.tabs a.Tevideos').removeClass('active');
			
			 $('#Tavideos').hide('fast');
  $('.tabs a.Tavideos').removeClass('active');
	 
  $(this).addClass('active');
 }); 
	
	 $('.Tevideos').on('click', function(e) {
	 e.preventDefault();
  $('#Tevideos').fadeIn();
  $('#KVideo').hide('fast');
  $('.tabs a.KVideo').removeClass('active');
	 
	 			 $('#hivideos').hide('fast');
  $('.tabs a.hivideos').removeClass('active');
			
			 $('#enVideo').hide('fast');
  $('.tabs a.enVideo').removeClass('active');
			
			 $('#Tavideos').hide('fast');
  $('.tabs a.Tavideos').removeClass('active');
	 
  $(this).addClass('active');
 }); 
	
	 $('.Tavideos').on('click', function(e) {
	 e.preventDefault();
  $('#Tavideos').fadeIn();
  $('#enVideo').hide('fast');
  $('.tabs a.envideo').removeClass('active');
	 
	 			 $('#hivideos').hide('fast');
  $('.tabs a.hivideos').removeClass('active');
			
			 $('#enVideo').hide('fast');
  $('.tabs a.enVideo').removeClass('active');
			
			 $('#Tevideos').hide('fast');
  $('.tabs a.Tevideos').removeClass('active');
	 
  $(this).addClass('active');
 }); 
	
	//changes by Aditya
	
	//LOA to NOC
	//Hindi
		$('.hivideoscomm').on('click', function(e) {
			e.preventDefault();
  $('#hivideoscomm').fadeIn();
			
  $('#Kvideonocomm').hide('fast');
  $('.tabs a.Kvideonocomm').removeClass('active');
			
	$('#Tvideoscomm').hide('fast');
  $('.tabs a.Tvideoscomm').removeClass('active');		
			
	$('#Tmvideoscomm').hide('fast');
  $('.tabs a.Tmvideoscomm').removeClass('active');			
						
  $(this).addClass('active');
 });
	//Kannada
	$('.Kvideonocomm').on('click', function(e) {
			e.preventDefault();
  $('#Kvideonocomm').fadeIn();
			
  $('#hivideoscomm').hide('fast');
  $('.tabs a.hivideoscomm').removeClass('active');
			
	$('#Tvideoscomm').hide('fast');
  $('.tabs a.Tvideoscomm').removeClass('active');		
			
	$('#Tmvideoscomm').hide('fast');
  $('.tabs a.Tmvideoscomm').removeClass('active');		
			
						
  $(this).addClass('active');
 });
	
	
	
	//Kannada
	$('.Tvideoscomm').on('click', function(e) {
			e.preventDefault();
  $('#Tvideoscomm').fadeIn();
			
  $('#hivideoscomm').hide('fast');
  $('.tabs a.hivideoscomm').removeClass('active');
			
	 $('#Kvideonocomm').hide('fast');
  $('.tabs a.Kvideonocomm').removeClass('active');		
			
	$('#Tmvideoscomm').hide('fast');
  $('.tabs a.Tmvideoscomm').removeClass('active');		
			
						
  $(this).addClass('active');
 });
	
	
	//Kannada
	$('.Tmvideoscomm').on('click', function(e) {
			e.preventDefault();
  $('#Tmvideoscomm').fadeIn();
			
  $('#hivideoscomm').hide('fast');
  $('.tabs a.hivideoscomm').removeClass('active');
			
	 $('#Kvideonocomm').hide('fast');
  $('.tabs a.Kvideonocomm').removeClass('active');		
			
		
	$('#Tvideoscomm').hide('fast');
  $('.tabs a.Tvideoscomm').removeClass('active');		
						
  $(this).addClass('active');
 });
	
	
	
	//LOA to NOC
	//Hindi
		$('.hivideosnoc').on('click', function(e) {
			e.preventDefault();
  $('#hivideosnoc').fadeIn();
			
  $('#KVideonoc').hide('fast');
  $('.tabs a.Tevideosnoc').removeClass('active');
			
			 $('#Tavideosnoc').hide('fast');
  $('.tabs a.Tavideosnoc').removeClass('active');
			
			 $('#Tavideosnoc').hide('fast');
  $('.tabs a.Tavideosnoc').removeClass('active');
			
						
  $(this).addClass('active');
 });
	//Kannada
	$('.KVideonoc').on('click', function(e) {
			e.preventDefault();
  $('#KVideonoc').fadeIn();
			
  $('#hivideosnoc').hide('fast');
  $('.tabs a.hivideosnoc').removeClass('active');
			
			 $('#Tevideosnoc').hide('fast');
  $('.tabs a.Tevideosnoc').removeClass('active');
			
			 $('#Tavideosnoc').hide('fast');
  $('.tabs a.Tavideosnoc').removeClass('active');
			
						
  $(this).addClass('active');
 });
	
	//Telgu
	$('.Tevideosnoc').on('click', function(e) {
			e.preventDefault();
  $('#Tevideosnoc').fadeIn();
			
  $('#hivideosnoc').hide('fast');
  $('.tabs a.hivideosnoc').removeClass('active');
			
			 $('#KVideonoc').hide('fast');
  $('.tabs a.KVideonoc').removeClass('active');
			
			 $('#Tavideosnoc').hide('fast');
  $('.tabs a.Tavideosnoc').removeClass('active');
			
						
  $(this).addClass('active');
 });
	
	//Tamil
	$('.Tavideosnoc').on('click', function(e) {
			e.preventDefault();
  $('#Tavideosnoc').fadeIn();
			
  $('#hivideosnoc').hide('fast');
  $('.tabs a.hivideosnoc').removeClass('active');
			
			 $('#KVideonoc').hide('fast');
  $('.tabs a.KVideonoc').removeClass('active');
			
			 $('#Tevideosnoc').hide('fast');
  $('.tabs a.Tevideosnoc').removeClass('active');
			
						
  $(this).addClass('active');
 });
	
	
	
	
	//
	
	
	// Add class after some Li tags
	$('ul.prodList').find('li').each(function(i){
		var num = (i%4) + 1; // mod function - returns the remainder
		if(num==4){
			$(this).addClass('last');
		}
	});
	
	// Set Max height in sublinks section div
	function equalHeight(group) {
		tallest = 0;
		group.each(function() {
			thisHeight = $(this).height();
			if(thisHeight > tallest) {
				tallest = thisHeight;
			}
		});
		group.height(tallest);
	}
	equalHeight($("#footerBlocks .block"));
	equalHeight($("#contentHome .row1 .box"));
	equalHeight($("#contentHome .row2 .box"));
	equalHeight($("ul#images-library li h3"));
	
	
	
	$("#footerBlocks.box1col .block").css("height",'auto');
	
	/**	Applicable only to Mobile-nav */
	// Checking if the Menu button is visible.
	if ($("#site-navigation .menuToggle").is(":visible")) {
		// Making the dropdown magically appear onclick/touch.
		$('#site-navigation .menuToggle').on('click', function() {
			$('ul#mainMenu').slideToggle('fast');
		}); // end on.click
	} // end Menu visibility check
	
	$('.gridtable tr:odd').addClass('odd');
	if($( "#faqAccordion" ))
	{		
	
	$( "#faqAccordion" ).accordion({
	    collapsible: true,
        active:false,
		heightStyle: "content"
	});
	}
	
	$('#contentHome .box .news').on('click', function() {
		$('.box .newsbox').fadeIn();
		$('.box .videoBox').hide('fast');
		$('.latestNews .boxtabs a').removeClass('active');
		$(this).addClass('active');
	});
	$('#contentHome .box .videos').on('click', function() {
		$('.box .newsbox').hide();
		$('.box .videoBox').fadeIn();
		$('.latestNews .boxtabs a').removeClass('active');
		$(this).addClass('active');
	}); 
	$('#contentHome .box .facebook').on('click', function() {
		$('.box .facebookBox').fadeIn();
		$('.box .twitBox').hide('fast');
		$('.fbtweet .boxtabs a').removeClass('active');
		$(this).addClass('active');
	});
	$('#contentHome .box .twitter').on('click', function() {
		$('.box .facebookBox').hide();
		$('.box .twitBox').fadeIn();
		$('.fbtweet .boxtabs a').removeClass('active');
		$(this).addClass('active');
	}); 

});

/**	Display the Screen Width */
$("#dimensions .width").html($(window).width());

$(window).resize(function() {
	$("#dimensions .width").html($(window).width());
	
	if ($(window).width() > 600 ) {
		$('ul#mainMenu').show();
	} else {
		$('ul#mainMenu').hide();
	}
});
$(window).load(function(){
	$('.flexslider').flexslider({
		animation: "slide",
		start: function(slider){
			$('body').removeClass('loading');
		}
	});	
	

});