// X button predictive search
$(function() {               	
	// Solr Auto complete 
	if ($(".solr-autocomplete").length > 0) {
		var $input = $(".solr-autocomplete #search"),
			$inputRecipe = $(".solr-autocomplete #keyword"),
			$btnSubmit = $("#btnFindContent"),
			$btnRecipeSubmit = $("#btnFindARecipe"),
			closeSearch = '<span class= "close-search" title="Clear Search">Close</span>';

		if ($input.val() !== "") { 
			$btnSubmit.css("display", "block");
			$(closeSearch).insertAfter($btnSubmit);
		}
		if ($inputRecipe.val() !== "") { 
			$btnRecipeSubmit.css("display", "block");
			$(closeSearch).insertAfter($btnRecipeSubmit);
		}
		
		$(document).on('click', '.close-search', function() {
			$input.val("");
			$btnSubmit.css("display", "block");
			
			$inputRecipe.val("");
			$btnRecipeSubmit.css("display", "block");
			$(this).hide();
		});
		$input.keyup(function() {
			var closeTarget = $(".close-search");
			if (closeTarget.length === 0) {
				$(closeSearch).insertAfter($btnSubmit);             
			} else {
				closeTarget.show();
			}
			if ($(this).val() === "") {
				closeTarget.hide();
			}
		});
		$inputRecipe.keyup(function() {
			var closeTarget = $(".close-search");
			if (closeTarget.length === 0) {
				$(closeSearch).insertAfter($btnRecipeSubmit);             
			} else {
				closeTarget.show();
			}
			if ($(this).val() === "") {
				closeTarget.hide();
			}
		});
	}

	// Carousel Video Slide fix
	$(document).on('click', '.carousel.hero a.wrapper-link, .recipeCarousel a.wrapper-link', function(e) {
		if ($(this).attr('video-data') !== undefined) {
			if (carouselStatus) carouselStatus = "stop";
			_UNILEVER.carouselStatus = "stop";
			e.preventDefault();
			e.stopPropagation();
		}
	});
	$(document).on('click', '#close-modal', function(e){ 
		if (carouselStatus)	carouselStatus = "play";
		_UNILEVER.carouselStatus = "play";		
		e.preventDefault(); 
		e.stopPropagation(); 
	});	
	
	// Rating overlay fix
	$(document).on('click', 'a.openRateOverlay', function (e) {
        e.preventDefault();
    });
	
	// video overlay autoplay fix
	var videoHeader = $('.video-teaser');
	if (videoHeader.length > 0) {	
		
		$(document).on('click', '.video-teaser a.wrapper-link', function (e) {
			e.preventDefault();
			var ytplayer = $(this).parents('.video-teaser').find('.modal-controls')[0].getElementsByTagName("iframe")[0],
			ytplayersrc = $(ytplayer).attr('src');
			if(ytplayersrc === "" || ytplayersrc === undefined){
			    var hiddenURL = $(this).parents('.video-teaser').find('#hdnVideoSrc').val();
				ytplayersrc = hiddenURL.replace('autoplay=0', 'autoplay=1');
				ytplayer.src = ytplayersrc;
			} else {
				ytplayersrc = ytplayersrc.replace('autoplay=0', 'autoplay=1');
				ytplayer.src = ytplayersrc;
			}		
		});	
		$(document).on('click', '.video-teaser #close-modal', function (e) {
			e.preventDefault();
			var ytplayer = $(this).parents('.modal-controls')[0].getElementsByTagName("iframe")[0],
			ytplayersrc = $(ytplayer).attr('src'), hiddenURL = $('#hdnVideoSrc').val();;
			if(hiddenURL === "" || hiddenURL === undefined){
				ytplayersrc = ytplayersrc.replace('autoplay=1', 'autoplay=0');
				ytplayer.src = ytplayersrc;
			} else {
				ytplayer.src = "";				
			}		
		});
}

// LAZY LOADING FIX FOR SIC
if (!lazyloading) {
    var lazyloading = {};
}
lazyloading = {
    handleImageLazyLoading: function (carousel, target) {
        if (carousel.hasClass('scroller')) {
            var imgTarget = target.find('img'),
					imgDataSrc = imgTarget.data('src');

            if (imgTarget.attr('src') === '' && imgTarget.data('src') !== "") {
                imgTarget.attr('src', imgDataSrc)
            }
        }
    },
    init: function () {
        var _this = this,
				target = $('.carousel.scroller .navigation-control');

        target.click(function () {
            if (_UNILEVER.carouselStatus == 'play') {
                /* prevent multiple clicks, because users WILL do this */
                var currentTarget = $(this),
						carousel = currentTarget.parent('.carousel.scroller'),
						carouselItems = carousel.find('ul > .item'),
						targetIndex = carousel.attr('data-item-show');

                if (currentTarget.hasClass('next')) {
                    /* set image src if blank */
                    _this.handleImageLazyLoading(carousel, carouselItems.eq(parseInt(targetIndex) + 1));
                } else if (currentTarget.hasClass('previous')) {
                    /* set image src if blank */
                    _this.handleImageLazyLoading(carousel, carousel.find('.item').filter(':last').prev());
                };
            };
        });
    }
}
lazyloading.init();
	
});
