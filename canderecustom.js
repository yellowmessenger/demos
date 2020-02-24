
  
  
  function Blue(){
  $zopim.livechat.window.show();
  }
  

function Red(status) {
  console.log(status);
    if (status == 'online') {
      // $zopim.livechat.window.show();
      var iframe = document.getElementById('ymIframe');
      $zopim.livechat.window.show();
      iframe.contentWindow.postMessage(JSON.stringify({event_code:'ym-client-event', data: JSON.stringify({
        event: {
            code: "agent-status",
            data: {
"status" : status
},
        }
    })
        }),
);
    }
    else if (status == 'offline') {
      $zopim.livechat.badge.setImage('OFFLINE_IMG_URL');
    }
  }

(function() {      
    window.addEventListener(
      'message',
      function(event) {
        try {
          var eventData = JSON.parse(event.data);
          var chatbotCircle = document.getElementById('ymDivCircle');
          if (eventData.event_code === 'custom-event') {
            if(eventData.data.code === "signup"){    
                    var signUpButton = document.querySelector("body > header > div.header-container > div > div > div:nth-child(2) > div > div > div:nth-child(3) > span > div > ul > li.user_login_w > div.login_h_s > div.u_r_ico > a");
                    signUpButton.click();	
              chatbotCircle.click(); 
                } else if(eventData.data.code === "signin"){
                    if (typeof window.orientation !== 'undefined'){
                        chatbotlogin();
                        window.YellowMessengerPlugin.hide();
                    } else {
                    var signInButton = document.querySelector("body > header > div.header-container > div > div > div:nth-child(2) > div > div > div:nth-child(3) > span > div > ul > li.user_login_w > div.login_h_s > div.u_l_ico > a");
                    signInButton.click();
                    chatbotCircle.click();
                    }
                } else if(eventData.data.code === "logout"){
                    var logoutButton = document.querySelector("body > header > div > div > div > div:nth-child(2) > div > div > div:nth-child(3) > span > div > ul > li.user_login_w > div.login_h_s > div > p.u_log_out > a");
                    logoutButton.click();
              chatbotCircle.click(); 
                } else if(eventData.data.code === "zendesk"){
                  $zopim.livechat.setOnStatus(Red)

                  //var iframe = document.getElementById('ymIframe');
                  
                } 
                else if(eventData.data.code === "zendesk_chat"){
                  $zopim.livechat.setOnChatStart(Blue)
                }
          } 
        } catch (error) {
            console.log(error);
        }
      },
      false
    );
  })();
