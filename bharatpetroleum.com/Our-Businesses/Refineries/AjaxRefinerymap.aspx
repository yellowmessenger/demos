


<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head><link href="../../css/common.css" rel="stylesheet" /><link href="../../css/fonts/font.css" rel="stylesheet" /><link href="../../css/innerpage.css" rel="stylesheet" /><title>

</title></head>
<body>
    <form method="post" action="AjaxRefinerymap.aspx" id="ctl01">
<input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="Wpjf9TtRYoPQfRMir+mIFFRnQGswVjH1qWDE8svNS9OuG9rBCv6fVlqGuWtXJiNPSZ9GJF5dWqH5j8D3cZIjlNd9Hm+SX4HlTkt1zy3eL6nHkEIFKLTQiqBIp5EC6Y3J8//00OQQ+LMKvRZGFxvP9ZtU/KU=" />


<script src="../../ScriptResource.axd?d=Iqsgf3aQEsBaQwa7NDOjIGrT8-l8k8F_iQaO9qzegAzmX1JUPOTT0qulDCqteDuml3M9BEDr0Uo6UwJtu_Awksu9tszyZuYhaMlRd4FO73aUE2UO6jlL2wxDakJrSbSC5IIPT_aOj4sO-e2zhPrjUcPWBSA1&amp;t=72e85ccd" type="text/javascript"></script>
<input type="hidden" name="__VIEWSTATEGENERATOR" id="__VIEWSTATEGENERATOR" value="755764FD" />
<input type="hidden" name="__VIEWSTATEENCRYPTED" id="__VIEWSTATEENCRYPTED" value="" />
<input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="305P9jZQ35TvQ9My7xzDGuPNwhfRV68mlSWTnanmdTwAPMcly7QpzdWNmfNL4pHZirIQ/zkAhv4lzDasJnik1ZqfWWPelpOVbiR8FxFeysH2vfNmsFDPn6kc7OP0Sj5x+q0S0v2hdzCpgsPTj042ZUJrgRHVEJLV9SXkQDe8UF29MVbT" />
 

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


        $("#btnSubmit").click(function () {

            $("#divInnerHtml").empty();

            var varCity = $('#ddlCity').val();
            var varLanguage = $('#lblLanguage').html();

			if (!(varCity == "none")) {
				$.ajax({
					type: "POST",
					contentType: "application/json",
					data: JSON.stringify({ strCity: varCity, strLanguage: varLanguage }),
					async: false,
					url: "AjaxRefinerymap.aspx/GetAllOffice",
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
							var strLat = loc.Latitude;
							var strLag = loc.Longitude;
							var infoWinIcon;

							if(city == "Mumbai") {
								infoWinIcon = "/images/locate_us/mapicons/Mumbai-refinery.jpg";
							} else {
								infoWinIcon = "/images/locate_us/mapicons/Kochi-refinery.jpg";
							}



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
									icon: "/images/locate_us/mapicons/I&C.png"
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
																	'<img src="https://www.bharatpetroleum.com/Our-Businesses/Refineries/'&#32;+&#32;infoWinIcon&#32;+&#32;'" alt="Location Image">' +
																'</div>' +
																'<div class="right">' +

																	'<p>' + address + '  ' + state + ' <br> ' + city + ',&nbsp;</p><br>' +

																'</div>' +
															'</div>' +

														'</div>';
										//}

										infowindow.setContent(desc);
										infowindow.open(map, marker);
									});
								})(i, marker);

								var strInnerHtml = "<div id='mapfrm' class='map-s-frm'>"

															+ "<p>" + address + '  ' + state + ' <br> ' + city + "<br>" +
														   "</div>";
							}
							//map.setZoom(13);


							$("#divInnerHtml").append(strInnerHtml);
						});
						if(!firstLatlng){
							$("#divInnerHtml").empty();
							clearMap();
							$("#divInnerHtml").append("<span class='errormsg'>No Data Found</span>");
						}
						map.setCenter(firstLatlng);
                },
                error: function (e) {
					$("#divInnerHtml").empty();
					clearMap();
					$("#divInnerHtml").append("<span class='errormsg'>No Data Found</span>");
                    //alert(JSON.stringify(e));
                    //alert("error");
                }
            });
			} else {
						$("#divInnerHtml").empty();
						clearMap();
						$("#divInnerHtml").append("<span class='errormsg'>Please Select City</span>");
						
		}
        });
    });



</script>


<script type="text/javascript">

    

</script> 
     <!--STARTS : Locate Us-->

    
    <div class="container-fluid locate-us-div">
        <div class="container">
            <h2><span class="img_title"><img src="https://www.bharatpetroleum.com/images/icon_global.png" alt="Location">Refinery Location Map</span></h2>
           <!-- <hr class="hr">-->
            <div class="row">
            
               
                <div class="col-sm-8 map-div">
                     <div id="dvMap"></div>
			
                    <div id="imageDiv"></div>
                </div>
		        
                <div class="col-sm-4 map-filter">
                    <span id="lblLanguage" style="display:none">English</span>
                    <p>Locate your nearest Refinery.</p>
                    
                     
                    <div class="filter clearfix">
                  
                    <div id="upPannelInit">
	                                       
                             
        
                            
                           
                            
                            


                            
</div>
                   <select name="ddlCity" id="ddlCity">
	<option value="none">Select City</option>
	<option value="mumbai">Mumbai</option>
	<option value="kochi">Kochi</option>

</select>
                    <input class="loc-search-new" type="button" value="Search" id="btnSubmit" />
                    </div>
                    <div class="map_search_item" >
                        <div id="divInnerHtml" ></div>
                        
                         <span id="lblMessageDisplay" class="errormsg"></span>
                    </div>
                     
                </div>
		
            </div>
        
    </div>
    </form>
</body>
</html>
