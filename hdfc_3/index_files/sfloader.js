
var baseURL= "hbchat.senseforth.com/HDFC_Chat/";

//var jsFile="combined.js";
//var cssfile = "newui.css";

var jsFile="combined.min.js";
//var cssfile = "newui.min.css";
var cssfile = "newui.min-v2.2.css";
	
	
if (window.location.protocol == "https:") {
	baseURL = "https://"+baseURL;
} else {
	baseURL = "http://"+baseURL;
}

function getStyleSheet(href){
	   var link = document.createElement('link');
	   link.type = 'text/css';
	   link.rel = 'stylesheet';
	   link.href = href;
	  	$("head").append(link);
	  }   
	        
	getStyleSheet(baseURL+cssfile);

function getScript(src) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = baseURL+src;
    $("head").append(script);
}

getScript(jsFile);


