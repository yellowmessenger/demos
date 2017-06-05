jQuery(document).ready(function($) {

	// Social Feed Tabs
    $('.tabs .tab_links a').on('click', function(e)  {
        var currentAttrValue = $(this).attr('href');
 
        // Show/Hide Tabs
        $('.tabs ' + currentAttrValue).show().siblings().hide();

 
        // Change/remove current tab to active
        $(this).parent('li').addClass('active').siblings().removeClass('active');


        e.preventDefault();
    });
	
	// Brands Slider
	$('.slider').slick({
		dots: false,
		infinite: true,
		speed: 800,
        slidesToShow: 8,
        slidesToScroll: 8,
		responsive: [
		  {
			  breakpoint:990,
			  settings: {
				  slidesToShow: 6,
				  slidesToScroll: 6,
			  }
		  },
		  {
			  breakpoint:767,
			  settings: {
				  slidesToShow: 4,
				  slidesToScroll: 4,
			  }
		  },
		  {
			  breakpoint:600,
			  settings: {
				  slidesToShow: 3,
				  slidesToScroll: 3,
			  }
		  },
		  {
			  breakpoint:480,
			  settings: {
				  slidesToShow: 2,
				  slidesToScroll: 2,
			  }
		  }
		]
	});
});

