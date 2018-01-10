

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head><link href="../../css/common.css" rel="stylesheet" /><link href="../../css/fonts/font.css" rel="stylesheet" /><link href="../../css/innerpage.css" rel="stylesheet" /><title>

</title></head>
<body>
<form method="post" action="AjaxMakLub.aspx" id="ctl01">
<input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="rIB9bRIiEL45BJOtgcvuKAHWIoyAjmCrCMdM/8EO5YflNkCQbKNEalBqQaW4wxztXEW/FC3gi72JhpAAB9HeZD6vc47DxPYthjy821M8An6jXQP5MwxRmXsStfod26+GZf0D/2y7xUFTEKKYvJx+kbah4YnkWiDtRveSjLBzlfRDXSUFXfQemy6Zmmz0Dg6Ud5Bh+Ds1Ry1S2/AcRWq1WdXi4n88sELSFnzueGQnldvyOErUHzERWqNpOulgeT5koMKJkueIIJNNOop82KXQJQbri3Q=" />


<script src="../../ScriptResource.axd?d=Iqsgf3aQEsBaQwa7NDOjIGrT8-l8k8F_iQaO9qzegAzmX1JUPOTT0qulDCqteDuml3M9BEDr0Uo6UwJtu_Awksu9tszyZuYhaMlRd4FO73aUE2UO6jlL2wxDakJrSbSC5IIPT_aOj4sO-e2zhPrjUcPWBSA1&amp;t=72e85ccd" type="text/javascript"></script>
<input type="hidden" name="__VIEWSTATEGENERATOR" id="__VIEWSTATEGENERATOR" value="37502934" />
<input type="hidden" name="__VIEWSTATEENCRYPTED" id="__VIEWSTATEENCRYPTED" value="" />
<input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="AYt3mQYCH9rzkJW4StSCNJvwhrEs0Zqlk4D+piwghvvC1g6Xyo16E6RULPf5cZlJP1Tcmx9I0wvH7lMPzmlsWhaELP7nMNpwqgymnWNDpISxgrsyVp9V8gWkOIVQv8M6JCJN4jC9I/zqQ3cn4MtUsaLEO/MzvDill11otfG7uc2XbRuNgMshZGHoc+yaDFn18C8N5PxpVkJLckqU2pxWLwv2H6hgCn1/7FAUTscIySdAV7XPpxpM4con3lZ+KJy/+D2Do28y6BdQF9HsyuHip0CmQ4xnFH79X0CQoe2C1rN5lajq" />
  
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



        $('#ddlOfficeType').hide();


        $('#ddlOffice').change(function () {
            if ($('#ddlOffice').val() == "Office") {

                $('#ddlOfficeType').show();
                fillOfficeType();
                fillState();
            }
            if ($('#ddlOffice').val() == "Plant") {
                $('#ddlOfficeType').hide();
                fillState();
            }
            if ($('#ddlOffice').val() == "Laboratory") {
                $('#ddlOfficeType').hide();
                fillState();
            }
            if ($('#ddlOffice').val() == "none") {
                $('#ddlOfficeType').hide();

            }
        });

        google.maps.event.addDomListener(window, 'load', Initialize);
        //alert(321);

        $('#ddlState').change(function () {
            fillCity();
        });

        $('#ddlCity').change(function () {
            if ($('#ddlOffice').val() == "Office") {
                fillOfficeType();
            }
        });






        function fillCity() {
            $('#ddlCity').empty();
            var varState = $('#ddlState').val();
            var varOffice = $('#ddlOffice').val();
            var varLanguage = $('#lblLanguage').html();

            $.ajax({
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({ strState: varState, strOfficeType: varOffice, strLanguage: varLanguage }),
                async: false,
                url: "AjaxMakLub.aspx/GetCity",
                dataType: "json",
                success: function (response) {
                    if (response.d.length > 0) {
                        var ltlng = [];
                        var obj = JSON.stringify(response.d);
                        //alert(response.d);
                        var json = $.parseJSON(obj);
                        var firstLatlng;
                        var varOfficeType;

                        $('#ddlCity').append('<option value="none">Select District/City</option>');
                        $.each(json, function (index, loc) {


                            var ltlng = [];
                            //alert("office");

                            varOfficeType = "";

                            var varCity = loc.strCity;

                            $('#ddlCity').append(varCity);
                            //alert(varOfficeType);
                            //$("#divInnerHtml").append(strInnerHtml);

                        });

                    } else {
                        //alert('empty');
                        $('#ddlCity').empty();
                        $('#ddlCity').append("<option value='none'>No City Found</option>");
                    }
                },
                error: function (e) {
                    $("#divInnerHtml").empty();
                    $("#divInnerHtml").append("<span class='errormsg'>No Data Found</span>");


                }
            });
        }



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





        function fillOfficeType() {
            $('#ddlOfficeType').empty();
            var varCity = $('#ddlCity').val();
            var varOffice = $('#ddlOffice').val();
            var varLanguage = $('#lblLanguage').html();

            $.ajax({
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({ strOfficeType: varOffice, strCity: varCity, strLanguage: varLanguage }),
                async: false,
                url: "AjaxMakLub.aspx/GetOfficeType",
                dataType: "json",
                success: function (response) {
                    if (response.d.length > 0) {
                        var ltlng = [];
                        var obj = JSON.stringify(response.d);
                        //alert(response.d);
                        var json = $.parseJSON(obj);
                        var firstLatlng;
                        var varOfficeType;



                        $('#ddlOfficeType').append('<option value="none">Select Office Type</option>');
                        $.each(json, function (index, loc) {


                            var ltlng = [];
                            //alert("office");

                            varOfficeType = "";

                            var varOfficeType = loc.strOfficeType;

                            $('#ddlOfficeType').append(varOfficeType);
                            //alert(varOfficeType);
                            //$("#divInnerHtml").append(strInnerHtml);

                        });

                    } else {
                        //alert('empty');
                        $('#ddlOfficeType').empty();
                        $('#ddlOfficeType').append("<option value='noofficefound'>No Office Found</option>");
                    }
                },
                error: function (e) {
                    $("#divInnerHtml").empty();
                    $("#divInnerHtml").append("<span class='errormsg'>No Data Found</span>");


                }
            });
        }

        function fillState() {
            $('#ddlState').empty();
            var varState = $('#ddlOffice').val();
            var varLanguage = $('#lblLanguage').html();

            $.ajax({
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({ strOfficeType: varState, strLanguage: varLanguage }),
                async: false,
                url: "AjaxMakLub.aspx/GetState",
                dataType: "json",
                success: function (response) {
                    if (response.d.length > 0) {
                        var ltlng = [];
                        var obj = JSON.stringify(response.d);
                        //alert(response.d);
                        var json = $.parseJSON(obj);
                        var firstLatlng;
                        var varOfficeType;

                        $('#ddlState').append('<option value="none">Select State</option>');
                        $.each(json, function (index, loc) {


                            var ltlng = [];
                            //alert("office");

                            varOfficeType = "";

                            var varCity = loc.strStates;
                            //alert(varCity);
                            $('#ddlState').append(varCity);
                            //alert(varOfficeType);
                            //$("#divInnerHtml").append(strInnerHtml);

                        });

                    } else {
                        //alert('empty');
                        $('#ddlState').empty();
                        $('#ddlState').append("<option value='none'>No State Found</option>");
                    }
                },
                error: function (e) {
                    $("#divInnerHtml").empty();
                    $("#divInnerHtml").append("<span class='errormsg'>No Data Found</span>");


                }
            });
        }



        $("#btnSubmit").click(function () {

            $("#divInnerHtml").empty();

            var varState = $('#ddlState').val();
            var varCity = $('#ddlCity').val();
            var varOffice = $('#ddlOffice').val();
            var varOfficeType = $('#ddlOfficeType').val();
            var varLanguage = $('#lblLanguage').html();

            $("#divInnerHtml").empty();
            if (!(varState == "none")) {

                if (!(varCity == "none")) {

                    if (!(varOffice == "none")) {

                        if (!((varOfficeType == "none") && varOffice == "Office")) {
                            $.ajax({
                                type: "POST",
                                contentType: "application/json",
                                data: JSON.stringify({ strState: varState, strCity: varCity, strOffice: varOffice, strOfficeType: varOfficeType, strLanguage: varLanguage }),
                                async: false,
                                url: "AjaxMakLub.aspx/GetAllOffice",
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

                                        var strLat = loc.Latitude;
                                        var strLag = loc.Longitude;
                                        var strAddress = loc.Address;
                                        var Type = loc.strType;
                                        var OfficeType = loc.strOfficeType;


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
                                                icon: "/images/maklub_icon.png"
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
																		'<img src="https://www.bharatpetroleum.com/images/maklub_contact_img.png" alt="Location Image">' +
																	'</div>' +
																	'<div class="right">' +

																		'<p>' + strAddress + ',&nbsp;' + state + '<br>' + city +
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
																+ "<p>" + strAddress + "<br>"
																+ "<p>" + state + "</p>"
																+ "<p>" + city + "</p></div>";
                                        }
                                        //map.setZoom(13);


                                        $("#divInnerHtml").append(strInnerHtml);
                                    });
                                    if (!firstLatlng) {
                                        $("#divInnerHtml").empty();
                                        clearMap();
                                        $("#divInnerHtml").append("<span class='errormsg'>Data Not Available</span>");
                                    }

                                    map.setCenter(firstLatlng);

                                },
                                error: function (e) {
                                    $("#divInnerHtml").empty();
                                    clearMap();
                                    $("#divInnerHtml").append("No Data Found");
                                    //alert(JSON.stringify(e));
                                    //alert("error");
                                }
                            });
                        } else {
                            $("#divInnerHtml").empty();
                            clearMap();
                            $("#divInnerHtml").append("<span class='errormsg'>Please Select Office Type</span>");
                        }
                    } else {
                        $("#divInnerHtml").empty();
                        clearMap();
                        $("#divInnerHtml").append("<span class='errormsg'>Please Select Type</span>");
                    }
                } else {
                    $("#divInnerHtml").empty();
                    clearMap();
                    $("#divInnerHtml").append("<span class='errormsg'>Please Select City</span>");

                }
            } else {
                $("#divInnerHtml").empty();
                clearMap();
                $("#divInnerHtml").append("<span class='errormsg'>Please Select State</span>");

            }
        });
    });



