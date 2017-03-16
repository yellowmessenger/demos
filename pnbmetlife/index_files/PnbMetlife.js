// When the DOM is ready, run this function

$(document).ready(function () {

    //    $("[type^=checkbox]").attr('checked', false);
    //    $("[type^=radio]").attr('checked', false);

    // to convert numeric keypad in mobile devices
    $('.numeric').removeAttr("type");
    $('.numeric').attr("type", "tel");

        //Auto complete Organization textbox
        var cache = {},
     			lastXhr;
        $("#mayihelpyou").autocomplete({
            minLength: 3,
            messages: {
                noResults: '',
                results: function () { }
            },
            select: function (event, ui) {
             var url ="faq.aspx?id=" + ui.item.id;
             window.open(url, '_blank');
            },
            source: function (request, response) {
                var term = request.term;
                if (term in cache) {
                    var data = cache[term];
                    if (data.d != null && data.d != undefined) {
                        response($.map(data.d.FaqDetails, function (item) {
                            return {
                                id: item.FaqID,
                                value: item.FaqQuestion

                            }
                        }));
                    }
                    return;

                }

                lastXhr = $.ajax({
                    type: "POST",
                    url: "faq.aspx/GetFaqQuestTitle",
                    dataType: "json",
                    data: "{ 'FaqQuestion': '" + request.term + "' }",
                    contentType: "application/json; charset=utf-8",
                    success: function (data, status, xhr) {
                        cache[term] = data;
                        if (xhr === lastXhr) {
                            //alert(data.d);
                            if (data.d != null && data.d != undefined) {
                                response($.map(data.d.FaqDetails, function (item) {
                                    return {
                                        id: item.FaqID,
                                        value: item.FaqQuestion
                                    }
                                }));
                            }
                        }
                    },
                    error: function (xhr, status, error) {
                       // alert("Error: " + error);
                       // alert("xhr: " + xhr);
                       // alert("status: " + status);
                        return false;
                    }
                });
            }

        });
        /////////////////EndCode for AutoComplete organisation///////////////////


    $(document).on('keydown', function (e) {
        if (e.keyCode === 27) { // ESC
            $('.Popupmaindiv, .HeloTanyPopup, .SpousePopup, .blckshadow').fadeOut(300);
        }
    });


    $(".ques").click(function () {
        if ($(this).find('span').text() == '+') {
            $(this).find('span').text('-');
            $(this).parent().find(".ans").slideDown("slow");
        }
        else {
            $(this).find('span').text('+');
            $(this).parent().find(".ans").slideUp("slow");
        }

    });


    //js for Personal info
    /*$(".data_boxes").hide();
    $(".headbar").click(function () {
    $(this).next().find('section').children('.data_boxes').slideToggle();
    $(this).toggleClass('active');
    $(this).next().find(".dummy_data").toggle();
    });*/


    //$(".p_info").hide();	
    $(".headbar").click(function () {
        if ($(this).find('font').text() == '+') {
            $(this).find('font').text('-');
            $(this).parent().find(".p_info").slideDown("slow");
            $(this).siblings().find('ul.dummy_data').hide();
        }
        else {
            $(this).find('font').text('+');
            $(this).parent().find(".p_info").slideUp("slow");
            $(this).siblings().find('ul.dummy_data').show();
        }

    });

    /*Radio Button Check Start*/
    $('input').click(function (id) {
        // to resolve lakh and monthly selection issue by default : jagdeep
        if (this.id != 'txtSumAssured') {
            //debugger;
            $('input:not(:checked)').parent().removeClass('style1');
            $('input:checked').parent().addClass('style1');
        }
    });

    


    //    $(document).on('click', 'input[type=checkbox]').click(function () {
    //        $("label[for='" + this.id + "']").toggleClass('active', this.checked);
    //    });


    $('.closepopup').click(function () {
        $('.Popupmaindiv, .blckshadow').fadeOut(300);
    });
    $('.closepopup').click(function () {
        $('.AddBenefitPopup, .blckshadow').fadeOut(300);
    });

    /*Question Radio Button Check Start*/
    $(".yesbutton").click(function () {
        //$(this).parent().parent().parent().parent().find('.LifestyleAnswerbox').slideDown(800);
        $(this).parent().parent().parent().next(".LifestyleAnswerbox").slideDown(800);
    });

    $(".nobutton").click(function () {
        //$(this).parent().parent().parent().parent().find('.LifestyleAnswerbox').slideUp(800);
        $(this).parent().parent().parent().next(".LifestyleAnswerbox").slideUp(800);
    });

    $(".eInsuranceyesbutton").click(function () {
        //$(this).parent().parent().parent().parent().find('.LifestyleAnswerbox').slideDown(800);
        $(this).parent().parent().parent().next(".yes_eInsurance").slideDown(800);
        $(this).parent().parent().parent().next(".yes_eInsurance").next(".no_eInsurance").slideUp(800);
    });

    $(".eInsurancenobutton").click(function () {
        //$(this).parent().parent().parent().parent().find('.LifestyleAnswerbox').slideUp(800);
        $(this).parent().parent().parent().next(".yes_eInsurance").next(".no_eInsurance").slideDown(800);
        $(this).parent().parent().parent().next(".yes_eInsurance").slideUp(800);
    });




    // Tooltip only Text
    $('.masterTooltip').hover(function () {
        // Hover over code
        var title = $(this).attr('title');
        $(this).data('tipText', title).removeAttr('title');
        $('<p class="tooltipimark"></p>')
			.text(title)
			.appendTo('body')
			.fadeIn('slow');
    }, function () {
        // Hover out code
        $(this).attr('title', $(this).data('tipText'));
        $('.tooltipimark').remove();
    }).mousemove(function (e) {
        var mousex = e.pageX + 20; //Get X coordinates
        var mousey = e.pageY + 10; //Get Y coordinates
        $('.tooltipimark')
			.css({ top: mousey, left: mousex })
    });




    /*Monthly Income/Year Popup Bar End*/





});


