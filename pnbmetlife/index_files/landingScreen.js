$(document).ready(function () {
    $("#hpForgotPassword1").click(function () {

        $('#lblMsg1').html('');
        $('#btnContinueJourneySubmit').css('display', 'none');
        $('#btnForgotPassword1').css('display', 'block');
        $('#txtPassword').css('display', 'none');
        $('#lblpwd').css('display', 'none');
        $('#hpForgotPassword1').css('display', 'none');
       // $('#spanhead').text('Get Your Password');


    });


    $(".onExpand").hide();
    $(".onExpansion").hide();


    $('#bxsliderMain').bxSlider({
        auto: true,
        //autoControls: true
    });

    $('.bxslider').bxSlider({
	    infiniteLoop : false,
	    hideControlOnEnd : true
    });

//    $('.bxslider').bxSlider({
//        auto: false,
//        autoControls: false
//    });
    
    // show and hide continue, medical, track application and spouse on clicking links in nav bar
    if ($('#hdnTrackJourneySec').val() != '0' && $('#hdnTrackJourneySec').val() != '')
        DefaultTrackJourneyDivDisplay($('#hdnTrackJourneySec').val());
    $("#continue").click(function () {
        $(".continue_left").fadeIn(300)
        $(".trackapp").hide();
        $(".medical_test").hide();
        $(".quote_foam").hide();
        $('#hdnTrackJourneySec').val('1');
    });

    $("#medical").click(function () {
        $(".continue_left").hide();
        $(".trackapp").hide();
        $(".medical_test").fadeIn(300);
        $(".quote_foam").hide();
        $('#hdnTrackJourneySec').val('2');
    });

    $("#trackapp").click(function () {
        $(".continue_left").hide();
        $(".trackapp").fadeIn(300)
        $(".medical_test").hide();
        $(".quote_foam").hide();
        $('#hdnTrackJourneySec').val('3');
    });

    $(".trackapp_close").click(function () {
        $(".continue_left").hide();
        $(".trackapp").hide();
        $(".medical_test").hide();
        $(".quote_foam").fadeIn(300)
        $(".onExpand").hide();
        $('#hdnTrackJourneySec').val('0');
    });

    // end of show/hide script	


    /*Radio Button Check Start*/
    $('input').click(function (id) {
        // to resolve lakh and monthly selection issue by default : jagdeep
        if (this.id != 'txtSumAssured') {
            $('input:not(:checked)').parent().removeClass('style1');
            $('input:checked').parent().addClass('style1');
        }
    });

    // image on banner- landing screen
    $(".close").click(function () {
        $(".popup_img_content").fadeOut(300);

    });
    // end of image on banner- landing screen

    $(".closeBttn").click(function () {
        //$(".track_app").hide();
        //$(this).parent().parent().find(".track_app").hide();
        $(this).parent().parent().fadeOut(300);
        $(".quote_foam").fadeIn(300);
    });

    // quick quote expand form script		
    $(".tobacco").click(function () {
        // $(".onExpand").css("display","block");
        $(".onExpand").show();
    });
    //	end of quick quote expand form script

    // basic info
    $(".cnsmTbco").click(function () {
        // $(".onExpand").css("display","block");
        $(".onExpansion").show();
    });
    // basic info

    // faq1 on click


    $(".faq_que").click(function () {
        $('.faq_detail').fadeOut("300");
        $(this).next('.faq_detail').fadeIn("300");
    });

    $(".close_faq").click(function () {
        $(this).parent().parent('.faq_detail').fadeOut("300");
    });





    //$(".close_faq").click(function () {
    //$("#term_plan").fadeOut(300);
    //$("#make_Payment").fadeOut(300);
    //$("#insur_Cover").fadeOut(300);
    //$("#docs_Submit").fadeOut(300);
    // $("#company_Cover").fadeOut(300);
    // $("#company_Term").fadeOut(300);
    // $("#make_Payment1").fadeOut(300);
    //  $("#insur_Cover1").fadeOut(300);
    ///  $("#make_Payment2").fadeOut(300);
    // $("#insur_Cover2").fadeOut(300);
    // });
    // end of faq1 on click


});

function DefaultTrackJourneyDivDisplay(trackJourneySec) {
    switch (trackJourneySec) {
        case '1':
            $(".continue_left").fadeIn(300)
            $(".trackapp").hide();
            $(".medical_test").hide();
            $(".quote_foam").hide();
            break;
        case '2':
            $(".continue_left").hide();
            $(".trackapp").hide();
            $(".medical_test").fadeIn(300);
            $(".quote_foam").hide();
            break;
        case '3':
            $(".continue_left").hide();
            $(".trackapp").fadeIn(300);
            $(".medical_test").hide();
            $(".quote_foam").hide();
            break;
    }
}
function ValidateTrackJourney() {
    var mobileNumber = $('#txtTrackMobileNumber').val();
    var applicationNumber = $('#txtTrackApplicationNumber').val();
    var errMsg = $('#lblTrackMsg');
    var result = true;
    if (!isValidMobileNumber(mobileNumber) || mobileNumber == '') {
        errMsg.show();
        errMsg.html('Please enter 10 digit valid mobile number.');
        result = false;
    }
    else if (applicationNumber == '') {
        errMsg.show();
        errMsg.html('Please enter application number.');
        result = false;
    }
    if (result)
        return true
    else
        return false;
}
function ValidateMedicalTrackJourney() {
    var mobileNumber = $('#txtMedicalMobileNumber').val();
    var applicationNumber = $('#txtMedicalApplicationNumber').val();
    var errMsg = $('#lblMedicalTrackMsg');
    var result = true;
    if (applicationNumber == '') {
        errMsg.show();
        errMsg.html('Please enter application number.');
        result = false;
    }
    else if (!isValidMobileNumber(mobileNumber) || mobileNumber == '') {
        errMsg.show();
        errMsg.html('Please enter 10 digit valid mobile number.');
        result = false;
    }
    if (result)
        return true
    else
        return false;
}
function ValidateContinueJourney() {
    var mobileNumber = $('#txtMobileNumber').val();
    var password = $('#txtPassword').val();
    var errMsg = $('#lblContinueJourneyMsg');
    var result = true;
    if (!isValidMobileNumber(mobileNumber) || mobileNumber == '') {
        errMsg.show();
        errMsg.html('Please enter 10 digit valid mobile number.');
        result = false;
    }
    else if (password == '') {
        errMsg.show();
        errMsg.html('Please enter password.');
        result = false;
    }
    if (result)
        return true
    else
        return false;
}



