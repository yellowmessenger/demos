//Version 1
//Ref No: 1032/2003/3
//This javascript is for calling a servlet and recording where the link links to and from.
//
//Version 2
//Ref No: 4061/2003/8
//This javascript will popup a disclaimer before go to 3rd party web site (not include subsidiaries).
//
//last update: 22/08/2003

subsidiaries = new Array(
'http://www.maybanlife.com.my',
'http://www.mayfin.com.my',
'https://www.mayfin.com.my',
'http://www.maybanunittrust.com.my',
'http://www.mayban-ventures.com.my',
'http://www.aseam.com.my',
'http://www.maybangen.com.my',
'http://www.2globalinvest.com',
'http://www.maybansec.com',
'http://www.maybank2e.net',
'http://www.maybank2u.com', //include .my .sg /philippines
'http://info.maybank2u.com.sg',
'http://mall.maybank2u.net',
'http://www.etiqa.com.my',
'http://www2.americanexpress.com.my',
'');

exempted = new Array(
'/consumer/online_shopping/hotstuff.shtml',
'');

function isSubsidiaries(link){
  for(var i=0; i<subsidiaries.length; i++) {
    if(subsidiaries[i]!='') {
      var reg = new RegExp(subsidiaries[i]);
      if(reg.test(link)) {
        return true;
      }
    }
  }
  return false;
}

function isExempted(link){
  for(var i=0; i<exempted.length; i++) {
    if(exempted[i]!='') {
      var reg = new RegExp(exempted[i]); 
      if(reg.test(link)) {
        return true;
      }
    }
  }
  return false;
}

// function to be called from secure site
function sec_thirdparty(linkto, linkfrom){
  var fulllink=base_path+'thirdparty/thirdpartyreport?url='+escape(linkto)+'&object='+linkfrom;  //added escape to change the parameter special character to unicode
  if(isSubsidiaries(linkto) || isExempted(linkfrom)) {
    window.open(fulllink,'_blank');
  } else {
    window.open('/disclaimer.html?' + fulllink, 'thirdparty', 'scrollbars=no, status=no, resizable=1, width=330, height=150, top=150, left=200');
  }
  return false;
}  

function thirdparty(linkto, linkfrom){
  var fulllink='/thirdparty/thirdpartyreport?url='+escape(linkto)+'&object='+linkfrom; //added escape to change the parameter special character to unicode
  if(isSubsidiaries(linkto) || isExempted(linkfrom)){
  	window.open(fulllink,'_blank');
  } else {
    window.open('/disclaimer.html?'+fulllink,'thirdparty','scrollbars=0,status=0,resizable=1,width=330,height=150,top=150,left=200');
  }
  return false;
}

function thirdparty_2(linkto, linkfrom){ //not use, for backup only.
	if (confirm("Test"))
	{
	  window.open(linkto,'_blank');
	}
  return false;
}

function thirdparty_test(linkto, linkfrom){ //not use, for backup only.
  if(window.location.href.match('172.30.123')==null) {
    window.open('/thirdparty/thirdpartyreport?url="'+linkto+'"&object='+linkfrom,'_blank');
  } else {
    window.open(linkto,'_blank');
  }
  return false;
}