function myFocus(element, defaultvalue) {
    if ($(element).attr("DefaultValue") != undefined) {
        if (element.value.toLower().trim() == $(element).attr("DefaultValue").toLower()) {
            element.value = '';
            element.setAttribute("style", "color: #545454;");
            element.select();
        }
    }
    else if (element.defaultValue) {
        if (element.value.toLower().trim() == element.defaultValue.toLower()) {
            element.value = '';
            element.setAttribute("style", "color: #545454;");
            element.select();
        }
    }
    else {
        if (element.tagName == "INPUT") {
            element.select();
        }
    }
}

//function handles default value also and behave so..
function myBlur(element, defaultvalue) {
    if (element.value == '') {
        if ($(element).attr("DefaultValue") != undefined) {
            element.value = $(element).attr("DefaultValue");
            element.setAttribute("style", "color: #a9a9a9;");
        }
        else {
            if (element.defaultValue) {
                element.value = element.defaultValue;
                element.setAttribute("style", "color: #a9a9a9;");
            }
        }
    }
}

/*Jquery for Placeholder in IE7 and IE8 */

(function ($) {
    $.support.placeholder = ('placeholder' in document.createElement('input'));
})(jQuery);


//fix for IE7 and IE8
$(function () {
    if (!$.support.placeholder) {
        $("[placeholder]").focus(function () {
            if ($(this).val() == $(this).attr("placeholder")) $(this).val("");
        }).blur(function () {
            if ($(this).val() == "") $(this).val($(this).attr("placeholder"));
        }).blur();

        $("[placeholder]").parents("form").submit(function () {
            $(this).find('[placeholder]').each(function () {
                if ($(this).val() == $(this).attr("placeholder")) {
                    $(this).val("");
                }
            });
        });
    }
});






















































///// <reference path="CommonJS.js" />
//// When the DOM is ready, run this function
//$(document).ready(function() {

//  	$( document ).on( 'keydown', function ( e ) {
//	if ( e.keyCode === 27 ) { // ESC
//		$( '.Popupmaindiv, .HeloTanyPopup, .blckshadow' ).fadeOut(300);
//	}
//	}); 
//  
//  
//  //js for Personal info
//    /*$(".data_boxes").hide();
//    $(".headbar").click(function () {
//        $(this).next().find('section').children('.data_boxes').slideToggle();
//        $(this).toggleClass('active');
//        $(this).next().find(".dummy_data").toggle();
//    });*/


//	//$(".p_info").hide();	
//    $(".headbar").click(function(){        
//		if($(this).find('font').text()=='+'){$(this).find('font').text('-');
//		$(this).parent().find(".p_info").slideDown("slow");		
//		}
//		else{$(this).find('font').text('+');
//		$(this).parent().find(".p_info").slideUp("slow");
//		}
//				
//    });
//	
///*Radio Button Check Start*/ 
//	$('input').click(function () {
//		$('input:not(:checked)').parent().removeClass("style1");
//		$('input:checked').parent().addClass("style1");
//	});
//	
//	$(document).on('click', 'input[type=checkbox]').click(function() {
//		$("label[for='" + this.id + "']").toggleClass('active', this.checked);
//	});
//	
//	$('.closepopup').click(function () {
//		$('.Popupmaindiv, .blckshadow').fadeOut(300);
//	});
//	
///*Question Radio Button Check Start*/	
//	$(".yesbutton").click(function(){
//		//$(this).parent().parent().parent().parent().find('.LifestyleAnswerbox').slideDown(800);
//		$(this).parent().parent().parent().next(".LifestyleAnswerbox").slideDown(800);
//	});
//	
//	$(".nobutton").click(function(){
//		//$(this).parent().parent().parent().parent().find('.LifestyleAnswerbox').slideUp(800);
//		$(this).parent().parent().parent().next(".LifestyleAnswerbox").slideUp(800);
//	});		
//	

