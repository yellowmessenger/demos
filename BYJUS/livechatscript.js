// <!-- Start of LiveChat (www.livechatinc.com) code -->
var LC_API = LC_API || {};

// LC_API.on_after_load = function() {
// 	LC_API.hide_chat_window();
// };

// LC_API.on_before_load = function() {
// 	LC_API.hide_chat_window();
// };

window.onload = function () {
    window.__lc = window.__lc || {};
    window.__lc.license = 1952541;
    //window.__lc.group = 23;
    var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = true;
    lc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.livechatinc.com/tracking.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(lc, s);
    var livechat_chat_started = false;

    LC_API.on_before_load = function () {
        // don't hide the chat window only if visitor
        // is currently chatting with an agent
        if (LC_API.visitor_engaged() === false && livechat_chat_started === false) {
            LC_API.hide_chat_window();
        }
    };

    LC_API.on_chat_started = function () {
        livechat_chat_started = true;
    };
};

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
        window.YellowMessengerPlugin.removeChat();
        var custom_variables = [
            { name: 'Chat History', value: ldata.data.chatHistory }
        ];
        LC_API.set_custom_variables(custom_variables);
        LC_API.open_chat_window();
    }
}, false);
