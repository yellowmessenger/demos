// <!-- Start of LiveChat (www.livechatinc.com) code -->
    var LC_API = LC_API || {};

	window.__lc = window.__lc || {};
        window.__lc.license = 1952541;
        var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = true;
        lc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.livechatinc.com/tracking.js';
        var s = document.getElementsByTagName('script')[0];

    window.addEventListener("message", function (event) {
    var ldata = {}
    try {
        event.data = JSON.parse(event.data);
        ldata = JSON.parse(event.data);
        ldata = ldata.data
    } catch (e) {
        //do nothing
    }
    if (typeof(ldata) == "object" && ldata.hasOwnProperty("code") && ldata.code === "transfer_to_agent") {
          s.parentNode.insertBefore(lc, s);
          window.YellowMessengerPlugin.hide();
    }
}, false);