//// Tooltip only Text
//	$('.masterTooltip').hover(function(){
//			// Hover over code
//			var title = $(this).attr('title');
//			$(this).data('tipText', title).removeAttr('title');
//			$('<p class="tooltipimark"></p>')
//			.text(title)
//			.appendTo('body')
//			.fadeIn('slow');
//	}, function() {
//			// Hover out code
//			$(this).attr('title', $(this).data('tipText'));
//			$('.tooltipimark').remove();
//	}).mousemove(function(e) {
//			var mousex = e.pageX + 20; //Get X coordinates
//			var mousey = e.pageY + 10; //Get Y coordinates
//			$('.tooltipimark')
//			.css({ top: mousey, left: mousex })
//	});
//	
//	
///*Monthly Income/Year Popup Bar Start*/
//	
//	window.onload = function () {
//		// initial values of dataPoints
//		var dps = [
//		  {label: "Year1", y: 40000},
//          {label: "Year2", y: 44000},
//          {label: "Year3", y: 48000},
//          {label: "Year4", y: 52000},
//          {label: "Year5", y: 56000},
//          {label: "Year6", y: 60000},
//          {label: "Year7", y: 64000},
//          {label: "Year8", y: 68000},
//          {label: "Year9", y: 72000},
//          {label: "Year10", y: 76000}
//		
//		];
//      var totalEmployees = "";

//		var chart = new CanvasJS.Chart("chartContainer",{
//          theme: "theme4",
//			
//			data : [{
//				type: "column",
//              //showInLegend: true,
//              //legendMarkerType: "none",				
//              //legendText: totalEmployees,
//				indexLabel: "{y} /Mth",
//				dataPoints: dps
//			}]
//		});

//		// renders initial chart
//		chart.render();
//		
//      //var sum = 590;	 //initial sum 

//      var updateInterval = 1000;  // milliseconds

//      var updateChart = function () {
//			// Selecting a random dataPoint
//        var dataPointIndex = Math.round(Math.random()*4);		

//			// generating random value
//        var deltaY = Math.round(2 + Math.random() *(-2-2));	

//			// adding random value to random dataPoint
//          //dps[dataPointIndex].y = (dps[dataPointIndex].y + deltaY) > 0 ? dps[dataPointIndex].y + deltaY : 0 ;

//			// updating legend text. 
//          //sum = sum + deltaY;
//          //totalEmployees = "total people on campus: " + sum;			
//          //chart.options.data[0].legendText = totalEmployees;	
//		  
//          chart.render();
//		  
//		};
//			// update chart after specified interval
//			setInterval(function(){updateChart()}, updateInterval);
//		}	
///*Monthly Income/Year Popup Bar End*/
//		
//		
//		
//		

//});


//// function myFocus(element, defaultvalue) {
//    // if ($(element).attr("DefaultValue") != undefined) {
//        // if (element.value.toLower().trim() == $(element).attr("DefaultValue").toLower()) {
//            // element.value = '';
//            // element.setAttribute("style", "color: #1290c3;");
//            // element.select();
//        // }
//    // }
//    // else if (element.defaultValue) {
//        // if (element.value.toLower().trim() == element.defaultValue.toLower()) {
//            // element.value = '';
//            // element.setAttribute("style", "color: #1290c3;");
//            // element.select();
//        // }
//    // }
//    // else {
//        // if (element.tagName == "INPUT") {
//            // element.select();
//        // }
//    // }
//// }

//// //function handles default value also and behave so..
//// function myBlur(element, defaultvalue) {
//    // if (element.value == '') {
//        // if ($(element).attr("DefaultValue") != undefined) {
//            // element.value = $(element).attr("DefaultValue");
//            // element.setAttribute("style", "color: #a9a9a9;");
//        // }
//        // else {
//            // if (element.defaultValue) {
//                // element.value = element.defaultValue;
//                // element.setAttribute("style", "color: #a9a9a9;");
//            // }
//        // }
//    // }
//// }

///*Jquery for Placeholder in IE7 and IE8 */

//(function ($) {
//         $.support.placeholder = ('placeholder' in document.createElement('input'));
//     })(jQuery);


//     //fix for IE7 and IE8
//     $(function () {
//         if (!$.support.placeholder) {
//             $("[placeholder]").focus(function () {
//                 if ($(this).val() == $(this).attr("placeholder")) $(this).val("");
//             }).blur(function () {
//                 if ($(this).val() == "") $(this).val($(this).attr("placeholder"));
//             }).blur();

//             $("[placeholder]").parents("form").submit(function () {
//                 $(this).find('[placeholder]').each(function() {
//                     if ($(this).val() == $(this).attr("placeholder")) {
//                         $(this).val("");
//                     }
//                 });
//             });
//         }
//     });

function SetUIForRadioAsSelected(elemRdo) {
    $('#' + elemRdo).parent().addClass('style1');
};