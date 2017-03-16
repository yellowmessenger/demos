/// <reference path="jquery-1.11.0.min.js" />
$(document).ready(function () {
    $("#HeloTanyPopupYes").click(function () {

        $(".ca-menu li").each(function (i) {
            $(this).removeClass("visible");
        });
        $('.four').addClass('visible');

        $('#hhnPlanSelected').val('4');

        $('.Popupmaindiv, .HeloTanyPopup, .blckshadow').fadeOut(300);
    });

    $("#HeloTanyPopupNo").click(function () {
        if ($('.four').hasClass('visible') == true) {
            $('.four').removeClass('visible');
            $('.three').addClass('visible');
            $('#hhnPlanSelected').val('3');

        }
        //alert($('#hhnPlanSelected').val());
        $('.Popupmaindiv, .HeloTanyPopup, .blckshadow').fadeOut(300);
    });

    $("#spnChildNo").click(function () {
        if ($('#hhnPlanSelected').val() == '4') {
            $('.four').removeClass('visible');
            $('.three').addClass('visible');
            $('#hhnPlanSelected').val(3);

        }
        $('.Popupmaindiv, .HeloTanyPopup, .blckshadow').fadeOut(300);
    });

    $("#rdoChieldNo").click(function () {
        $('.three').addClass('visible');
        $('#hhnPlanSelected').val('3');
        $('.four').removeClass('visible');
        $('.Popupmaindiv, .HeloTanyPopup, .blckshadow').fadeOut(300);
    });
    $("#lblMale").click(function () {
        SetSalutation('M')
    });
    $("#lblFemale").click(function () {
        SetSalutation('F')
    });
    $("#hpForgotPassword").click(function () {

        $('#lblMsg').html('');
        $('#btnRetrieve').css('display', 'none');
        $('#btnForgotPassword').css('display', 'block');
        $('#hpRetrievequote').css('display', 'block');
        // $('#txtPassword').removeClass('txtQPassword');
        $('#txtPassword').css('display', 'none');
        $('#hpForgotPassword').css('display', 'none');
        $('#spanhead').text('Get Your Password');


    });
    $("#hpRetrievequote").click(function () {
        $('#lblMsg').html('');
        $('#btnForgotPassword').css('display', 'none');
        $('#txtPassword').css('display', 'block');
        $('#txtMobileNumber').css('display', 'block');
        $('#hpRetrievequote').css('display', 'none');
        $('#btnRetrieve').css('display', 'block');
        $('#hpForgotPassword').css('display', 'block');
        $('#spanhead').text('Retrieve your old quote');
    });


});
function SetSalutation(Gender) {
    //debugger;
    if (Gender != 'undefined' && Gender != null) {
        if (Gender == 'M') {
            $('#ddlSal option[value="1"]').remove();
            $('#ddlSal option[value="3"]').remove();
            $('#ddlSal option[value="9"]').remove();
            $('#ddlSal option[value="10"]').remove();


            $("#ddlSal").append("<option value='3' selected='selected'>Mr</option>");
            $("#ddlSal").append("<option value='10'>Dr</option>");
        }
        else if (Gender == 'F') {
            $('#ddlSal option[value="3"]').remove();
            $('#ddlSal option[value="10"]').remove();

            $('#ddlSal option[value="1"]').remove();
            $('#ddlSal option[value="9"]').remove();
            $('#ddlSal option[value="10"]').remove();
            $("#ddlSal").append("<option value='1' selected='selected'>Ms</option>");
            $("#ddlSal").append("<option value='9'>Mrs</option>");
            $("#ddlSal").append("<option value='10'>Dr</option>");

        }
    }
}

function OpenHeloTanyPopup() {
    if ($('#hhnPlanSelected').val() != '4') {
        $('#rdoHeloYes').prop('checked', false);
        $('#HeloTanyPopupYes').parent().removeClass('style1');
        $('#rdoHeloNo').prop('checked', false);
        $('#HeloTanyPopupNo').parent().removeClass('style1');

        $('.HeloTanyPopup').css('display', 'block');
        $('.blckshadow').css('display', 'block');
    }
}
