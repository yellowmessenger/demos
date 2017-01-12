(function() {

    var link="", 
    project_code = "ha-newyearbanner1216",
    s_date = new Date(),
    s_rdm = s_date.getTime();

    if (/(?:Silk|Kindle|KFOT|iPhone|iPad|FKTT|KFJW)/.test(navigator.userAgent)) {
      link = "https://subscription.health.com/storefront/subscribe-to-health/link/1039717.html";
    } else if (/NOOK/.test(navigator.userAgent)) {
      link = "https://subscription.health.com/storefront/subscribe-to-health/link/1039717.html";
    } else if (/Android/.test(navigator.userAgent)) {
      link = "https://subscription.health.com/storefront/subscribe-to-health/link/1039717.html";
    } else {
      link = "https://subscription.health.com/storefront/subscribe-to-health/link/1039718.html";      
    }

    var img_url = mk_img_uri("btn.png");
    document.write('<style> p { font-size: 14px; font-weight: bold; text-align: center; margin: 0; }a, img { border: none; outline: none; }#banner { width: 830px; height: 280px; position: relative; background: url('+mk_img_uri("bg.jpg")+') no-repeat #ffffff; display: block; }  .btn {position: absolute;top: 75%;left: 392px;  }  #clickScreen {  position: absolute;  top: 0px;  left: 0px;  width: 830px;  height: 280px;  cursor: pointer;  }</style><a id="banner" href="'+link+'" target="_blank"><a class="btn" href="'+link+'" target="_blank"><img src="'+img_url+'"></a></a>');

    // from docs 
    function tcm_formatForDCLK(link){
      var tcm_dfpGet = ticmAdUnits[ticmAdUnits.length-1][1];
      var fpa_adid = "", fpa_crid = "";

      if (tcm_dfpGet !== "%c") {
          link = tcm_dfpGet+link.replace("://","%3a%2f%2f");
          fpa_adid = ticmAdUnits[ticmAdUnits.length-1][3];
          fpa_crid = ticmAdUnits[ticmAdUnits.length-1][4];
          
          if (fpa_adid) {
              link += "&fpa_adid=" + fpa_adid;
          }
          if (fpa_crid) {
              link += "&fpa_crid=" + fpa_crid;
          }
          if( (link.indexOf("?")==-1) && (link.indexOf("&")>-1) ) {
              link = link.replace("&","?");
          }
      }
      return link;
    }

    function mk_img_uri(img_name) {
        var prefix;
        if (/cmbuild/.test(location.href)) {
            prefix = "http://internal-cmbuild-e-cmtoolsc-179t402ny9hbx-1985589641.us-east-1.elb.amazonaws.com/themes/magazines/SUBS/templates/velocity/site/";
        } else if (/\.com\/qa\/assets/.test(location.href)) {
            prefix = "https://subscription-assets.health.com/qa/assets/themes/magazines/SUBS/templates/velocity/site/";
        } else {
            prefix = "https://subscription-assets.health.com/prod/assets/themes/magazines/SUBS/templates/velocity/site/";
        }
        return prefix + project_code + "/resources/images/" + img_name;
    }

})();