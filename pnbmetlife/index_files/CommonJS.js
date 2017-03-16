$(document).ready(function () {
//js for dropdown onchange
    $("select").addClass("empty");
    $('select').change(function () {
        if ($(this).val() == "selected") $(this).addClass("empty");
        else $(this).addClass("blue")
    });
    $('select').change(function () {
        if ($(this).val() == "0") $(this).addClass("empty");
        else $(this).addClass("blue")
    });
    $('select').change(function () {
        if ($(this).val() == "-1") $(this).addClass("empty");
        else $(this).addClass("blue")
    });
});	


function myFocus(element, defaultvalue) {
    if (element.value == element.defaultValue) {
        element.value = '';
        element.setAttribute("style", "color: #545454;");
    }
}
function myBlur(element, defaultvalue) {
    if (element.value == '') {
        element.value = element.defaultValue;
        element.setAttribute("style", "color: #a9a9a9;");
    }

    if (element.value != '' && element.value != element.defaultValue && element.className.indexOf("validationError") > -1) {
        $("#" + element.id).removeClass('validationError');
    }
}

function OnDropDownChange(element, defaultvalue) {
    if (element.value != '' && element.value != element.defaultValue && element.className.indexOf("validationError") > -1) {
        $("#" + element.id).removeClass('validationError');
    }
}

function OnRadioButtonClick(element) {
    if (element.parentElement.parentElement.className.indexOf("validationError") > -1) {
        $("#" + element.id).parent().parent().removeClass('validationError');
    }
}

function OnCheckBoxClick(element) {
    if (element.parentElement.parentElement.parentElement.className.indexOf("validationError") > -1) {
        $("#" + element.id).parent().parent().parent().removeClass('validationError');
    }
}

function GetMsieVersion() {
    var useragent = window.navigator.userAgent;
    var msieversion = -1;
    var msie = useragent.indexOf("MSIE ");

    // If Internet Explorer, return version number
    if (msie > 0) 
    {
        msieversion = parseInt(useragent.substring(msie + 5, useragent.indexOf(".", msie)));
    }
    return msieversion;
}