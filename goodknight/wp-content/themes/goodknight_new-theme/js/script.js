jQuery(document).ready(function(){	 
$(document).on('change', '#blog_parent_category', blog_parent_category_ajax_call);
$(document).on('change', '#blog_parent_category', blog_parent_landing_category_ajax_call);
$(document).on('change', '#blog_child_category', blog_child_category_ajax_call);
/*good knight buzz*/
$(document).on('change', '#good_knight_buzz_year', press_good_knight_buzz);

/*press releases*/
$(document).on('change', '#press_release_year', press_release_year_ajax_call);
$(document).on('change', '#press_release_month', press_release_year_ajax_call);

/*monthly news letter*/
$(document).on('change', '#newletterYear', newsletter_year_ajax_call);
$(document).on('change', '#newsletterMonth', newsletter_year_ajax_call);

/*start of contact form */
var val_holder;
var DUP = 1;

$(document).on('click','#submit',function(e) {
	//return false;
	//alert(e);
	val_holder 		= 0;
	//var data = $("#enqform").serialize();
	$(this).attr('disabled', 'disabled');
	
	var name 		= jQuery.trim($("#name").val()); //  name field
	var email 	 	= jQuery.trim($("#email").val()); // email field
	var mob 	    = jQuery.trim($("#mob").val()); // Mobile field
	var product_name= jQuery.trim($("#product_name").val()); // Mobile field
	var category	= jQuery.trim($("#category").val()); // category
	var message		= jQuery.trim($("#message").val()); // description field
	
	$('input').removeClass('error');
	$('select').removeClass('error');
	$('textarea').removeClass('error');
	
	var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // reg ex email check
	var intRegex = /[0-9 -()+]+$/; 
	var mobile_regex = /^\d{10}$/; //reg ex mobile check
	
	if(name == "") {
		$("#name").addClass('error');
		val_holder = 1;
	}
	
	if(email == "") {						
		$("#email").addClass('error');
		val_holder = 1;
	}
	if(email != "") {						
		if(!email_regex.test(email)){ // if invalid email
			$("#email").addClass('error');
			val_holder = 1;
		}
	}
	if(mob == "") {
		$("#mob").addClass('error');
		val_holder = 1;
	}
	if(mob != "") {						
		if(!mobile_regex.test(mob)){ 
			$("#mob").addClass('error');
			val_holder = 1;
		}
	} 
	if(category == "") {
		$("#category").addClass('error');
		val_holder = 1;
	} 
	if(message == "") {
		$("#message").addClass('error');
		val_holder = 1;
	}
	//alert(DUP);
		
	if(val_holder == 0 && DUP == 1) {
		 jQuery.ajax({
			   type: 'POST',
			   url: ajaxurl,
			   data: {action: "contact_form", name : name, email: email, mob: mob , product_name: product_name , category: category, message: message },
				success:function(data){	
				    $('#contact_form').hide();
				 	$('#hidden_div').show();
				   setTimeout(function() {
                      $("#hidden_div").fadeOut(1500);
					   $('#contact_form').show();
					   $('#hidden_div').hide();
                   },3000);
				document.getElementById("contact_form").reset();
				}
		}); 
	}
		
	
});
/*contact form end here*/

/*start of Distributor form */
var dis_val_holder;
var dis_DUP = 1;

$(document).on('click','#distributor_button',function(e) {
	//alert(e);
	dis_val_holder 		= 0;
	//var data = $("#enqform").serialize();
	
	
	var dis_name 		= jQuery.trim($("#dis_name").val()); //  name field
	var dis_company 	= jQuery.trim($("#dis_company").val()); // company field
	var dis_mobile	    = jQuery.trim($("#dis_mobile").val()); // mobile field
	var dis_email		= jQuery.trim($("#dis_email").val()); // email field
	var dis_addr		= jQuery.trim($("#dis_addr").val()); // address field
	var dis_comment		= jQuery.trim($("#dis_comment").val()); // comment field
	
	$('.input-box').removeClass('error');
	$('textarea').removeClass('error');
	
	var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // reg ex email check
	var intRegex = /^\d{10}$/; 
	
	if(dis_name == "") {
		$("#dis_name").parent().addClass('error');
		dis_val_holder = 1;
	}
	
	if(dis_company == "") {
		$("#dis_company").parent().addClass('error');
		dis_val_holder = 1;
	}
	
	if(dis_mobile == "") {
		$("#dis_mobile").parent().addClass('error');
		dis_val_holder = 1;
	}
	
	if(dis_addr == "") {
		$("#dis_addr").parent().addClass('error');
		dis_val_holder = 1;
	}
	
	if(dis_comment == "") {
		$("#dis_comment").parent().addClass('error');
		dis_val_holder = 1;
	}
	
	if(dis_email == "") {						
		$("#dis_email").parent().addClass('error');
		dis_val_holder = 1;
	}
	if(dis_email != "") {						
		if(!email_regex.test(dis_email)){ // if invalid email
			$("#dis_email").parent().addClass('error');
			dis_val_holder = 1;
		}
	}
	
	if(dis_mobile != "") {
			if(!intRegex.test(dis_mobile)){ // if invalid email
				$("#dis_mobile").parent().addClass('error');
			   dis_val_holder = 1;
				
			}
			
		}
	
	//alert(DUP);
		
	if(dis_val_holder == 0 && dis_DUP == 1) {
		 jQuery.ajax({
			   type: 'POST',
			   url: ajaxurl,
			   data: {action: "distributor_form", dis_name : dis_name, dis_company: dis_company, dis_mobile: dis_mobile, dis_email: dis_email, dis_addr: dis_addr , dis_comment: dis_comment},
				success:function(data){	
				    $('#distributor_form').hide();
				 	   $('#hidden_div').show();
						  setTimeout(function() {
                              $("#hidden_div").fadeOut(1500);
							   $('#distributor_form').show();
							   $('#hidden_div').hide();
                           },3000);
                          
				  document.getElementById("distributor_form").reset();
				
				}
		}); 
	}
		
	
});
/*Distributor form end here*/



/* javascript function for parent category in blog */
function blog_parent_category_ajax_call(){
	
 var blog_parent_category = $('#blog_parent_category').val();
// alert(blog_parent_category);
 $.ajax({
        url: ajaxurl,
        data: {
            action: "blog_parent_category_request", blog_parent_category : blog_parent_category
        },
        success:function(data) {
        	//alert(data);
			$('#blog_child').html(data);
			$('.selectpicker').selectpicker('refresh');
        },
        error: function(errorThrown){
            console.log(errorThrown);
        }
    });  	

}

/* javascript function for child category in blog */
function blog_child_category_ajax_call(){
 var blog_child_category = $('#blog_child_category').val();
 //alert(blog_child_category);
 $.ajax({
        url: ajaxurl,
        data: {
            action: "blog_child_category_request", blog_child_category : blog_child_category
        },
        success:function(data) {
			//alert(data);
			$('.blog_details').html(data);
           
        },
        error: function(errorThrown){
            console.log(errorThrown);
        }
    });  	

}

//parent category change 
function blog_parent_landing_category_ajax_call(){
	//alert('d');
	
	var blog_parent_category = $('#blog_parent_category').val();
	//alert(blog_parent_category);
 $.ajax({
        url: ajaxurl,
        data: {
            action: "blog_parent_landing_category_request", blog_parent_category : blog_parent_category
        },
        success:function(data) {
			$('.blog_category_detail').html(data);
        },
        error: function(errorThrown){
            console.log(errorThrown);
        }
    });  	

	
}

//social share functionality
$('.social_share').click(function(){
	
		var left = screen.width / 2 - 320,
		top = screen.height / 2 - 220 - 100;
		//alert($(this).attr("rel"));
		return window.open($(this).attr("rel"), "mywin", "left=" + left + ",top=" + top + ",width=640,height=440,toolbar=0");
});


//Press Good Knight Buzz category change 
function press_good_knight_buzz(){
	var good_knight_buzz_year = $('#good_knight_buzz_year').val();
	//alert(good_knight_buzz_year);
    $.ajax({
        url: ajaxurl,
        data: {
            action: "press_good_knight_buzz_year_category_request", good_knight_buzz_year : good_knight_buzz_year
        },
        success:function(data) {
			//alert(data);
			$('.gk_buzz').html(data);
        },
        error: function(errorThrown){
            console.log(errorThrown);
        }
    });  	
	
}

/*press release ajax call*/

function press_release_year_ajax_call(){

	var pressReleaseYear = $('#press_release_year').val();
	var pressReleaseMonth = $('#press_release_month').val();
	
	$.ajax({
        url: ajaxurl,
        data: {
            action: "press_release_ajax_request", pressReleaseYear : pressReleaseYear, pressReleaseMonth: pressReleaseMonth
        },
        success:function(data) {
			//alert(data);
            $('.press_release').html(data);
           
        },
        error: function(errorThrown){
            console.log(errorThrown);
        }
    });  
}

function newsletter_year_ajax_call(){
	
	var newletterYear = $('#newletterYear').val();
	var newsletterMonth = $('#newsletterMonth').val();
	
	$.ajax({
        url: ajaxurl,
        data: {
            action: "newsletter_ajax_request", newletterYear : newletterYear, newsletterMonth: newsletterMonth
        },
        success:function(data) {
			//alert(data);
            $('.monthly_newsletter').html(data);
           
        },
        error: function(errorThrown){
            console.log(errorThrown);
        }
    });  
}

/* Active Plus Image Change Onclick */
$(".color-block[data-toggle]").on("click", function(e) {
	//alert("sdf");
  e.preventDefault();  // prevent navigating
  var selector = $(this).data("toggle");  // get corresponding element
  $(".color-block2").hide();
  $(".color-block3").hide();
  $(selector).show();
});

/*$(".poly").click(function() {
    $('html, body').animate({
        scrollTop: $(".num-1").offset().top-100
    }, 1000);
});
*/


});

/* Onclick Number Scroll */

$(document).ready(function() {
    $(".active-one").click(function() {
     
    $('html, body').animate({
        scrollTop: $(".active-num1").offset().top-100
    }, 1000);
});

$(".campaign-main .flexslider li").click(function() {
	    $('html, body').animate({
	        scrollTop: $(".Topbanner-campaign").offset().top-100
	    }, 1000);
	});
});
