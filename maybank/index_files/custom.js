//
// addLoadEvent()
// Adds event to window.onload without overwriting currently assigned onload functions.
// Function found at Simon Willison's weblog - http://simon.incutio.com/
//
function addLoadEvent(func)
{	
	var oldonload = window.onload;
	if (typeof window.onload != 'function'){
		window.onload = func;
	} else {
		window.onload = function(){
		oldonload();
		func();
		}
	}

}


addLoadEvent(externalLinks);

function externalLinks() {
 if (!document.getElementsByTagName) return;
 var anchors = document.getElementsByTagName("a");
 for (var i=0; i<anchors.length; i++) {
   var anchor = anchors[i];
   if (anchor.getAttribute("href") &&
       anchor.getAttribute("rel") == "external")
     anchor.target = "_blank";
 }
}


function popUp(strURL,strType,strHeight,strWidth) {
var strOptions="";
if (strType=="console") strOptions="status,scrollbars,resizable,height="+strHeight+",width="+strWidth;
if (strType=="fixed") strOptions="status,scrollbars,height="+strHeight+",width="+strWidth;
if (strType=="elastic") strOptions="toolbar,menubar,scrollbars,resizable,location,height="+strHeight+",width="+strWidth;
window.open(strURL, 'newWin', strOptions);
}



// niftyCube (this must be the last event loaded!)

NiftyLoad=function(){
Nifty("div#findWrapper","big");
Nifty("div.onlineBankingBox h2","top");
Nifty("ul.onlineBankingList","bottom");
Nifty("div.otherServicesBox","normal");
Nifty("div.nifty","normal");
Nifty("li.viewComparedItem","normal");
//Nifty("li.viewPromoItem","same-height");
Nifty("h3.viewComparedTitle","same-height");
Nifty("div.viewComparedAction","same-height");
Nifty("div.viewComparedInfo","same-height");
Nifty("div.viewComparedOverview","same-height");
Nifty("div.viewComparedBenefits","same-height");
Nifty("div.viewComparedApply","same-height");
}

