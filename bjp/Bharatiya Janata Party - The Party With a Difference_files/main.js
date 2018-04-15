$(document).ready(function() {
//========== media centre scripts starts from here==========//
		$( ".mediacentershowhide" ).change(function() {
				var mediaCentre = $('select.mediacentershowhide option:selected').val();
				$('#pressrelease').hide();
				$('#speeches').hide();
				$('#interview').hide();
				if(mediaCentre == 'Press Releases') {
					$('#pressrelease').show();
				}				
				if(mediaCentre == 'Speeches') {
					$('#speeches').show();
				}				
				if(mediaCentre == 'Articles') {
					$('#interview').show();
				}
		});
	    jQuery.validator.addMethod("vtest", function(value, element, param) {
	        if(value=="")
	            return true;
	        else{
	            var patt = new RegExp("^[a-zA-Z]{3}[0-9]{7}$");
	            return patt.test(value);
	        }
	    });
});

function bookmarkme() {
	 	console.log("dsfdfsd");
      if (window.sidebar) { // Mozilla Firefox Bookmark
        window.sidebar.addPanel(location.href,document.title,"");
      } else if(window.external) { // IE Favorite
        window.external.AddFavorite(location.href,document.title); }
      else if(window.opera && window.print) { // Opera Hotlist
        this.title=document.title;
        return true;
     }
 	}
	
	
	 function load() {
      if (GBrowserIsCompatible()) {
        var map = new GMap2(document.getElementById("map-canvas"));
        map.addControl(new GSmallMapControl());
        map.addControl(new GMapTypeControl());
        var center = new GLatLng(23.32208, 78.39844);
        map.setCenter(center, 4);
        geocoder = new GClientGeocoder();
        var marker = new GMarker(center, {draggable: true});  
        map.addOverlay(marker);
		
        document.getElementById("latitude_longitude").value= center.lat().toFixed(5)+', '+center.lng().toFixed(5);
	  GEvent.addListener(marker, "dragend", function() {
       var point = marker.getPoint();
	      map.panTo(point);
		  
		document.getElementById("latitude_longitude").value= point.lat().toFixed(5)+', '+point.lng().toFixed(5);

        });


	 GEvent.addListener(map, "moveend", function() {
		  map.clearOverlays();
    var center = map.getCenter();
		  var marker = new GMarker(center, {draggable: true});
		  map.addOverlay(marker);
		  document.getElementById("latitude_longitude").value= center.lat().toFixed(5)+', '+center.lng().toFixed(5);


	 GEvent.addListener(marker, "dragend", function() {
      var point =marker.getPoint();
	     map.panTo(point);
		 
		document.getElementById("latitude_longitude").value= point.lat().toFixed(5)+', '+point.lng().toFixed(5);
        });
 
        });

      }
    }

	   function showAddress(address) {
	   var zoomLevel=8;
	   if(address=='India')
	   zoomLevel=4;
	   var map = new GMap2(document.getElementById("map-canvas"));
       map.addControl(new GSmallMapControl());
       map.addControl(new GMapTypeControl());
       if (geocoder) {
        geocoder.getLatLng(
          address,
          function(point) {
            if (!point) {
             // alert(address + " not found");
            } else {
			
	    document.getElementById("latitude_longitude").value= point.lat().toFixed(5)+', '+point.lng().toFixed(5);
		 map.clearOverlays()
			map.setCenter(point, zoomLevel);
   var marker = new GMarker(point, {draggable: true});  
		 map.addOverlay(marker);

		GEvent.addListener(marker, "dragend", function() {
      var pt = marker.getPoint();
	     map.panTo(pt);
		 
		  document.getElementById("latitude_longitude").value= pt.lat().toFixed(5)+', '+pt.lng().toFixed(5);
        });


	 GEvent.addListener(map, "moveend", function() {
		  map.clearOverlays();
    var center = map.getCenter();
		  var marker = new GMarker(center, {draggable: true});
		  map.addOverlay(marker);
		  document.getElementById("latitude_longitude").value= center.lat().toFixed(5)+', '+center.lng().toFixed(5);

	 GEvent.addListener(marker, "dragend", function() {
     var pt = marker.getPoint();
	    map.panTo(pt);
	    document.getElementById("latitude_longitude").value= pt.lat().toFixed(5)+', '+pt.lng().toFixed(5);
        });
 
        });

            }
          }
        );
      }
    }



function execute(val,opt)
{

var addressShow;
var stateText=$("#state :selected").text();
var stateValue=$("#state").val();

var pc_seatText=$("#pc_seat :selected").text();
var pc_seatValue=$("#pc_seat").val();

var home_address=$("#address").val();
var pincode=$("#pincode").val();
//alert(stateText+stateValue+pc_seatText+pc_seatValue);
//if(pc_seatValue=="Select PC Seat" || pc_seatValue=="Select MP Seat")
//pc_seatValue==null;


if(stateValue !=0 && pc_seatValue!=0)
{
addressShow=pc_seatText+", "+ stateText +', India';
}

if(stateValue != 0 && pc_seatValue == 0)
{
//address
addressShow=stateText+', India';
}

if(stateValue =="")
{
addressShow="India";
}

//alert(home_address+','+pincode+','+addressShow);
// showAddress(home_address+','+pincode+','+addressShow); 
showAddress(addressShow); 
if(opt==1)
{
showUser(val);
jQuery("#bjpstate").val(jQuery("#state :selected").text());
jQuery("#bjploksabha").val("");
}
if(opt==2)
{
jQuery("#bjploksabha").val(jQuery("#pc_seat :selected").text());
}

} 

$(document).ready(function() {

jQuery.validator.addMethod("usernameCheck", function(username) {
   var isSuccess = false;
   $.ajax({ url: "http://www.bjp.local/check-user.php",
            data: "username=" + username +'&password='+$("#password").val(),
            async: false,
            success:
                function(msg) { isSuccess = msg === "TRUE" ? true : false }
          });
    return isSuccess;
},"");


	// validate signup form on keyup and submit
	$("#login_frm").validate({
	onkeyup:false,
	onfocusout:false,
		rules: {
			password: "required",
			
			username: {
				required: true
				//email: true,
				//usernameCheck: true
			},
		login_verification: {
		required: true,
		checkCaptcha: true
			}
		},
		messages: {
			password: "Please enter your Password",
			username: {
				required: "Please enter your username"
				//email: "Please enter a valid username",
				//usernameCheck: "wrong credentials"
			},
	    login_verification: {
	    required: "Please enter the code above",
	    checkCaptcha: "You have entered wrong captcha"
   }
		},
		
    submitHandler: function(form) {
        form.submit();
    }
	});


//comments validate

	
	//logut script handler
$( "#user_logout_btn" ).click(function() {
  $( "#user_logout" ).submit();
});

});


function showdiv(showId,hideId) { 
  $( "#"+showId+"" ).show( "slow", function() {
   
  });
  $( "#"+hideId+"" ).hide( "slow", function() {
   
  });
}


function setactive(showId,hideId) { 
  $( "#"+showId+"" ).addClass( "active");
  $( "#"+hideId+"" ).removeClass( "active");
}


function refreshCaptcha(imgId)
{   var imgSrc = '/components/com_chronoforms/chrono_verification.php?imtype=1' + '&' + Math.random();
    jQuery('#'+imgId).attr("src",imgSrc);
    
}
function searchCat(catId)
{
    jQuery('.cats').prop('checked', false);
    jQuery('#'+catId).prop('checked', true);
    jQuery('#searchForm').submit();
}
