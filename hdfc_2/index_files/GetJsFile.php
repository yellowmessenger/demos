var VizuryNotificationObject = VizuryNotificationObject || {
  NotificationOpen: "true",
  IframeEle: null,
  IframeBottom: null,
  ContainerHtmlId: "vizury-notification-container",
  cookie: null,
  advid: null,
  ImpressionLogUrl: "://www.vizury.com/Impression?",
  TemplateId: null,
  flag: true,
  OnsiteBlurHtmlId: "vizury-notification-blur",
  OnsiteBlurEnabled: false,

  reset: function() {
    VizuryNotificationObject.NotificationOpen = "true";
  },

  createDivElementLocal: function(content) {
    VizuryNotificationObject.reset();
    VizuryNotificationObject.SetDivContent(content);
  },

  createDivElement: function() {
    var tempDiv = document.createElement("div");
    tempDiv.id = VizuryNotificationObject.ContainerHtmlId;
    document.body.appendChild(tempDiv);
    VizuryNotificationObject.makeAjaxCallStyle();
  },

  openTargetLink: function(target) {
    var url = VizuryNotificationObject.ImpressionLogUrl + "click";
    VizuryNotificationObject.makeAjaxCall(url, "false");
    var win = window.open(target, "_blank");
    win.focus();
  },

  makeAjaxCallIE: function(url, flag) {
    xdr = new XDomainRequest();

    xdr.onload = function() {
      var content = xdr.responseText;
      if (content.length > 0 && flag === "true") {
        VizuryNotificationObject.SetDivContent(content);
      }
    }
    xdr.open("GET", url, true);
    xdr.send();
  },

  makeAjaxCall: function(url, flag) {
    var ajaxRequest;
    var isIE9 = window.XDomainRequest ? true : false;
    if (isIE9 == true) {
      VizuryNotificationObject.makeAjaxCallIE(url, flag);
    } else {
      try {
        ajaxRequest = new XMLHttpRequest();
      } catch (e) {
        try {
          ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
          try {
            ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
          } catch (e) {
            return false;
          }
        }
      }

      ajaxRequest.onreadystatechange = function() {
        if (ajaxRequest.readyState == 4) {
          var content = ajaxRequest.responseText;
          if (content.length > 0 && flag === "true") {
            VizuryNotificationObject.SetDivContent(content);
          }
        }
      }
      ajaxRequest.open("GET", url, true);
      ajaxRequest.withCredentials = true;
      ajaxRequest.send();
    }
  },

  getAdvid: function() {
    var accId = pixel.detectCampaign();
    var advid = accId.substring(6, accId.length);
    return advid;
  },

  getImpressionId: function() {
    var timestamp = new Date().getUTCMilliseconds();
    var rand = Math.floor(100000000 + Math.random() * 900000000);
    var id = VizuryNotificationObject.cookie + timestamp.toString() + rand.toString();
    return id;
  },

  DetectUserAgent: function() {
    var ua = navigator.userAgent,
      tem;
    var browser = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(browser[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return 'IE' + (tem[1] || '');
    }
    if (browser[1] === 'Chrome') {
      tem = ua.match(/\bOPR\/(\d+)/)
      if (tem != null) {
        return 'Opera' + tem[1];
      }
    }
    browser = browser[2] ? [browser[1], browser[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) {
      browser.splice(1, 1, tem[1]);
    }
    return browser[0] + browser[1];
  },

  DetectMobileOrDesktop: function() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      return "Mobile";
    } else {
      return "Desktop";
    }
  },

  CreateLogUrl: function() {
    var url = encodeURIComponent(window.location.href);
    var proc = ("https:" == document.location.protocol ? "https" : "http");
    var ImpressionId = VizuryNotificationObject.getImpressionId();
    var param = "DmpId=" + ImpressionId + "&Id=" + VizuryNotificationObject.IframeEle.contentWindow.id + "&vizid=" + VizuryNotificationObject.cookie + "&force_adv_id=VIZVRM" + VizuryNotificationObject.advid + "&segid=" + VizuryNotificationObject.IframeEle.contentWindow.segid + "&channelid=" + VizuryNotificationObject.IframeEle.contentWindow.channelid + "&url=" + url + "&pos=" + VizuryNotificationObject.IframeEle.contentWindow.position + "&UserAgent=" + VizuryNotificationObject.DetectUserAgent() + "&action=";
    VizuryNotificationObject.ImpressionLogUrl = proc + VizuryNotificationObject.ImpressionLogUrl + param;
  },

  fetchAnalyzeParameters: function() {
    var analyzeOnsiteParameters = ["page", "user", "fp2", "prod", "pname", "online", "appno", "leadid", "subprod", "src", "dest", "doj", "rd", "ad", "ch", "inf", "PageName", "FlightCabin", "FlightType"];
    var analyzeOnsiteParamJson = {};
    for (i in analyzeOnsiteParameters) {
      if (pixel.paramArray[analyzeOnsiteParameters[i]]){
        analyzeOnsiteParamJson[analyzeOnsiteParameters[i]] = pixel.paramArray[analyzeOnsiteParameters[i]];
      }
    }
    analyzeOnsiteParamJson["deviceType"] = VizuryNotificationObject.DetectMobileOrDesktop();
    return encodeURIComponent(JSON.stringify(analyzeOnsiteParamJson));
  },
  makeAjaxCallStyle: function() {
    var URL = encodeURIComponent(window.location.href);
    VizuryNotificationObject.cookie = pixel.getCookie('_vz');
    VizuryNotificationObject.advid = VizuryNotificationObject.getAdvid();

    var analyzeParamJsonString = VizuryNotificationObject.fetchAnalyzeParameters();

    var url = ("https:" == document.location.protocol ? "https://www.vizury.com/" : "http://www.vizury.com/") + "GetContent?vizid=" + VizuryNotificationObject.cookie + "&force_adv_id=VIZVRM" + VizuryNotificationObject.advid + "&url=" + URL + "&analyze_params=" + analyzeParamJsonString;
    VizuryNotificationObject.makeAjaxCall(url, "true");
  },

  SetDivContent: function(con) {
    var result = con.split('<delimiter>');
    var div = document.getElementById(VizuryNotificationObject.ContainerHtmlId);
    div.innerHTML = result[0];
    VizuryNotificationObject.SetIframeContent(result[1]);
    document.getElementById('vizury-notification-template').style.visibility = 'hidden';
    VizuryNotificationObject.CheckDeliveryWindow();
  },

  AdjustImageSize: function() {
    var height, width, divheight, divwidth;
    if (VizuryNotificationObject.IframeEle.contentWindow.window.hasOwnProperty('BannerJson')) {
      var pos = VizuryNotificationObject.IframeEle.contentWindow.position;
      VizuryNotificationObject.IframeEle.contentDocument.getElementById('container-div').style.border = 'none';
      if (pos === 0 || pos === 1) {
        VizuryNotificationObject.IframeEle.style.bottom = '0px';
      } else if (pos === 2 || pos === 3) {
        VizuryNotificationObject.IframeEle.style.top = '0px';
      }
      var refreshIntervalId = setInterval(function() {
        var img = null;
        var container = VizuryNotificationObject.IframeEle.contentDocument.getElementById('container-div');
        if (container && container.innerHTML !== '') {
          var content = VizuryNotificationObject.IframeEle.contentDocument.getElementsByClassName('product');
          content = content.length ? content[0] : undefined;
          if (content) {
            img = content.getElementsByTagName('img').length ? content.getElementsByTagName('img')[0] : undefined;
          }
          if (img) {
            var advImg = new Image();
            advImg.onload = function() {
              VizuryNotificationObject.IframeEle.style.display = 'block';
              container.style.height = parseInt(content.offsetHeight).toString() + 'px';
              container.style.width = parseInt(content.offsetWidth).toString() + 'px';
              VizuryNotificationObject.IframeEle.style.height = (parseInt(content.offsetHeight) + 26).toString() + 'px';
              VizuryNotificationObject.IframeEle.style.width = (parseInt(content.offsetWidth) + 21).toString() + 'px';
              VizuryNotificationObject.IframeBottom = '-' + (parseInt(content.offsetHeight) + 26).toString() + 'px';
              VizuryNotificationObject.IframeEle.contentDocument.getElementById('container-div').style.border = '';
              document.getElementById('vizury-notification-template').style.visibility = 'visible';
            }
            advImg.src = img.src;
            clearInterval(refreshIntervalId);
          }
        }
      }, 200);
    } else {
      var height = VizuryNotificationObject.IframeEle.contentWindow.height;
      var width = VizuryNotificationObject.IframeEle.contentWindow.width;
      var divheight = parseInt(height) + 26;
      var divwidth = parseInt(width) + 21;
      VizuryNotificationObject.IframeEle.style.height = divheight.toString() + 'px';
      VizuryNotificationObject.IframeEle.style.width = divwidth.toString() + 'px';
      VizuryNotificationObject.IframeBottom = '-' + divheight.toString() + 'px';
      var pos = VizuryNotificationObject.IframeEle.contentWindow.position;
      if (pos === 0 || pos === 1) {
        VizuryNotificationObject.IframeEle.style.bottom = VizuryNotificationObject.IframeBottom;
      } else if (pos === 2 || pos === 3) {
        VizuryNotificationObject.IframeEle.style.top = VizuryNotificationObject.IframeBottom;
      }
    }
  },

  InitialPosition: function() {
    var pos = VizuryNotificationObject.IframeEle.contentWindow.position;
    if (pos === 0 || pos === 1) {
      VizuryNotificationObject.IframeEle.style.bottom = VizuryNotificationObject.IframeBottom;
    } else if (pos === 2 || pos === 3) {
      VizuryNotificationObject.IframeEle.style.top = VizuryNotificationObject.IframeBottom;
    }
  },

  CloseOrMinimize: function() {
    var content = VizuryNotificationObject.IframeEle;
    var closeOrMinimize = closeOrMinimize || content.contentWindow.CloseOrMinimize;
    if (VizuryNotificationObject.IframeEle.contentWindow.position === 4) { // for center
      content.contentDocument.getElementById('div-minimise').style.display = 'none';
      content.contentDocument.getElementById('div-close').style.display = 'block';
    } else if (closeOrMinimize === 0) {
      content.contentDocument.getElementById('div-minimise').style.display = 'none';
      content.contentDocument.getElementById('div-close').style.display = 'block';
    } else if (closeOrMinimize === 1) {
      content.contentDocument.getElementById('div-minimise').style.display = 'block';
      content.contentDocument.getElementById('div-close').style.display = 'none';
    } else {
      content.contentDocument.getElementById('div-minimise').style.right = "30px";
    }
  },

  ShowMinimizeImageIcon: function(){
    var pos = pos || VizuryNotificationObject.IframeEle.contentWindow.position;
    var AnchorText = VizuryNotificationObject.GetAnchorText(pos);
    parent.document.getElementById(AnchorText).style.visibility = "visible";
  },

  transAnimationTopAndBottom: function(element, position, startvalue, endvalue) {
    var interval = setInterval(function() {
      element.style[position] = startvalue + "px";
      if (endvalue < 0) {
        startvalue -= 2;
        if (startvalue < endvalue) {
          element.style[position] = endvalue + "px";
          VizuryNotificationObject.ShowMinimizeImageIcon();
          clearInterval(interval);
        }
      } else {
        startvalue += 2;
        if (startvalue > endvalue) {
          element.style[position] = endvalue + "px";
          clearInterval(interval);
        }
      }
    }, 1);
  },

  triggerNotiBottom: function(ele, startvalue) {
    VizuryNotificationObject.transAnimationTopAndBottom(ele, 'bottom', startvalue, 0);
  },

  triggerNotiTop: function(ele, startvalue) {
    VizuryNotificationObject.transAnimationTopAndBottom(ele, 'top', startvalue, 0);
  },

  AnimateDirectionHide: function(ele, pos, endvalue) {
    switch (pos) {
      case 0:
      case 1:
        VizuryNotificationObject.transAnimationTopAndBottom(ele, 'bottom', 0, endvalue);
        break;
      case 2:
      case 3:
        VizuryNotificationObject.transAnimationTopAndBottom(ele, 'top', 0, endvalue);
        break;
    };
  },

  AnimateDirectionShow: function(ele, pos, startvalue) {
    switch (pos) {
      case 0:
      case 1:
        VizuryNotificationObject.transAnimationTopAndBottom(ele, 'bottom', startvalue, 0);
        break;
      case 2:
      case 3:
        VizuryNotificationObject.transAnimationTopAndBottom(ele, 'top', startvalue, 0);
        break;
    };
  },

  GetAnchorText: function(pos){
    var AnchorText;
    if (pos == 0 || pos == 1) {
      AnchorText = "AnchorText-01";
    } else {
      AnchorText = "AnchorText-23";
    }
    return AnchorText;
  },

  Toggle: function() {
    var pos = pos || VizuryNotificationObject.IframeEle.contentWindow.position;
    var AnchorText = VizuryNotificationObject.GetAnchorText(pos);
    
    if (VizuryNotificationObject.NotificationOpen == "true") {
      if (VizuryNotificationObject.TemplateId == 2) {
        if (pos == 0) {
          VizuryNotificationObject.AnimateDirectionHide(document.getElementById('vizury-wrapper-div-element'), 2, -50);
          document.getElementById('vizury-pulldown-div').style.height = '0px';
          setTimeout(function() {
            VizuryNotificationObject.AnimateDirectionShow(document.getElementById('vizury-maximize-div'), 2, -50)
          }, 1000);
        } else {
          VizuryNotificationObject.AnimateDirectionHide(document.getElementById('vizury-wrapper-div-element'), 1, -50);
          document.getElementById('vizury-pullup-div').style.height = '0px';
          setTimeout(function() {
            VizuryNotificationObject.AnimateDirectionShow(document.getElementById('vizury-maximize-div'), 1, -50);
          }, 1000);
        }
      } else {
        VizuryNotificationObject.AnimateDirectionHide(VizuryNotificationObject.IframeEle, pos, parseInt(VizuryNotificationObject.IframeBottom));
      }
      VizuryNotificationObject.NotificationOpen = "false";

      var url = "";
      if (VizuryNotificationObject.TemplateId == 1) {
        url = VizuryNotificationObject.ImpressionLogUrl + "minimize";
      } else {
        url = VizuryNotificationObject.IframeEle.contentWindow.window.config.impressionLogUrl + "minimize";
      }
      VizuryNotificationObject.makeAjaxCall(url, "false");
      VizuryNotificationObject.ToggleOnsiteBlur(false);
    } else {
      if (VizuryNotificationObject.TemplateId == 2) {
        if (pos == 0) {
          VizuryNotificationObject.AnimateDirectionHide(document.getElementById('vizury-maximize-div'), 2, -50);
          setTimeout(function() {
            VizuryNotificationObject.AnimateDirectionShow(document.getElementById('vizury-wrapper-div-element'), 2, -50);
            document.getElementById('vizury-pulldown-div').style.height = '50px';
          }, 1000);
        } else {
          VizuryNotificationObject.AnimateDirectionHide(document.getElementById('vizury-maximize-div'), 1, -50);
          setTimeout(function() {
            VizuryNotificationObject.AnimateDirectionShow(document.getElementById('vizury-wrapper-div-element'), 1, -50);
            document.getElementById('vizury-pullup-div').style.height = '50px';
          }, 1000);
        }
      } else {
        VizuryNotificationObject.AnimateDirectionShow(VizuryNotificationObject.IframeEle, pos, parseInt(VizuryNotificationObject.IframeBottom));
        document.getElementById(AnchorText).style.visibility = "hidden";
      }
      VizuryNotificationObject.NotificationOpen = "true";

      var url = "";
      if (VizuryNotificationObject.TemplateId == 1) {
        url = VizuryNotificationObject.ImpressionLogUrl + "maximize";
      } else {
        url = VizuryNotificationObject.IframeEle.contentWindow.window.config.impressionLogUrl + "maximize";
      }
      VizuryNotificationObject.makeAjaxCall(url, "false");
      VizuryNotificationObject.ToggleOnsiteBlur(true);
    }
  },

  SetIframeContent: function(con) {
    var doc = document.getElementById('vizury-notification-template').contentWindow.document;
    doc.open();
    doc.write("<!DOCTYPE html>");
    doc.write(con);
    doc.close();
    VizuryNotificationObject.IframeEle = parent.document.getElementById("vizury-notification-template");
    VizuryNotificationObject.CreateLogUrl();
  },

  close: function() {
    document.getElementById('vizury-notification-template').style.display = "none";

    var url = "";
    if (VizuryNotificationObject.TemplateId == 1) {
      url = VizuryNotificationObject.ImpressionLogUrl + "close";
    } else {
      url = VizuryNotificationObject.IframeEle.contentWindow.window.config.impressionLogUrl + "close";
    }
    VizuryNotificationObject.makeAjaxCall(url, "false");
    VizuryNotificationObject.ToggleOnsiteBlur(false);
  },

  CheckDeliveryWindow: function() {
    var from = VizuryNotificationObject.IframeEle.contentWindow.From;
    var to = VizuryNotificationObject.IframeEle.contentWindow.To;
    var d = new Date();
    var hour = d.getHours();
    var minutes = d.getMinutes();
    var fromTime = from.split(':');
    var toTime = to.split(':');
    VizuryNotificationObject.IdentifyEvent();
  },

  CallImpressionLogger: function() {
    var url = "";
    if (VizuryNotificationObject.TemplateId == 1) {
      url = VizuryNotificationObject.ImpressionLogUrl + "impression";
    } else {
      url = VizuryNotificationObject.IframeEle.contentWindow.window.config.impressionLogUrl + "impression";
    }
    VizuryNotificationObject.makeAjaxCall(url, "false");
  },

  CreateOnsiteBlurDiv: function(){
    if (VizuryNotificationObject.IframeEle.contentWindow.notificationBlur && VizuryNotificationObject.IframeEle.contentWindow.notificationBlur.enabled && VizuryNotificationObject.IframeEle.contentWindow.notificationBlur.color) {
      VizuryNotificationObject.OnsiteBlurEnabled = true;
      var onsiteBlurDiv = document.createElement("div");
      onsiteBlurDiv.id = VizuryNotificationObject.OnsiteBlurHtmlId;
      document.getElementById('vizury-notification-container').appendChild(onsiteBlurDiv);
      onsiteBlurDiv.style = "width: 100%; height: 100%; z-index: 199999970; position: fixed; top: 0; left: 0; opacity: 0.5";
      onsiteBlurDiv.style.visibility = 'hidden';
      onsiteBlurDiv.style.backgroundColor = VizuryNotificationObject.IframeEle.contentWindow.notificationBlur.color;
    }
  },

  ToggleOnsiteBlur: function(makeVisible){
    if (VizuryNotificationObject.OnsiteBlurEnabled){
      var onsiteBlurDiv = document.getElementById(VizuryNotificationObject.OnsiteBlurHtmlId);
      onsiteBlurDiv.style.visibility = (makeVisible) ? "visible" : "hidden";
    }
  },

  IdentifyEvent: function() {
    VizuryNotificationObject.TemplateId = VizuryNotificationObject.IframeEle.contentWindow.Tid;
    var event = (VizuryNotificationObject.IframeEle.contentWindow.eventId) ? VizuryNotificationObject.IframeEle.contentWindow.eventId : 0;

    var notifyTriggerJson = VizuryNotificationObject.IframeEle.contentWindow.notifyTrigger;
    if (notifyTriggerJson) {
      event = notifyTriggerJson.id;
      value = notifyTriggerJson.value;
    }

    // Set onsite blur div if required
    VizuryNotificationObject.CreateOnsiteBlurDiv();

    switch (event) {
      case 0:
        VizuryNotificationObject.ExecuteEvent();
        break;
      case 1:
        VizuryNotificationObject.ExitEvent();
        break;
      case 2:
        VizuryNotificationObject.ExecuteEvent(value);
        break;
      case 3:
        VizuryNotificationObject.ScrollEvent(value);
        break;
      default:
        VizuryNotificationObject.ExecuteEvent();
        break;
    }
  },

  PullPageDown: function() {
    var div = document.createElement("div");
    div.setAttribute('id', 'vizury-pulldown-div');
    div.style.height = '50px';
    div.style.overflow = 'hidden';
    var s = document.getElementsByTagName("body")[0];
    s.insertBefore(div, s.firstChild);
  },

  PullPageUp: function() {
    var div = document.createElement("div");
    div.setAttribute('id', 'vizury-pullup-div');
    div.style.height = '50px';
    div.style.overflow = 'hidden';
    var s = document.getElementsByTagName("body")[0];
    s.appendChild(div);
  },

  RenderStaticOnsiteNotification: function(pos){
    VizuryNotificationObject.CloseOrMinimize();
    VizuryNotificationObject.AdjustImageSize();
    VizuryNotificationObject.InitialPosition();
    if (pos === 0 || pos === 1){
      VizuryNotificationObject.triggerNotiBottom(VizuryNotificationObject.IframeEle, parseInt(VizuryNotificationObject.IframeBottom));
    } else if (pos === 2 || pos === 3) {
      VizuryNotificationObject.triggerNotiTop(VizuryNotificationObject.IframeEle, parseInt(VizuryNotificationObject.IframeBottom));
    }
    // Track impression log and make notification visible
    document.getElementById('vizury-notification-template').style.visibility = 'visible';
    VizuryNotificationObject.CallImpressionLogger();
  },

  ExecuteEvent: function(delaytime) {
    // Check if notification is delay triggered
    var delayTimeMillis = delaytime ? delaytime * 1000 : 1;
    var pos = pos || VizuryNotificationObject.IframeEle.contentWindow.position;
    var event = VizuryNotificationObject.IframeEle.contentWindow.eventId;
    switch (VizuryNotificationObject.TemplateId) {
      case 1:
      case 3:
        if (VizuryNotificationObject.IframeEle.contentWindow.isActive) {
          setTimeout(function() {
            VizuryNotificationObject.RenderStaticOnsiteNotification(pos);
            VizuryNotificationObject.ToggleOnsiteBlur(true);
          }, delayTimeMillis);
        }
        break;
      case 6:
        setTimeout(function() {
          VizuryNotificationObject.CloseOrMinimize();
          VizuryNotificationObject.AdjustImageSize();
          VizuryNotificationObject.ToggleOnsiteBlur(true);
          VizuryNotificationObject.CallImpressionLogger();
        }, delayTimeMillis);
        break;
      default:
        setTimeout(function() {
          VizuryNotificationObject.CloseOrMinimize();
          VizuryNotificationObject.AdjustImageSize();
          VizuryNotificationObject.ToggleOnsiteBlur(true);
          VizuryNotificationObject.CallImpressionLogger();
        }, delayTimeMillis);
        break;
    }
  },

  ExitEvent: function() {
    var obj = document.documentElement;
    obj.addEventListener('mouseleave', handleMouseleave);
    obj.addEventListener('keydown', handleKeydown);

    function handleMouseleave(e) {
      if (e.clientY > 20) {
        return;
      }
      fire();
    }

    var disableKeydown = false;

    function handleKeydown(e) {
      if (disableKeydown) {
        return;
      } else if (!e.metaKey || e.keyCode !== 76) {
        return;
      }

      disableKeydown = true;
      fire();
    }

    function fire() {
      if (VizuryNotificationObject.flag == true) {
        VizuryNotificationObject.ExecuteEvent();
        VizuryNotificationObject.flag = false;
      }
    }
  },

  ScrollEvent: function(value) {
    function addEvent(obj, evt, fn) {
      if (obj.addEventListener) {
        obj.addEventListener(evt, fn, false);
      } else if (obj.attachEvent) {
        obj.attachEvent("on" + evt, fn);
      }
    }

    function getWindowHeight() {
      return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
    }

    function getWindowYscroll() {
      return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0;
    }

    function getDocHeight() {
      return Math.max(
        document.body.scrollHeight || 0,
        document.documentElement.scrollHeight || 0,
        document.body.offsetHeight || 0,
        document.documentElement.offsetHeight || 0,
        document.body.clientHeight || 0,
        document.documentElement.clientHeight || 0
      );
    }

    addEvent(window, 'scroll', function(event) {
      var scrollPercentage = ((getWindowYscroll() + getWindowHeight()) / getDocHeight()) * 100;
      if (scrollPercentage > value && VizuryNotificationObject.flag == true) {
        VizuryNotificationObject.ExecuteEvent();
        VizuryNotificationObject.flag = false;
      }
    });
  }
};

