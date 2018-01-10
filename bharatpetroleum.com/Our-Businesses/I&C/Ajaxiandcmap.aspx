


<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1"><link href="../../css/common.css" rel="stylesheet" /><link href="../../css/fonts/font.css" rel="stylesheet" /><link href="../../css/innerpage.css" rel="stylesheet" /><title>

</title></head>
<body>
<form method="post" action="Ajaxiandcmap.aspx" id="Form1">
<input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="Hi5dBqv/5tHZNGcnmqhG8nOT0FX+d34IgtYMQYFuCnwwPIqwURwuVfedAAfvPSnExSLDYOA1WG+oTskIviIHJLwCBwWmRdIilLoqfYigyZiGuloSm8VWNbIq0jXqGdqAz/pNlACNJjDRywztXvUfktcA1o3k5cNdr1arCMsV2QstMOBaXtMIC0IMm4j6QQd8bO+rb8ZeRRS+o32VVNjAITUH3evQ5ulpRj9Cwpf4KCOajqX9GsV/mHKA+TYsbAhpbn6szehxYGSHisWpLUCJI40Loh/z31tC6rix6jaTWZhVhUM3HzhXTGh3w6qqmonZQsT9Is0k+Da+DxcLsjbemuMuLODWK1op8j3AJdlO8hkXPuWfMCJ/evc1aqn8ZA7aEUqy2qoEq065g5ZvkIUWsHUAwlrRgs7XLIJlR7r+I+mZ7IXyYvvS99VS/xTVj9YuYV/6zIW7vsXIEK9l9umE+++svhoZYAXVjaEs+ckHupcYbnPI6tG284CYolbr8M1YgF6ekHf++51kt1CfLtzykGYxPVt3SY2ua5XpRwOw55FrKiDQX9CtfTQBEeV0p0pH2zsnd4SdPrAsWH/ocyO7XnN+CWYbjVrE7ty/rfCyIfG3bx88QNLxOItoOKyaxxdcVO9EPCPYSo+YkjbXoY97TSC1veg81Qmy6Wawn93kcG6XD07Z1zRpPWtSL93HAskDeLyeqYz3/w17jnl0Z/4sYdIEajUzsLcHlJ3y2fSB2+4BKDEh" />


