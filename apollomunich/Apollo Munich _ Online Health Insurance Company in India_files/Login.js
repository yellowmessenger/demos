
function ShowForgot()
 {
   sellerwindow = dhtmlmodal.open('tt', 'div', 'forgotPassword','','width=294px,height=100px,left=350px,top=200px,resize=0,scrolling=0', "")
   
}



function getPassword()
    {
        if(ValidateEmail())
        {
            var email = document.getElementById('txtforgotEmail').value;
            Buy_Online_Login.ForgotPassword(email, getPass_CallBack);
        }
        return false;
    }
function getPass_CallBack(response) 
{
   alert(response.value);
}

function swapdivs(show,hide)
{
   document.getElementById(show).style.display = "";
   document.getElementById(hide).style.display = "none";
   
   if(show =='divPolicyNumber')
   {
     //    document.getElementById('txtFirstName').focus();
         document.getElementById('Image4').src = "images/login-policy-memberId.gif";
         document.getElementById('Image3').src = "images/login-policy-numberOver.gif";
   }
   else
   {
       //  document.getElementById('txtUserName').focus();
         document.getElementById('Image4').src = "images/login-policy-memberIdOver.gif";
         document.getElementById('Image3').src = "images/login-policy-number.gif";
   }
   document.getElementById('hfVisibleDiv').value = show;
}

function showLastdiv()
{
   var status = document.getElementById('hfVisibleDiv').value;
   if(status =='divPolicyNumber')
   {
         document.getElementById('divPolicyNumber').style.display = "";
         document.getElementById('divMemberId').style.display = "none";
         document.getElementById('Image4').src = "images/login-policy-memberId.gif";
         document.getElementById('Image3').src = "images/login-policy-numberOver.gif";
   }
   else
   {
         document.getElementById('divMemberId').style.display = "";
         document.getElementById('divPolicyNumber').style.display = "none";
         document.getElementById('Image4').src = "images/login-policy-memberIdOver.gif";
         document.getElementById('Image3').src = "images/login-policy-number.gif";
   }
  
}

function ValidateEmail()
{
	var emailID = document.getElementById('txtforgotEmail');
	
	if ((emailID.value==null)||(emailID.value==""))
	{
		alert("Please Enter your Email ID");
		emailID.focus();
		return false;
	}
	if (echeck(emailID.value)==false)
	{
		emailID.value="";
		emailID.focus();
		return false;
	}
	return true;
 }
 
 function echeck(str) 
    {
    	var at="@"
		var dot="."
		var lat=str.indexOf(at)
		var lstr=str.length
		var ldot=str.indexOf(dot)
		if (str.indexOf(at)==-1)
		{
		   alert("Invalid E-mail ID");
		   return false;
		}

		if (str.indexOf(at)==-1 || str.indexOf(at)==0 || str.indexOf(at)==lstr)
		{
		   alert("Invalid E-mail ID");
		   return false;
		}

		if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 || str.indexOf(dot)==lstr)
		{
		    alert("Invalid E-mail ID");
		    return false;
		}

	     if (str.indexOf(at,(lat+1))!=-1)
	     {
	        alert("Invalid E-mail ID");
	        return false;
	     }

	     if (str.substring(lat-1,lat)==dot || str.substring(lat+1,lat+2)==dot)
	     {
	        alert("Invalid E-mail ID");
	        return false;
	     }

	     if (str.indexOf(dot,(lat+2))==-1)
	     {
	        alert("Invalid E-mail ID");
	        return false;
	     }
    	
	     if (str.indexOf(" ")!=-1)
	     {
	        alert("Invalid E-mail ID");
	        return false;
	     }
	     return true;					
	}
 
 function doClick(buttonName,e)
    {
//the purpose of this function is to allow the enter key to 
//point to the correct button to click.
     var ev = e || window.event;
     var key = ev.keyCode;

         //if(window.event)
           //   key = window.event.keyCode;     //IE
         //else
           //   key = e.which;     //firefox
    
        if (key == 13)
        {
            //Get the button the user wants to have clicked
            var btn = document.getElementById(buttonName);
            if (btn != null)
            { //If we find the button click it
                btn.click();
                //event.keyCode = 0
                ev.preventDefault();
            }
        }
   }
   function setdob() {
       document.getElementById('hfDOB').value = document.getElementById('txtDOB').value;
   }
function setfoucs(show)
{
     if(show =='divPolicyNumber')
          document.getElementById('txtFirstName').focus();
     else
      document.getElementById('txtUserName').focus();
}

function DisplaySumit()
    {
        document.getElementById('imglogin1').style.display='';
    }

    //  ----- 08-may-12 -----

//    function checkPWD(rdoName) 
//    {
//        if ((rdoName == 'withoutPwd') && (document.getElementById('rdoBtnWithoutPwd').checked == true)) 
//       { 
//            document.getElementById('rowPwd').style.display = 'none';
//            document.getElementById('rdoBtnWithPwd.ClientID').checked = false;
//        }
//        else if ((rdoName == 'withPwd') && (document.getElementById('rdoBtnWithPwd').checked == true)) 
//        {   
//            document.getElementById('rowPwd').style.display = '';
//            document.getElementById('rdoBtnWithoutPwd').checked = false;
//            document.getElementById('dvLogin').style.display = '';           
//        }
    //    }
    //  ----- 27-June-12 -----Commented at 15Nov13---Remove without Passowrd functionality ------
    //function checkPWD(rdoName) {
    //    if ((rdoName == 'withoutPwd') && (document.getElementById('rdoBtnWithoutPwd').checked == true)) { 
    //        document.getElementById('rowPwd').style.display = 'none';
    //        document.getElementById('rdoBtnWithPwd').checked = false;
    //    }
    //    else if ((rdoName == 'withPwd') && (document.getElementById('rdoBtnWithPwd').checked == true)) {
    //        document.getElementById('rowPwd').style.display = '';
    //        document.getElementById('rdoBtnWithoutPwd').checked = false;
    //        document.getElementById('dvLogin').style.display = '';    
    //    }

    //}

    function OpenViaShadow(path) {        
        Shadowbox.open({
            content: path,
            player: "iframe",
            title: '',
            height: 304,
            width: 658
        })
        return false;
    }

    function RefreshCaptcha() {
        var NewVal = Buy_Online_Login.GenerateRandomCode();
        var img = document.getElementById("imgCaptcha");
        img.src = "captcha.ashx?query=" + NewVal;
        document.getElementById('txtCaptcha').focus();
        return false;
    }

// Redirection for New Renewal
  /*   var new_renewal_loc = '';
     new_renewal_loc = location.pathname;
     switch (new_renewal_loc.toLowerCase()) {
         case '/buyonline/online-renewal.aspx':
             window.location = "https://renewal.apollomunichinsurance.com";
             break;
     } */
   
    