BRANDSETTINGS = {
    expandNavigation : true, // should be set per page
    tabNavigation : true, // should be set per page
    formChangeValidation : true, // should only be set on recipe search page - will run the form no change validation on a page
    hasSortByFilter : true, // should only be set on pages that have a sort by
    hasFAQ:true,
    autoRotate : true,
    rotationTime : 6000,
    /* 
      Available carousel types:
      'background-layer' - will absolutely position the image under the carousel image copy text. Essentiallly, acting as a background image.
    */
    carouselType : 'background-layer',
    contentFinderSettings : {
        maxWidth:410,
        maxHeight: 300,
        backgroundColor : '#e0edf9',
        backgroundClassName:'grantsPopup',
        disableAutoPan: true,
        arrowStyle: 2,
        borderRadius: 0,
        marginRight: 0,
        zIndex: 4000
    }
};
var checker = 0,
	jqLoaded = false;
	
function jqueryLoaded() {
    
	clearInterval(checker);
	(function (MODULE, $, undefined) {
		MODULE.UI =(function(){
		function _ui() {
				
				var _this = this;
				var moveElement = function(ele, des){
					if ( $(ele).length > 0 && $(des).length > 0){
						var copy=$(ele).clone();
						$(ele).remove();
						$(des).append(copy);
					}
				};
				
				var countrySelector = function(elm){
				 var liLength = $(elm).find('li.country').length,
				     colLength = Math.ceil(liLength/2),
					 colOne = '<ul class="colOne">',
					 colTwo ='<ul class="colTwo">',
					 colOneHtml = '',
					 colTwoHtml = '';
					 
					if(liLength > 1)
					{
						for(var i=0; i < colLength; i++){
							 colOneHtml += $(elm).children('li').eq(i).clone().wrap('<li>').parent().html();
							}
						for(var i=colLength; i < liLength; i++){
							 colTwoHtml += $(elm).children('li').eq(i).clone().wrap('<li>').parent().html();
							}
						colOne += colOneHtml + '</ul>';
						colTwo += colTwoHtml + '</ul>';
						$(elm).empty().append(colOne).append(colTwo);
					}
				};
				
	
				/* Init call  */
	            this.init = function () {
					if($('html').hasClass('no-csscolumns'))
						countrySelector("ul.country-dropdown");
	                moveElement(".footer-disclaimers","#main");
	                return this; /*this refere to MODULE.subModule*/
	            };

            return this.init(); /*this refere to MODULE.subModule.init()*/
			}
		return new _ui(); /*creating a new object of helper rather then a funtion*/
		}());
		
	/**
	* Check to evaluate whether 'Tresemme' exists in the global namespace - if not, assign window.Tresemme an object literal
	*/
	}(window.Tresemme = window.Tresemme || {}, jQuery));

$(document).ready(function() {
	var linktext = $('.Noimageteaser h3 span').text(),
		content = $('.Noimageteaser p').text(),
		linkurl = $('.Noimageteaser .call-to-action').attr('href'),
		tempHTML = '<li class="last"><a href="'+linkurl+'" class="link-hover">'+linktext+'</a></li><li class="hidden-content">'+content+'</li>'
		$('#nav ul').append(tempHTML);

	$('#nav .link-hover').mouseover(function() {
	 $('#nav .hidden-content').addClass('show');
	});
	$('#nav .link-hover').mouseout(function() {
	  $('#nav .hidden-content').removeClass('show');
	});
	// $('#nav .link-hover').click(function() {
	//  $('#nav .hidden-content').toggleClass('show');
	// });

});
}

function checkJquery() {
    if (window.jQuery) {
        jqueryLoaded();
    }
    if (checker == 0) {
        checker = window.setInterval(checkJquery, 100);
    }
}
checkJquery();
// window.onload = function() {

// }