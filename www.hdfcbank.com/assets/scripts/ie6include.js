function includeJavascript(src) {
    if (document.createElement && document.getElementsByTagName) {
        var head_tag = document.getElementsByTagName('head')[0];
        var script_tag = document.createElement('script');
        script_tag.setAttribute('type', 'text/javascript');
        script_tag.setAttribute('src', src);
        head_tag.appendChild(script_tag);
    }
}

function includeCSSfile(href) {
    var head_node = document.getElementsByTagName('head')[0];
    var link_tag = document.createElement('link');
    link_tag.setAttribute('rel', 'stylesheet');
    link_tag.setAttribute('type', 'text/css');
    link_tag.setAttribute('href', href);
    head_node.appendChild(link_tag);
}

function isIE () {
  var myNav = navigator.userAgent.toLowerCase();
  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}
if (isIE () == 6) {
	includeCSSfile("/assets/css/ie6_popup.css");
	includeJavascript("/assets/scripts/warning.js");
	includeJavascript("/assets/scripts/ie6_popup.js");
}
/*if ($.browser.msie && parseInt($.browser.version, 10) <= 6)
{
	includeCSSfile("/assets/css/ie6_popup.css");
	includeJavascript("/assets/scripts/warning.js");
	includeJavascript("/assets/scripts/ie6_popup.js");
}*/