</script> 
  <script type="text/javascript">

    

</script> 
  <!--STARTS : Locate Us-->
  
  <div class="container-fluid locate-us-div">
  <div class="container">
    <h2><span class="img_title"><img src="https://www.bharatpetroleum.com/images/icon_global.png" alt="Location">MAK Lubricants Office</span></h2>
    <!-- <hr class="hr">-->
    <div class="row">
      <div class="col-sm-8 map-div">
        <div id="dvMap"></div>
        <div id="imageDiv"></div>
      </div>
      <div class="col-sm-4 map-filter">
        <span id="lblLanguage" style="display:none">English</span>
        <p>Locate a MAK Lubricants Office/Plant/Proficiency Testing Centre.</p>
        <div class="filter clearfix">
        <select name="ddlOffice" id="ddlOffice">
	<option value="none">Select Type</option>
	<option value="Office">Office</option>
	<option value="Plant">Plant</option>
	<option value="Laboratory">Proficiency Testing Centre</option>

</select>
        

          <select name="ddlState" id="ddlState">
	<option value="none">--Select State--</option>

</select>
          <select name="ddlCity" id="ddlCity">
	<option value="none">--Select City--</option>

</select>
          
          <select name="ddlOfficeType" id="ddlOfficeType">
	<option selected="selected" value="none">Select Office Type</option>
	<option value="HQ">HQ</option>
	<option value="Regional Office">Regional office</option>

</select>
          
          <input Class="loc-search" type="button" value="Search" id="btnSubmit" />
        </div>
        <div style="position:relative;">
          <div class="map_search_item scrollbar" >
            <div id="divInnerHtml" ></div>
            <span id="lblMessageDisplay" class="errormsg"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</form>
<script src="../../js/enscroll-0.6.1.min.js" type="text/javascript"></script> 
<script>
	$(document).ready(function() {
		$('.scrollbar').enscroll({
			//showOnHover: true,
			verticalTrackClass: 'track3',
			verticalHandleClass: 'handle3'
		});
	});
</script>
</body>
</html>
