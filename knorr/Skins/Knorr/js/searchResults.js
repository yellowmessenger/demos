/*
* Site Search Methods
*/
counter = 0;
pager_counter = 0;
page_first_run = 0;
slide_filter_counter = 0;
(function (sitesearch, $, undefined) {
	sitesearch.config = {
		webservices: {
			//siteSearchResults: "CTP/data/search-results.json",
			//siteSearchResults: "CTP/data/search-result-error.json",
			//ingredientSearchResults: "CTP/data/ingredientSearch.json",
			ingredientSearchResults: window.location.protocol + "//" + window.location.hostname+"/Search/GetIngredientSearchResults",
			//siteSearchResults: "CTP/data/search-results.json",
			siteSearchResults: window.location.protocol + "//" + window.location.hostname+"/Search/GetSearchResults"
		},
		recipeDefaulImg: "/Skins/knorr/images/recipeDefault.png"
	};
	// CONTENT LOADER UTILITY FOR AJAX CALLS
	sitesearch.contentLoader = (function () {
        function CONTENTLOADER() {           
			this.getServiceData = function (serviceURL, params) {
                var settings = {},
                    defaults = {
                        data: "{}",
                        cache: false,
                        method: "POST"
                    };
                $.extend(settings, defaults, params);
                
                $.ajax({
                    type: settings.method,
                    url: serviceURL,
                    data: $("form").serialize(),
                    cache: settings.cache,             					
                    success: function (data) {
                        var parsedData = null;
						if (typeof data !== "undefined" && data !== "") {                      
							parsedData = data;
                        }
                        if (typeof params !== "undefined" && typeof params.success_callback === "function") {
                            params.success_callback.call(this, parsedData);
                        }
                    },
                    error: function (xhr, status, error) {
                        if (typeof params !== "undefined" && typeof params.error_callback === "function") {
                            params.error_callback.call(this, xhr, status, error);
                        }
                    }
                });
            };
        }
        return new CONTENTLOADER();
    }());
	// TOGGLE METHOD
	sitesearch.toggle = (function () {
		function TOGGLE() {
			this.collapseExpand = function(selector, isClicked) {               
				var _self = $(selector),
					collapsedCL = ' .panel-collapse',
					target = _self.parent().next(collapsedCL),
					activeClass = 'active',
					filterResults = ".filter-results ",
					tabList = ".filter-results-list li";
				
				counter++;
				
				if (($(tabList+"."+activeClass).length === 1 || $(tabList+"."+activeClass).length > 1) && (!_self.parents('li').hasClass("active") || isClicked === false)) {
					$(tabList).removeClass(activeClass);
				}
				_self.parents('li').toggleClass(activeClass);
				$(filterResults+" .panel").height('auto');
				$(filterResults+" ."+activeClass + collapsedCL).height('auto');
				$(filterResults).animate({ height: $(filterResults+" .panel").height() + $(filterResults+" ."+activeClass + collapsedCL).height()}, 400);					
				$(collapsedCL).hide(400);
				$(" ."+activeClass +collapsedCL).show(100).animate({ height:  $(filterResults+" ."+activeClass + collapsedCL+ ' ul').height()}, 400);
				$("#recipeCategory").val($(tabList+".active .head-title").text());
            },
			init = function() {
				 $(document).on('click', ".accordion-toggle", function (e) {
					e.preventDefault();
					sitesearch.toggle.collapseExpand($(this), true);
					e.stopPropagation();
				});
			};
            return init();
		}
		return new TOGGLE();
	}());
	// RENDER SEARCH DATA
	sitesearch.populateresults = (function () {				
		function POPULATERESULTS() {
			// BIND TABS, SEARCH RESULTS, PAGINATION
			var populateTabs = function (data, options) {
				if (counter === 0 && data.SearchTabHeader !== ""  && data.SearchTabHeader !== null) { 
					$(options.recipeHdnFld).val(data.SearchTabHeader); 
				}
				$(options.featuredHdnFld).val(data.FeaturedRecipeCount);
				
				var tablist = "", tabName, activeCl, resultList, contentType, callToAction, featuredText, noResultLinkText,
				contentListing = data.GroupedContentResultList,
                showDescription = data.ShowDescriptionOnResultsPage,
				recipeHeader = $(options.recipeHdnFld).val(),
				perPageResults = data.PageSize;								
				
				$(options.featuredHdnFld).val(data.FeaturedRecipeCounter);
								
				$(contentListing).each(function(i, result) {
					tabName = result.ContentType;
					if (recipeHeader === tabName) { 
						activeCl = "active";
					} else {
						activeCl = "";
					}
					tablist += '<li class="'+activeCl+'"><a href="#" data-header="'+tabName+'" title="'+result.ContentTypeHeader+'">' +result.ContentTypeHeader+ '<span class="count">'+result.Count+'</span></a></li>';
											
					if (recipeHeader === tabName) { 
						resultList = result.ContentList;
                        contentType = result.ContentType;
						contentTypeHeader = result.ContentTypeHeader;
                        callToAction = result.CallToActionLabel;
                        featuredText = data.FeaturedRecipeText;                       
						$(options.totalRecords).val(result.Count);
						$(options.resultCount).text(data.ResultCount);
						
                        noResultLinkText = result.TextForNoSearchResult;
						
						$(options.searchResultTextH1).html(data.SearchResultText);
						
						if (data.SuggestedQueryString === null || data.SuggestedQueryString.Length === 0) { 
                            $(options.didYouMeanPara).hide();
                        } else {
							$(options.didYouMeanPara).html(data.SpellSuggestResultsFoundText).show();
                        }

                        if (data.ResultCount > 0) {
                            $(options.noSearchResultPara).hide();
                            $(options.searchResultsPara).show();
                        } else if (data.ResultCount == 0) {
                            $(options.noSearchResultPara).show();
							$(options.noSearchResultPara).html(data.NoSearchResultsFoundText);
                            $(options.searchResultsPara).hide();
							$(options.didYouMeanPara).hide();
                        }
						
						if (tabName === "Recipe" && this.AccordionCategories !== null && (result.Count > 0 || page_first_run > 0)) {
							page_first_run++;
							if ($(".filter-results").length === 0) {
								populateFilterResults(this.AccordionCategories, options);
								slideFilters();
							}
						} else {
							$(options.facetsWrapper).html("");
						}
						if (pager_counter === 0) {
							renderPagination(this, perPageResults, contentTypeHeader, options);
						}
						// RENDER PAGINATION
						if (result.Count > perPageResults) {
							$(options.paginationSl).show();
						} else {
							$(options.paginationSl).hide();
						}
						
					}
				});
				// RENDER TABS
				//if (counter === 0) {
					$(options.searchFilterList).html("").append(tablist);
				//}
				// RENDER SERACH RESULTS
				populateSearchResults(resultList, contentType, callToAction, showDescription, noResultLinkText, featuredText, options);
				//UPDATE PARAMS ON FILTER SELECTION
				getFilteredKeywordCount(options.facetCL);				
			},
			charLimit = function (selector, maxChar) {	
				var object = $(selector), charLimitText;
				$(object).each(function() {				
					var $this = $(this);
					if ($.trim($this.text()).length > maxChar) {
						$this.html($.trim($this.text()).substr(0, maxChar));
						charLimitText = $this.html();
						charLimitText = charLimitText.substring(0, charLimitText.lastIndexOf(" "));
						$this.html(charLimitText+'...');
					}
				});
			}, 
			//RENDER FACETS KEYWORDS
			renderFacetChcekboxes  = function (data, facetData, key) {
				var listing = "";
				$(facetData).each(function() {								
					var $this = this;
					if ($this.IsSelected === true) {
						listing += '<li><label><input type="checkbox" value="'+$this.CallToActionLabel+'" name="'+data[key].CallToActionLabel+'" id="'+data[key].CallToActionLabel+'" checked /><span class="keyword selected" title="'+$this.CallToActionLabel+'">'+$this.CallToActionLabel+'</span></label></li>';
					} else {
						listing += '<li><label><input type="checkbox" value="'+$this.CallToActionLabel+'" name="'+data[key].CallToActionLabel+'" id="'+data[key].CallToActionLabel+'" /><span class="keyword" title="'+$this.CallToActionLabel+'">'+$this.CallToActionLabel+'</span></label></li>';
					}
				});
				return listing;
			},
			//RENDER FACETS HEADER AND BIND KEYWORDS
			populateFilterResults = function (data, options) {
				var listing = "", activeCl,
				categoryVal = $(options.recipeCatHdnFld).val();
				
				$(data).each(function(i, results) {							
					if ((this.IsSelected === true && categoryVal === "" && counter === 0) || (categoryVal !== "" && categoryVal === results.CallToActionLabel)) {
						listing += '<li data-index="'+i+'" class="panel active"><div class="panel-heading"><a href="#item'+i+'" title="'+results.CallToActionLabel+'" class="accordion-toggle"><span class="head-title">'+results.CallToActionLabel+'</span><i class="icon-nav"></i></a></div><div class="clearfix panel-collapse"><ul id="accordianList'+i+'" class="clearfix">'+renderFacetChcekboxes(data, data[i].AccordionCategoriesList, i) +'</ul></div></li>';
					} else {
						listing += '<li data-index="'+i+'" class="panel"><div class="panel-heading"><a href="#item'+i+'" title="'+results.CallToActionLabel+'" class="accordion-toggle"><span class="head-title">'+results.CallToActionLabel+'</span><i class="icon-nav"></i></a></div><div class="clearfix panel-collapse"><ul id="accordianList'+i+'" class="clearfix">'+renderFacetChcekboxes(data, data[i].AccordionCategoriesList, i) +'</ul></div></li>';
					}
				});
				$(options.facetsWrapper).html('<div class="filter-results clearfix"><ul class="filter-results-list">'+listing+'</ul></div><div class="filter-nav"><a class="filter-slide-prev">Previous</a><a class="filter-slide-next">Next</a></div>');
				
				sitesearch.toggle.collapseExpand(".panel.active .accordion-toggle", false);
			},
			animateFilters = function (selector, target, options, margin) {
				$(selector).click(function(e) {
					e.preventDefault();
					var $this = $(this);
					if ($this.hasClass("filter-slide-next")) {
						slide_filter_counter++;
					} else if ($this.hasClass("filter-slide-prev")) {
						slide_filter_counter = 0;
					}
					$this.hide();
					$(target).show();
					options.filterListUl.animate({
						left : "-" + margin
					},500);
					$(".panel-collapse").animate({
						left : margin
					},500);
				});
			},
			//Slide Filters
			slideFilters = function() {
				var options = {},
				width = 0;
				options.filterListWrapper = ".filter-results";
				options.filterListUl = $(options.filterListWrapper).children();
				options.li = $(options.filterListUl).find("li.panel");
				options.next = ".filter-slide-next";
				options.prev = ".filter-slide-prev";
					
				$(options.li).each(function() {
					var $this = $(this);
					width += $this.outerWidth();
				});				
				if (width > $(options.filterListWrapper).width()) {
					$(options.filterListUl).css("width", width+2);
					$(options.next).show();
				}
				animateFilters($(options.next), $(options.prev), options, $(options.filterListUl).width() - $(options.filterListWrapper).width());
				animateFilters($(options.prev), $(options.next), options, 0);
				if (slide_filter_counter > 0) {
					var margin = ($(options.filterListUl).width() - $(options.filterListWrapper).width()) +"px";
					$(options.next).hide();
					$(options.prev).show();
					$(options.filterListUl).css("left", "-"+margin);
					$(".panel-collapse").css("left", margin);
				}
			},
			//POPULATE SEARCH RESULTS
			populateSearchResults = function (data, contentType, callToAction, showDescription, noResultLinkText, featuredText, options) {
				var listing = "",
					featuredRecipeText = "",
					descriptionTxt, longDescription, errorMessage, bVScript = "";
					
				// BUILD SEARCH RESULTS MARKUP
				$(data).each(function(i, results) {
					var ratingPercent = results.RecipeRating*20;
                    
					if (contentType === "Product") {
						longDescription = (results.LongDescription === null) ? "" : results.LongDescription;
						descriptionTxt = (showDescription === true) ? '<div class="description">'+longDescription+'</div>' : '';
						
						if (results.BVJsonString !== undefined && results.BVJsonString !== null && results.BVJsonString.length !== 2) { 
							bVScript = '<script type="text/Javascript">'+ $BV.ui("rr","inline_ratings", {productIds:  results.BVJsonString, containerPrefix: "BVRRInlineRating" }); + '</script>';
						}
						listing += '<li class="products-teaser"><div class="teaser-item"><div class="subcl "><a ct-target-value="Spotlight on sides" ct-target-type="Spotlight Image" ct-type="externalLink" data-link-type="externalLink" title="" href="' +results.Uri+ '" class="wrapper-link"><div class="wrapper-image"><span class="image-border"><img alt="'+results.DisplayName+'" src="'+results.ImageUri+'"></span><h3><span>'+results.DisplayName+'</span></h3></div><div id ="BVRRInlineRating-'+results.ID+'"></div>'+descriptionTxt+'</a><a class="call-to-action" ct-target-value="'+results.DisplayName+'" ct-target-type="Spotlight CTA" ct-type="externalLink" data-link-type="externalLink" title="'+results.DisplayName+'" href="' +results.Uri+ '">'+callToAction+'</a></div></div></li>';												
					} else if (contentType === "Recipe") {
						longDescription = (results.RecipeDescription === null) ? "" : results.RecipeDescription;
						featuredRecipeText = (results.Elevated === true && featuredText) ? '<h6><span>' +featuredText+ '</span></h6>' : '';
						descriptionTxt = (showDescription === true) ? '<div class="description">'+longDescription+'</div>' : '';

                        listing += '<li><div class="teaser-item"><div class="subcl "><a ct-target-value="Spotlight on sides" ct-target-type="Spotlight Image" ct-type="externalLink" data-link-type="externalLink" title="" href="' +results.Uri+ '" class="wrapper-link"><div class="wrapper-image">'+featuredRecipeText+'<span class="image-border"><img width="300" alt="'+results.RecipeName+'" src="'+results.ImageUri+'"></span><h3><span>'+results.RecipeName+'</span></h3></div><div id="ratingContainer"><div id="mainRating"><em class="rating-stars-small"><em class="rating" style="width: '+ratingPercent+'%'+';">"'+results.RecipeRating+'"</em></em></div></div>'+descriptionTxt+'</a><a class="call-to-action" ct-target-value="'+results.RecipeName+'" ct-target-type="Spotlight CTA" ct-type="externalLink" data-link-type="externalLink" title="'+results.RecipeName+'" href="' +results.Uri+ '">'+callToAction+'</a></div></div></li>';					
                    } else if (contentType === "Article") {
						longDescription = (results.Summary === null) ? "" : results.Summary;
						descriptionTxt = (showDescription === true) ? '<div class="description">'+longDescription+'</div>' : '';
						
                        listing += '<li><div class="teaser-item"><div class="subcl "><a ct-target-value="Spotlight on sides" ct-target-type="Spotlight Image" ct-type="externalLink" data-link-type="externalLink" title="" href="' +results.Uri+ '" class="wrapper-link"><div class="wrapper-image"><span class="image-border"><img width="300" alt="'+results.Title+'" src="'+results.ImageUri+'"></span><h3><span>'+results.Title+'</span></h3></div>'+descriptionTxt+'</a><a class="call-to-action" ct-target-value="'+results.Title+'" ct-target-type="Spotlight CTA" ct-type="externalLink" data-link-type="externalLink" title="'+results.Title+'" href="' +results.Uri+ '">'+callToAction+'</a></div></div></li>';
                    }					
				});
				// APPEND SEARCH RESULTS MARKUP TO WRAPPER
                if ($(options.resultCount).text() === 0 || $(options.totalRecords).val() === "0") {
					if (noResultLinkText !== null) {
						noResultLinkText = noResultLinkText.replace(/\&lt;/g, "<").replace(/\&gt;/g, ">");
					}
					$(options.noResultFound).html(noResultLinkText).show();
				} else {
					$(options.noResultFound).hide();
				}
				$(options.searchResultList).removeClass("preloader").html(listing+bVScript); 
				//charLimit($(options.searchResultList).find("div.description"), 120);	
				charLimit($(options.searchResultList).find("h3 span"), 42);					
				knorrextentions.trimContentDescription.trimDescription($(options.searchResultList).find("div.description"), 120);
			},
			fixedPaging = function(pageNum, totalPages, pageSize, totalResults) {
				var paginationCl = ".pagination",
					paginationlist = ".pagination-list "+paginationCl,
					prevElm = $(paginationCl+".prev"),
					nextElm = $(paginationCl+".next"),
					resultRange = $(".result-range");
					
				$(paginationlist).hide();
				
				switch (true) {
					case (pageNum === 1 && totalPages > 3):
						//cur | cur+1 | cur+2 | Next >>
						$(paginationlist).slice(pageNum-1, pageNum+2).show();
						nextElm.show();
						prevElm.hide();
						break;
					case (pageNum === 1 && totalPages === 3):
						//cur | cur+1 | lastPageLogic    							
						$(paginationlist).slice(pageNum-1, pageNum+2).show();
						nextElm.hide();
						prevElm.hide();
						break;
					case (pageNum === 1 && totalPages === 2):
						//cur | lastPageLogic
						$(paginationlist).slice(pageNum-1, pageNum+1).show();
						nextElm.hide();
						prevElm.hide();
						break;
					case (pageNum === 2 && totalPages > 3):
						//cur | lastPageLogic
						$(paginationlist).slice(pageNum-2, pageNum+1).show();
						nextElm.show();
						prevElm.hide();
						break;
					case (pageNum === 2 && totalPages === 3):
						//cur-1 | cur | lastPageLogic							
						$(paginationlist).slice(pageNum-2, pageNum+1).show();
						nextElm.hide();
						prevElm.hide();
						break;
					case (pageNum === 2 && totalPages === 2): 
						//cur-1 | cur | lastPageLogic
						$(paginationlist).slice(pageNum-2, pageNum).show();
						break;
					case (pageNum > 2 && totalPages > 4):
						//<< Prev | cur-1 | cur | cur+1 | Next>>      
						prevElm.show();
						$(paginationlist).slice(pageNum-2, pageNum).show();

						if (pageNum <= totalPages) {    
							$(paginationlist).slice(pageNum-2, pageNum+1).show();
							nextElm.hide();
						}
						if (pageNum + 1 <= totalPages) {    
							nextElm.show(); 
						}
						break;
					case (pageNum === 3 && totalPages === 4):
						$(paginationlist).slice(pageNum-3, pageNum+1).show();
						nextElm.hide();
						prevElm.hide();
						break;
					case (pageNum === 4 && totalPages === 4):
						$(paginationlist).slice(pageNum-4, pageNum).show();
						nextElm.hide();
						prevElm.hide();
						break;
					case (pageNum > 2 && totalPages === 3):
						$(paginationlist).slice(pageNum-3, pageNum).show();
						nextElm.hide();
						prevElm.hide();
						break;
				}
				
				if (totalResults === pageSize || totalResults > pageSize) {
					if (pageNum*pageSize <= totalResults) {
						resultRange.text(((pageNum-1)*pageSize +1) +'-'+ pageNum*pageSize);
					} else {
						resultRange.text(((pageNum-1)*pageSize +1) +'-'+ totalResults);
					}
				} else {
					resultRange.text(pageNum+'-'+totalResults);
				}
			},
			// RENDER PAGINATION MARKUP
			renderPagination = function (data, pageSize, typeHeader, options) {
                var wrapper = options.paginationSl,
				paginationList = '',
				totalResults = data.Count,
				count = Math.ceil(totalResults / pageSize);
				
				// BUILD PAGINATION MARKUP
				for (i = 1; i <= count; i++) {
					if (i === 1) {
						paginationList += '<a class="pagination active" href="#" data-pagenum="'+i+'">'+i+'</a>';
					} else {
						paginationList += '<a class="pagination" href="#" data-pagenum="'+i+'">'+i+'</a>';
					}					
				}
				// APPEND PAGINATION MARKUP TO WRAPPER
				$(wrapper).show();
				$(".results-count").html(totalResults + " " + typeHeader.toLowerCase());
				$(".pagination-list").html(paginationList);
				fixedPaging(1, count, pageSize, totalResults);
				paginateEvt(wrapper+" a", ".search-results-form", count, pageSize, totalResults, options);
				$(".pagination.prev").hide();
            },
			// BIND PAGINATION EVENTS
			paginateEvt = function (selector, formID, totalPages, pageSize, totalResults, options) {
                var eventTarget = $(selector),
					formTarget = $(formID);
                if (eventTarget.length > 0 && formTarget.length > 0) {                      
					eventTarget.off().on("click", function(event) {						
						//do your stuff
						event.preventDefault();
						counter++;
						pager_counter++;
						$(options.searchResultList).addClass("preloader").html("");
						var currentNode = $(this),
							paginationlist = ".pagination-list .pagination"
							activeCl = "active",
							activePage = $(paginationlist+".active");
							pageNum = currentNode.data("pagenum"),
							prevElm = $(".pagination.prev"),
							nextElm = $(".pagination.next"),
							pageNumField = formTarget.find(options.pageNumHdnFld);
						
						switch (true) {
							case currentNode.hasClass(activeCl):
								return false;
								break;
							case currentNode.hasClass("next"):
								pageNum = activePage.next().data("pagenum");
								currentNode = activePage.next();
								break;
							case currentNode.hasClass("prev"):
								pageNum = activePage.prev().data("pagenum");
								currentNode = activePage.prev();
								break;
						}
						
						eventTarget.removeClass(activeCl);
						currentNode.addClass(activeCl);
						pageNumField.val(pageNum);											
						fixedPaging(pageNum, totalPages, pageSize, totalResults);						
						getdata(options);
						$("html, body").animate({
							scrollTop: $(options.targetCl).offset().top
						}, 500);						
					});
                }
            },
			// UPDATE SEARCH PARAMS
			setSearchParams = function (options) {
				var target = options.searchFilterList + " a";
				$(document).on('click', target, function (e) {
					e.preventDefault();
					if (!$(this).parent("li").hasClass("active")) {
						counter++;
						pager_counter = 0;
						$(options.paginationSl).hide();
						$(options.searchResultList).html("").addClass("preloader");
						$(options.noResultFound+ ", " +options.facetsWrapper).html("");
						var $this = $(this),
							formtarget = $("#search-results-form"),
							resultType, sortBy;

						resultType = $this.data("header");
						$(options.searchFilterList+" li").removeClass("active");
						$this.parent("li").addClass("active");
						formtarget.find(options.recipeHdnFld).val(resultType);
						$(options.pageNumHdnFld).val(1);
						getdata(options);
					} 
				});
			},
			//GET AJAX DATA
			getdata = function(options) {
				var ajaxURL;
				if ($('#ingredientCode').val() !== "") {
					ajaxURL = sitesearch.config.webservices.ingredientSearchResults;
				} else {
					ajaxURL = sitesearch.config.webservices.siteSearchResults;
				}
				sitesearch.contentLoader.getServiceData(ajaxURL, {
					success_callback: function (response) {
						//var data = response;
						var data = $.parseJSON(response);
						if (typeof data !== "undefined") {									
							populateTabs(data, options);							
						}
					}
				});
			},
			//GET FILTERD FACETS COUNT AND UPDATE PARAMS
			getFilteredKeywordCount = function(obj) {
				var selectedKyword = $(obj).parents(".panel-collapse").find(".selected"),
					filterActiveCl = "hasFiltered",
					panelHeader = selectedKyword.parents("li").find(".panel-heading"),
					navbarRight = $(".navbar-right"),
					selectedKeywordCl = ".keyword.selected";
								
				$(".filter-count").html($(selectedKeywordCl).length);
				if (selectedKyword.length > 0) {
					if (!panelHeader.hasClass(filterActiveCl)) {
						panelHeader.addClass(filterActiveCl);
					}										
				} else {
					$(obj).parents("li").find(".panel-heading").removeClass(filterActiveCl);
				}
				if ($(selectedKeywordCl).length > 0) {
					navbarRight.fadeIn(500);
				} else {
					navbarRight.hide();
				}
			},
			// ADD/REMOVE ACTIVE CLASS BASED ON FILTERED FACETS
			filterByKeyword = function (options) {
				$(document).on('click', options.facetCL, function (e) {
					e.preventDefault();
					counter++;
					pager_counter = 0;
					$(options.searchResultList).html("").addClass("preloader");
					$(options.paginationSl).hide();
					$(options.noResultFound).html("");
					var $this = $(this),
						activeCL = "selected";
					if ($this.hasClass(activeCL)) {
						$this.removeClass(activeCL);
						$this.prev().prop('checked', false);
					} else {
						$this.addClass(activeCL);
						$this.prev().prop('checked', true);
					}
					$(options.pageNumHdnFld).val(1);
					getFilteredKeywordCount($this);
					getdata(options);
				});
			},			
			// RESET FILTERS
			clearFilter = function(selector, options) {
				$(document).on('click', selector, function (e) {
					var target = options.facetCL;
					e.preventDefault();
					counter++;
					pager_counter = 0;
					$(options.searchResultList).html("").addClass("preloader");
					$(options.paginationSl).hide();
					$(target).removeClass("selected");
					$(target).prev().prop('checked', false);
					getFilteredKeywordCount($(target));
					getdata(options);
				});
			},
			// INIT
			init = function () {
			    var options = {};
				options.paginationSl = ".pagination-wrapper",
				options.totalRecords = "#totalRecords",
				options.resultCount = $("#totalResults"),
				options.searchResultsPara = ".SearchResult",
                options.searchResultTextH1 = ".SearchResultText",
				options.didYouMeanPara = ".DYMSearchResult",
				options.noSearchResultPara = $(".PromotedSearchResult"),
				options.facetsWrapper = ".facets-wrapper",
				options.noResultFound = ".noResultFound",
				options.searchFilterList = ".search-filters-list";
				options.searchResultList = ".search-results-list ul";
				options.recipeHdnFld = "input#recipeHeader";
				options.featuredHdnFld = "input#featuredRecipeCount";
				options.targetCl = $(".search-results");
				options.facetCL = ".keyword";
				options.pageNumHdnFld = "input[name='pageNum']";
				options.recipeCatHdnFld = "#recipeCategory";
					
				if (options.targetCl.length > 0) {
			       getdata(options);
				   setSearchParams(options);
				   filterByKeyword(options);
				   clearFilter(".clear-filters", options);
			    }
			};
            return init();
		}
		return new POPULATERESULTS();
    } ());
}(window.sitesearch = window.sitesearch || {}, $));