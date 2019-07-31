
(function($) {
	$(document).ready(function() {


//jQuery
/*
$('.mfsc_image_carousel .owl-carousel').owlCarousel({
    items: 1, 
    margin: 10,
    autoHeight: 'owl-height'


});
*/

        $('.mfsc_image_carousel .owl-carousel').owlCarousel({
            rtl:false,
            loop:false,
            margin:10,
            nav:true,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:1
                },
                1000:{
                    items:1
                }
            }
        })
		
	});
    
    
})(jQuery);