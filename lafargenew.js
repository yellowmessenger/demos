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
    var url = data.url
    var method = data.method || "GET"
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        let res = this.response;
        let code = "software-installation"
        if(res && res=="error"){
          code = "software-installation-cancelled";
        }
        document.getElementById('ymIframe').contentWindow.postMessage(JSON.stringify({
          event_code: 'ym-client-event',
          data: JSON.stringify({
            event: {
              code: code
            }
          })
        }), '*');
      }else if(this.readyState==4 && this.status!=200){
        document.getElementById('ymIframe').contentWindow.postMessage(JSON.stringify({
          event_code: 'ym-client-event',
          data: JSON.stringify({
            event: {
              code: "software-installation-error"
            }
          })
        }), '*');
      }
    };
    if(method=="GET"){
      xhttp.open("GET", url, true);
    }
    else{
      // xhttp.open()
      //Will handle when the api is made post
    }
    // xhttp.onerror=function(e){
    //   if(e.type=="error"){
    //   }
    // }
    xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhttp.send();
  }
  else if (event.event_code == 'custom-event' && event.data.code == 'downloadZip') {
    var data = event.data.data;
    var url = data.url
    let a  = document.createElement("a")
    a.href = url;
    a.target="_blank"
    a.click()
  }
}, false);