<script src="../../ScriptResource.axd?d=Iqsgf3aQEsBaQwa7NDOjIGrT8-l8k8F_iQaO9qzegAzmX1JUPOTT0qulDCqteDuml3M9BEDr0Uo6UwJtu_Awksu9tszyZuYhaMlRd4FO73aUE2UO6jlL2wxDakJrSbSC5IIPT_aOj4sO-e2zhPrjUcPWBSA1&amp;t=72e85ccd" type="text/javascript"></script>
<input type="hidden" name="__VIEWSTATEGENERATOR" id="__VIEWSTATEGENERATOR" value="900C1D7E" />
<input type="hidden" name="__VIEWSTATEENCRYPTED" id="__VIEWSTATEENCRYPTED" value="" />
<input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="cOrYSuXOZ5x6hHkie24dA2LGNnmCE4YDtuqOuk0UhXBNn8Q5L+BLSQ6n9m14nLANNMOxT9BUKYRr70RgRR4UqwqvrRI67n3LdMOejxiDmKxtjHFVnEoRpihKki0G4AYHqnDja2CQl44E91Q7935ttZN4Vs6pVOIbbEo4qx0tXL+lRwaKtQCCKdU47UvWiR9zgAB6zyCTkC4W/5MTY0ZOweJYdPP6ztoupYaWtMl4phR63bTtId6ha7ZTeHtVeUOqLiOLSjpCMbO4Xa0rpe3EATfvPeqyLbVIiXm32NDeWG9RVNW9qG/7gVjstouiA3fnaFTTqK2/+pxXCmigFo514XvSIocQb+GmoLP7aeuQbPDU7DPUtKqvPD9AXBUpKN7brO6ninDWFrv9Uj1a43fBMQ8irCBpVH8RhkW2+gKJQVkE5/YWS7hnaGUT66hZVx8giDcKzMSja9rjOiDnr14+PTejS3XuHmlttcHTlCp1G3hG4jS8" />
  
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

        /*
		$('#ddlType').hide();
		
		$('#ddlOffice').change(function(){
			if(!($('#ddlOffice').val() == "none")){
				$('#ddlType').show();
			}
		});

		*/

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


        google.maps.event.addDomListener(window, 'load', Initialize);
        //alert(321);



        $('#ddlType').change(function () {
			$("#divInnerHtml").empty();
			var varState = $('#ddlState').val();
            var varCity = $('#ddlCity').val();
            var varType = $('#ddlType').val();

            var varLanguage = $('#lblLanguage').html();

			  if (!(varState == "none")) {

                if (!(varCity == "none")) {

					
            
            

            $.ajax({
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({ strState: varState, strCity: varCity, strType: varType, strLanguage: varLanguage }),
                async: false,
                url: "Ajaxiandcmap.aspx/GetAllOfficeWithType",
                dataType: "json",
                success: function (response) {
                    var obj = JSON.stringify(response.d);
                    var json = $.parseJSON(obj);
                    var firstLatlng;
                    map = new google.maps.Map(document.getElementById('dvMap'), mapOptions);

                    $.each(json, function (index, loc) {
                        var ltlng = [];



                        var City = loc.City;
                        var Address = loc.Address;
                        var ContactNo = loc.ContactNo;
                        var strLat = loc.Latitude;
                        var strLag = loc.Longitude;
                        var Type = loc.Type;





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
																		'<img src="https://www.bharatpetroleum.com/images/locate_us/mapicons/I&amp;C.jpg" alt="Location Image">' +
																	'</div>' +
																	'<div class="right"><h2>' + Type + '</h2>' +

																		'<p>' + Address + ',&nbsp;</p><br>' +
																		'<p> Contact No : ' + ContactNo + '</p>' +
																	'</div>' +
																'</div>' +

															'</div>';
                                    //}

                                    infowindow.setContent(desc);
                                    infowindow.open(map, marker);
                                });
                            })(i, marker);

                            var strInnerHtml = "<div id='mapfrm' class='map-s-frm'>"
																+ "<h2>" + Type + "</h2>"
																+ "<p>" + Address + "<br>"
																+ "<p> Contact No : " + ContactNo + "</p></div>";
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
            } else {
                $("#divInnerHtml").empty();
				clearMap();
                $("#divInnerHtml").append("<span class='errormsg'>Please Select State</span>");

            }
        });


        $("#btnSubmit").click(function () {

            $("#divInnerHtml").empty();
            var varState = $('#ddlState').val();
            var varCity = $('#ddlCity').val();

            var varLanguage = $('#lblLanguage').html();



            if (!(varState == "none")) {

                if (!(varCity == "none")) {

					

						

                    $.ajax({
                        type: "POST",
                        contentType: "application/json",
                        data: JSON.stringify({ strState: varState, strCity: varCity, strLanguage: varLanguage }),
                        async: false,
                        url: "Ajaxiandcmap.aspx/GetAllOffice",
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



                                var City = loc.City;
                                var Address = loc.Address;
                                var ContactNo = loc.ContactNo;
                                var strLat = loc.Latitude;
                                var strLag = loc.Longitude;
                                var Type = loc.Type;





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
																		'<img src="https://www.bharatpetroleum.com/images/locate_us/mapicons/I&amp;C.jpg" alt="Location Image">' +
																	'</div>' +
																	'<div class="right"><h2>' + Type + '</h2>' +

																		'<p>' + Address + ',&nbsp;</p><br>' +
																		'<p> Contact No : ' + ContactNo + '</p>' +
																	'</div>' +
																'</div>' +

															'</div>';
                                            //}

                                            infowindow.setContent(desc);
                                            infowindow.open(map, marker);
                                        });
                                    })(i, marker);

                                    var strInnerHtml = "<div id='mapfrm' class='map-s-frm'>"
																+ "<h2>" + Type + "</h2>"
																+ "<p>" + Address + "<br>"
																+ "<p> Contact No : " + ContactNo + "</p></div>";
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
    <h2><span class="img_title"><img src="https://www.bharatpetroleum.com/images/icon_global.png" alt="Location">Industrial & Commercial Office Location Map</span></h2>
    <!-- <hr class="hr">-->
    <div class="row">
      <div class="col-sm-8 map-div">
        <div id="dvMap"></div>
        <div id="imageDiv"></div>
      </div>
      <div class="col-sm-4 map-filter">
        <span id="lblLanguage" style="display:none">English</span>
        <p>Locate your nearest Industrial & Commercial Office.</p>
        <div class="filter clearfix">
          <div id="upPannelInit">
	
              <select name="ddlState" id="ddlState">
		<option selected="selected" value="none">--Select State--</option>
		<option value="Chhattisgarh">Chhattisgarh</option>
		<option value="Delhi ">Delhi </option>
		<option value="Gujarat">Gujarat</option>
		<option value="Karnataka">Karnataka</option>
		<option value="Kerala">Kerala</option>
		<option value="Madhya Pradesh">Madhya Pradesh</option>
		<option value="Maharashtra">Maharashtra</option>
		<option value="Odisha">Odisha</option>
		<option value="Punjab ">Punjab </option>
		<option value="Rajasthan">Rajasthan</option>
		<option value="Tammil Nadu">Tammil Nadu</option>
		<option value="Telangana">Telangana</option>
		<option value="West Bengal">West Bengal</option>

	</select>
              <select name="ddlCity" id="ddlCity">
		<option value="none">--Select City--</option>

	</select>
            
</div>
          <select name="ddlOffice" id="ddlOffice">
	<option value="office">Office</option>

</select>
          <select name="ddlType" id="ddlType">
	<option value="hq">HQ</option>
	<option value="Territory office">Territory office</option>

</select>
          <input class="loc-search-new" type="button" value="Search" id="btnSubmit" />
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
