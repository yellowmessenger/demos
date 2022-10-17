<script type="text/javascript">
        function changeStyles () {
            var frameDocument = window.frames && window.frames.ymIframe && window.frames.ymIframe.document;
            var closeChat = frameDocument.getElementsByClassName('close-chat')[0];
            closeChat.src = 'https://cdn.yellowmessenger.com/TxgpsQDhItwH1663067927036.png';
        }
        window.addEventListener('message', function(eventData) {
        var data = eventData.data;
        data = typeof data !='object' ? JSON.parse(data) : data;
        if(data && data.event_code == "create-ui") {
            var myTimeout = setTimeout(changeStyles, 0)
        }
    })
</script>
<script type="text/javascript">
    window.ymConfig = { bot: 'x1619794879539', host: 'https://app.yellowmessenger.com', view: 'compact' };
    function botScript() {
      var w = window,
          ic = w.YellowMessenger;
      if ("function" === typeof ic){
          ic("reattach_activator");
          ic("update", ymConfig);
      }
      else {
          var d = document,
              i = function () {
                  i.c(arguments);
              };
          i.q = [];
          i.c = function (e) {
              i.q.push(e);
          };
          w.YellowMessenger = i;
          if(w.attachEvent) {
              w.attachEvent("onload", l)
          } else {
              window.addEventListener('load', l);
              w.addEventListener("load", l, !1)
          }
      }
      function l() {
          var e = d.createElement("script");
          e.type = "text/javascript";
          e.async = !0;
          e.src = "https://app.yellowmessenger.com/widget/main.js";
          var t = d.getElementsByTagName("script")[0];
          t.parentNode.insertBefore(e, t);
      }
  }
  botScript();  
  </script>
