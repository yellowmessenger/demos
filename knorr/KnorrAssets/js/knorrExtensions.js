/**
* Meal Planner Custom Method
*/
var carouselStatus = "play";
(function (knorrextentions, $, undefined) {
	knorrextentions.config = {
		webservices: {
			mealPlan: "../MealPlanner/WeekMealPlan",
			savedMealPlan: "../MealPlanner/RecipeListDetails",
			updateCookBookURL: "/Recipe/UpdateCookBook",
			searchCookBookURL: "/Recipe/SearchCookBook",
			loginURL: "/Home/SiteLogin"
		},
		recipeDefaulImg: "/Skins/knorr/images/recipeDefault.png"
	};
	
	knorrextentions.contentLoader = (function () {
        function CONTENTLOADER() {           
            this.getContentOnlyFromURL = function (url, params) {
                var settings = {},
                    defaults = {
                        method: "POST",
						data: "{}",
						dataType: "html",
                        cache: false					
                    };
                $.extend(settings, defaults, params);
				$.ajax({
                    type: settings.method,
                    url: url,                 
                    cache: settings.cache,
					dataType: settings.dataType,
                    data: settings.data,
					beforeSend: function () {
                        if (typeof params !== "undefined" && typeof params.before_success_callback === "function") {
                            params.before_success_callback.call(this);
                        }
                    },
                    success: function (content) {
						if (typeof params !== "undefined" && typeof params.success_callback === "function") {
                            params.success_callback.call(this, content);
                        }
                    }
                });
            };
			this.getServiceData = function (serviceURL, params) {
                var settings = {},
                    defaults = {
                        data: "{}",
                        cache: false,
                        method: "POST",
						contentType : "application/json; charset=utf-8",
                    };
                $.extend(settings, defaults, params);
                
                $.ajax({
                    type: settings.method,
                    url: serviceURL,
                    data: settings.data,
                    cache: settings.cache,
					contentType: settings.contentType,               					
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
	
	knorrextentions.preload = (function () {
		function PRELOAD() {
			var preloader = ".preloader",
				loader = ".loader";
			
			this.show = function () {
				$(preloader, this.element).show();
			};
			this.hide = function () {
				var timer = setTimeout(function () {
					$(preloader, this.element).fadeOut(250);
					clearTimeout(timer);
				}, 50);
			};
			this.showLoader = function (wrapper) {
				$(wrapper).children(loader).show();
			};
			this.hideLoader = function (wrapper) {
				var timer = setTimeout(function () {
					$(wrapper).children(loader).fadeOut(250);
					clearTimeout(timer);
				}, 50);
			};
		}
		return new PRELOAD();
	}());
	
	knorrextentions.showHideWrapper = function(showSearchResults) {
		var recipeSearchResults = $("#recipeSearchResults"),
			recipeCategories = $(".recipeCategories"),
			searchResultsSpan = $("span.results");
			
		if (showSearchResults === true) {
			recipeSearchResults.show();
			recipeCategories.hide();
			searchResultsSpan.show();
			
		} else {
			recipeSearchResults.hide();
			recipeCategories.show();
			searchResultsSpan.hide();					
			$("div.paginationControl span.navigation-control").attr("data-pagenum", "1").removeClass("disabled");
			$("#findRecipeOverlayWrapper span.previous").addClass("disabled");
			$("input[name$='pagenumMeal']").val("1");					
		}					
	};
	
	knorrextentions.overlay = (function () {
		function OVERLAY() {
			var overlayDiv = '<div class="overlay"></div>';							
			this.showOverlay = function(wrapper) {											
				var overlayObj = $(".overlay");
				if (overlayObj.length > 0) { overlayObj.remove(); }				
				$("body").append(overlayDiv);
				$(wrapper).fadeIn("slow");
				$(".overlay").fadeIn("slow");
			};						
			this.hideOverlay = function(wrapper) {				
				$(wrapper).fadeOut("slow");
				$(".overlay").fadeOut("slow");
				knorrextentions.showHideWrapper(false);												
			},
			this.hideOverlayOnClick = function(wrapper) {
				$(document).on("click", "span.closeOverlay, div.overlay", function(e) {			
					e.stopPropagation();
					knorrextentions.overlay.hideOverlay(wrapper);
				});
			}
		}
		return new OVERLAY();
	}());
	
	knorrextentions.pagination = (function () {
		function PAGINATION() {
			this.paginate = function (selector, formID) {
                var eventTarget = $(selector),
					formTarget = $(formID);
                if (eventTarget.length > 0 && formTarget.length > 0) {
                    eventTarget.each(function () {
                        var currentNode = $(this);
                        currentNode.click(function (event) {
                            //do your stuff
                            event.preventDefault();
                            var pageNum = currentNode.attr('data-pageNum'),
								pageNumField = formTarget.find("input[name='pageNum']");
								
                            pageNumField.val(pageNum);
                            formTarget.submit();
                        });
                    });
                }
            }
		}
		return new PAGINATION();
	}());
	
	knorrextentions.setcharlimit = (function () {
		function SETCHARLIMIT() {
			this.charLimit = function (selector, maxChar, isflag) {	
				var object = $(selector), charLimitText;
				$(object).each(function() {				
					if ($.trim($(this).text()).length > maxChar) {
						$(this).html($.trim($(this).text()).substr(0, maxChar));
						charLimitText = $(this).html();
						if (isflag) {
							charLimitText = charLimitText.substring(0, charLimitText.lastIndexOf(" "));
						}
						$(this).html(charLimitText+'...');
					}
				});
			}
		}
		return new SETCHARLIMIT();
	}());

	knorrextentions.weekDaysDrpdn = (function () {
		function WEEKDAYSDRPDN() { 
			toggleNav = function(selector, navTarget) {
				var body = $("body");
				$(selector).click(function(e) {
					e.preventDefault();
					navTarget.toggleClass("open");
					if (navTarget.hasClass("open")) {
						$("body").addClass("openMenu");
					}
				});
				$("div.daySelection").click(function(e) {
					e.stopPropagation();
				});				
				$(document).click(function(e) {
					e.stopPropagation();
					if (body.hasClass("openMenu")) {						
						navTarget.removeClass("open");
						body.removeClass("openMenu")
					}				
				});					
			},
			selectCheckboxs = function(selector) {
				var target = $(selector);
				target.on("click", function(e) {
					var selectall = $(this).prop("checked");
					if (selectall) {
						target.each(function(i) {
							selectall = $(this).prop("checked");
							return selectall;
						});
					}
					$("input.allDays").prop("checked", selectall);
				});
			},
			mapWholeWeek = function(selector) {
				var target = $(selector),
					allDayCheck = target.find("input.allDays"),
					singleDaysCheck = target.find("input.singleDays");
				
				allDayCheck.change(function () {
					var chekedVal = this.checked;
					singleDaysCheck.each(function() {
						$(this).attr("checked", chekedVal);
					});
				});
			},
			mapValues = function(selector) {
				var target = $(selector),
					inputTarget = target.find("input:checkbox"),	
					daysLabel = $(".viewDays"),
					defaultVal = daysLabel.text(),
					checked = false;
				
				toggleNav($("a.openMenu"), target);
				
				mapWholeWeek(target);
				inputTarget.bind("change", function(e) {
					var arr = $("input.singleDays:checked").map(function() { 
						return $(this).val(); 
					}).get();						
					
					daysLabel.text(arr.join(', '));
					if ($("input.singleDays:checked").length === 0 || $("input.singleDays:checked").length === 7) {
						daysLabel.text(defaultVal);
					}						
					
					selectCheckboxs(target.find("input.singleDays"));
					knorrextentions.setcharlimit.charLimit(daysLabel, 32);
				});
				selectCheckboxs(target.find("input.singleDays"));				
			};						
			this.init = function() {
				mapValues($(".days"));				
			};
		}
		return new WEEKDAYSDRPDN();
    }());
	
	knorrextentions.createDataForMealPlanner = (function () {
		function CREATEDATAFORMEALPLANNER () {			
			var createCookie = function(name, value, days) {
				if (days) {
					var date = new Date();
					date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
					var expires = '; expires=' + date.toGMTString();
				}
				else var expires = '';
					document.cookie = name + '=' + value + expires + '; path=/';
			},
			readCookie = function(name) {
				var nameEQ = name + '=';
				var ca = document.cookie.split(';');
				for (var i = 0; i < ca.length; i++) {
					var c = ca[i];
					while (c.charAt(0) == ' ') c = c.substring(1, c.length);
					if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
				}
				return null;
			},
			eraseCookie = function(name) {
				createCookie(name, '', -1);
			},
			hasCookieData = function() {
				if (typeof readCookie("recipeForTheWeek") !== "undefined" && readCookie("recipeForTheWeek") !== null && $("input[name$='pageTypeMeal']").val() === "PMP") { 
					return true; 
				}
			},
			fetchJsonData = function() {
				var webFunctions = $(".webFunctions"),
					weeklyMealPlanURL = "",
					recipeIds = "";

				if (hasCookieData() === true) {
					recipeIds = readCookie("recipeForTheWeek");	
					weeklyMealPlanURL = knorrextentions.config.webservices.savedMealPlan;
				} else {
					weeklyMealPlanURL = knorrextentions.config.webservices.mealPlan;
				}									
				knorrextentions.contentLoader.getServiceData(weeklyMealPlanURL, {
					data: "{\"recipeIdList\" : \"" + recipeIds + "\"}",
					success_callback: function (response) {					
						var parsedData = $.parseJSON(response), dataArr = null;

						if (typeof response !== "undefined" && response.length > 0) {
							if (recipeIds !== "") {					
								dataArr = parsedData.ArrayOfRecipeLite.RecipeLite;
							} else {
								dataArr = parsedData.WeekMealPlan.MealPlan.DayPlan;
							}						
																				
							webFunctions.show();
							if (processData(dataArr)) {									
								var timer = setTimeout(function () {									
									knorrextentions.preload.hide();
									clearTimeout(timer);
								}, 100);																	
							}
							saveRecipeInCookie("#recipeSearchResultsWrapper article.recipe-result a", dataArr);
						}
					}									
				});
			},
			createWeekDaysList = function(data) {
				var ul = $("<ul>").addClass("mealPlan"),
					dataArray = data,
					wholeWeekLbl = $("#wholeWeekLabel").text(),
					lastList = '<li class="last"><input type="checkbox" class="allDays" value="'+wholeWeekLbl+'" checked="checked" /><label>'+wholeWeekLbl+'</label></li>',
					li = "";
											
				$(dataArray).each(function (i) {									
					li += '<li><input type="checkbox" class="singleDays" value="'+this.Day+'" checked="checked"/><label>'+this.Day+'</label></li>';
				});
				ul.append(li+lastList);
				return ul;				
			},
			processDrpdn = function(data) {
				var dataArray = data;				
				if ($("div.daySelection ul.mealPlan").length === 0) {
					$("div.daySelection .days").append(createWeekDaysList(dataArray));	
					knorrextentions.weekDaysDrpdn.init();
				}
			},
			saveRecipeID = function(data) {
				var arr = $(data).map(function(key) { 
					var weekDay = this.Day;//key,
						recipeID = "",
						saveData = "",
                        recipeVersion = "";
					if (hasCookieData() === true) {
						recipeID = this.Id;
                        recipeVersion = this.Version;
					} else {
						recipeID = this.RecipeLite.Id;	
                        recipeVersion = this.RecipeLite.Version;					
					}
					saveData = weekDay +"-"+ recipeID +"-"+ recipeVersion;
					return saveData;
				}).get();							
				arr = arr.join(', ');
				return arr;
			},			
			processData = function(data) {				
				var dataArray = data;
				$("div.recipes").empty().append(createPanel(dataArray));			
				processDrpdn(dataArray);
				$("div.days").delegate("input:checkbox", "change", function(e) {
					getFilterData();
				});
				return true;
			},
			getFilterData = function() {
				var weeklyMealPlanURL = "",
					recipeIds = "";

				knorrextentions.preload.show();
				if (hasCookieData() === true) {
					recipeIds = readCookie("recipeForTheWeek");	
					weeklyMealPlanURL = knorrextentions.config.webservices.savedMealPlan;
				} else {
					weeklyMealPlanURL = knorrextentions.config.webservices.mealPlan;
				}
				
				knorrextentions.contentLoader.getServiceData(weeklyMealPlanURL, {
					data: "{\"recipeIdList\" : \"" + recipeIds + "\"}",
					success_callback: function (response) {					
						var parsedData = $.parseJSON(response), dataArr = null;

						if (typeof response !== "undefined" && response.length > 0) {
							if (recipeIds !== "") {					
								dataArr = parsedData.ArrayOfRecipeLite.RecipeLite;
							} else {
								dataArr = parsedData.WeekMealPlan.MealPlan.DayPlan;
							}
						}
						if (filteredData(dataArr)) {									
							var timer = setTimeout(function () {									
								knorrextentions.preload.hide();
								clearTimeout(timer);
							}, 100);
						}
					}
				});
			},
			filteredData = function(dataArray) {
				var recipeDiv = $("div.recipes"),
					filteredData = new Array(),
					count = 0,
					dayCount = 0,
					filteredDay = new Array(),
					data = dataArray,
					day;
				
				$("div.days input:checked").each(function(key, item) {
					day = $(this).val();
					filteredDay[dayCount] = day;
					dayCount++;
				});						
				$(data).each(function (key, item) {			
					$(filteredDay).each(function (keyD, itemD) {
						if ($(data)[key].Day === filteredDay[keyD]) {
							filteredData[count] = item;
							count++;
						} 
					});
				});
				recipeDiv.empty();
				if ($(filteredData).length !== 0) {
					recipeDiv.append(createPanel($(filteredData)));
				} else {
					recipeDiv.append(createPanel(data));
				}
				return true;
			},
			createPanel = function(dataArray) {
				var ul = $("<ul>"),
					data = dataArray, li = "", findRecipe = "", recipeName = "", recipeID = "", recipeVersion = "",  recipeHref = "", imageURL = "", weekDays = "", imagesList = "", 
					seeRecipeAnchor = "",
					findRecipeLbl = $("input[name$='findRecipeslbl']").val(),
					seeRecipeLbl = $("input[name$='seeRecipelbl']").val();
				$(data).each(function (i) {
					var recipesList = this;						
					if (hasCookieData() === true) {
						recipesList = this;
					} else {
						recipesList = this.RecipeLite;						
					}
					weekDays = this.Day;
					recipeID = recipesList.Id;
                    recipeVersion = recipesList.Version;
					recipeName = (recipeID === "0") ? "" : recipesList.Name;			
					recipeHref = recipesList.Href;
					imageURL = (recipesList.Images !== null && typeof recipesList.Images.Image !== "undefined" && recipesList.Images.Image.Url !== "") ? recipesList.Images.Image.Url : knorrextentions.config.recipeDefaulImg;
					imagesList = (recipeID === "0") ? '<figure><img width="105" alt="'+recipeName+'"src="'+imageURL+'" /></figure>' : '<a title="'+recipeName+'" href="'+recipeHref+'"><figure><img width="105" alt="'+recipeName+'"src="'+imageURL+'" /></figure></a>';
					seeRecipeAnchor = (recipeID === "0") ? "" : '<p><a class="call-to-action" href="'+recipeHref+'">'+seeRecipeLbl+'</a></p>';
						
						if ($("input[name$='pageTypeMeal']").val() === "PMP") {
							findRecipe = '<p><a class="call-to-action find-recipe" href="#">'+findRecipeLbl+'</a></p>';
						} else {
							findRecipe = '';
						}
						li += '<li data-recipe-id="'+recipeID+'" data-recipe-version="'+recipeVersion+'">'+imagesList+'<span class="day">'+weekDays+'</span><a title="'+recipeName+'" href="'+recipeHref+'"><h3>'+recipeName+'</h3></a>'+seeRecipeAnchor+findRecipe+'</li>';
				});
				ul.append(li);
				return ul;
			},
			animateOverlay = function() {
				var offsetTop = $("#mealPlannerRecipes").offset().top,
					overlayWrapper = $("#findRecipeOverlayWrapper"),
					windowHeight = $(window).height(),
					wrapperHeight = overlayWrapper.height();
					
				$("html, body").animate({
					scrollTop: offsetTop + 25 - ((windowHeight - wrapperHeight)/2)
				}, 800);
			},
			backToFilter = function(selector) {
				$(selector).click(function() {			
					knorrextentions.showHideWrapper(false);
					animateOverlay();
				});
			},
			findRecipeOverlay = function (selector) {       				
				var targetURL = $("#getRecipeCategoryForPMP").val(),					
					overlayWrapper = $("#findRecipeOverlayWrapper"),
					daySpan = overlayWrapper.find("#day"),					
					recipeSearchResults = $("#recipeSearchResults"),
					searchResultsSpan = $("span.results");
					
				$(selector).live("click", function(e) {
					e.preventDefault();
					var selectedDay = $(this).parents("li").find("span.day").html();
						
					knorrextentions.overlay.showOverlay(overlayWrapper);						
					daySpan.html(selectedDay);									
					getRecipeData(targetURL, $("#findRecipeOverlay"));
					if (recipeSearchResults.is(":visible")) {
						searchResultsSpan.show();
					} else {
						searchResultsSpan.hide();
					}					
				});
				knorrextentions.overlay.hideOverlayOnClick(overlayWrapper);
				
				findRecipeSearch();												
				backToFilter($("div.backToFilters span.back"));			
			},
			getRecipeData = function(pathname, wrapper) {
				var targetURL = pathname,
					wrapperDiv = wrapper,
					recipeCategoryDiv = $(".recipeCategories");
				
				knorrextentions.contentLoader.getContentOnlyFromURL(targetURL, {
					before_success_callback: function () {
						knorrextentions.showHideWrapper(false);
						animateOverlay();						
						knorrextentions.preload.showLoader(recipeCategoryDiv);
					},
					success_callback: function (data) {
						wrapperDiv.html(data);
						animateOverlay();
						var timer = setTimeout(function () {															
							knorrextentions.preload.hideLoader(recipeCategoryDiv);
							clearTimeout(timer);
						}, 100);
					}					
				});				
			},
			findRecipeSearch = function() {
				var recipeSearchResults = $("#recipeSearchResults"),
					recipeCategories = $(".recipeCategories"),
					formTarget = $("#recipeFiltersPMP"),
					targetURL = formTarget.attr("action"),
					recipeSearchResultsWrapper = $("#recipeSearchResultsWrapper"),
					totalRecordsSpan = $("#totalRecords");				
				
				formTarget.submit(function (e) {
					e.preventDefault();				
					recipeCategories.hide();
					
					knorrextentions.contentLoader.getContentOnlyFromURL(targetURL, {
						data: formTarget.serialize(),
						before_success_callback: function () {
							knorrextentions.showHideWrapper(true);
							knorrextentions.preload.showLoader(recipeSearchResults);
							animateOverlay();
						},
						success_callback: function (data) {							
							recipeSearchResultsWrapper.html(data);
							var totalRecords = $("input[name$='totalRecordsMeal']").val(),
								perPageRecords = $("input[name$='RecordsPerPageMeal']").val(),
								paginationSpan = $(".paginationControl span");
							
							totalRecordsSpan.html(totalRecords);
							if (parseInt(totalRecords) === 0) {
								paginationSpan.hide();
							} else if (parseInt(totalRecords) <= parseInt(perPageRecords)) {
								paginationSpan.show().addClass("disabled");
							} else {
								paginationSpan.show();
							}
							
							//knorrextentions.showHideWrapper(true);
							animateOverlay();
							var timer = setTimeout(function () {															
								knorrextentions.preload.hideLoader(recipeSearchResults);
								clearTimeout(timer);
							}, 100);
						}					
					});
				});
			},
			pagination = function (selector) {
				var eventTarget = $(selector),
					formTarget = $("#recipeFiltersPMP"),
					prevTarget = $("#findRecipeOverlayWrapper span.previous"),
					paginationSpan = $(".paginationControl span");
				
				prevTarget.addClass("disabled");	
				if (formTarget.length !== 0) {
					if (eventTarget.length > 0 && formTarget.length > 0) {
						eventTarget.each(function () {
							var currentNode = $(this);						
							currentNode.click(function (event) {
								//do your stuff
								event.preventDefault();
								var pageNum = currentNode.attr("data-pageNum"),
									pageNumField = formTarget.find("input[name$='pagenumMeal']"),
									totalRecords = $("input[name$='totalRecordsMeal']").val(),
									perPageRecords = $("input[name$='RecordsPerPageMeal']").val();							
								
								if (parseInt(totalRecords) > parseInt(perPageRecords)) {				
									if (currentNode.hasClass("next")) {
										if (parseInt(perPageRecords)*parseInt(pageNum) < parseInt(totalRecords)) {
											pageNum = parseInt(pageNum) + 1;
										} 								 
									} else {
										if (parseInt(pageNum) > 1) {
											pageNum = parseInt(pageNum) - 1;
										} 								 
									}
									paginationSpan.attr("data-pageNum", pageNum);
								}
								pageNumField.val(pageNum);
								if (parseInt(pageNum) - 1 === parseInt(parseInt(totalRecords) / parseInt(perPageRecords)) || (parseInt(pageNum) === parseInt(parseInt(totalRecords) / parseInt(perPageRecords)) && parseInt(parseInt(totalRecords) % parseInt(perPageRecords)) === 0) || parseInt(pageNum) === 1) {
			                        if (currentNode.hasClass("disabled")) {
										return false;
									} else {
										paginationSpan.removeClass("disabled");
										currentNode.addClass("disabled");
										formTarget.submit();
									}							
			                    } else {
			                        paginationSpan.removeClass("disabled");
									formTarget.submit();
			                    }			                   
							});
						});
					}
				} else {
					return false;
				}
			},			
			saveRecipeInCookie = function(selector, dataArray) {
				var itemsData = "",
					data = dataArray,
					recipeIDS = "",
					itemsDataIds;
									
				$(selector).live("click", function(e) {
					if (!$(this).hasClass("viewRecipe")) {
						e.preventDefault();
						var currentNode = $(this),
							recipeResultDiv = currentNode.parents("article.recipe-result"),
							day = currentNode.parents("#findRecipeOverlayWrapper").find("#day").html(),
							imageSrc = recipeResultDiv.find("img").attr("src"),
							recipeName = recipeResultDiv.find("h3").html(),
							recipeHref = recipeResultDiv.find("a:eq(0)").attr("href"),
							recipeID = recipeResultDiv.data("recipeid"),
                            recipeVersion = recipeResultDiv.data("recipeversion"),
							findRecipeLbl = $("input[name$='findRecipeslbl']").val(),
							seeRecipeLbl = $("input[name$='seeRecipelbl']").val();
					
						if (hasCookieData() === true) {				
							itemsData = readCookie("recipeForTheWeek");
							itemsDataIds = itemsData.split(",");			
						} else {
							itemsData = saveRecipeID(data);	
							itemsDataIds = itemsData.split(", ");
						}
						
						$(itemsDataIds).each(function(key, item) {							
							var findWeekDay = $(itemsDataIds)[key].split("-")[0];
							var exactIndex = 0;
							if (findWeekDay === day) {		
								$(itemsDataIds).each(function(arrayIndex , arrayData){
									if(arrayData.indexOf(findWeekDay) != -1){
										exactIndex = arrayIndex;
										itemsDataIds.splice(exactIndex, 1, findWeekDay+'-'+recipeID+'-'+recipeVersion);
									}
								});				
								return false;
							}					
						});	

						createCookie("recipeForTheWeek", itemsDataIds, 7);
						
						$("div.recipes li").each(function() {
							var targetLi = $(this), recipeList = "";
							if (targetLi.children("span.day").html() === day) {							
								targetLi.attr("data-recipe-id", recipeID).attr("data-recipe-version", recipeVersion);                          
								recipeList = '<a title="'+recipeName+'" href="'+recipeHref+'"><figure><img width="105" alt="'+recipeName+'"src="'+imageSrc+'" /></figure></a><span class="day">'+day+'</span><a title="'+recipeName+'" href="'+recipeHref+'"><h3>'+recipeName+'</h3></a><p><a class="call-to-action" href="'+recipeHref+'">'+seeRecipeLbl+'</a></p><p><a class="call-to-action find-recipe" href="#">'+findRecipeLbl+'</a></p>';								
								targetLi.html(recipeList);
								return false;
							}
						});					
						knorrextentions.overlay.hideOverlay($("#findRecipeOverlayWrapper"));
					}
				});
				areCookiesEnabled();
			},
			areCookiesEnabled = function() {
				var cookieEnabled = (navigator.cookieEnabled) ? true : false,
					cookiesWrapper = $("#cookiesWrapper");
				 
				if (!cookieEnabled) { 					
					knorrextentions.overlay.showOverlay(cookiesWrapper);					
				}
				knorrextentions.overlay.hideOverlayOnClick(cookiesWrapper);				
				return (cookieEnabled);
			},
			mapPdfIDs = function() {
				var arr = $("div.recipes li").map(function() { 
					var targetLi = $(this),
						weekDay = targetLi.children("span.day").html(),
						recipeID = targetLi.attr("data-recipe-id"),
                        recipeVersion = targetLi.attr("data-recipe-version");
					
					saveData =  weekDay +"-"+ recipeID + "-"+ recipeVersion;
					return saveData;
				}).get();							
				arr = arr.join(', ');
				return arr;				
			},
			generatePDF = function (selector) {                        
                var pdfForm = $("#mealplannerDownloadPMP");				
				$(selector).click(function(e) {
                    e.preventDefault();
					$("input[name$=recipeDetailIds]").val(mapPdfIDs());
					var pdfType = $(this).attr("name");
                    $("input[name$=pdfType]").val(pdfType);          
                    if (pdfForm.attr("action") !== "")  {
                        pdfForm.submit();  
                    }         
                });                                                                  
            },
			init = function () {					
				if ($("div.recipes").length > 0) { 
					fetchJsonData();	
					findRecipeOverlay($(".find-recipe"));
					pagination("div.paginationControl span.navigation-control");				
					generatePDF("div.webFunctions a.pdf");
				}								
			};
			return init();
		}
		return new CREATEDATAFORMEALPLANNER();
	}());			
		
	knorrextentions.heroCarousel = (function () {
		function HEROCAROUSEL() {
			var recipeCarousel = function(carousel) {
				var target,
				items,
				totalItems,
				indicatorContainer,
				indicatorList,
				currentNode,
				currentIndicator,
				docFragment,
				date = new Date();
			   
				/* Find Carousel items */
				items = carousel.find("ul > .item");
				currentDay = date.getDay()-1,
				currentDayVal = $("input[name='type-current-day']").val() - 1;
				
				if (items.length > 0) {
					docFragment = document.createDocumentFragment();
					indicatorContainer = document.createElement("ul");
		  
					items.each(function (i) {
						currentNode = $(this);
						currentNode.attr('order', i);
						indicatorList = document.createElement('li');
						currentIndicator = $(indicatorList);

						indicatorImg = generateWeekDaysControls(this);
						indicatorList.appendChild(indicatorImg);
						/* assign active class to default carousel item */
						//if (currentDayVal.indexOf(currentNode.data("weekday").toLowerCase()) !==-1) {
						if (i == currentDayVal) {
							items.hide();
							currentNode.fadeIn(500, function () {
								$(this).addClass('active');
								 carouselStatus = "play";
							});
							currentIndicator.addClass('active');
						} else if (i == 0 && currentDayVal === "") {
							currentNode.addClass('active');
							carouselStatus = "play";
							currentIndicator.addClass('active');
						}
						/* check if there is more than one carousel item */
						if (items.length > 1) {
							currentIndicator.attr('order', i);
							indicatorContainer.appendChild(indicatorList);
						};					
					});
					
					if (items.length > 1) {
						var sliderContainer = document.createElement('div');
						sliderContainer.className = 'recipeCarouselControls';

						sliderContainer.appendChild(indicatorContainer);
						docFragment.appendChild(sliderContainer);
					}
					carousel.append(docFragment);
				}
				$(".recipeCarouselControls li").click(function(e) {
					clearTimeout(window.carouselTimeoutObject);
					animateSlide(items, $(this).attr("order"));
					e.preventDefault();
					e.stopPropagation();
				});

				startSlideShow($(".recipeCarouselControls li"));
			},
			animateSlide = function(object, index) {
				var slide = object,
					activeSlide = $('li.item.active').attr("order");
				
				this.prevActiveSlide = activeSlide;
				if (this.prevActiveSlide == index) return !1;
						
				if (carouselStatus == "play") {
					carouselStatus = "stop";
					var targetIndex = index,
						activeCarouselItem = slide.filter(".active"),
						nextCarouselItem = slide.filter('[order=' + targetIndex + ']'),
						recipeCarouselControlsTarget = $(".recipeCarouselControls li");
					
					recipeCarouselControlsTarget.removeClass("active").eq(targetIndex).addClass("active");
					
					activeCarouselItem.fadeOut(function () {
						$(this).removeClass("active");
						nextCarouselItem.fadeIn(function () {
							$(this).addClass("active");
							carouselStatus = "play";
						});
					}); 					
				};		
			},
			generateWeekDaysControls = function (slide) {
				var indicatorSpan = document.createElement("span"),
					weekDays = $(slide).data("weekday"),
					maxChar = 3;
				indicatorSpan.innerHTML = weekDays.toLowerCase();				
				return indicatorSpan;
			},
			startSlideShow = function(selector) {
				var target = $(selector),					
					rotate = function () {
					var carouselCount = target.length,
						findActive = target.filter(".active"),
						currentIndex = findActive.index() + 1,
						timeoutObject;
						
					//carouselStatus = "play";
					
					if (carouselStatus == "play") {
						if (currentIndex === carouselCount) {
							target.eq(0).click();
						} else {
							findActive.next().click();
						}
					};
					timeoutObject = setTimeout(rotate, 5000);
					window.carouselTimeoutObject = timeoutObject;
				};
				setTimeout(rotate, 5000);
			},
			init = function () {			
				var recipeCaroselDiv = $("div.recipeCarousel"),
					recipeSortForm = $("#recipe-sort");
					
				if (recipeCaroselDiv.length > 0) { 
					recipeCarousel(recipeCaroselDiv);
				}
				if (recipeSortForm.length > 0) { 
					knorrextentions.pagination.paginate($("a.pagination"), recipeSortForm);
				}
			};
			return init();
		}
		return new HEROCAROUSEL();			
	}());
	
	knorrextentions.cookbook = (function () {
        function COOKBOOK() {
            var updateCookBook = function (selector) {
                var updateCookbookURL = knorrextentions.config.webservices.updateCookBookURL,
					locationHref = location.href, recipeID;
                locationHref = locationHref.split("/");
                recipeID = locationHref[5];
				
                $(selector).click(function () {
                    var target = $(this);
					knorrextentions.contentLoader.getServiceData(updateCookbookURL, {
					   data: "{ \"id\":\"" + recipeID + "\", \"addOrRemove\":\"" + $("#addRemoveCookBook").attr("data-type") + "\"}",
					   success_callback: function (response) {
							var obj = response.split("|"),
								overlayWrapper = $("#cookBookResult");
								
                            if (obj[0].toLowerCase() === "true" && target.attr("data-type") === "Remove") {                           
                                target.attr("data-type", "Add");
								target.removeClass("removeCookBook");
								target.find("#Add").addClass("display");
								target.find("#Remove").removeClass("display");
							} else if (obj[0].toLowerCase() === "true" && target.attr("data-type") === "Add") {                       
                                target.attr("data-type", "Remove");
                                target.addClass("removeCookBook");
								target.find("#Add").removeClass("display");
								target.find("#Remove").addClass("display");
							}							
							if ($("#cookBookResult .message").length === 0) { 
                                var overlayMessage = $('<div class="message"></div>').appendTo(overlayWrapper);
                            }    
							$("#cookBookResult .message").html(obj[1]);
							knorrextentions.overlay.showOverlay(overlayWrapper);												
							knorrextentions.overlay.hideOverlayOnClick(overlayWrapper);							
						}					
					});							
                });
            },
			searchCookBook = function (selector) {
			    var locationHref = location.href, recipeID;					
			    locationHref = locationHref.split("/");
			    recipeID = locationHref[5],
				target = $(selector);

				//Login call
				 knorrextentions.contentLoader.getContentOnlyFromURL(knorrextentions.config.webservices.loginURL, {
					success_callback: function (response) {
						var obj = response;
						if ($(obj).find(".viewaccount").length > 0 ) {
							knorrextentions.contentLoader.getServiceData(knorrextentions.config.webservices.searchCookBookURL, {
								data: "{ \"id\":\"" + recipeID + "\"}",
								success_callback: function (response) {
									var obj = response;
									if (typeof obj !== "undefined" && obj.length > 0) {								
										target.addClass("display");
										target.find("#Add").addClass("display");
										target.attr("data-type", obj);								
											
										if (obj === "Remove") {
										  target.addClass("removeCookBook");
										  target.find("#Add").removeClass("display");
										  target.find("#Remove").addClass("display");
										}
									} else {
										target.removeClass("display");								
									}	
								}
							});
						}	
					}
				});
			},
			updateSortOrder = function (selector) {
			    var target = $(selector),
					recipeFilterForm = $('#cookbook-recipe-sort');
					hiddenSortInput = recipeFilterForm.find('input[name="cookBookSortOrder"]');
					
			    if (target.length > 0) {
			        target.change(function () {
			            var currentValue = $(this).val();
			            hiddenSortInput.val(currentValue);
			            recipeFilterForm.submit();
			        });
			    }
			},
            removeFromCookBook = function (selector) {
			    var target = $(selector),
					recipeFilterForm = $("#cookbook-recipe-detail"),
					hiddenRecipeId = recipeFilterForm.find('input[name="removeFromCookBook"]'),
					overlayWrapper = $("#removeCBResult");
					
			    //if (target.length > 0) {
			        target.click(function () {
                        var currentRecipe = jQuery(this).attr("ct-target-value");
			            hiddenRecipeId.val(currentRecipe);
			            recipeFilterForm.submit();
			        });
					if ($("#removeCBResult .message").length === 0) { 
						var overlayMessage = $('<div class="message"></div>').appendTo(overlayWrapper);
					}    
					$("#removeCBResult .message").html(overlayWrapper.attr('disp_msg'));
					if (overlayWrapper.attr('disp_msg') !== "") {
						knorrextentions.overlay.showOverlay(overlayWrapper);
					}					
					knorrextentions.overlay.hideOverlayOnClick(overlayWrapper);				
			    //}
			},
			init = function () {
			    var addRemoveCookbook = $("#addRemoveCookBook"),
					cookbookPagination = $("a.cookBookPagination"),
					formTarget = $("#cookbook-recipe-sort"),
					recipeSortDrpdn = formTarget.find("select"),
					cookbookCTA = $("#cookbook-recipe-detail a.cookbookCTA");
					
				if (addRemoveCookbook.length > 0) {
			        searchCookBook(addRemoveCookbook);
			        updateCookBook(addRemoveCookbook);
			    }
                if (cookbookPagination.length > 0) {
					knorrextentions.pagination.paginate(cookbookPagination, formTarget);
			    }
                if (recipeSortDrpdn.length > 0) {
			        updateSortOrder($("#cookbook-recipe-sort select"));
			    }
                if (formTarget.length > 0) {
			        removeFromCookBook(cookbookCTA);
			    }
			};
            return init();
        }
        return new COOKBOOK();
    } ());
	
    knorrextentions.searchAutoComplete = (function () {
        function SEARCHAUTOCOMPLETE() {
            var searchAutoSuggest = function (selector) {
                var header = $("#search"),
				dataArr = [],
                datafromServer = {},
                getPredictions = "/Search/GetPredictiveKeywordsExtension";
                $(selector).autocomplete({                
                source: function (request, response) {
                    $.ajax({
                        type: "POST",
                        url: getPredictions,
                        dataType: "json",                       
                        data: {keyword: request.term},                        
                        success: function (data) {
                            if (data.length > 0) {
                                datafromServer = data.split(":"); 
								$(datafromServer).each(function(i) {
									if (datafromServer[i].indexOf('<') === -1) {									
										dataArr.push(datafromServer[i]);
										response(dataArr);
									}
								});	
                            }							                           						
                        }
                    });
                },
                minLength: 3,                
                open: function(event, ui) {				
	                $(header).removeClass("ui-autocomplete-loading");
                },
                select: function( event, ui ) {				
	                $(header).removeClass("ui-autocomplete-loading");
                    $(this).val(ui.item.value);
                    $("form#globalSearch .ctaButton").click();
                },
                response: function(event, ui) {
					if (ui.content.length === 0 || ui.content.length == "") { 
		                $(header).removeClass("ui-autocomplete-loading");
                        $(".ui-front").hide();
	                }                              
                }
                });
                $( "form#globalSearch input.submit" ).click(function(){
					$(header).removeClass("ui-autocomplete-loading");
                });
            }

			init = function() {
                $('form#globalSearch input#search').on('keydown', function(){
                    searchAutoSuggest('form#globalSearch input#search');
                });
				$('form#recipeFilters input#keyword').on('keydown', function(){
                    searchAutoSuggest('form#recipeFilters input#keyword');
                });
			};
            return init();
        }
        return new SEARCHAUTOCOMPLETE();
    } ());

    knorrextentions.trimContentDescription = (function () {
        function TRIMCONTENTDESCRIPTION() {
            this.trimDescription = function (selector, maxChar) {
                $(selector).each(function () {
                    var crnttxt = $(this).text(),
                        crnthtml = $(this).html();

                    var highlightedTextArray = [];
                    $('.highlightedText').each(function () {
                        highlightedTextArray.push($(this).text());
                    });
                    var removeDuplicate = highlightedTextArray.filter(function (itm, i, text) {
                        return i == text.indexOf(itm);
                    });

                    var beforeTerm = "<span class='highlightedText'>",
                        afterTerm = "</span>";

                    //if (crnttxt.length >= BRANDSETTINGS.recipeDescripionLength) {
                        //var crntStr = crnttxt.substring(0, BRANDSETTINGS.recipeDescripionLength);
                        //var removelastword = crntStr.replace(/\w+[.!?]?$/, '').trim() + BRANDSETTINGS.ellipsisString;
                    if (crnttxt.length >= maxChar) {
                        var crntStr = crnttxt.substring(0, maxChar);
                        var removelastword = crntStr.replace(/\w+[.!?]?$/, '').trim() + '...';

                        $(removeDuplicate).each(function (key, value) {
                            if (removelastword.indexOf(value) > -1) {
                                var keywordWithTag = beforeTerm + value + afterTerm;
                                removelastword = removelastword.replace(value, keywordWithTag);
                            }
                        });
                        $(this).html(removelastword);
                    }
                    else {
                        $(this).html(crnthtml);
                    }
                });
            }

            init = function () {
				if ($("form#search-results-form div.search-results-list ul").length > 0) { 
					knorrextentions.trimContentDescription.trimDescription('form#search-results-form div.search-results-list ul li div.teaser-item div.subcl a p.description', 50);
				}
				
				if ($("#recipe-category-page").length > 0) { 
					knorrextentions.setcharlimit.charLimit("#recipe-category-page .teaser-item .wrapper-image h3 span", 35, true);	
					knorrextentions.setcharlimit.charLimit("#recipe-category-page .teaser-item p", 65, false);	
				}
			};

            return init();
        }
        return new TRIMCONTENTDESCRIPTION();
    } ());


	knorrextentions.registration = (function () {
        function REGISTRATION() {
            var initValidation = function (selector) {
				var targetForm = $(selector),
					phoneID = targetForm.find("#primePhone"),
					maskOption = ["0999999999", "9999999999"];

				if (!phoneID.data('mask')) {
					function maskme() {
						phoneID.focus(function() {        						
							phoneID.mask(maskOption[0]);					
						});
					}
					if (targetForm.length > 0) {		
						phoneID.unmask();
						
						if (phoneID.val() === "") {
							phoneID.mask(maskOption[0]);
						} else {
							phoneID.mask(maskOption[1]);
						}										
						maskme();													
					}
				}
			},
			init = function() {
				var timer = setTimeout(function () {
					initValidation("#RegistrationSSO");
					initValidation("#UserAccountSSO");
					clearTimeout(timer);
				}, 200);
			};
            return init();
        }
        return new REGISTRATION();
    } ());	
}(window.knorrextentions = window.knorrextentions || {}, $));