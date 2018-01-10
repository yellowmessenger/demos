


<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head><link href="../../css/common.css" rel="stylesheet" /><link href="../../css/fonts/font.css" rel="stylesheet" /><link href="../../css/innerpage.css" rel="stylesheet" /><title>

</title></head>
<body>
<form method="post" action="AjaxGasmap.aspx" id="ctl01">
<input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="0UQJ01GR/F8kcrKQpAtZrHTzMpTjSjWOaMDRNfLWeO79lBgJzixhtRcqLb5nKDTXC6jrtr+fwqLxy9e7iaKE6yq6FfbPiyBMjT5PeQWWzen/FI5R88mzJcDKpApi1ya8tk2LWP8Y0WDlit2zt1eXxP9CZfIT5bxYi0QC9Yd16K2M99aHD5R9fWlOvK1oEz7fE2S1e6wNZa9OniWXz9KnN6Z2DyqfflykX8dnxBZSdoC41aa/joI94CpLxtqYzneqRea8dJI8n7Ep1e0z5Ui7AKGauubbBd/l1U5NZL1Q2IUEHEvsLAca1vV21QiMJBxdgXs7rxUIdMci0FpmOBkU/rImz95vtb4eKrmlenyhuzznyqd9V9CLB9nS3woDSNTZ66S4KOgzoaW3AMvNWFhl+S0WtdNOVIudt8Bijtpy1nKjs+JvFJRTcr04IozfANM/uuHnhA==" />


<script src="../../ScriptResource.axd?d=Iqsgf3aQEsBaQwa7NDOjIGrT8-l8k8F_iQaO9qzegAzmX1JUPOTT0qulDCqteDuml3M9BEDr0Uo6UwJtu_Awksu9tszyZuYhaMlRd4FO73aUE2UO6jlL2wxDakJrSbSC5IIPT_aOj4sO-e2zhPrjUcPWBSA1&amp;t=72e85ccd" type="text/javascript"></script>
<input type="hidden" name="__VIEWSTATEGENERATOR" id="__VIEWSTATEGENERATOR" value="A958BB61" />
<input type="hidden" name="__VIEWSTATEENCRYPTED" id="__VIEWSTATEENCRYPTED" value="" />
<input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="IZUa/FJNSRihDi/8naPwOYbXCezkPiJxyDPAOylYVgoTbtPsk4ZxUjbjmKPkSddhwSyBJjc9FsXFDy843NA5QIZVf5EqN6g+at+I69aFVmVH3mNMJiUFef1WnZra2ZVfCPluww==" />
  
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


    $(document).ready(function () {

        function Initialize() {
            mapOptions = {
                 zoom: 4,
                center: india,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            map = new google.maps.Map(document.getElementById('dvMap'), mapOptions);
        }




        google.maps.event.addDomListener(window, 'load', Initialize);
        //alert(321);

        fillCity();

        function fillCity() {
            $('#ddlCity').empty();
            var varLanguage = $('#lblLanguage').html();

            $.ajax({
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({ strLanguage: varLanguage }),
                async: false,
                url: "AjaxGasmap.aspx/GetCity",
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

            $("#divInnerHtml").empty();
            //var varState = $('#ddlState').val();
            var varState = ' ';
            var varCity = $('#ddlCity').val();
            var varLanguage = $('#lblLanguage').html();

            if (!(varState == "none")) {

                if (!(varCity == "none")) {

                    $.ajax({
                        type: "POST",
                        contentType: "application/json",
                        data: JSON.stringify({ strState: varState, strCity: varCity, strLanguage: varLanguage }),
                        async: false,
                        url: "AjaxGasmap.aspx/GetAllOffice",
                        dataType: "json",
                        success: function (response) {
                            var obj = JSON.stringify(response.d);
                            var json = $.parseJSON(obj);
                            var firstLatlng;
							mapOptions = {
								zoom: 14,
								center: india
							};
                            map = new google.maps.Map(document.getElementById('dvMap'), mapOptions);

                            $.each(json, function (index, loc) {
                                var ltlng = [];

                                var state = loc.State;
                                var city = loc.City;
                                var Address = loc.Address;
                                var Office = loc.Office;
                                var RegionalOffice = loc.RegionalOffice;
                                var strLat = loc.Latitude;
                                var strLag = loc.Longitude;


                                var price = "Price";
                                ltlng.push(new google.maps.LatLng(strLat, strLag));


                                //alert(1);
                                if (!firstLatlng) {
                                    firstLatlng = ltlng[0];
                                }
                                for (var i = 0; i <= ltlng.length; i++) {
                                    marker = new google.maps.Marker({
                                        map: map,
                                        position: ltlng[i],
                                        animation: google.maps.Animation.Animate,
                                        icon: "/images/locate_us/mapicons/GAS.png"
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
																		'<img src="https://www.bharatpetroleum.com/images/locate_us/mapicons/Gas.jpg" alt="Location Image">' +
																	'</div>' +
																	'<div class="right">' +

																		'<p>' + Address + ',&nbsp;' + state + '<br>' + city + '&nbsp;' +
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

																+ "<p>" + Address + "<br>"
																+ "<p>" + state + "</p>"
																+ "<p>" + city + "</p></div>";
                                }
                                //map.setZoom(13);


                                $("#divInnerHtml").append(strInnerHtml);
                            });
                            map.setCenter(firstLatlng);
                        },
                        error: function (e) {
                            $("#divInnerHtml").empty();
                            $("#divInnerHtml").append("No Data Found");
                            //alert(JSON.stringify(e));
                            //alert("error");
                        }
                    });
                } else {
                    $("#divInnerHtml").empty();
                    $("#divInnerHtml").append("Please Select City");

                }
            } else {
                $("#divInnerHtml").empty();
                $("#divInnerHtml").append("Please Select State");

            }
        });
    });



</script> 
  <script type="text/javascript">

    

</script> 
  <!--STARTS : Locate Us-->
  
  <div class="container-fluid locate-us-div">
  <div class="container">
    <h2><span class="img_title"><img src="https://www.bharatpetroleum.com/images/icon_global.png" alt="Location">Gas Office Location Map</span></h2>
    <!-- <hr class="hr">-->
    <div class="row">
      <div class="col-sm-8 map-div">
        <div id="dvMap"></div>
        <div id="imageDiv"></div>
      </div>
      <div class="col-sm-4 map-filter">
        <span id="lblLanguage" style="display:none">English</span>
        <p>Locate your nearest Gas Office.</p>
        <div class="filter clearfix"> 
          
          <!--<div id="upPannelInit">
	                             -->
          
          <select name="ddlCity" id="ddlCity">
		<option value="none">Select City</option>

	</select>
          
          <!--
                            
</div> -->
          
          
          <input class="loc-search" type="button" value="Search" id="btnSubmit" />
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
