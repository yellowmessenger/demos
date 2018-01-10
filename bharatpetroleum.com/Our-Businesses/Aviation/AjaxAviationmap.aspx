

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head><link href="../../css/common.css" rel="stylesheet" /><link href="../../css/fonts/font.css" rel="stylesheet" /><link href="../../css/innerpage.css" rel="stylesheet" /><title>

</title></head>
<body>
    <form method="post" action="AjaxAviationmap.aspx" id="ctl01">
<input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="2/rLffZ8skNXWbOS2DmmuDm47RBbQik7d2XVHcLGg5c4W0mtzi26eiB/Ch6QjtjD1KyT6Dmk3/FJrJVlvXaoBWXEUiNDale+FgBtpF8qLOWrbMK3rfDfzS5GwEq/1rCzNlismFy8ni/4upfrHSSMEf3V7olFvmPyfFC25aW+GjagqEF/oETJXHNaNSLLzinGLAAUxXEr99kwAVK6345ZITThJTbgHrs4VawSYt6zdyIu8WuZdRay0xNw/y6m11Xa8gk3d4KmaWSqKfKyw57wOOFb/vhjDzHHbvsrUNo/SQSfnL2JPsbpOvoq5CW6IovQf+RGzUTHdFfAdRRjsLoMR2nRd5KWosnTzLsqZ3CYxePUCzA1PocHBnn9zvbzDujpOCsFZrhlChByWlAN5UpgnfwSaiPL+qg3fXD6D4B282/6xRguKJZjw7s6XKTmjl+s2ukni61K/GWNVbEol3qaz6NpUtUiZKYssnYdnMzZ/urjYuu/NLnsHzvhcmjXZvcnR5CphK4/nQVn4GRVNxpgKW+cY7n3dtQS73C2XSIRKuymafRx6WWIiTdmfztbtsNaYc/ncrsH2CBSRfT0CVa0se+qRtelwzMnv9SaNoPdMQNf6mrObopfQrgJ/BS3dd83GxZ9ZR/IiIOOJjJSM13qBAD6C9AQXiShJ+22dch1fdL6DqkqGoVYtFHn4oGUoHLT4xF9tXSslLv6tXbCEWTE7xJ260TLTkA/JOz3rlqmISjCZTlB1GhN31CaPXMDGTcWLMUUJLlvD7cSHVjtJMgZilgx+/4mU55kcVrEgz0te651mDQz0cXJWdTXpJveoGPhwk1I1hR2ocLSdR21sTAHGZ/K3fs=" />


<script src="../../ScriptResource.axd?d=Iqsgf3aQEsBaQwa7NDOjIGrT8-l8k8F_iQaO9qzegAzmX1JUPOTT0qulDCqteDuml3M9BEDr0Uo6UwJtu_Awksu9tszyZuYhaMlRd4FO73aUE2UO6jlL2wxDakJrSbSC5IIPT_aOj4sO-e2zhPrjUcPWBSA1&amp;t=72e85ccd" type="text/javascript"></script>
<input type="hidden" name="__VIEWSTATEGENERATOR" id="__VIEWSTATEGENERATOR" value="333000DA" />
<input type="hidden" name="__VIEWSTATEENCRYPTED" id="__VIEWSTATEENCRYPTED" value="" />
<input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="xlGKCGN/T2wHjnVY19coY0XQKl+/36GFUxV9VpOh0jS4Fkvgs4YhdrMDO2VniWo2ETl8eS6xOGAlbKNYVLWcGMEGgKFhoyArUzL46AUGtYuwwNWPEmpBsbK9KpaEbaJvfTMG7pOpJIDXilTPwUHkzbsmoMmAacNtjIbuh6yKhPc/EXmXuELr1ysoIN6WwVg+nT2uGGDzLMY//NIqhpIwRWWXm34KkR0hl64gTzAP/RGJEb5fDrmOCKN6qRUprn7ME/VV5N70JrnGGtktwSPfjdcqJeYE+vq+7yC6IdjdLXoskwfPjR/CD1ZLSVdB7Cx4gFuZWZEougydGwoCkFZXEtVLAdVb17/M0xo3f/8SUQbwB0aH0rbkNMpGd1qvxCl6TlJ9kiB3744M7VsiNQ1Vs64SVrrELzPaRNykaPA9b1EaIgv+bpE1B3nYTVrrTEeAI6x68TMuvTXfygo4d7OPd/1hqVV1h1vanf4IS6zUkGpmRb9FeW7qib7kpIwX/Hol5jpwjJwEd8QpgIESH4OjVdobMV2/bI5cXp72jYcc6EtfV7qzLoM95ZTphCVx3Q2pzE9yIaFumyQNnhSVU/O8asrOaaaTk8wgn6qlS0KODkGB46RLIdnGv6Zl8v+p5guwJnrIsQ==" />
    
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBpUY0EiL1ID3uI5fdPBYNrrRlHLTj7ahI&region=IN"></script>
    <script type="text/javascript">
