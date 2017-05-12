$(document).ready(function(){
	$(".panel-title a").click(function(){
		$(".panel-heading").each(function(){
			$(this).removeClass("bluepanel");
		});
		$(this).parents(".panel-heading").toggleClass("bluepanel");
		
		if($(this).hasClass("collapsed")){
			$(this).parents(".panel-heading").addClass("bluepanel");
		}else{
			$(this).parents(".panel-heading").removeClass("bluepanel");
		}			
	});
	
	$(".menubar img").click(function(e){
		$(".mainmenu-2").toggleClass("slidemenu");
		e.stopPropagation();
	});
	
	$(".crossbtn").click(function(){
		$(".mainmenu-2").removeClass("slidemenu");		
	});
	
	$(document).click(function(){
		$(".mainmenu-2").removeClass("slidemenu");
		$("ul.langsub").slideUp();
	});
	$(".mainmenu-2").click(function(e){
		e.stopPropagation();
	});
	
	$(".toplang span").click(function(e){
		$("ul.langsub").slideToggle();
		e.stopPropagation();
	});
	
	$("ul.langsub li a").click(function(){
		var lang = $(this).text();
		$(".toplang span").text(lang).append($("<i class='fa fa-angle-down'></i>"));
		// $(this).append($("<i class='fa fa-angle-down'></i>"));
	});
// about bar
	
	// $(".topsearch i").click(function(){	
	// 	$(".overlaybg , .topsearch input[type='text']").css({"display" : "block"});
	// 	$("body").css({"overflow" : "auto"});
	// });
	// $(".overlaybg i ").click(function(){
	// 	$(".overlaybg , .topsearch input[type='text']").css({"display" : "none"});
	// 	$("body").css({"overflow" : "auto"});
	// });
	
	
	jQuery(window).load(function () {
   
    if ($(window).width() <= 992) {
     $(".servicespad .panel-collapse").removeClass("in");
    }    
   });

	$(document).ready(function(){
		$(".servicespad .panel-heading a").click(function(){
			$(this).toggleClass("rotatei");
			$(".servicespad .panel-collapse").removeClass("in");
		});
	});	
	
});

	$(document).ready(function(){
		var options = {
		    data: [

		        {"text": "Home", "url_link": "CanaraBank_Home02.html"},
		        {"text": "Product", "url_link": "CanaraBank_product02.html"},
		        {"text": "Listing", "url_link": "CanaraBank_listing01.html"},
		        {"text": "About", "url_link": "CanaraBank_about_us_long_2.html"},
			],

		
		};

	
		var searchlist = function(){


			console.log($(".topsearch").attr('class'));
			$(".top-c").append(
				"<ul class='list-unstyled search-list'></ul>"
			);
			
			$.each(options.data,function(key,value){
				if(value != null){
					$('.search-list').append("<li><a href='"+value.url_link+"'>"+value.text+"</a><li>");
				}
			});
			console.log(1);
		};

	searchlist();

	$(".top-c").focusout(function(){
		setTimeout(function(){
			$('.search-list').hide();
			$("#searchcontent").val("");
		},300);
	});

		$("#searchcontent").keyup(function(){
			console.log("abc");
			var searchtext = $(this).val();
			$('.search-list').show();
			var flag = $('.search-list li a').length;
			$('.search-list li a').each(function(){
				if(!$(this).text().toLowerCase().match(searchtext)){
					$(this).parent().hide();
					flag = flag - 1;
				}else{
					flag = flag + 1;
					$(this).parent().show();
				}
			});
			if(searchtext== ""){
				$('.search-list').hide();
			}
		});
	});





