var saveByteArray = function (data, name) {
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  var blob = new Blob(data, { type: "application/pdf" }),
    url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = name;
  a.click();
  window.URL.revokeObjectURL(url);
};
window.addEventListener('message', function (event1) {
  var event = JSON.parse(event1.data);
  if (event.event_code == 'custom-event' && event.data.code == "pdf") {
    var data = event.data.data;
    var decoded = atob(data.body);
    var name = data.doc_name; var saveByteArray = function (data, name) {
      console.log(a);
      var a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      var blob = new Blob(data, { type: "application/pdf" }),
        url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = name;
      a.click();
      window.URL.revokeObjectURL(url);
    };
    var byteNumbers = Array(decoded.length);
    for (i = 0; i < decoded.length; i++) {
      byteNumbers[i] = decoded.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    a = event.data.data;
    saveByteArray([byteArray], name + ".pdf");
    document.getElementById('ymIframe').contentWindow.postMessage(JSON.stringify({
      event_code: 'ym-client-event',
      data: JSON.stringify({
        event: {
          code: "document_downloaded"
        }
      })
    }), '*');
  }
  else if (event.event_code == 'custom-event' && event.data.code == 'load_pdf') {
    var data = event.data.data;
    var title = data.title;
    var url = data.url;
    window.open(url, '_blank', 'location=yes');
  }
  else if (event.event_code == 'custom-event' && event.data.code == 'openUrl') {
    var data = event.data.data;
    var url = data.url;
    var target = data.target;
    window.open(url, target);
  }
  else if (event.event_code == 'custom-event' && event.data.code == 'install') {
    var data = event.data.data;
    var app = data.app
    var url = `http://localhost:5000/?param=${app}`;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        document.getElementById('ymIframe').contentWindow.postMessage(JSON.stringify({
          event_code: 'ym-client-event',
          data: JSON.stringify({
            event: {
              code: "software-installation"
            }
          })
        }), '*');
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
  }
}, false);
