$(window).load(function () {
    var nav = $("#onPageNav");
    if (nav.length === 0) return;
    var navTop = nav.offset().top-1, 
    	cta = nav.find(".cta"), 
        height = nav.find("> :visible").height(),
    	threshold = 100,
     	contentTop = [],
     	winH = $(window).height(),
     	docH = $(document).height(),
     	href, jQuerySelectorEscape;
    // escape meta charactors in id, http://api.jquery.com/category/selectors/
    // regex from http://alexandregiannini.blogspot.com/2011/05/escaping-strings-for-jquery-selectors.html
    jQuerySelectorEscape = function (expression) {
    	return expression.replace(/[!"$%&'()*+,.\/:;<=>?@\[\\\]^`{|}~]/g, '\\$&');
    };
    if ($(window).scrollTop() > navTop) {
        if (nav.hasClass('StickyTopOn')) {
        	nav.addClass('fixed');
        }  
        if ($(cta).hasClass('autoHideOn')) {
            $(cta).show();
            cta.addClass('show');
        } else {
			$(cta).show();
            cta.addClass('show');
        }
        // Set top position of each section 
        if(nav.find(".pointsToSection").length){
            if(contentTop.length === 0){
                if(nav.find("ul li a").length){
                    $(nav.find("ul li a")).each(function(){
                        href = $(jQuerySelectorEscape($(this).attr('href')));
                        if (!href.length) return;
                        contentTop.push(href.offset().top - height);
                    }); 
                }
                if(nav.find("td a").length){
                    $(nav.find("td a")).each(function(){
                        href = $(jQuerySelectorEscape($(this).attr('href')));
                        if (!href.length) return;
                        contentTop.push(href.offset().top - height);
                    }); 
                }
            }
        }
        //centering the cta-center button in the space
        if ($("section[id^='onPageNav'] .cta .cta-align-center").length) {
            var padding = Math.floor(($("section[id^='onPageNav'] .cta").width() - $("section[id^='onPageNav'] .cta .cta-align-center a").outerWidth())*100/2/$("section[id^='onPageNav'] .cta").width());
            $("section[id^='onPageNav'] .cta .cta-align-center").css('padding-left',padding + "%");
        } else {
            $("section[id^='onPageNav'] .cta [class^='cta-align']").removeAttr('css');
        }
    } else {
        if (nav.hasClass('StickyTopOn')) {
        	nav.removeClass("fixed");
        } 
        if ($(cta).hasClass('autoHideOn')) {
            $(cta).hide();
            cta.removeClass('show');
        } else {
			$(cta).show();
            cta.addClass('show');
        }  
        if(nav.find(".pointsToSection").length){
            $('#onPageNav li').removeAttr('class');
            $('#onPageNav td').removeAttr('class');
        }
    }
    $(window).scroll(function () {
        //centering the cta-center button in the space
        if ($("section[id^='onPageNav'] .cta .cta-align-center").length) {
            var padding = Math.floor(($("section[id^='onPageNav'] .cta").width() - $("section[id^='onPageNav'] .cta .cta-align-center a").outerWidth())*100/2/$("section[id^='onPageNav'] .cta").width());
            $("section[id^='onPageNav'] .cta .cta-align-center").css('padding-left',padding + "%");
        } else {
            $("section[id^='onPageNav'] .cta [class^='cta-align']").removeAttr('css');
        }
        if ($(window).scrollTop() > navTop) {
            if (nav.hasClass('StickyTopOn')) {
                nav.addClass('fixed');
            }
            if ($(cta).hasClass('autoHideOn')) {
                $(cta).show();
                cta.addClass('show');
            }  else {
                $(cta).show();
                cta.addClass('show');
            }
            // Set top position of each section 
            if(nav.find(".pointsToSection").length){
                if(contentTop.length === 0){
                    if(nav.find("ul li a").length){
                        $(nav.find("ul li a")).each(function(){
                            href = $(jQuerySelectorEscape($(this).attr('href')));
                            if (!href.length) return;
                            contentTop.push(href.offset().top - height);
                        }); 
                    }
                    if(nav.find("td a").length){
                        $(nav.find("td a")).each(function(){
                            href = $(jQuerySelectorEscape($(this).attr('href')));
                            if (!href.length) return;
                            contentTop.push(href.offset().top - height);
                        }); 
                    }
                }
            }
        } else {
            if (nav.hasClass('StickyTopOn')) {
                nav.removeClass("fixed");
            } 
            if ($(cta).hasClass('autoHideOn')) {
                $(cta).hide();
                cta.removeClass('show');
            } else {
                $(cta).show();
                cta.addClass('show');
            }  
            if(nav.find(".pointsToSection").length){
                $('#onPageNav li').removeAttr('class');
                $('#onPageNav td').removeAttr('class');
            }
        }
        var winTop = $(window).scrollTop();
        if(nav.find(".pointsToSection").length){
            $.each( contentTop, function(i,loc){
                if  (winTop > loc - threshold && winTop < loc + threshold ){
                    $('#onPageNav li').removeAttr('class').eq(i).addClass('active');
                    $('#onPageNav td').removeAttr('class').eq(i).addClass('active');
                }
            });
        }
    });
    nav.on('click', 'ul li', function (e) {
        if ($(this).closest(".pointsToSection").length) {
            e.preventDefault();
            var $this = $(this), to; 
            href = $(jQuerySelectorEscape($this.find("a").attr('href')));
            if (!href.length) return;
            to = href.offset().top - height;
            $this.parent().find('li.active').removeClass('active');
            $this.toggleClass('active'); 
            // if last section is too short, add a div with extra space to allow scrolling
            if (to + winH > docH) {
                var extraHeight = $("<div></div>").height(to + winH - docH + 50);
                $('body').append(extraHeight);
            }
            $('html,body').animate({scrollTop:to}, 800);
        }
    });
    nav.on('click', 'td', function (e) {
        if ($(this).closest(".pointsToSection").length) {
            e.preventDefault();
            var $this = $(this), to; 
            href = $(jQuerySelectorEscape($this.find("a").attr('href')));
            if (!href.length) return;
            to = href.offset().top - height;
            $this.parent().find('td.active').removeClass('active');
            $this.toggleClass('active'); 
            // if last section is too short, add a div with extra space to allow scrolling
            if (to + winH > docH) {
                var extraHeight = $("<div></div>").height(to + winH - docH + 50);
                $('body').append(extraHeight);
            }
            $('html,body').animate({scrollTop:to}, 800);
        }
    });
	//Function to parse the URL and highlight the section with the same link or parent directory
    if(nav.find(".pointsToPage").length){
		var urlString = window.location.pathname;  
        var urlFolder = urlString.substring(splitUrl (urlString , 2) , urlString.lastIndexOf("/"));
        nav.find("td").each(function () {
            var hrefString = $(this).find("a").attr("href");
            if (!(hrefString == null)) { 
                var hrefFolder = hrefString.substring(splitUrl (hrefString , 2) , hrefString.lastIndexOf("/"));
                if (hrefFolder === urlFolder) {
                    nav.find("td.active").removeClass("active");
                    $(this).addClass("active");
                }
            } 
        }); 
    }
    function splitUrl (string, counter)
    {
        if(counter == 0) {
            return string.lastIndexOf("/");
        }
        return splitUrl(string.substring(0,string.lastIndexOf("/")) , counter-1);
    }
});

$(window).load(function () {
    var nav = $("#onPageNav2");
    if (nav.length === 0) return;
    var navTop = nav.offset().top, 
    	cta = nav.find(".cta-btn"), 
    	height = nav.height(),
    	threshold = 100,
        navList = $( "#onPageNav2 td" );
     	contentTop = [];
    if ($(".cq-wcm-edit").length) {
    } else{
        navList.each(function( index ) {
            var imgTag = $(this).find("div.cimage");
            $(imgTag[0]).addClass("show");
            $(imgTag[1]).addClass("hide");
    
        });
    }
    $(window).scroll(function () {

        var navPosition = 0;
        if($("#mainHeader").hasClass("more-from-intuit-open")){

            navPosition = navTop + ($(".more-from-intuit").height() - 20);
        }
        else{
			navPosition = navTop - 20;
        }

        if ($(window).scrollTop() > navPosition) {
            if ($(".cq-wcm-edit").length) {
            	nav.addClass('variable');
            }else{
				nav.addClass('fixed');
            }
            cta.removeClass("hidden").addClass("visible");
            // Set top position of each section 
            if(contentTop.length === 0){
                $(nav.find("td.navs a")).each(function(){
                    contentTop.push($($(this).attr('href')).offset().top - height);
                });
			}
        } else {
            nav.removeClass("fixed");
            cta.removeClass("visible").addClass("hidden");
        }
        var winTop = $(window).scrollTop();
          $.each( contentTop, function(i,loc){
           if  (winTop > loc - threshold && winTop < loc + threshold ){
            $('#onPageNav2 td.navs')
             .removeClass('active')
             .eq(i).addClass('active');
           }
          });
    });
    nav.on('click', 'td.navs', function (e) {
        e.preventDefault();
        var $this = $(this),
            to = $($this.find("a").attr('href')).offset().top - height;
        $this.parent().find('td.active').removeClass('active');
        $this.toggleClass('active');
        $('html,body').animate({scrollTop:to}, 800);
    });

    $("#onPageNav2 td").hover(
  		function() {
        	var $this = $(this),
                regularImage = $this.find("div.show"),
                hoverImage = $this.find("div.hide");
            	$(regularImage).removeClass("show").addClass("hide");
            	$(hoverImage).removeClass("hide").addClass("show");
  		}, function() {
        	var $this = $(this),
                regularImage = $this.find("div.hide"),
                hoverImage = $this.find("div.show");
            	$(regularImage).removeClass("hide").addClass("show");
            	$(hoverImage).removeClass("show").addClass("hide");
  		}
	);
});

$(document).ready(function(){
	var table_columns = $('.one-col').length;
	if(table_columns == 3){
		$('.one-col:first-child').addClass('only-3-col-margin');
		$('.one-col').addClass('only-3-col');
    } else if (table_columns == 2) {
		$('.one-col:first-child').addClass('only-2-col-margin');
		$('.one-col').addClass('only-2-col');
    }
    $('.one-col').focus(function(){
        //remove Highlight From Others cols first;
        $('.one-col').removeClass('highlight');
        $(this).addClass('highlight');
    });
     $('.one-col').hover(function(){
        //this ensures that if you are tabbing through and then use the mouse, the mouse hover will unhighlight the previous tab focused highlighted column
        $('.one-col').removeClass('highlight');
        $(this).addClass('highlight');
    });

    //make the first column highlighted by default;
    $('.one-col:first-child').addClass('highlight');

    var is_tabs = $('.cpricing-table .ctabs').length;
    //we only want to override tabs function if there is a tabs in teh pricing table
    if(is_tabs == 1){

         var $ctab = $('#pricing .ctabs li'); //cache tab selector
        $ctab.on('click',function(){   
            $ctab.removeClass("active");
            $(this).addClass("active");
            updateBody($(this).closest('li').attr('id'));
        });
        $ctab.keyup(function(event){
        if(event.keyCode == 13 && $(this).has(":focus")){
        	$(this).trigger('click');
    	}

	});


       function updateBody(this_id) {

            var tab_num = this_id.substring(6,7);
            var cell_num = $('.cell-body').length;

            if(tab_num == "1"){
                //show monthly price
                $('.monthly-price').removeClass('hide');
                $('.annual-price').addClass('hide');
                for(var i=1;i<cell_num;i++){
                    $('.cell-body:nth-child('+i+')').attr('aria-describedby','ctabs_1');
                }

            } else { //show annual price
                $('.monthly-price').addClass('hide');
                $('.annual-price').removeClass('hide');
                for(var i=1;i<cell_num;i++){
                    $('.cell-body:nth-child('+i+')').attr('aria-describedby','ctabs_2');
                }
            }
    	}
    }


});

$(document).ready(function() {
    	$(".cfeatures-tabbed").tabs();
});