var markers = [

];
    </script>
    <script src="https://www.bharatpetroleum.com/js/jquery.min.js" type="text/javascript"></script>
    <script>
        var testArray = [];
        var mumbai = new google.maps.LatLng(19.075984, 72.877656);
        var india = new google.maps.LatLng(22.319915, 79.347364);
        var marker;
        var desc;
        var mapOptions;
        var geocoder;      //for geoLocation
        var directionsDisplay;
        var directionsService1 = new google.maps.DirectionsService();
        var map;
        var marker;
        var marker1;
        var origin = null;
        var destination = null;
        var source = null;
        var dest = null;
        var waypoints = [];
        var markers = [];
        var markers1 = [];
        //var markers1 = [];
        var arr = [];
        var infowindow;
        var infowindow1;
        var PointsArray = [];
        var vertexVal = "";
        var noOfCords = "";
        var flag = 1;
        var flag1 = 1;
        var ddlSelected;
        var UrlCity;
        var UrlRoute;
        var finalDestination;
        var lastLatLong;


        $(document).ready(function () {

            function Initialize() {
                mapOptions = {
                    zoom: 4,
                    center: india
                };
                map = new google.maps.Map(document.getElementById('dvMap'), mapOptions);
            }

            google.maps.event.addDomListener(window, 'load', Initialize);
            //alert(321);

            function clearMap() {
                function clearMapCall() {
                    var india1 = new google.maps.LatLng(22.319915, 79.347364);
                    var mapOptionsTwo1 = {
                        zoom: 4,
                        center: india1
                    };

                    //Initialize();
                    map = '';
                    map = new google.maps.Map(document.getElementById('dvMap'), mapOptionsTwo1);
                }
                //map = '';
                google.maps.event.addListener(map, 'projection_changed', clearMapCall());
            }

            $('#ddlState').change(function () {
                //alert('on state change');
                fillCity();
            });





            function fillCity() {
                $('#ddlCity').empty();

                var varState = $('#ddlState').val();
                var varLanguage = $('#lblLanguage').html();
                $.ajax({
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify({ strState: varState, strLanguage: varLanguage }),
                    async: false,
                    url: "AjaxAviationmap.aspx/GetCity",
                    dataType: "json",
                    success: function (response) {
                        if (response.d.length > 0) {
                            var ltlng = [];
                            var obj = JSON.stringify(response.d);

                            var json = $.parseJSON(obj);
                            var firstLatlng;
                            var varOfficeType;

                            $('#ddlCity').append('<option value="none">--Select City--</option>');
                            $.each(json, function (index, loc) {


                                var ltlng = [];

                                var varCity = loc.strCity;

                                $('#ddlCity').append(varCity);


                            });

                        } else {
                            //alert('empty');
                            $('#ddlCity').empty();
                            //clearMap();
                            $('#ddlCity').append("<option value='none'>No City Found</option>");
                        }
                    },
                    error: function (e) {
                        $("#divInnerHtml").empty();
                        //clearMap();
                        $("#divInnerHtml").append("<span class='errormsg'>No Data Found</span>");


                    }
                });
            }




            $("#btnSubmit").click(function () {
                //alert('btn click');
                $("#divInnerHtml").empty();
                var varState = $('#ddlState').val();
                var varCity = $('#ddlCity').val();
                var varLanguage = $('#lblLanguage').html();

                $("#divInnerHtml").empty();
                if (!(varState == "none")) {

                    if (!(varCity == "none")) {



                        $.ajax({
                            type: "POST",
                            contentType: "application/json",
                            data: JSON.stringify({ strState: varState, strCity: varCity, strLanguage: varLanguage }),
                            async: false,
                            url: "AjaxAviationmap.aspx/GetAllOffice",
                            dataType: "json",
                            success: function (response) {
                                var obj = JSON.stringify(response.d);
                                var json = $.parseJSON(obj);
                                var firstLatlng;

                                mapOptions = {
                                    zoom: 13,
                                    center: mumbai
                                };
                                map = new google.maps.Map(document.getElementById('dvMap'), mapOptions);

                                $.each(json, function (index, loc) {
                                    var ltlng = [];
                                    var state = loc.State;
                                    var city = loc.City;
                                    var address = loc.Address;
                                    var office = loc.Office;
                                    var aviation = loc.Avition;
                                    var strLat = loc.Latitude;
                                    var strLag = loc.Longitude;



                                    var price = "Price";
                                    ltlng.push(new google.maps.LatLng(strLat, strLag));


                                    //alert(1);
                                    if (!firstLatlng) {
                                        firstLatlng = ltlng[0];
                                        lastLatLong = firstLatlng;
                                    }
                                    for (var i = 0; i <= ltlng.length; i++) {
                                        marker = new google.maps.Marker({
                                            map: map,
                                            position: ltlng[i],
                                            animation: google.maps.Animation.Animate,
                                            icon: "/images/locate_us/mapicons/Plane.png"
                                        });
                                        markers.push(marker);
                                        flag1 = 1;

                                        (function (i, marker) {
                                            google.maps.event.addListener(marker, 'click', function () {
                                                if (!infowindow) {
                                                    infowindow = new google.maps.InfoWindow();
                                                }
                                                //alert(infowindow);
                                                //if (imgServices.length > 0) {
                                                var desc = '<div class="map-content" style="display:block;">' +
															'<div class="location">' +
																'<div class="left">' +
																	'<img src="https://www.bharatpetroleum.com/images/locate_us/mapicons/Aviation.jpg" alt="Location Image">' +
																'</div>' +
																'<div class="right">' +

																	'<p>' + address + ',&nbsp;' + city + '<br>' + state + '&nbsp;' +
																	'</p>' +
																'</div>' +
															'</div>' +

														'</div>';
                                                //}

                                                infowindow.setContent(desc);
                                                infowindow.open(map, marker);
                                            });
                                        })(i, marker);

                                        var strInnerHtml = "<div id='mapfrm' class='map-s-frm'>"

															+ "<p>" + address + "<br>"
															+ "<p>" + city + "</p>"
															+ "<p>" + state + "</p></div>";
                                    }
                                    //map.setZoom(13);

                                    $("#divInnerHtml").append(strInnerHtml);
                                });

                                if (!firstLatlng) {
                                    $("#divInnerHtml").empty();
                                    clearMap();
                                    $("#divInnerHtml").append("<span class='errormsg'>No Data Found</span>");
                                }

                                map.setCenter(firstLatlng);
                            },
                            error: function (e) {
                                //alert(JSON.stringify(e));
                                //alert("error");
                                $("#divInnerHtml").empty();
                                clearMap();
                                $("#divInnerHtml").append("<span class='errormsg'>No Data Found</span>");
                            }
                        });

                    } else {
                        $("#divInnerHtml").empty();
                        clearMap();
                        $("#divInnerHtml").append("<span class='errormsg'>--Please Select City--</span>");

                    }
                } else {
                    $("#divInnerHtml").empty();
                    clearMap();
                    $("#divInnerHtml").append("<span class='errormsg'>--Please Select State--</span>");

                }
            });

        });


    </script>
    <script type="text/javascript">

    

    </script>
    <!--STARTS : Locate Us-->
    <div class="container-fluid locate-us-div">
        <div class="container">
            <h2>
                <span class="img_title">
                    <img src="https://www.bharatpetroleum.com/images/icon_global.png" alt="Location" />Aviation Office
                    Location Map</span></h2>
            <!-- <hr class="hr">-->
            <div class="row">
                <div class="col-sm-8 map-div">
                    <div id="dvMap">
                    </div>
                    <div id="imageDiv">
                    </div>
                </div>
                <div class="col-sm-4 map-filter">
                    <span id="lblLanguage" style="display: none">English</span>
                    <p>Locate Your Nearest Aviation Office</p>
                    <div class="filter clearfix">
                        <select name="ddlState" id="ddlState">
	<option selected="selected" value="none">--Select State--</option>
	<option value="AP">AP</option>
	<option value="Assam">Assam</option>
	<option value="Bihar">Bihar</option>
	<option value="Chattisgarh">Chattisgarh</option>
	<option value="DAMAN&amp; DIU ">DAMAN&amp; DIU </option>
	<option value="Delhi">Delhi</option>
	<option value="GOA">GOA</option>
	<option value="Gujarat">Gujarat</option>
	<option value="Haryana">Haryana</option>
	<option value="Karnataka">Karnataka</option>
	<option value="Kerala">Kerala</option>
	<option value="Maharastra">Maharastra</option>
	<option value="Manipur">Manipur</option>
	<option value="MP ">MP </option>
	<option value="Nagaland">Nagaland</option>
	<option value="Orissa">Orissa</option>
	<option value="Punjab">Punjab</option>
	<option value="Rajasthan">Rajasthan</option>
	<option value="Tamil Nadu">Tamil Nadu</option>
	<option value="TN">TN</option>
	<option value="Tripura">Tripura</option>
	<option value="UP">UP</option>
	<option value="WB">WB</option>

</select>
                        <select name="ddlCity" id="ddlCity">
	<option value="none">--Select City--</option>

</select>
                        
                        
                        
                        <input class="loc-search-new" type="button" value="Search" id="btnSubmit" />
                    </div>
                    <div style="position: relative;">
                        <div class="map_search_item scrollbar">
                            <div id="divInnerHtml">
                            </div>
                            <span id="lblMessageDisplay" class="errormsg"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
    <script src="../../js/enscroll-0.6.1.min.js" type="text/javascript"></script>
    <script>
        $(document).ready(function () {
            $('.scrollbar').enscroll({
                //showOnHover: true,
                verticalTrackClass: 'track3',
                verticalHandleClass: 'handle3'
            });
        });
    </script>
</body>
</html>
