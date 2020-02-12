// <!-- Start of LiveChat (www.livechatinc.com) code -->
var LC_API = LC_API || {};

LC_API.on_after_load = function() {
	LC_API.hide_chat_window();
};

    window.__lc = window.__lc || {};
    window.__lc.license = 11710455;
    var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = true;
    lc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.livechatinc.com/tracking.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(lc, s);

    window.addEventListener("message", function (event) {
    var ldata = {}
    try {
        event.data = JSON.parse(event.data);
        ldata = JSON.parse(event.data);
        ldata = ldata.data
    } catch (e) {
        //do nothing
    }
    if (ldata.code === 'transfer_to_agent') {
	    
          window.YellowMessengerPlugin.hide();
          LC_API.open_chat_window();
    }
}, false);
