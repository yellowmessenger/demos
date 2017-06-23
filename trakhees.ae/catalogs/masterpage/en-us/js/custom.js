///start
$(document).ready(function() {
    $('#incfont').click(function(){
        curSize= parseInt($('#content').css('font-size')) + 2;
        if(curSize<=18)
            $('#content').css('font-size', curSize);
             $('h1').css('font-size', curSize);
             $('h2').css('font-size', curSize);
             $('h3').css('font-size', curSize);
             $('h4').css('font-size', curSize);
             $('h5').css('font-size', curSize);
             $('h6').css('font-size', curSize);
                       $('p').css('font-size', curSize);
                                                $('a').css('font-size', curSize);
                        $('strong').css('font-size', curSize);

    });
    $('#decfont').click(function(){
        curSize= parseInt($('#content').css('font-size')) - 2;
        if(curSize>=10)
            $('#content').css('font-size', curSize);
            $('h1').css('font-size', curSize);
             $('h2').css('font-size', curSize);
             $('h3').css('font-size', curSize);
             $('h4').css('font-size', curSize);
             $('h5').css('font-size', curSize);
             $('h6').css('font-size', curSize);
                        $('p').css('font-size', curSize);
                                                $('a').css('font-size', curSize);
                        $('strong').css('font-size', curSize);

                        
    });
    $('#deffont').click(function(){       
    document.location=document.location;
    });
});






//$(function () {
//    $(".font-button").bind("click", function () {
//        var size = parseInt($('p, header, footer, h1, h2, h3, h4, h5, h6, li, a, i').css("font-size"));
//        if ($(this).hasClass("plus")) {
//            size = size + 2;
//        } else {
//            size = size - 2;
//            if (size <= 10) {
//                size = 10;
//            }
//        }
//        $('p, header, footer, h1, h2, h3, h4, h5, h6, li, a, i').css("font-size", size);
//    });
//});

//blackNwhite theme change javascript
function changeCSS(cssFile) {
    document.getElementById('ctl00_theme').setAttribute('href', cssFile);
       
}
function getCookie(cname) {
    var cname = "trkcookie";
    var re = new RegExp(cname + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
}

function DeleteCookie(cname) {
    var cname = "trkcookie";
    document.cookie = cname + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function changeColor() {
    var _trkcookie = getCookie("trkcookie");
    if (_trkcookie == "" || _trkcookie==null) {
        changeCSS('/_catalogs/masterpage/en-us/css/global_bnw.css');
        setCookie("trkcookie", "BW", 1);
        
    }
    else {
        changeCSS('/_catalogs/masterpage/en-us/css/global.css');
        DeleteCookie("trkcookie");

    }
}
function Checkblackandwhitedesgin() {
    var _trkcookie = getCookie("trkcookie");
    if (_trkcookie != "" && _trkcookie != null) {
        changeCSS('/_catalogs/masterpage/en-us/css/global_bnw.css');
    }
}

//printscreen

function printScreen() {
var restorepage = document.body.innerHTML;
$('#mainc a').removeAttr("href");

	var printcontent = document.getElementById('mainc').innerHTML;
	document.body.innerHTML = printcontent;
	window.print();
	document.body.innerHTML = restorepage;
}