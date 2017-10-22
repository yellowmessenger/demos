
var utm = "";
    utm = getParameterByQuery("utm_source") != "" ? getParameterByQuery("utm_source") : getParameterByQuery("pub");

var pagetitle = document.title;
var pagedata = 'utm_source=' + escape(utm) + '&mtz=' + Math.random();
var url = document.URL;
var n = url.search("blog");

if (n == "-1")
{
    var request = "InsertQueryString.ashx?" + pagedata;
}
else
{
    var request = "../InsertQueryString.ashx?" + pagedata;
}

var head = document.getElementsByTagName("head").item(0);

var script = document.createElement("script");
script.setAttribute("type", "text/javascript");
script.setAttribute("src", request);

head.appendChild(script);



function getParameterByQuery(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href.toLowerCase());
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}

//+escape(partner) + '&mtz=' + Math.random();