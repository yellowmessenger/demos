
var IE6 = (navigator.userAgent.indexOf("MSIE 6") >= 0) ? true : false;
if (IE6) {
    $(function () {

        $("<div>")
			.css({
			    'position': 'absolute',
			    'top': '0px',
			    'left': '0px',
			    'bottom': '0px',
			    backgroundColor: 'black',
			    'opacity': '0.75',
			    'width': '100%',
			    'height': '1000',
			    zIndex: 5000
			})
			.appendTo("body");
			$("<div style='width: 700px;font-size:13px;'><img src='/images/no-ie6.png' alt='' style='float: left;'/>iv><p style='height: 70px; padding: 60px 0px !important; margin: 0px !important;'><strong>Sorry! This site doesn't support Internet Explorer 6.</strong><br /><br />If you'd like to access this site please <a href='http://getfirefox.org'>upgrade your browser</a></p></div>")
			.css({
			    backgroundColor: 'white',
			    'top': '50%',
			    'left': '50%',
			    marginLeft: -290,
			    marginTop: -100,
			    width: 410,
			    paddingRight: 10,
			    height: 200,
			    'position': 'absolute',
			    zIndex: 6000
			})
			.appendTo("body");
    });
}

