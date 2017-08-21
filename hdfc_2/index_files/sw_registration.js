var cont = "<style> .vizury-notification { display: block; overflow: hidden; border: 0px; position: fixed; z-index: 199999980;}</style> <iframe id = \"http-push\" class=\"vizury-notification\" width=\"100%\" height=\"100%\"></iframe>";
var iframeContent = "<!DOCTYPE html><html><head><title></title><style type=text/css>*{outline:0}a{text-decoration:none}.banner-container{position:relative;top:0;left:0;margin:0;font-family:Arial,Helvetica,sans-serif;color:#fff;box-sizing:border-box;text-align:center}.product{position:relative;display:inline-block;width:326px;height:auto;background:rgba(3,85,167,1);background:-moz-linear-gradient(top,rgba(3,85,167,1) 0,rgba(113,187,237,1) 100%);background:-webkit-gradient(left top,left bottom,color-stop(0%,rgba(3,85,167,1)),color-stop(100%,rgba(113,187,237,1)));background:-webkit-linear-gradient(top,rgba(3,85,167,1) 0,rgba(113,187,237,1) 100%);background:-o-linear-gradient(top,rgba(3,85,167,1) 0,rgba(113,187,237,1) 100%);background:-ms-linear-gradient(top,rgba(3,85,167,1) 0,rgba(113,187,237,1) 100%);background:linear-gradient(to bottom,rgba(3,85,167,1) 0,rgba(113,187,237,1) 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#0355a7',endColorstr='#71bbed',GradientType=0);min-width:200px;overflow:hidden;border-radius:10px;box-shadow:2px 2px 8px #666}.title-div,.message-div,.cta-button-div{position:relative;color:#fff;overflow:hidden;text-align:center;padding:5px 30px 10px 30px}.cta-button-div{padding:15px 30px 20px 30px!important}.logo-image-div{padding:20px 5px 15px 5px;min-height27px;}.close-image-div{position:absolute;right:0;top:0;margin:5px;min-height:14px;}.close-image{cursor:pointer;}.title-div{font-size:14px}.message-div{font-size:17px}.cta-button{position:relative;cursor:pointer;display:inline-block;margin:0 5px 5px 5px;color:#000;font-size:14px;background:#cdf1fd;padding:4px 20px 4px 20px;border-radius:4px}.accept-button{background:#ff0e1f;color:#fff}.marker{position:relative;display:block;margin:auto;width:0;border:14px solid #0355a7;border-left:14px solid transparent;border-right:14px solid transparent;border-top:0 solid transparent;z-index:1}.container{position:static;top:0;left:0;width:100%;height:100%}.outer-container{position:fixed;display:table;background:rgba(0,0,0,0.6);width:100%;height:100%;top:0;left:0}.inner-container{display:table-cell;vertical-align:middle}.not-image-div{min-height:74px;}</style></head><body><div class=outer-container id=outerContainer><div class=inner-container id=innerContainer><div class=banner-container id=bannerContainer><div class=not-image-div id=notImageDiv><img class=not-image id=notImage src=\"//cdn25.vizury.com/ssp/IN_HDFC_DMP/Bell.png\"/></div><div class=marker id=marker></div><div class=product><div class=logo-image-div id=logoImageDiv><img class=logo-image id=logoImage src=\"//cdn25.vizury.com/ssp/IN_HDFC_DMP/Logo.png\"/></div><div class=title-div id=titleDiv style=font-size:14px><span class=title-span id=titleSpan>Get latest Deals on Shopping, Movie tickets and much more only for you.</span></div><div class=message-div id=messageDiv style=font-size:17px><span class=message-span id=messageSpan>Click 'Allow' to stay connected</span></div><div class=cta-button-div id=ctaButtonDiv><div class=\"cta-button accept-button\" onclick=parent.pushNotificationObject.Allow()>Allow</div><div class=cta-button onclick=parent.pushNotificationObject.closeCustomOptin(1)>Later</div></div><div class=close-image-div id=closeImageDiv><img class=close-image id=closeImage onclick=parent.pushNotificationObject.closeCustomOptin(20) src=\"//cdn25.vizury.com/ssp/IN_HDFC_DMP/Close.png\"/></div></div></div></div></div></body></html>";
var pushNotificationObject = pushNotificationObject || {
  IframeEle: null,
  ContainerHtmlId: "http-push-container",
  blockCookie: 'wpn_bl',
  allowedCookie: 'viz_al',
  version: "v4",
  advid: 'VIZVRM3625',
  target: "sg-pl.vizury.com",
  redirectPage: "https://www.hdfcbank.com/htdocs/notification-consent.htm",
  domain: ".hdfcbank.com",
  dailyCookie: "viz_sent",
  migrationCookie: "viz_wpn",
  first : false, 
  createDivElement: function() {
    var tempDiv = document.createElement("div");
    tempDiv.id = pushNotificationObject.ContainerHtmlId;
    document.body.appendChild(tempDiv);
    pushNotificationObject.SetDivContent();
  },
  close: function() {
    document.getElementById('http-push').style.display = "none";
  },
  closeWindow: function() {
    if (document.URL.indexOf(pushNotificationObject.redirectPage) != -1) {
      window.close();
    }
  },  
  SetDailyCookie: function(days) {
    var ct = new Date();
    ct.setTime(ct.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = pushNotificationObject.dailyCookie + "=1; expires=" + ct.toUTCString() + "; path=/; domain=" + pushNotificationObject.domain + ";";
  },
  closeCustomOptin: function(days) {
    pushNotificationObject.close();
    pushNotificationObject.SetDailyCookie(days);
  },
  SetDivContent: function(con) {
    var div = document.getElementById(pushNotificationObject.ContainerHtmlId);
    div.innerHTML = cont;
    pushNotificationObject.SetIframeContent(iframeContent);
    pushNotificationObject.IdentifyEvent();
  },
  Allow: function() {
    window.open(pushNotificationObject.redirectPage, "myWindow", "width=515,height=350");
    pushNotificationObject.close();
  },
  Block: function() {
    pushNotificationObject.BlockCookie();
    pushNotificationObject.close();
    pushNotificationObject.notSubscribed('BL');
  },
  BlockCookie: function() {
    var value = "; " + document.cookie;
    var parts = value.split("; " + pushNotificationObject.blockCookie + "=");
    if (parts.length < 2) {
      var d = new Date();
      d.setTime(d.getTime() + (3 * 365 * 24 * 60 * 60 * 1000));
      document.cookie = pushNotificationObject.blockCookie + "=1; expires=" + d.toUTCString() + "; path=/;domain=" + pushNotificationObject.domain + ";";
    }
  },
  AllowedCookie: function() {
    var value = "; " + document.cookie;
    var parts = value.split("; " + pushNotificationObject.allowedCookie + "=");
    if (parts.length < 2) {
      var d = new Date();
      d.setTime(d.getTime() + (3 * 365 * 24 * 60 * 60 * 1000));
      document.cookie = pushNotificationObject.allowedCookie + "=1; expires=" + d.toUTCString() + "; path=/;domain=" + pushNotificationObject.domain + ";";
    }
  },
  transAnimationTopAndBottom: function(element, position, startvalue, endvalue) {
    var interval = setInterval(function() {
      element.style[position] = startvalue + "px";
      if (endvalue < 0) {
        startvalue -= 2;
        if (startvalue < endvalue) {
          element.style[position] = endvalue + "px";
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
    pushNotificationObject.transAnimationTopAndBottom(ele, 'bottom', startvalue, 0);
  },
  triggerNotiTop: function(ele, startvalue) {
    pushNotificationObject.transAnimationTopAndBottom(ele, 'top', startvalue, 0);
  },
  SetIframeContent: function(con) {
    var doc = document.getElementById('http-push').contentWindow.document;
    doc.open();
    doc.write("<!DOCTYPE html>");
    doc.write(con);
    doc.close();
    pushNotificationObject.IframeEle = parent.document.getElementById("http-push");
  },
  IdentifyEvent: function() {
    pushNotificationObject.IframeEle.style.top = '-136px';
    setTimeout(function() {
      pushNotificationObject.triggerNotiTop(pushNotificationObject.IframeEle, parseInt('-136px'));
    }, 1);
  },
  subscribe: function() {
    pushNotificationObject.SetDailyCookie(1);
    var orig_page = "";
    if (document.URL.indexOf(pushNotificationObject.redirectPage) != -1) {
      orig_page = document.referrer;
    }
    if ('serviceWorker' in navigator) {
      var statusCode = 0;
      var success = false;
      navigator.serviceWorker.register('/vizurySDKWorker.js').then(function(reg) {
        statusCode = 1;
        navigator.serviceWorker.ready.then(function() {
          statusCode = 2;
          reg.pushManager.getSubscription().then(function(subscription) {
            statusCode = 3;
            if (!subscription && Notification.permission != "denied") {
              pushNotificationObject.first = true;
            }
            Notification.requestPermission().then(function(result) {
              statusCode = 4;
              if (Notification.permission === 'denied') {
                success = true;
                pushNotificationObject.SetDailyCookie(1);
                pushNotificationObject.BlockCookie();
                pushNotificationObject.notSubscribed('BL');
              } else if (Notification.permission === 'default' && result === 'default') {
                success = true;
                pushNotificationObject.SetDailyCookie(1);
                pushNotificationObject.notSubscribed('CL');
              } else if(Notification.permission === 'granted') {
                pushNotificationObject.AllowedCookie();
                reg.pushManager.subscribe({
                  userVisibleOnly: true
                }).then(function(subscription) {
                  success = true;
                  pushNotificationObject.SetDailyCookie(1);
                  pushNotificationObject.BlockCookie();
                  var rawKey = subscription.getKey ? subscription.getKey('p256dh') : '';
                  var key = rawKey ? btoa(String.fromCharCode.apply(null, new Uint8Array(rawKey))) : '';
                  var rawAuthSecret = subscription.getKey ? subscription.getKey('auth') : '';
                  var authSecret = rawAuthSecret ? btoa(String.fromCharCode.apply(null, new Uint8Array(rawAuthSecret))) : '';
                  var endpoint = subscription.endpoint;
                  endpoint = encodeURIComponent(endpoint);
                  key = encodeURIComponent(key);
                  authSecret = encodeURIComponent(authSecret);                  
                  if (endpoint && endpoint !== '' && key && key !== '' && authSecret && authSecret !== '') {
                    var notify = "https://" + pushNotificationObject.target + "/analyze/subMap?subid=" + endpoint + "&auth=" + authSecret + "&key=" + key + "&version=" + pushNotificationObject.version + "&advid=" + pushNotificationObject.advid + "&action=AL";
                    if(pushNotificationObject.first){
                      notify = notify + "&useraction=1";
                    }
                    if(orig_page !== ""){
                      notify = notify + "&origin=" + orig_page; 
                    }
                    fetch(notify, {
                      credentials: 'include'
                    }).then(function(data) {
                      pushNotificationObject.closeWindow();
                    }).catch(function(err) {
                      pushNotificationObject.closeWindow();
                    })
                  } else {
                    pushNotificationObject.notSubscribed('NS', "One or more of endpoint, auth, key is empty");
                  }
                }).catch(function(err) {
                  success = true;
                  pushNotificationObject.SetDailyCookie(20);
                  pushNotificationObject.notSubscribed('NS', err.message + " with statusCode: "+ statusCode);
                });
              }
            }).catch(function(err) {
              success = true;
              pushNotificationObject.SetDailyCookie(20);
              pushNotificationObject.notSubscribed('NS', err.message + " with statusCode: "+ statusCode);
            });
          }).catch(function(err) {
            success = true;
            pushNotificationObject.SetDailyCookie(20);
            pushNotificationObject.notSubscribed('NS', err.message + " with statusCode: "+ statusCode);
          });
        }).catch(function(err) {
          success = true;
          pushNotificationObject.SetDailyCookie(20);
          pushNotificationObject.notSubscribed('NS', err.message + " with statusCode: "+ statusCode);
        });
      }).catch(function(err) {
        success = true;
        pushNotificationObject.SetDailyCookie(20);
        pushNotificationObject.notSubscribed('NS', err.message + " with statusCode: "+ statusCode);
      });
      setTimeout(function() {
        if (!success) {
          if(statusCode === 3){
            pushNotificationObject.SetDailyCookie(1);
          } else{
            pushNotificationObject.SetDailyCookie(20);  
          }          
          pushNotificationObject.notSubscribed('NS', "Error resolving/rejecting at level: " + statusCode);
        }
      }, 20000);
    } else {
      pushNotificationObject.SetDailyCookie(20);
      pushNotificationObject.notSubscribed('NS', "service worker is not present in navigator");
    }
  },
  notSubscribed: function notSubscribed(action, message) {
    var orig_page = "";
    if (document.URL.indexOf(pushNotificationObject.redirectPage) != -1) {
      orig_page = document.referrer;
    }
    var notify = "https://" + pushNotificationObject.target + "/analyze/subMap?version=" + pushNotificationObject.version + "&advid=" + pushNotificationObject.advid + "&action=" + action;
    if(pushNotificationObject.first){
      notify = notify + "&useraction=1";
    }
    if(orig_page !== ""){
      notify = notify + "&origin=" + orig_page; 
    }
    fetch(notify, {
      credentials: 'include'
    }).then(function(data) {
      if (message) {
        pushNotificationObject.logError(message);
      } else {
        pushNotificationObject.closeWindow();
      }
    }).catch(function(err) {
      pushNotificationObject.closeWindow();
    })
  },
  logError: function logError(err) {
    var message = encodeURIComponent(err);
    var notify = "https://" + pushNotificationObject.target + "/analyze/error?message=" + message + "&advid=" + pushNotificationObject.advid + "&version=" + pushNotificationObject.version;
    fetch(notify, {
      credentials: 'include'
    }).then(function(data) {
      pushNotificationObject.closeWindow();
    }).catch(function(err) {
      pushNotificationObject.closeWindow();
    })
  },
  VizuryOptinCheck: function() {
    var protocol = window.location.protocol;
    if (protocol === 'https:') {
      var isPresent = false;
      var value = "; " + document.cookie;
      var partsM = value.split("; " + pushNotificationObject.migrationCookie + "=");
      if (partsM.length < 2) {
        var d = new Date();
        d.setTime(d.getTime() + (3 * 365 * 24 * 60 * 60 * 1000));
        document.cookie = pushNotificationObject.migrationCookie + "=1; expires=" + d.toUTCString() + "; path=/";
        navigator.serviceWorker.getRegistrations().then(function(r) {
          for (var i = 0; i < r.length; i++) {
            if (r[i].scope.indexOf(pushNotificationObject.domain) > -1) {
              isPresent = true;
              r[i].unregister().then(function(flag) {
                if (flag === true) {
                  pushNotificationObject.subscribe();
                }
              });
              break;
            }
          }
          if (!isPresent) {
            pushNotificationObject.subscribe();
          }
        }).catch(function(err) {
          pushNotificationObject.notSubscribed('NS', err.message);
        });
      } else {
        pushNotificationObject.subscribe();
      }
    } else if (protocol === 'http:') {
      var value = "; " + document.cookie;
      var parts = value.split("; " + pushNotificationObject.blockCookie + "=");
      var partsAl = value.split("; " + pushNotificationObject.allowedCookie + "=");
      var isCallInitiated = false;
      if (parts.length < 2 && partsAl.length < 2) {
        document.onreadystatechange = function() {
          if (/interactive|complete/i.test(document.readyState) && !isCallInitiated) {
            isCallInitiated = true;
            pushNotificationObject.createDivElement();
          }
        }
      }
    }
  }
}
var headTag = document.getElementsByTagName('head')[0];
var ln = document.createElement('link');
ln.rel = "manifest";
ln.href = "/manifest.json";
headTag.appendChild(ln);
var protocol = window.location.protocol;
var value = "; " + document.cookie;
var parts = value.split("; " + pushNotificationObject.dailyCookie + "=");
var currentTime = new Date();
currentTime.setTime(currentTime.getTime() + (24 * 60 * 60 * 1000));
if (parts.length < 2) {
  if (protocol === 'http:' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent)) {
    pushNotificationObject.SetDailyCookie(1);
    pushNotificationObject.notSubscribed('NS');
  } else if (/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)) {
    var raw = navigator.userAgent.match(/Chrome\/([0-9]+)\./);
    var ver = parseInt(raw[1], 10);
    if (ver >= 50) {
      pushNotificationObject.VizuryOptinCheck();
    } else {
      pushNotificationObject.SetDailyCookie(1);
      pushNotificationObject.notSubscribed('NS');
    }
  } else if (navigator.userAgent.indexOf("Firefox")) {
    var raw = navigator.userAgent.match(/Firefox\/([0-9]+)\./);
    var ver = parseInt(raw[1], 10);
    if (ver >= 46) {
      pushNotificationObject.VizuryOptinCheck();
    } else {
      pushNotificationObject.SetDailyCookie(1);
      pushNotificationObject.notSubscribed('NS');
    }
  } else {
    pushNotificationObject.SetDailyCookie(1);
    pushNotificationObject.notSubscribed('NS');
  }
} else {
  pushNotificationObject.closeWindow();
}