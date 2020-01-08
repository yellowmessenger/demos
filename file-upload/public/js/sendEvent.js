
function sendEvent(response) {


    window.parent.postMessage(JSON.stringify({
        event_code: 'ym-client-event', data: JSON.stringify({
            event: {
                code: "data",
                data: {
                    file_data: response
                }
            }
        })
    }), '*');
}


$(document).ready(function () {

    var status = document.getElementById("status").innerHTML;
    var message = document.getElementById("message").innerHTML;
    var base64 = document.getElementById("base64").innerHTML;
    var extension = document.getElementById("extension").innerHTML;
    var doc_type = document.getElementById("doc_type").innerHTML;
    var campaign = document.getElementById("campaign").innerHTML;
    console.log({ status, message, base64, extension, campaign, doc_type }, "sending data to bot...");
    sendEvent({ status, message, base64, extension, doc_type, campaign });


});