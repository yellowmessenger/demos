


<!DOCTYPE html>
<!--[if lt IE 7 ]> <html class="ie6"> <![endif]-->
<!--[if IE 7 ]>  <html class="ie7"> <![endif]-->
<!--[if IE 8 ]>  <html class="ie8"> <![endif]-->
<!--[if IE 9 ]>  <html class="ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!-->
<html class="homepage" lang="en">
<!--<![endif]-->
<head>
<script src="js/jquery-1.11.1.min.js"></script>
<link href="css/common.css" rel="stylesheet" /><link href="css/fonts/font.css" rel="stylesheet" /><link href="css/innerpage.css" rel="stylesheet" /><link href="css/flexslider.css" rel="stylesheet" /><link href="css/fonts/font-awesome.min.css" rel="stylesheet" /><link rel="stylesheet" type="text/css" href="css/jquery.fancybox.css" media="all" /><link href="css/jquery-ui.css" rel="stylesheet" type="text/css" />

<!--[if lt IE 9]>
<script src="js/respond.min.js"></script>
<![endif]-->

<!--<script type="text/javascript" src="/js/maps.googleapis.com.mapindex.js"></script>-->
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBpUY0EiL1ID3uI5fdPBYNrrRlHLTj7ahI&v=3.exp&libraries=places&region=IN"></script>
<style>
.bus-unit { width: 26.333%; float: right; margin-bottom: 2px; }
.bus-unit label { font-size: 16px; float: left; color: #0076c0; line-height: 35px; padding-right: 10px; margin: 0; }
.bus-unit .form-control-02 { width: 50%; float: left; border-radius: 0px; }
.tabs-dropdown { float: left; width: 100%; height: auto; border-bottom: 1px solid #ffe78d; padding-bottom: 0; margin-top: 20px; }
.tabs-dropdown ul { float: left; width: auto; margin-top: 9px; }
.tabs-dropdown ul li { display: inline-block; }
.tabs-dropdown ul li input { background: none; color: #663300; border: none; padding: 5px 5px; }
.tabs-dropdown ul li input:hover { background: #0066cc; color: #FFF; }
.tabs-dropdown ul li input.active { background: #0066cc; color: #FFF; }
.home-map .locateus-div { border-left: 0; padding: 20px 6%; }
.home-map .g-map { height: 300px; }
.home-map .locateus-filter .lf-search { padding-top: 20px; }
.viewlink{ color:#333; line-height:30px; font-size:12px; }
@media (max-width : 980px) {
.bus-unit {width:48%;}
}
@media (max-width : 767px) {
.tabs-dropdown ul {width:100%; text-align:center;}
.tabs-dropdown ul li input{ font-size:11px;}
.bus-unit {width:100%; padding:15px 0; text-align:center;}
.bus-unit label {display:block; float:none; padding:0;}
.bus-unit .form-control-02 {float:none; display:inline-block;}
}
</style>
    <title>

</title></head>
    <body>
<form method="post" action="mapIndex.aspx" id="form1">
<input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="Cr9LMOG15cngN//KP16zbK7zkm7rHporfYNIqXru+pDEnLb4wvOWaMDkUI7QoNlmyR4PCqjAIGlt04WsBavvpnwFQzo=" />

<input type="hidden" name="__VIEWSTATEGENERATOR" id="__VIEWSTATEGENERATOR" value="6385B78C" />
<input type="hidden" name="__VIEWSTATEENCRYPTED" id="__VIEWSTATEENCRYPTED" value="" />
      <div class="home-map">
    	<div class="yallow-bg">
          <div class="container">
        <div class="row">
			<div class="col-sm-12">
				<div class="tabs-dropdown" >
					<ul>
						<li>
							<input id="btnFuleStation" type="button" value="Pump Locator / Fuel Station Locator" name="Pump Locator / Fuel Station Locator" />
						</li>
						<li>
							<input id="btnOfficeMap" type="button" value="Offices Map Locator" name="Offices Map Locator" />
						</li>
						<li>
							<input id="btnViewPrices" style="display:none" type="button" value="View Prices" name="View Prices" />
						</li>              
					</ul>
					<div class="bus-unit" id="ddlBusList">
						<label>Select Business Unit:</label>
						<select  class="form-control-02" ID="ddlBu">
							<option value="1">Fuels &amp; Services</option>
							<option value="2">Bharatgas</option>
							<option value="3">Refinery</option>
							<option value="4">Aviation</option>
							<option value="5">Gas</option>
							<option value="6">I&C</option>
							<option value="7">Lubricants</option>				  
						</select>
					</div>
				</div>
			</div>
		  <div class="col-sm-12 view-price" >   
				<a class="viewlink" href="http://rtc.bpc.co.in:8080/smartmap/map.jsp" target="_blank" Title="View Prices">View Prices</a> 
			</div>
            </div>
      </div>
        </div>

   

    <div class="container-fluid" id="idContainer">


       <div id="idContainer" class="container">
        
      	
        	<div class="row locateus-filter">
                <div class="col-sm-12" style="text-align:center;">                	
                    <label style="color:#007ec4; font-size:20px; padding-bottom:20px; font-weight:bold;">LOCATE A PUMP/FUEL STATION ON YOUR ROUTE</label>
            	</div>
            	
                <div class="col-sm-4">
                	<label class="loc">MY LOCATION</label>
                    <input name="" type="text" id="startvalue" class="form-control-02">
            	</div>
                <div class="col-sm-4">
                	<label class="dest">DESTINATION</label>
                    <input name="" type="text" id="endvalue" class="form-control-02">
            	</div>
                <div class="col-sm-4" id="filterServices">
                	<label class="srch">AMENITIES</label>
                    <select name="" class="form-control-02" id="ddlSearchAmenities">
                         <option value='0'>All Amenities</option>
                         <option value='2'>PFS</option>
                    	 <option value='1'>Petrocard,Fleetcard</option>
                         <option value='21'>Platinum</option>
                         <option value='3'>Automation</option>
                         <option value='4'>Speed</option>
                         <option value='5'>In & Out</option>
                         <option value='6'>Atm</option>
                         
                         <option value='8'>CNG</option>
                         <option value='9'>LPG</option>
                         <option value='10'>Parking</option>
                         <option value='11'>Smart fleet customer care centre</option>
                         <option value='12'>Vehicle service center</option>
                         <option value='13'>Dhaba</option>
                         <option value='14'>Dormitory</option>
                         <option value='15'>Bath</option>
                         <option value='16'>Laundry</option>
                         <option value='17'>Cooking</option>
                         <option value='18'>Emergency</option>
                         <option value='19'>Cut on Divider</option>
                         
                    </select>
            	</div>
                <div class="col-sm-12 lf-search">
                	<input name="" type="button" value="Search >" id="search" class="btn-blue">
                </div>
            </div>
            
            <div class="row locateus-map">
                
                <span id="lblMessage" class="errormsg"></span>
                
                <div class="loader" id="loaderimg">
                    <center>
                       <img class="loading-image" src="images/loader.gif" alt="loading.." />
                    </center>
                </div>
                
            	<div class="col-sm-12">
                  <div id="map_canvas" class="g-map" style="border: 1px solid black;"></div>
                </div>
            </div>
            
         
    </div>
      </div>
     
    
		 <!--STARTS : Locate Us-->
    <div class="mapIframe adlet-3-div container" id="mapIframe"><iframe src="Our-Businesses/Fuels-and-Services/Ajaxmap.aspx" style=" height:100%; width:100%; border:0px;"></iframe></div>
    <!--ENDS : Locate Us--> 
  </div>
    
<script>var testArray = new Array();testArray.push('aminites-icon01_petro_card.jpg');testArray.push('aminites-icon02_pure_for_sure.jpg');testArray.push('aminites-icon03_automation.jpg');testArray.push('aminites-icon04_speed.jpg');testArray.push('aminites-icon05_in_out.jpg');testArray.push('aminites-icon06_atm.jpg');testArray.push('aminites-icon07_toilet.jpg');testArray.push('aminites-icon08_cng.jpg');testArray.push('aminites-icon09_lpg.jpg');testArray.push('aminites-icon10_parking.jpg');testArray.push('aminites-icon11_customer_care_smart_fleet.jpg');testArray.push('aminites-icon12_vehicle_service_centre.jpg');testArray.push('aminites-icon13_dhaba.jpg');testArray.push('aminites-icon14_ghar.jpg');testArray.push('aminites-icon15_shower.jpg');testArray.push('aminites-icon16_laundary.jpg');testArray.push('aminites-icon17_cooking.jpg');testArray.push('aminites-icon18_emergency.jpg');testArray.push('aminites-icon19_cutondividar.jpg');testArray.push('aminites-icon20_water.jpg');testArray.push('aminites-icon21_identity_card.jpg');</script></form>
<script src="js/enscroll-0.6.1.min.js" type="text/javascript"></script><!--EN-Scroll--> 

<script type="text/javascript">
    
		$(document).ready(function() {
		/* --------------------- */
		/* START : enscroll   */
			$("#btnFuleStation").addClass("active");
			$('#ddlBusList').hide();
			$("#btnFuleStation").click(function(){

				//alert(1);
				$('#ddlBusList').hide();
				$("#idContainer").show();
				$("#mapIframe").hide();
				$("#btnFuleStation").addClass("active");
				$("#btnOfficeMap").removeClass("active");
			});

			$("#btnOfficeMap").click(function(){
				//alert(2);removeClass( "blue" );
				
				$('#ddlBusList').show();
				$("#idContainer").hide();
				$("#mapIframe").show();	
				$("#btnFuleStation").removeClass("active");
				$("#btnOfficeMap").addClass("active");
            });
            
            $("#btnViewPrices").click(function () {
                window.open('http://www.smartfleetonline.co.in/smartmap/locatemap.html', '_blank');
            });


            var basePath = "https://www.bharatpetroleum.com/";
		    $("#ddlBu").change(function() {


		        if ($("#ddlBu :selected").text() == "Fuels & Services") {

		            $("#mapIframe").empty();
		            /*$("#mapIframe").append('<iframe src="https://www.bharatpetroleum.com/'&#32;+&#32;basePath&#32;+&#32;'Our-Businesses/Fuels-and-Services/Ajaxmap.aspx" style="eight:100%; width:100%;"></iframe>');*/
					$("#mapIframe").append('<iframe src="Our-Businesses/Fuels-and-Services/Ajaxmap.aspx" style="eight:100%; width:100%;"></iframe>');

		        }
		        if ($("#ddlBu :selected").text() == "Bharatgas") {

		            /*$("#mapIframe iframe").attr('src', basePath + 'Our-Businesses/Bharatgas/AjaxBharatGasmap.aspx');*/
					$("#mapIframe iframe").attr('src', 'Our-Businesses/Bharatgas/AjaxBharatGasmap.aspx');

		        }
		        if ($("#ddlBu :selected").text() == "Aviation") {

		            $("#mapIframe").empty();
		            /*$("#mapIframe").append('<iframe src="https://www.bharatpetroleum.com/'&#32;+&#32;basePath&#32;+&#32;'Our-Businesses/Aviation/AjaxAviationmap.aspx" style="eight:100%; width:100%;"></iframe>');*/
					$("#mapIframe").append('<iframe src="Our-Businesses/Aviation/AjaxAviationmap.aspx" style="eight:100%; width:100%;"></iframe>');

		        }
		        if ($("#ddlBu :selected").text() == "Gas") {

		            $("#mapIframe").empty();
		            /*$("#mapIframe").append('<iframe src="https://www.bharatpetroleum.com/'&#32;+&#32;basePath&#32;+&#32;'Our-Businesses/gas/AjaxGasmap.aspx" style="eight:100%; width:100%;"></iframe>');*/
					$("#mapIframe").append('<iframe src="Our-Businesses/gas/AjaxGasmap.aspx" style="eight:100%; width:100%;"></iframe>');

		        }
		        if ($("#ddlBu :selected").text() == "I&C") {

		            $("#mapIframe").empty();
		            /*$("#mapIframe").append('<iframe src="https://www.bharatpetroleum.com/'&#32;+&#32;basePath&#32;+&#32;'Our-Businesses/I&amp;C/Ajaxiandcmap.aspx" style="eight:100%; width:100%;"></iframe>');*/
					$("#mapIframe").append('<iframe src="Our-Businesses/I&amp;C/Ajaxiandcmap.aspx" style="eight:100%; width:100%;"></iframe>');

		        }
		        if ($("#ddlBu :selected").text() == "Refinery") {

		            $("#mapIframe").empty();
		            /*$("#mapIframe").append('<iframe src="https://www.bharatpetroleum.com/'&#32;+&#32;basePath&#32;+&#32;'Our-Businesses/Refineries/AjaxRefinerymap.aspx" style="eight:100%; width:100%;"></iframe>');*/
					$("#mapIframe").append('<iframe src="Our-Businesses/Refineries/AjaxRefinerymap.aspx" style="eight:100%; width:100%;"></iframe>');

		        }
				if ($("#ddlBu :selected").text() == "Lubricants") {

				    $("#mapIframe").empty();
				    /*$("#mapIframe").append('<iframe src="https://www.bharatpetroleum.com/'&#32;+&#32;basePath&#32;+&#32;'Our-Businesses/MAK-Lubricants/AjaxMakLub.aspx" style="eight:100%; width:100%;"></iframe>');*/
					$("#mapIframe").append('<iframe src="Our-Businesses/MAK-Lubricants/AjaxMakLub.aspx" style="eight:100%; width:100%;"></iframe>');

		        }




		    });
		/* ENDS : enscroll   */
		}); // End document.ready
		$(window).load(function(e){
			$("#mapIframe").hide();
		});
    </script> 
<script type="text/javascript" src="js/jquery.fancybox.pack.js"></script> 
<script type="text/javascript" src="js/json2.js"></script> 
<script type="text/javascript">

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
    var click = 0;
    var prevStartValue = "";
    var prevDestValue = "";
    var newStartValue = "";
    var newDestValue = "";
    var imgTitle = ["Petrocard,Fleetcard", "Pure For Sure", "Automation", "Speed", "In-Out", "ATM", "Toilet", "CNG", "Auto LPG", "Secured Parking", "Smart Fleet Customer Care", "Vehical Service Center", "Dhaba", "Dormitory", "Bath", "Loundry", "Cooking", "Emergency", "Cut On Divider", "Water", "Platinum"];

    $(document).ready(function () {
        $(".various").fancybox({
            maxWidth: 700,
            maxHeight: 600,
            fitToView: false,
            width: '90%',
            height: '80%',
            autoSize: false,
            closeClick: false,
            openEffect: 'none',
            closeEffect: 'none'
        });

        //$('#filterServices').css("display", "none");

        //InitializeLocation();
        InitializeMap();
        //$("#search").focus();
        $(document).keydown(function (e) {
            if (e.keyCode == 13) {
                $("#search").focus();
            }
        });

        $('#startvalue').keydown(function (e) {
            //alert('hiii');
            click = 0;
        });
        $('#endvalue').keydown(function (e) {
            click = 0;
        });

        $('#search').on('click', function (e) {

            //$('#ddlSearchAmenities option:eq(0)').attr('selected', 'selected');
            //$('#ddlSearchAmenities').val(0);
            var testDdl = 0;
            click = 1;
            document.getElementById("map_canvas").style.display = "block";
            if (flag === 1) {
                document.getElementById("lblMessage").innerHTML = "";
            }
            if (flag1 === 1) {
                document.getElementById("lblMessage").innerHTML = "";
            }
            flag = 0;
            flag1 = 0;
            source = document.getElementById('startvalue').value;
            dest = document.getElementById('endvalue').value;
            newStartValue = document.getElementById('startvalue').value.toLowerCase();
            newDestValue = document.getElementById('endvalue').value.toLowerCase();
            if (source == null || source == "") {
                alert('Please Enter Source Location..');
                $('#startvalue').focus();
            } else if (dest == null || dest == "") {
                if (newStartValue != prevStartValue) {
                    $('.loader').show();
                    InitializeMap();
                    FuelLocatorByCity();
                }
            } else if ((dest != null || dest != "") && (source != null || source != "")) {
                if (newStartValue != prevStartValue || prevDestValue != newDestValue) {
                    if (newStartValue == prevDestValue && newDestValue == prevStartValue) {

                    }
                    else {
                        $('.loader').show();
                        FuelLocatorByRoute();
                    }
                }
            }
        });



    });


    $(document).ready(function () {
        
        $('#ddlSearchAmenities').change(function () {
            //alert('hiiii');
            if (click === 1) {
                document.getElementById("lblMessage").innerHTML = "";
                $('.loader').show();
                var selectedAmenitiesValue = document.getElementById("ddlSearchAmenities").value;
                //            if (selectedAmenitiesValue == 0) {
                //                //alert('Do Nothing...');
                //            }
                //            else {
                //alert(selectedAmenitiesValue);
                searchBySelectedAmenities(selectedAmenitiesValue);
            }
            //}
        });

    });




    function InitializeLocation() {
        geocoder = new google.maps.Geocoder();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
        function showPosition(position) {
            var lati = position.coords.latitude;
            var longi = position.coords.longitude;
            codeLatLng(lati, longi);
        }
        function codeLatLng(lat, lng) {
            var latlng = new google.maps.LatLng(lat, lng);
            geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    //console.log(results)
                    if (results[1]) {
                        //formatted address
                        //alert(results[0].formatted_address)
                        //find country name
                        for (var i = 0; i < results[0].address_components.length; i++) {
                            for (var b = 0; b < results[0].address_components[i].types.length; b++) {

                                //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                                if (results[0].address_components[i].types[b] == "locality") {
                                    //this is the object you are looking for
                                    city = results[0].address_components[i];
                                    break;
                                }
                            }
                        }
                        //city data
                        //alert(city.short_name);
                        document.getElementById("startvalue").value = city.short_name;
                    } else {
                        alert("No results found");
                    }
                } else {
                    alert("Geocoder failed due to: " + status);
                }
            });
        }
    }

    function InitializeMap() {
        directionsDisplay = new google.maps.DirectionsRenderer();
        var startlocation = new google.maps.LatLng(21.0000, 78.0000);
        var myOptions = {
            zoom: 5,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            //draggableCursor: "pointer",
            center: startlocation
        }
        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        directionsDisplay.setMap(map);
//        marker = new google.maps.Marker({
//            position: startlocation,
//            map: map,
//            animation: google.maps.Animation.Animate,
//            icon: "/images/location_icon.png"
//        });
//        google.maps.event.addListener(marker, 'click', function () {
//            if (!infowindow) {
//                infowindow = new google.maps.InfoWindow();
//            }
//            var desc = '<div class="map-content" style="display:block;">' +
//        	                                    '<div class="location">' +
//            	                                    '<div class="left">' +
//                	                                    '<img src="images/bpcl_logo.jpg" alt="Location Image" />' +
//                                                    '</div>' +
//                                                    '<div class="right">' +
//                	                                    '<h2>Bharat Petroleum Corporation</h2>' +
//                                                        '<p>Regd. Office: Bharat Bhavan, 4 and 6 Currimbhoy Road, Ballard Estate, Mumbai 400001<p>' +
//                                                        '<p>Tel: 022-22713000, 022-22714000</p>' +
//                                                        '<p>Fax: 022-22713874</p>' +
//                                                   '</div>' +
//                                                '</div>' +
//                                            '</div>';
//            infowindow.setContent(desc);
//            infowindow.open(map, marker);
//        });
        var stratinput = /** @type {HTMLInputElement} */(
        document.getElementById('startvalue'));
        var startautocomplete = new google.maps.places.Autocomplete(stratinput);
        var endinput = /** @type {HTMLInputElement} */(
        document.getElementById('endvalue'));
        var endautocomplete = new google.maps.places.Autocomplete(endinput);
    }

    function FuelLocatorByCity() {
        clearMarkers();

        finalDestination = "";
        origin = document.getElementById('startvalue').value;
        var origin1 = origin.split(",");

        $.ajax({
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ strCity: origin }),

            async: false,
            url: "mapIndex.aspx/GetFuelLocatorOfCity",
            dataType: "json",
            success: function (response) {
                var obj = JSON.stringify(response.d);
                var json = $.parseJSON(obj);
                var arr = [];
                $.each(json, function (index, loc) {
                    var Ro_Name = loc.strRo_Name;
                    var Sapcc = loc.strSapcc;
                    var Address1 = loc.strAddress1;
                    var State = loc.strState;
                    var City = loc.strCity;
                    var Pin = loc.strPinCode;
                    var services = loc.strServices;
                    var policestnname = loc.strPoliceStnName;
                    var policestnno = loc.strPoliceStnNo;
                    var hospitalname = loc.strHospitalName;
                    var hospitalno = loc.strHospitalNo;
                    var strLat2 = parseFloat(loc.intLattitude);
                    var strLag2 = parseFloat(loc.intLogitude);


                    var ltlng = [];

                    ltlng.push(new google.maps.LatLng(strLat2, strLag2));



                    if (Ro_Name == "null" || Ro_Name == "0") {

                        Ro_Name = "";
                    }
                    if (Address1 == "null" || Address1 == "0") {

                        Address1 = "";
                    }
                    if (State == "null" || State == "0") {

                        State = "";
                    }
                    if (City == "null" || City == "0") {

                        City = "";
                    }
                    if (Pin == "null" || Pin == "0") {

                        Pin = "";
                    }
                    if (policestnname == "null" || policestnname == "0") {

                        policestnname = "";
                    }
                    if (policestnno == "null" || policestnno == "0") {

                        policestnno = "";
                    }
                    if (hospitalname == "null" || hospitalname == "0") {

                        hospitalname = "";
                    }
                    if (hospitalno == "null" || hospitalno == "0") {

                        hospitalno = "";
                    }
                    if (services == "null" || services == "0") {

                        services = "00000010000000000001";
                    }

                    finalDestination += Ro_Name;
                    finalDestination += "~" + Sapcc;
                    finalDestination += "~" + Address1;
                    finalDestination += "~" + State;
                    finalDestination += "~" + City;
                    finalDestination += "~" + Pin;
                    finalDestination += "~" + services;
                    finalDestination += "~" + policestnname;
                    finalDestination += "~" + policestnno;
                    finalDestination += "~" + hospitalname;
                    finalDestination += "~" + hospitalno;
                    finalDestination += "~" + parseFloat(loc.intLattitude);
                    finalDestination += "~" + parseFloat(loc.intLogitude);
                    finalDestination += "#";


                });

            },
            error: function () {
                alert("Error");
            }
        });
        prevStartValue = document.getElementById('startvalue').value.toLowerCase();
        selectedAmenitiesValue = document.getElementById("ddlSearchAmenities").value;
        searchBySelectedAmenities(selectedAmenitiesValue, 0);
        $('.loader').hide();

    }

    /*Find Location for Route*/

    function FuelLocatorByRoute() {
        InitializeMap();
        finalDestination = "";

        origin = document.getElementById('startvalue').value;
        destination = document.getElementById('endvalue').value;
        if (origin == null) {
            origin = document.getElementById('startvalue').value;
            addMarker(origin);
        } else if (destination == null) {
            destination = document.getElementById('endvalue').value;
            addMarker(destination);
        }
        function addMarker(latlng) {
            markers.push(new google.maps.Marker({
                position: latlng,
                map: map,
                animation: google.maps.Animation.Animate,
                icon: "https://maps.google.com/mapfiles/marker" + String.fromCharCode(markers.length + 65) + ".png"
            }));
        }
        var mode = google.maps.DirectionsTravelMode.DRIVING;
        var request = {
            origin: origin,
            destination: destination,
            waypoints: waypoints,
            travelMode: mode,
            optimizeWaypoints: true,
            avoidHighways: false
        };
        directionsService1.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                var format = "raw";
                response.routes[0].bounds.getCenter.lng
                PointsArray = response.routes[0].overview_path;
                noOfCords = PointsArray.length;
                var vertexLatLng = "";
                var j = 0;
                var tempLatLng = "";
                for (var i = 0; i < noOfCords; i++) {
                    j = i;
                    tempLatLng = PointsArray[i].lat().toString() + "~" + PointsArray[i].lng().toString();
                    if (vertexLatLng != "") {
                        vertexLatLng += "#";
                    }
                    vertexLatLng += tempLatLng;
                    if (((i % 50 == 0) && i != 0) || i == noOfCords - 1) {
                        $.ajax({
                            type: "POST",
                            contentType: "application/json",
                            data: JSON.stringify({ polyLatLng: vertexLatLng }),
                            async: false,
                            url: "mapIndex.aspx/GetFuelLocatorByRoute",
                            dataType: "json",
                            success: function (response) {
                                var obj = JSON.stringify(response.d);
                                var json = $.parseJSON(obj);

                                $.each(json, function (index, loc) {
                                    var Ro_Name = loc.strRo_Name;
                                    var Sapcc = loc.strSapcc;
                                    var Address1 = loc.strAddress1;
                                    var State = loc.strState;
                                    var City = loc.strCity;
                                    var Pin = loc.strPinCode;
                                    var services = loc.strServices;
                                    var policestnname = loc.strPoliceStnName;
                                    var policestnno = loc.strPoliceStnNo;
                                    var hospitalname = loc.strHospitalName;
                                    var hospitalno = loc.strHospitalNo;
                                    var strLat1 = parseFloat(loc.intLattitude);
                                    var strLag1 = parseFloat(loc.intLogitude);


                                    var ltlng = [];
                                    var price = "Price";

                                    ltlng.push(new google.maps.LatLng(strLat1, strLag1));
                                    var imgs = new Array();
                                    for (i = 0; i < testArray.length; i++) {
                                        imgs.push("/images/locate_us/smallmap1/" + testArray[i]);
                                    }
                                    if (Ro_Name == "null" || Ro_Name == "0") {

                                        Ro_Name = "";
                                    }
                                    if (Address1 == "null" || Address1 == "0") {

                                        Address1 = "";
                                    }
                                    if (State == "null" || State == "0") {

                                        State = "";
                                    }
                                    if (City == "null" || City == "0") {

                                        City = "";
                                    }
                                    if (Pin == "null" || Pin == "0") {

                                        Pin = "";
                                    }
                                    if (policestnname == "null" || policestnname == "0") {

                                        policestnname = "";
                                    }
                                    if (policestnno == "null" || policestnno == "0") {

                                        policestnno = "";
                                    }
                                    if (hospitalname == "null" || hospitalname == "0") {

                                        hospitalname = "";
                                    }
                                    if (hospitalno == "null" || hospitalno == "0") {

                                        hospitalno = "";
                                    }
                                    if (services == "null" || services == "0") {

                                        services = "00000010000000000001";
                                    }


                                    finalDestination += Ro_Name;
                                    finalDestination += "~" + Sapcc;
                                    finalDestination += "~" + Address1;
                                    finalDestination += "~" + State;
                                    finalDestination += "~" + City;
                                    finalDestination += "~" + Pin;
                                    finalDestination += "~" + services;
                                    finalDestination += "~" + policestnname;
                                    finalDestination += "~" + policestnno;
                                    finalDestination += "~" + hospitalname;
                                    finalDestination += "~" + hospitalno;
                                    finalDestination += "~" + parseFloat(loc.intLattitude);
                                    finalDestination += "~" + parseFloat(loc.intLogitude);
                                    finalDestination += "#";


                                });

                            },
                            error: function (objErr) {
                                alert("Error");
                                console.log(objErr);
                            }
                        });
                        vertexLatLng = "";
                        i = j;
                    }
                }
                prevStartValue = document.getElementById('startvalue').value.toLowerCase();
                prevDestValue = document.getElementById('endvalue').value.toLowerCase();
                selectedAmenitiesValue = document.getElementById("ddlSearchAmenities").value;
                searchBySelectedAmenities(selectedAmenitiesValue, 1);
                $('.loader').hide();

            }
        });
    }

    /*End Of Route Finding code*/


    function searchBySelectedAmenities(selectedAmenitiesValue, intFunFlag) {

        flag1 = 0
        clearMarkers();

        origin = document.getElementById('startvalue').value;
        destination = document.getElementById('endvalue').value;

        $.ajax({
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ finalString: finalDestination, searchValue: selectedAmenitiesValue }),
            async: false,
            url: "mapIndex.aspx/searchAmenities",
            dataType: "json",
            success: function (response) {
                var obj = JSON.stringify(response.d);
                var json = $.parseJSON(obj);

                $.each(json, function (index, loc) {
                    var Ro_Name = loc.strRo_Name;
                    var Sapcc = loc.strSapcc;
                    var Address1 = loc.strAddress1;
                    var State = loc.strState;
                    var City = loc.strCity;
                    var Pin = loc.strPinCode;
                    var services = loc.strServices;
                    var policestnname = loc.strPoliceStnName;
                    var policestnno = loc.strPoliceStnNo;
                    var hospitalname = loc.strHospitalName;
                    var hospitalno = loc.strHospitalNo;
                    var strLat = parseFloat(loc.intLattitude);
                    var strLag = parseFloat(loc.intLogitude);

                    var SpaccImage = loc.strSpaccImage;
                    var SpaccImageUrl = loc.strSpaccImageUrl;

                    var ltlng = [];
                    var price = "Price";
                    ltlng.push(new google.maps.LatLng(strLat, strLag));
                    var imgs = new Array();
                    for (i = 0; i < testArray.length; i++) {
                        imgs.push("/images/locate_us/smallmap1/" + testArray[i]);
                    }
                    if (Ro_Name == "null" || Ro_Name == "0") {

                        Ro_Name = "";
                    }
                    if (Address1 == "null" || Address1 == "0") {

                        Address1 = "";
                    }
                    if (State == "null" || State == "0") {

                        State = "";
                    }
                    if (City == "null" || City == "0") {

                        City = "";
                    }
                    if (Pin == "null" || Pin == "0") {

                        Pin = "";
                    }
                    if (policestnname == "null" || policestnname == "0") {

                        policestnname = "";
                    }
                    if (policestnno == "null" || policestnno == "0") {

                        policestnno = "";
                    }
                    if (hospitalname == "null" || hospitalname == "0") {

                        hospitalname = "";
                    }
                    if (hospitalno == "null" || hospitalno == "0") {

                        hospitalno = "";
                    }
                    if (services == "null" || services == "0") {

                        services = "00000010000000000001";
                    }




                    finalDestination += Ro_Name;
                    finalDestination += "~" + Sapcc;
                    finalDestination += "~" + Address1;
                    finalDestination += "~" + State;
                    finalDestination += "~" + City;
                    finalDestination += "~" + Pin;
                    finalDestination += "~" + services;
                    finalDestination += "~" + policestnname;
                    finalDestination += "~" + policestnno;
                    finalDestination += "~" + hospitalname;
                    finalDestination += "~" + hospitalno;
                    finalDestination += "~" + parseFloat(loc.intLattitude);
                    finalDestination += "~" + parseFloat(loc.intLogitude);
                    finalDestination += "#";

                    var imgs = new Array();

                    for (i = 0; i < testArray.length; i++) {

                        imgs.push("/images/locate_us/smallmap1/" + testArray[i]);
                    }
                    var imgServices = "";
                    var imgFlag = 0;

                    var lastImg = imgs.length;
                    for (i = 0; i < imgs.length - 1; i++) {
                        imgFlag = 0;
                        if (i == 6) {
                            imgServices += '<li><img src="https://www.bharatpetroleum.com/'&#32;+&#32;imgs[i]&#32;+&#32;'" title="' + imgTitle[i] + '" /></li>';
                            imgFlag = 1;
                        }
                        if (i == 19) {
                            imgServices += '<li><img src="https://www.bharatpetroleum.com/'&#32;+&#32;imgs[i]&#32;+&#32;'" title="' + imgTitle[i] + '" /></li>';
                            imgFlag = 1;
                        }
                        if (services[i] == "1" || services[i] == "2") {
                            if (imgFlag == 0) {
                                if (services[i] == "2") {
                                    imgServices += '<li><img src="https://www.bharatpetroleum.com/'&#32;+&#32;imgs[lastImg&#32;-&#32;1]&#32;+&#32;'" title="' + imgTitle[lastImg - 1] + '" /></li>';
                                }
                                else {
                                    imgServices += '<li><img src="https://www.bharatpetroleum.com/'&#32;+&#32;imgs[i]&#32;+&#32;'" title="' + imgTitle[i] + '" /></li>';
                                }
                            }

                        }
                    }
                    if (SpaccImageUrl) {
                        imgServices += SpaccImageUrl;
                    }


                    for (var i = 0; i <= ltlng.length; i++) {
                        marker = new google.maps.Marker({
                            map: map,
                            position: ltlng[i],
                            animation: google.maps.Animation.Animate,
                            icon: "/images/location_icon.png"
                        });
                        markers.push(marker);
                        flag1 = 1;
                        if (i === 0 && intFunFlag === 0) {
                            map.setCenter(ltlng[i]);
                            map.setZoom(11);
                        }
                        (function (i, marker) {
                            google.maps.event.addListener(marker, 'click', function () {
                                if (!infowindow) {
                                    infowindow = new google.maps.InfoWindow();
                                }
                                if (imgServices.length > 0) {
                                    var desc = '<div class="map-content" style="display:block;">' +
        	                                            '<div class="location">' +
            	                                            '<div class="left">' +
                	                                            '<img src="images/locate_us/locate-img.jpg" alt="Location Image">' +
                                                            '</div>' +
                                                            '<div class="right">' +
                	                                            '<h2>' + Ro_Name + '</h2>' +
                                                                '<p>' + Address1 + ',&nbsp;' + City + '<br>' + State + '&nbsp;' + Pin +
                                                                '</p>' +
                                                            '</div>' +
                                                        '</div>' +
                                                        '<div class="amenities">' +
            	                                            '<p>Amenities</p>' +
                                                            '<ul>' +
                	                                              imgServices +

                                                            '</ul>' +
                                                        '</div>' +

                                                    '</div>';
                                }
                                else {
                                    var desc = '<div class="map-content" style="display:block;">' +
        	                                            '<div class="location">' +
            	                                            '<div class="left">' +
                	                                            '<img src="images/locate_us/locate-img.jpg" alt="Location Image">' +
                                                            '</div>' +
                                                            '<div class="right">' +
                	                                            '<h2>' + Ro_Name + '</h2>' +
                                                                '<p>' + Address1 + ',&nbsp;' + City + '<br>' + State + '&nbsp;' + Pin +
                                                                '</p>' +
                                                            '</div>' +
                                                        '</div>';
                                }
                                infowindow.setContent(desc);
                                infowindow.open(map, marker);
                            });
                        })(i, marker);
                    }
                });
            },
            error: function (objErr) {
                alert("Error");
                console.log(objErr);
            }
        });
        vertexLatLng = "";
        // }
        // }
        $('.loader').hide();
        if (flag1 === 0) {
            document.getElementById("map_canvas").style.display = "none";
            document.getElementById("loaderimg").style.display = "none";
            document.getElementById("lblMessage").innerHTML = "There are no Fuel Stations for selected Location and Amenities, Please try again!";
        }
        if (flag1 === 1) {
            document.getElementById("map_canvas").style.display = "block";
            document.getElementById("loaderimg").style.display = "none";
            document.getElementById("lblMessage").innerHTML = "";
        }

    }




    function clearMarkers() {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }

    }
    function clearWaypoints() {
        markers = [];
        marker1 = [];
        origin = null;
        destination = null;
        waypoints = [];
    }
    function reset() {

        clearMarkers();
        clearWaypoints();
        directionsDisplay.setMap(null);
        directionsDisplay.setPanel(null);
        directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);
    }  
</script>
</body>
</html>
